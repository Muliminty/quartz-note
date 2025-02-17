---
title: 标注
tags:
  - feature/transformer
---

Quartz 支持与 Obsidian 相同的 Admonition-callout 语法。

这包括:

- 12 种不同的标注类型(每种都有几个别名)
- 可折叠的标注

```
> [!info] 标题
> 这是一个标注!
```

查看[这里的文档了解支持的类型和语法](https://help.obsidian.md/Editing+and+formatting/Callouts)。

> [!warning]
> 想知道为什么标注可能没有显示,即使你已经启用了它们?你可能需要重新排序你的插件,使 [[ObsidianFlavoredMarkdown]] 在 [[SyntaxHighlighting]] _之后_。

## 自定义

标注是 [[ObsidianFlavoredMarkdown]] 插件的功能。查看插件页面了解如何启用或禁用它们。

你可以通过自定义 `quartz/styles/callouts.scss` 来编辑图标。

### 添加自定义标注

默认情况下,自定义标注会应用 `note` 样式。要制作漂亮的标注,你需要在 `custom.scss` 中添加这些行。

```scss title="quartz/styles/custom.scss"
.callout {
  &[data-callout="custom"] {
    --color: #customcolor;
    --border: #custombordercolor;
    --bg: #custombg;
    --callout-icon: url("data:image/svg+xml; utf8, <custom formatted svg>"); //SVG 图标代码
  }
}
```

> [!warning]
> 不要忘记确保 SVG 在放入 CSS 之前已经进行了 URL 编码。你可以使用[这样的工具](https://yoksel.github.io/url-encoder/)来帮助你完成这个工作。

## 展示

> [!info]
> 默认标题

> [!question]+ 标注可以_嵌套_吗?
>
> > [!todo]- 是的!它们可以。而且可以折叠!
> >
> > > [!example] 你甚至可以使用多层嵌套。

> [!note]
> 别名: "note"

> [!abstract]
> 别名: "abstract", "summary", "tldr"

> [!info]
> 别名: "info"

> [!todo]
> 别名: "todo"

> [!tip]
> 别名: "tip", "hint", "important"

> [!success]
> 别名: "success", "check", "done"

> [!question]
> 别名: "question", "help", "faq"

> [!warning]
> 别名: "warning", "attention", "caution"

> [!failure]
> 别名: "failure", "missing", "fail"

> [!danger]
> 别名: "danger", "error"

> [!bug]
> 别名: "bug"

> [!example]
> 别名: "example"

> [!quote]
> 别名: "quote", "cite"
