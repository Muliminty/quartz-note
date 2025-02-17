---
title: 语法高亮
tags:
  - feature/transformer
---

Quartz 支持使用 [Prism.js](https://prismjs.com/) 进行代码块的语法高亮。

## 语法

要启用语法高亮,在代码块中指定语言:

````markdown
```js
// 一些 JavaScript 代码
const hello = "world"
console.log(hello)
```
````

这将生成:

```js
// 一些 JavaScript 代码
const hello = "world"
console.log(hello)
```

## 支持的语言

默认情况下,Quartz 支持以下语言的语法高亮:

- JavaScript/JSX
- TypeScript/TSX
- CSS
- HTML
- Markdown
- Bash/Shell
- Python
- LaTeX
- YAML
- TOML
- Git
- Diff
- SQL

## 自定义

语法高亮是 [[plugins/SyntaxHighlighting|SyntaxHighlighting]] 插件的功能。查看插件页面了解如何启用或禁用它。

要添加对其他语言的支持,你需要:

1. 在 `quartz/plugins/transformers/syntax.ts` 中导入语言:

```ts title="quartz/plugins/transformers/syntax.ts"
import "prismjs/components/prism-python"
import "prismjs/components/prism-latex"
// 等等...
```

2. 在 `quartz/styles/syntax.scss` 中添加语言的主题:

```scss title="quartz/styles/syntax.scss"
.token.language-python {
  // 你的主题样式
}
```
