---
title: 创建你自己的 Quartz 组件
---

> [!warning]
> 本指南假设你有 JavaScript 开发经验并且熟悉 TypeScript。

通常在网页上,我们使用 HTML 编写布局代码,看起来像这样:

```html
<article>
  <h1>一个文章标题</h1>
  <p>一些内容</p>
</article>
```

这段 HTML 代表一个文章,包含一个写着"一个文章标题"的标题和一个包含"一些内容"文本的段落。这与 CSS 结合来设置页面样式,与 JavaScript 结合来添加交互性。

然而,HTML 不允许你创建可重用的模板。如果你想创建一个新页面,你需要复制粘贴上面的代码片段并自己编辑标题和内容。如果我们的网站上有很多内容共享类似布局,这就不太好了。创建 React 的聪明人也有类似的抱怨,并发明了组件的概念 —— 返回 JSX 的 JavaScript 函数 —— 来解决代码重复问题。

实际上,组件允许你编写一个 JavaScript 函数,该函数接收一些数据并生成 HTML 作为输出。**虽然 Quartz 不使用 React,但它使用相同的组件概念,让你可以轻松地在 Quartz 网站中表达布局模板。**

## 示例组件

### 构造函数

组件文件以 `.tsx` 文件的形式写在 `quartz/components` 文件夹中。这些组件在 `quartz/components/index.ts` 中重新导出,这样你就可以在布局和其他组件中更轻松地使用它们。

每个组件文件应该有一个默认导出,满足 `QuartzComponentConstructor` 函数签名。它是一个接受单个可选参数 `opts` 并返回 Quartz 组件的函数。参数 `opts` 的类型由你作为组件创建者也决定的接口 `Options` 定义。

在你的组件中,你可以使用配置选项中的值来改变组件内部的渲染行为。例如,下面代码片段中的组件在 `favouriteNumber` 小于 0 时不会渲染。

```tsx {11-17}
interface Options {
  favouriteNumber: number
}

const defaultOptions: Options = {
  favouriteNumber: 42,
}

export default ((userOpts?: Options) => {
  const opts = { ...userOpts, ...defaultOpts }
  function YourComponent(props: QuartzComponentProps) {
    if (opts.favouriteNumber < 0) {
      return null
    }

    return <p>我最喜欢的数字是 {opts.favouriteNumber}</p>
  }

  return YourComponent
}) satisfies QuartzComponentConstructor
```

### Props

