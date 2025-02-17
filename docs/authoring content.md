---
title: 创作内容
---

你的 Quartz 中的所有内容都应该放在 `/content` 文件夹中。Quartz 主页的内容位于 `content/index.md` 中。如果你已经[[index#🪴 开始使用|设置了 Quartz]],这个文件夹应该已经初始化好了。这个文件夹中的任何 Markdown 都会被 Quartz 处理。

建议使用 [Obsidian](https://obsidian.md/) 作为编辑和维护 Quartz 的工具。它提供了一个不错的编辑器和图形界面来预览、编辑和链接你的本地文件和附件。

一切都设置好了吗?让我们[[build|构建]]并在本地预览你的 Quartz!

## 语法

由于 Quartz 使用 Markdown 文件作为编写内容的主要方式,它完全支持 Markdown 语法。默认情况下,Quartz 还附带了一些语法扩展,如 [Github Flavored Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)(脚注、删除线、表格、任务列表)和 [Obsidian Flavored Markdown](https://help.obsidian.md/Editing+and+formatting/Obsidian+Flavored+Markdown)([[callouts|标注]], [[wikilinks|维基链接]])。

此外,Quartz 还允许你在笔记中指定额外的元数据,称为**前置元数据**。

```md title="content/note.md"
---
title: 示例标题
draft: false
tags:
  - example-tag
---

你的内容的其余部分在这里。你可以在这里使用 **Markdown** :)
```

Quartz 原生支持的一些常见前置元数据字段:

- `title`: 页面标题。如果没有提供,Quartz 将使用文件名作为标题。
- `description`: 用于链接预览的页面描述。
- `permalink`: 页面的自定义 URL,即使文件路径更改也会保持不变。
- `aliases`: 此笔记的其他名称。这是一个字符串列表。
- `tags`: 此笔记的标签。
- `draft`: 是否发布页面。这是在 Quartz 中[[private pages|使页面私有]]的一种方式。
- `date`: 表示笔记发布日期的字符串。通常使用 `YYYY-MM-DD` 格式。

## 同步你的内容

当你的 Quartz 达到你满意的状态时,你可以将更改保存到 GitHub。
首先,确保你已经[[setting up your GitHub repository|设置好了 GitHub 仓库]],然后执行 `npx quartz sync`。

## 自定义

通过 [[Frontmatter]] 插件解析 `title`、`tags`、`aliases` 和 `cssclasses` 的前置元数据,通过 [[CreatedModifiedDate]] 插件处理 `date`,通过 [[Description]] 插件处理 `description`。有关自定义选项,请参阅插件页面。
