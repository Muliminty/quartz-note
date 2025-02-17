---
title: "文件浏览器"
tags:
  - component
---

Quartz 提供了一个文件浏览器,允许你浏览网站上的所有文件和文件夹。它支持嵌套文件夹,并且高度可定制。

默认情况下,它显示你页面上的所有文件夹和文件。要在不同位置显示文件浏览器,你可以编辑[[layout|布局]]。

文件夹的显示名称由 `folder/index.md` 中的 `title` 前置元数据字段决定(更多详情见[[authoring content|创作内容]])。如果该文件不存在或不包含前置元数据,则将使用本地文件夹名称。

> [!info]
> 文件浏览器默认使用本地存储来保存你的浏览器状态。这样做是为了确保在导航到不同页面时能有流畅的体验。
>
> 要清除/删除本地存储中的浏览器状态,删除 `fileTree` 条目(在基于 chromium 的浏览器中如何删除本地存储中的键的指南可以在[这里](https://docs.devolutions.net/kb/general-knowledge-base/clear-browser-local-storage/clear-chrome-local-storage/)找到)。你可以通过传递 `useSavedState: false` 作为参数来禁用这个功能。

## 自定义

大多数配置可以通过向 `Component.Explorer()` 传入选项来完成。

例如,这是默认配置的样子:

```typescript title="quartz.layout.ts"
Component.Explorer({
  title: "Explorer", // 文件浏览器组件的标题
  folderClickBehavior: "collapse", // 点击文件夹时会发生什么("link" 点击时导航到文件夹页面或 "collapse" 点击时折叠文件夹)
  folderDefaultState: "collapsed", // 文件夹的默认状态("collapsed" 或 "open")
  useSavedState: true, // 是否使用本地存储来保存浏览器的"状态"(哪些文件夹是打开的)
  // 排序顺序:先文件夹,然后是文件。按字母顺序排序文件夹和文件
  sortFn: (a, b) => {
    ... // 默认实现稍后显示
  },
  filterFn: filterFn: (node) => node.name !== "tags", // 过滤掉 'tags' 文件夹
  mapFn: undefined,
  // 应用函数的顺序
  order: ["filter", "map", "sort"],
})
```

当传入你自己的选项时,如果你想保持某个字段的默认值,可以省略任何或所有这些字段。

想要更多自定义?

- 移除文件浏览器: 从 `quartz.layout.ts` 中移除 `Component.Explorer()`
  - (可选): 移除文件浏览器组件后,你可以将[[table of contents|目录]]组件移回布局的 `left` 部分
- 更改 `sort`、`filter` 和 `map` 行为: 在[[#高级自定义]]中解释
- 组件:
  - 包装器(外部组件,生成文件树等): `quartz/components/Explorer.tsx`
  - 浏览器节点(递归,可以是文件夹或文件): `quartz/components/ExplorerNode.tsx`
- 样式: `quartz/components/styles/explorer.scss`
- 脚本: `quartz/components/scripts/explorer.inline.ts`

## 高级自定义

该组件允许你完全自定义其所有行为。你可以传入自定义的 `sort`、`filter` 和 `map` 函数。
所有你可以传入的函数都使用 `FileNode` 类,它具有以下属性:

```ts title="quartz/components/ExplorerNode.tsx" {2-5}
export class FileNode {
  children: FileNode[]  // 当前节点的子节点
  name: string  // slug 的最后一部分
  displayName: string // 实际应该在浏览器中显示的内容
  file: QuartzPluginData | null // 如果节点是文件,这是文件的元数据。更多细节见 `QuartzPluginData`
  depth: number // 当前节点的深度

  ... // 其余实现
}
```

每个你可以传入的函数都是可选的。默认情况下,只会使用一个 `sort` 函数:

```ts title="默认排序函数"
// 排序顺序:先文件夹,然后是文件。按字母顺序排序文件夹和文件
Component.Explorer({
  sortFn: (a, b) => {
    if ((!a.file && !b.file) || (a.file && b.file)) {
      // sensitivity: "base": 只有基本字母不同的字符串才会被视为不相等。例如: a ≠ b, a = á, a = A
      // numeric: true: 是否应该使用数字排序,使得 "1" < "2" < "10"
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }
    if (a.file && !b.file) {
      return 1
    } else {
      return -1
    }
  },
})
```

---

你可以为 `sortFn`、`filterFn` 和 `mapFn` 传入自己的函数。所有函数都会按照 `order` 选项提供的顺序执行(见[[#自定义]])。这些函数的行为类似于它们的 `Array.prototype` 对应项,只是它们就地修改整个 `FileNode` 树,而不是返回一个新的。

有关如何使用 `sort`、`filter` 和 `map` 的更多信息,你可以查看 [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)、[Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 和 [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)。

类型定义如下:

```ts
sortFn: (a: FileNode, b: FileNode) => number
filterFn: (node: FileNode) => boolean
mapFn: (node: FileNode) => void
```

> [!tip]
> 你可以这样检查一个 `FileNode` 是文件夹还是文件:
>
> ```ts
> if (node.file) {
>   // 节点是文件
> } else {
>   // 节点是文件夹
> }
> ```

## 基本示例

这些示例展示了 `sort`、`map` 和 `filter` 的基本用法。

### 使用 `sort` 将文件放在前面

使用这个示例,文件浏览器将按字母顺序排序所有内容,但将所有**文件**放在所有**文件夹**之上。

```ts title="quartz.layout.ts"
Component.Explorer({
  sortFn: (a, b) => {
    if ((!a.file && !b.file) || (a.file && b.file)) {
      return a.displayName.localeCompare(b.displayName)
    }
    if (a.file && !b.file) {
      return -1
    } else {
      return 1
    }
  },
})
```

### 更改显示名称(`map`)

使用这个示例,所有 `FileNodes`(文件夹 + 文件)的显示名称将被转换为全大写。

```ts title="quartz.layout.ts"
Component.Explorer({
  mapFn: (node) => {
    node.displayName = node.displayName.toUpperCase()
  },
})
```

### 移除元素列表(`filter`)

使用这个示例,你可以通过使用 `omit` 集合提供文件夹/文件数组来从你的浏览器中移除元素。

```ts title="quartz.layout.ts"
Component.Explorer({
  filterFn: (node) => {
    // 包含你想要过滤掉的所有内容名称的集合
    const omit = new Set(["authoring content", "tags", "hosting"])
    return !omit.has(node.name.toLowerCase())
  },
})
```

你可以通过更改 `omit` 集合的条目来自定义此功能。只需添加你想要移除的所有文件夹或文件名。

### 按标签移除文件

你可以通过 `node.file?.frontmatter?` 访问文件的前置元数据。这允许你根据它们的前置元数据过滤文件,例如根据它们的标签。

```ts title="quartz.layout.ts"
Component.Explorer({
  filterFn: (node) => {
    // 排除带有 "explorerexclude" 标签的文件
    return node.file?.frontmatter?.tags?.includes("explorerexclude") !== true
  },
})
```

### 在浏览器中显示所有元素

要覆盖默认的过滤函数(它从浏览器中移除 `tags` 文件夹),你可以将过滤函数设置为 `undefined`。

```ts title="quartz.layout.ts"
Component.Explorer({
  filterFn: undefined, // 不应用过滤函数,每个文件和文件夹都将可见
})
```

## 高级示例

> [!tip]
> 当编写更复杂的函数时,布局文件可能会变得很拥挤。
> 你可以通过在另一个文件中定义你的函数来解决这个问题。
>
> ```ts title="functions.ts"
> import { Options } from "./quartz/components/ExplorerNode"
> export const mapFn: Options["mapFn"] = (node) => {
>   // 在这里实现你的函数
> }
> export const filterFn: Options["filterFn"] = (node) => {
>   // 在这里实现你的函数
> }
> export const sortFn: Options["sortFn"] = (a, b) => {
>   // 在这里实现你的函数
> }
> ```
>
> 然后你可以这样导入它们:
>
> ```ts title="quartz.layout.ts"
> import { mapFn, filterFn, sortFn } from "./functions.ts"
> Component.Explorer({
>   mapFn: mapFn,
>   filterFn: filterFn,
>   sortFn: sortFn,
> })
> ```

### 添加表情符号前缀

要添加表情符号前缀(📁 用于文件夹,📄 用于文件),你可以使用这样的映射函数:

```ts title="quartz.layout.ts"
Component.Explorer({
  mapFn: (node) => {
    // 不改变根节点的名称
    if (node.depth > 0) {
      // 为文件/文件夹设置表情符号
      if (node.file) {
        node.displayName = "📄 " + node.displayName
      } else {
        node.displayName = "📁 " + node.displayName
      }
    }
  },
})
```

### 把它们组合在一起

在这个示例中,我们将通过使用上面示例中的函数来自定义浏览器,以[[#添加表情符号前缀|添加表情符号前缀]]、[[#移除元素列表-filter|过滤掉一些文件夹]]和[[#使用-sort-将文件放在前面|将文件排在文件夹之上]]。

```ts title="quartz.layout.ts"
Component.Explorer({
  filterFn: sampleFilterFn,
  mapFn: sampleMapFn,
  sortFn: sampleSortFn,
  order: ["filter", "sort", "map"],
})
```

注意我们在这里如何自定义 `order` 数组。这样做是因为默认顺序最后应用 `sort` 函数。虽然这通常效果很好,但在这里会导致意外行为,因为我们改变了所有显示名称的第一个字符。

为了解决这个问题,我们只是重新排列了顺序,在 `map` 函数中更改显示名称之前应用 `sort` 函数。

### 使用预定义的排序顺序的 `sort`

这是另一个示例,其中使用包含文件/文件夹名称(作为 slugs)的映射来定义 quartz 中浏览器的排序顺序。所有未在 `nameOrderMap` 中列出的文件/文件夹将出现在该文件夹层次结构级别的顶部。

值得一提的是,在 `nameOrderMap` 中设置的数字越小,条目在浏览器中的位置就越靠上。每个文件夹/文件增加 100,使得在它们的文件夹中排序文件变得更容易。最后,这个示例仍然允许你使用 `mapFn` 或前置元数据标题来更改显示名称,因为它使用 slugs 作为 `nameOrderMap`(不受显示名称更改的影响)。

```ts title="quartz.layout.ts"
Component.Explorer({
  sortFn: (a, b) => {
    const nameOrderMap: Record<string, number> = {
      "poetry-folder": 100,
      "essay-folder": 200,
      "research-paper-file": 201,
      "dinosaur-fossils-file": 300,
      "other-folder": 400,
    }

    let orderA = 0
    let orderB = 0

    if (a.file && a.file.slug) {
      orderA = nameOrderMap[a.file.slug] || 0
    } else if (a.name) {
      orderA = nameOrderMap[a.name] || 0
    }

    if (b.file && b.file.slug) {
      orderB = nameOrderMap[b.file.slug] || 0
    } else if (b.name) {
      orderB = nameOrderMap[b.name] || 0
    }

    return orderA - orderB
  },
})
```

作为参考,使用该示例,quartz 浏览器窗口会是这样的:

```
📖 Poetry Folder
📑 Essay Folder
    ⚗️ Research Paper File
🦴 Dinosaur Fossils File
🔮 Other Folder
```

文件结构是这样的:

```
index.md
poetry-folder
    index.md
essay-folder
    index.md
    research-paper-file.md
dinosaur-fossils-file.md
other-folder
    index.md
```
