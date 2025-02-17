---
title: 制作你自己的插件
---

> [!warning]
> 本文档的这部分将假设你有 TypeScript 的工作知识,并将包含描述 Quartz 插件应该是什么样子的代码片段。

Quartz 的插件是一系列对内容的转换。这在下面的处理管道图中有说明:

![[quartz transform pipeline.png]]

所有插件都被定义为一个函数,该函数接受一个选项参数 `type OptionType = object | undefined` 并返回一个对应于其插件类型的对象。

```ts
type OptionType = object | undefined
type QuartzPlugin<Options extends OptionType = undefined> = (opts?: Options) => QuartzPluginInstance
type QuartzPluginInstance =
  | QuartzTransformerPluginInstance
  | QuartzFilterPluginInstance
  | QuartzEmitterPluginInstance
```

以下部分将详细介绍每种插件类型可以实现的方法。在此之前,让我们先明确一些更模糊的类型:

- `BuildCtx` 在 `quartz/ctx.ts` 中定义。它包括
  - `argv`: 传递给 Quartz [[build]] 命令的命令行参数
  - `cfg`: 完整的 Quartz [[configuration]]
  - `allSlugs`: 所有有效内容 slugs 的列表(有关什么是 `ServerSlug` 的更多信息,请参见 [[paths]])
- `StaticResources` 在 `quartz/resources.tsx` 中定义。它包括
  - `css`: 应该加载的 CSS 样式定义列表。CSS 样式用 `CSSResource` 类型描述,该类型也在 `quartz/resources.tsx` 中定义。它接受源 URL 或样式表的内联内容。
  - `js`: 应该加载的脚本列表。脚本用 `JSResource` 类型描述,该类型也在 `quartz/resources.tsx` 中定义。它允许你定义加载时间(在 DOM 加载之前或之后)、是否应该是模块,以及源 URL 或脚本的内联内容。

## 转换器

转换器对内容进行**映射**,接收 Markdown 文件并输出修改后的内容或向文件本身添加元数据。

```ts
export type QuartzTransformerPluginInstance = {
  name: string
  textTransform?: (ctx: BuildCtx, src: string | Buffer) => string | Buffer
  markdownPlugins?: (ctx: BuildCtx) => PluggableList
  htmlPlugins?: (ctx: BuildCtx) => PluggableList
  externalResources?: (ctx: BuildCtx) => Partial<StaticResources>
}
```

所有转换器插件必须至少定义一个 `name` 字段来注册插件,以及一些可选函数,允许你挂钩到转换单个 Markdown 文件的各个部分。