Quartz 组件本身(上面高亮的第 11-17 行)看起来像一个 React 组件。它接收属性(有时称为 [props](https://react.dev/learn/passing-props-to-a-component))并返回 JSX。

所有 Quartz 组件都接受相同的 props 集:

```tsx title="quartz/components/types.ts"
// 为了演示而简化
export type QuartzComponentProps = {
  fileData: QuartzPluginData
  cfg: GlobalConfiguration
  tree: Node<QuartzPluginData>
  allFiles: QuartzPluginData[]
  displayClass?: "mobile-only" | "desktop-only"
}
```

- `fileData`: [[making plugins|插件]]可能添加到当前页面的任何元数据。
  - `fileData.slug`: 当前页面的 slug。
  - `fileData.frontmatter`: 解析的任何前置元数据。
- `cfg`: `quartz.config.ts` 中的 `configuration` 字段。
- `tree`: 处理和转换文件后得到的 [HTML AST](https://github.com/syntax-tree/hast)。如果你想使用 [hast-util-to-jsx-runtime](https://github.com/syntax-tree/hast-util-to-jsx-runtime) 渲染内容,这很有用(你可以在 `quartz/components/pages/Content.tsx` 中找到这样的例子)。
- `allFiles`: 所有已解析文件的元数据。对于做页面列表或弄清整个站点结构很有用。
- `displayClass`: 一个实用类,表示用户关于如何在移动或桌面设置中渲染它的偏好。如果你想在移动或桌面上有条件地隐藏组件,这很有帮助。

### 样式

Quartz 组件还可以在实际的函数组件上定义一个 `.css` 属性,Quartz 会获取这个属性。这应该是一个 CSS 字符串,可以是内联的,也可以从 `.scss` 文件导入。

注意,内联样式**必须**是纯粹的普通 CSS:

```tsx {6-10} title="quartz/components/YourComponent.tsx"
export default (() => {
  function YourComponent() {
    return <p class="red-text">示例组件</p>
  }

  YourComponent.css = `
  p.red-text {
    color: red;
  }
  `

  return YourComponent
}) satisfies QuartzComponentConstructor
```

然而,导入的样式可以来自 SCSS 文件:

```tsx {1-2,9} title="quartz/components/YourComponent.tsx"
// 假设你的样式表在 quartz/components/styles/YourComponent.scss
import styles from "./styles/YourComponent.scss"

export default (() => {
  function YourComponent() {
    return <p>示例组件</p>
  }

  YourComponent.css = styles
  return YourComponent
}) satisfies QuartzComponentConstructor
```

> [!warning]
> Quartz 不使用 CSS 模块,所以你在这里声明的任何样式都适用于_全局_。如果你只想让它应用于你的组件,确保使用特定的类名和选择器。

### 脚本和交互性

那么交互性呢?假设你想添加一个点击处理程序。像组件上的 `.css` 属性一样,你也可以声明 `.beforeDOMLoaded` 和 `.afterDOMLoaded` 属性,它们是包含脚本的字符串。

```tsx title="quartz/components/YourComponent.tsx"
export default (() => {
  function YourComponent() {
    return <button id="btn">点击我</button>
  }

  YourComponent.beforeDOMLoaded = `
  console.log("在页面加载之前打招呼!")
  `

  YourComponent.afterDOMLoaded = `
  document.getElementById('btn').onclick = () => {
    alert('按钮被点击了!')
  }
  `
  return YourComponent
}) satisfies QuartzComponentConstructor
```

> [!hint]
> 对于来自 React 的人,Quartz 组件与 React 组件的不同之处在于它只使用 JSX 进行模板和布局。像 `useEffect`、`useState` 等钩子不会被渲染,其他接受函数的属性如 `onClick` 处理程序也不会工作。相反,要使用常规 JS 脚本直接修改 DOM 元素。

顾名思义,`.beforeDOMLoaded` 脚本在页面加载完成之前执行,所以它无法访问页面上的任何元素。这主要用于预取任何关键数据。

`.afterDOMLoaded` 脚本在页面完全加载后执行。这是设置任何应该持续整个站点访问时间的内容的好地方(例如,从本地存储获取保存的内容)。

如果你需要创建一个依赖于_页面特定_元素的 `afterDOMLoaded` 脚本,这些元素在导航到新页面时可能会改变,你可以监听在页面加载时触发的 `"nav"` 事件(如果启用了 [[SPA Routing]],这可能在导航时发生)。

```ts
document.addEventListener("nav", () => {
  // 在这里做页面特定的逻辑
  // 例如附加事件监听器
  const toggleSwitch = document.querySelector("#switch") as HTMLInputElement
  toggleSwitch.addEventListener("change", switchTheme)
  window.addCleanup(() => toggleSwitch.removeEventListener("change", switchTheme))
})
```

最佳实践是通过 `window.addCleanup` 跟踪任何事件处理程序以防止内存泄漏。
这将在页面导航时被调用。

#### 导入代码

当然,将你的代码作为字符串字面量写在组件中并不总是实用(也不总是期望的!)。

Quartz 支持通过 `.inline.ts` 文件导入组件代码。

```tsx title="quartz/components/YourComponent.tsx"
// @ts-ignore: typescript 不知道我们的内联打包系统
// 所以我们需要忽略错误
import script from "./scripts/graph.inline"

export default (() => {
  function YourComponent() {
    return <button id="btn">点击我</button>
  }

  YourComponent.afterDOMLoaded = script
  return YourComponent
}) satisfies QuartzComponentConstructor
```

```ts title="quartz/components/scripts/graph.inline.ts"
// 这里的任何导入都会被打包到浏览器中
import * as d3 from "d3"

document.getElementById("btn").onclick = () => {
  alert("按钮被点击了!")
}
```

此外,如上面示例所示,你可以在 `.inline.ts` 文件中导入包。这将由 Quartz 打包并包含在实际脚本中。

### 使用组件

创建自定义组件后,在 `quartz/components/index.ts` 中重新导出它:

```ts title="quartz/components/index.ts" {4,10}
import ArticleTitle from "./ArticleTitle"
import Content from "./pages/Content"
import Darkmode from "./Darkmode"
import YourComponent from "./YourComponent"

export { ArticleTitle, Content, Darkmode, YourComponent }
```

然后,你可以像使用任何其他组件一样通过 `Component.YourComponent()` 在 `quartz.layout.ts` 中使用它。有关更多详细信息,请参阅 [[configuration#Layout|布局]] 部分。

由于 Quartz 组件只是返回 React 组件的函数,你可以在其他 Quartz 组件中组合使用它们。

```tsx title="quartz/components/AnotherComponent.tsx"
import YourComponent from "./YourComponent"

export default (() => {
  function AnotherComponent(props: QuartzComponentProps) {
    return (
      <div>
        <p>它是嵌套的!</p>
        <YourComponent {...props} />
      </div>
    )
  }

  return AnotherComponent
}) satisfies QuartzComponentConstructor
```

> [!hint]
> 查看 `quartz/components` 中的更多 Quartz 组件示例,作为你自己组件的参考!
