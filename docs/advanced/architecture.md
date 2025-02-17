---
title: 架构
---

Quartz 是一个静态站点生成器。它是如何工作的?

这个问题最好通过追踪当用户(你!)在命令行运行 `npx quartz build` 时发生的事情来回答:

## 在服务器端

1. 运行 `npx quartz build` 后,npm 会查看 `package.json` 找到指向 `./quartz/bootstrap-cli.mjs` 的 `bin` 入口。
2. 这个文件顶部有一个 [shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) 行,告诉 npm 使用 Node 执行它。
3. `bootstrap-cli.mjs` 负责以下几件事:
   1. 使用 [yargs](http://yargs.js.org/) 解析命令行参数。
   2. 使用 [esbuild](https://esbuild.github.io/) 将 Quartz 的其余部分(用 TypeScript 编写)转译和打包成普通的 JavaScript。这里的 `esbuild` 配置有点特殊,因为它还使用 [esbuild-sass-plugin v2](https://www.npmjs.com/package/esbuild-sass-plugin) 处理 `.scss` 文件导入。此外,我们使用自定义的 `esbuild` 插件来打包组件声明的"内联"客户端脚本(任何 `.inline.ts` 文件),该插件运行另一个 `esbuild` 实例,为浏览器而不是 `node` 打包。两种类型的模块都作为纯文本导入。
   3. 如果设置了 `--serve`,运行本地预览服务器。这会启动两个服务器:
      1. 一个 WebSocket 服务器在端口 3001 上处理热重载信号。它跟踪所有入站连接,并在检测到服务器端更改(内容或配置)时发送"rebuild"消息。
      2. 一个 HTTP 文件服务器在用户定义的端口(通常是 8080)上提供实际的网站文件。
   4. 如果设置了 `--serve` 标志,它还会启动一个文件监视器来检测源代码更改(例如任何 `.ts`、`.tsx`、`.scss` 或打包器文件)。当发生更改时,我们使用 esbuild 的 [rebuild API](https://esbuild.github.io/api/#rebuild) 重新构建模块(上面的步骤 2),这大大减少了构建时间。
   5. 在转译主要的 Quartz 构建模块(`quartz/build.ts`)后,我们将其写入缓存文件 `.quartz-cache/transpiled-build.mjs`,然后使用 `await import(cacheFile)` 动态导入它。但是,我们需要非常聪明地处理如何破坏 Node 的[导入缓存](https://github.com/nodejs/modules/issues/307),所以我们添加一个随机查询字符串来欺骗 Node 认为它是一个新模块。不过,这确实会导致内存泄漏,所以我们只希望用户在单个会话中不要热重载他们的配置太多次 :)) (每次重载大约泄漏 ~350kB 内存)。导入模块后,我们调用它,传入我们之前解析的命令行参数以及一个回调函数来通知客户端刷新。
4. 在 `build.ts` 中,我们首先手动安装源映射支持,以解决我们之前引入的查询字符串缓存破坏黑客。然后,我们开始处理内容:
   1. 清理输出目录。
   2. 递归地遍历 `content` 文件夹中的所有文件,遵循 `.gitignore`。
   3. 解析 Markdown 文件。
      1. Quartz 检测可用的线程数,如果有 >128 个内容需要解析(粗略的启发式),则选择生成工作线程。如果需要生成工作线程,它将再次调用 esbuild 来转译工作线程脚本 `quartz/worker.ts`。然后,创建一个工作窃取 [workerpool](https://www.npmjs.com/package/workerpool),并将 128 个文件的批次分配给工作线程。
      2. 每个工作线程(或者如果没有并发,则只是主线程)根据 [[configuration]] 中定义的插件创建一个 [unified](https://github.com/unifiedjs/unified) 解析器。
      3. 解析有三个步骤:
         1. 将文件读入 [vfile](https://github.com/vfile/vfile)。
         2. 对内容应用插件定义的文本转换。
         3. 对文件路径进行 slugify 处理并将其存储在文件的数据中。有关 Quartz 中路径逻辑如何工作的更多详细信息,请参阅 [[paths]] 页面(剧透:它很复杂)。
         4. 使用 [remark-parse](https://www.npmjs.com/package/remark-parse) 进行 Markdown 解析(文本到 [mdast](https://github.com/syntax-tree/mdast))。
         5. 应用插件定义的 Markdown 到 Markdown 转换。
         6. 使用 [remark-rehype](https://github.com/remarkjs/remark-rehype) 将 Markdown 转换为 HTML([mdast](https://github.com/syntax-tree/mdast) 到 [hast](https://github.com/syntax-tree/hast))。
         7. 应用插件定义的 HTML 到 HTML 转换。
   4. 使用插件过滤掉不需要的内容。
   5. 使用插件发出文件。
      1. 收集每个发射器插件声明的所有静态资源(例如外部 CSS、JS 模块等)。
      2. 发出 HTML 文件的发射器在这里做了一些额外的工作,因为它们需要将解析步骤中产生的 [hast](https://github.com/syntax-tree/hast) 转换为 JSX。这是使用带有 [Preact](https://preactjs.com/) 运行时的 [hast-util-to-jsx-runtime](https://github.com/syntax-tree/hast-util-to-jsx-runtime) 完成的。最后,使用 [preact-render-to-string](https://github.com/preactjs/preact-render-to-string) 将 JSX 渲染为 HTML,它将 JSX 静态渲染为 HTML(即不关心 `useState`、`useEffect` 或任何其他 React/Preact 交互位)。在这里,我们还做了一些有趣的事情,比如从 `quartz.layout.ts` 组装页面 [[layout]],组装所有实际发送到客户端的内联脚本,以及所有转译的样式。这些逻辑的大部分可以在 `quartz/components/renderPage.tsx` 中找到。其他值得注意的事情:
         1. CSS 使用 [Lightning CSS](https://github.com/parcel-bundler/lightningcss) 进行缩小和转换,以添加供应商前缀并进行语法降级。
         2. 脚本分为 `beforeDOMLoaded` 和 `afterDOMLoaded`,分别插入到 `<head>` 和 `<body>` 中。
      3. 最后,每个发射器插件负责发出和将其发出的文件写入磁盘。
   6. 如果检测到 `--serve` 标志,我们还会设置另一个文件监视器来检测内容更改(仅限 `.md` 文件)。我们保持一个内容映射,跟踪每个 slug 的解析 AST 和插件数据,并在文件更改时更新此映射。新添加或修改的路径会重新构建并添加到内容映射中。然后,所有过滤器和发射器都在结果内容映射上运行。此文件监视器的防抖阈值为 250ms。成功后,我们使用传入的回调函数发送客户端刷新信号。

## 在客户端

1. 浏览器打开 Quartz 页面并加载 HTML。`<head>` 还链接到页面样式(发出到 `public/index.css`)和页面关键 JS(发出到 `public/prescript.js`)
2. 然后,一旦加载了 body,浏览器就会加载非关键 JS(发出到 `public/postscript.js`)
3. 一旦页面加载完成,页面就会分派一个自定义合成浏览器事件 `"nav"`。这用于让组件声明的客户端脚本可以"设置"任何需要访问页面 DOM 的内容。
   1. 如果在 [[configuration]] 中启用了 [[SPA Routing|enableSPA 选项]],这个 `"nav"` 事件也会在任何客户端导航时触发,以允许组件注销和重新注册任何事件处理程序和状态。
   2. 如果没有启用,我们将 `"nav"` 事件连接到在页面加载后只触发一次,以确保在 SPA 和非 SPA 上下文中状态设置的一致性。

插件系统的架构和设计在这里故意留得很模糊,因为这在 [[making plugins|制作你自己的插件]] 指南中有更详细的描述。