- `textTransform` 在文件被解析成 [Markdown AST](https://github.com/syntax-tree/mdast) 之前执行文本到文本的转换。
- `markdownPlugins` 定义 [remark 插件](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) 的列表。`remark` 是一个以结构化方式将 Markdown 转换为 Markdown 的工具。
- `htmlPlugins` 定义 [rehype 插件](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md) 的列表。与 `remark` 的工作方式类似,`rehype` 是一个以结构化方式将 HTML 转换为 HTML 的工具。
- `externalResources` 定义插件可能需要在客户端加载的任何外部资源,以便它正常工作。

通常对于 `remark` 和 `rehype`,你可以找到可以使用的现有插件。如果你想创建自己的 `remark` 或 `rehype` 插件,请查看使用 `unified`(底层 AST 解析器和转换器库)的[创建插件指南](https://unifiedjs.com/learn/guide/create-a-plugin/)。

一个从 `remark` 和 `rehype` 生态系统借鉴的转换器插件的好例子是 [[plugins/Latex|Latex]] 插件:

```ts title="quartz/plugins/transformers/latex.ts"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeMathjax from "rehype-mathjax/svg"
import { QuartzTransformerPlugin } from "../types"

interface Options {
  renderEngine: "katex" | "mathjax"
}

export const Latex: QuartzTransformerPlugin<Options> = (opts?: Options) => {
  const engine = opts?.renderEngine ?? "katex"
  return {
    name: "Latex",
    markdownPlugins() {
      return [remarkMath]
    },
    htmlPlugins() {
      if (engine === "katex") {
        // 如果你需要向插件传递选项,你
        // 可以使用 [plugin, options] 元组
        return [[rehypeKatex, { output: "html" }]]
      } else {
        return [rehypeMathjax]
      }
    },
    externalResources() {
      if (engine === "katex") {
        return {
          css: [
            {
              // 基础 css
              content: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css",
            },
          ],
          js: [
            {
              // 修复复制行为: https://github.com/KaTeX/KaTeX/blob/main/contrib/copy-tex/README.md
              src: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/copy-tex.min.js",
              loadTime: "afterDOMReady",
              contentType: "external",
            },
          ],
        }
      } else {
        return {}
      }
    },
  }
}
```

转换器插件的另一个常见做法是解析文件并为该文件添加额外的数据:

```ts
export const AddWordCount: QuartzTransformerPlugin = () => {
  return {
    name: "AddWordCount",
    markdownPlugins() {
      return [
        () => {
          return (tree, file) => {
            // tree 是一个 `mdast` 根元素
            // file 是一个 `vfile`
            const text = file.value
            const words = text.split(" ").length
            file.data.wordcount = words
          }
        },
      ]
    },
  }
}

// 告诉 typescript 我们正在添加的自定义数据字段
// 其他插件也会知道这个数据字段
declare module "vfile" {
  interface DataMap {
    wordcount: number
  }
}
```

最后,你也可以使用 `unist-util-visit` 包中的 `visit` 函数或 `mdast-util-find-and-replace` 包中的 `findAndReplace` 函数对 Markdown 或 HTML AST 执行转换。

```ts
export const TextTransforms: QuartzTransformerPlugin = () => {
  return {
    name: "TextTransforms",
    markdownPlugins() {
      return [() => {
        return (tree, file) => {
          // 将 _text_ 替换为斜体版本
          findAndReplace(tree, /_(.+)_/, (_value: string, ...capture: string[]) => {
            // inner 是正则表达式的 () 内的文本
            const [inner] = capture
            // 返回一个 mdast 节点
            // https://github.com/syntax-tree/mdast
            return {
              type: "emphasis",
              children: [{ type: 'text', value: inner }]
            }
          })

         // 删除所有链接(仅替换为链接内容)
         // 通过 mdast 节点上的 'type' 字段匹配
         // https://github.com/syntax-tree/mdast#link 在这个例子中
          visit(tree, "link", (link: Link) => {
            return {
              type: "paragraph"
              children: [{ type: 'text', value: link.title }]
            }
          })
        }
      }]
    }
  }
}
```

所有转换器插件都可以在 `quartz/plugins/transformers` 下找到。如果你决定编写自己的转换器插件,不要忘记在 `quartz/plugins/transformers/index.ts` 下重新导出它

最后说一句:转换器插件相当复杂,所以如果你一开始不能完全理解也不用担心。看看内置的转换器,看看它们是如何操作内容的,以便更好地理解如何完成你想要做的事情。

## 过滤器

过滤器**过滤**内容,接收所有转换器的输出并确定实际保留哪些文件和丢弃哪些文件。

```ts
export type QuartzFilterPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzFilterPluginInstance

export type QuartzFilterPluginInstance = {
  name: string
  shouldPublish(ctx: BuildCtx, content: ProcessedContent): boolean
}
```

过滤器插件必须定义一个 `name` 字段和一个 `shouldPublish` 函数,该函数接收一个已被所有转换器处理的内容片段,并根据是否应该将其传递给发射器插件返回 `true` 或 `false`。

例如,这是内置的删除草稿插件:

```ts title="quartz/plugins/filters/draft.ts"
import { QuartzFilterPlugin } from "../types"

export const RemoveDrafts: QuartzFilterPlugin<{}> = () => ({
  name: "RemoveDrafts",
  shouldPublish(_ctx, [_tree, vfile]) {
    // 使用从转换器解析的前置元数据
    const draftFlag: boolean = vfile.data?.frontmatter?.draft ?? false
    return !draftFlag
  },
})
```

## 发射器

发射器对内容进行**归约**,接收所有经过转换和过滤的内容列表并创建输出文件。

```ts
export type QuartzEmitterPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzEmitterPluginInstance

export type QuartzEmitterPluginInstance = {
  name: string
  emit(ctx: BuildCtx, content: ProcessedContent[], resources: StaticResources): Promise<FilePath[]>
  getQuartzComponents(ctx: BuildCtx): QuartzComponent[]
}
```

发射器插件必须定义一个 `name` 字段、一个 `emit` 函数和一个 `getQuartzComponents` 函数。`emit` 负责查看所有已解析和过滤的内容,然后适当创建文件并返回插件创建的文件路径列表。

创建新文件可以通过常规的 Node [fs 模块](https://nodejs.org/api/fs.html)(即 `fs.cp` 或 `fs.writeFile`)完成,或者如果你要创建包含文本的文件,可以通过 `quartz/plugins/emitters/helpers.ts` 中的 `write` 函数完成。`write` 具有以下签名:

```ts
export type WriteOptions = (data: {
  // 构建上下文
  ctx: BuildCtx
  // 要发出的文件名(不包括文件扩展名)
  slug: ServerSlug
  // 文件扩展名
  ext: `.${string}` | ""
  // 要添加的文件内容
  content: string
}) => Promise<FilePath>
```

这是一个围绕写入适当输出文件夹和确保中间目录存在的简单包装。如果你选择使用原生 Node `fs` API,确保也发出到 `argv.output` 文件夹。

如果你正在创建需要渲染组件的发射器插件,还有三件事需要注意:

- 你的组件应该使用 `getQuartzComponents` 声明它使用的 `QuartzComponents` 列表。有关更多信息,请参见 [[creating components]] 页面。
- 你可以使用 `quartz/components/renderPage.tsx` 中定义的 `renderPage` 函数将 Quartz 组件渲染成 HTML。
- 如果你需要将 HTML AST 渲染成 JSX,你可以使用 `quartz/util/jsx.ts` 中的 `htmlToJsx` 函数。这方面的一个例子可以在 `quartz/components/pages/Content.tsx` 中找到。

例如,以下是内容页面插件的简化版本,它渲染每个页面。

```tsx title="quartz/plugins/emitters/contentPage.tsx"
export const ContentPage: QuartzEmitterPlugin = () => {
  // 构造布局
  const layout: FullPageLayout = {
    ...sharedPageComponents,
    ...defaultContentPageLayout,
    pageBody: Content(),
  }
  const { head, header, beforeBody, pageBody, afterBody, left, right, footer } = layout
  return {
    name: "ContentPage",
    getQuartzComponents() {
      return [head, ...header, ...beforeBody, pageBody, ...afterBody, ...left, ...right, footer]
    },
    async emit(ctx, content, resources, emit): Promise<FilePath[]> {
      const cfg = ctx.cfg.configuration
      const fps: FilePath[] = []
      const allFiles = content.map((c) => c[1].data)
      for (const [tree, file] of content) {
        const slug = canonicalizeServer(file.data.slug!)
        const externalResources = pageResources(slug, file.data, resources)
        const componentData: QuartzComponentProps = {
          fileData: file.data,
          externalResources,
          cfg,
          children: [],
          tree,
          allFiles,
        }

        const content = renderPage(cfg, slug, componentData, opts, externalResources)
        const fp = await emit({
          content,
          slug: file.data.slug!,
          ext: ".html",
        })

        fps.push(fp)
      }
      return fps
    },
  }
}
```

注意它接受 `FullPageLayout` 作为选项。它是通过组合 `quartz.layout.ts` 文件提供的 `SharedLayout` 和 `PageLayout` 制成的。

> [!hint]
> 查看 `quartz/plugins` 中的更多 Quartz 插件示例,作为你自己插件的参考!
