---
title: Obsidian 兼容性
tags:
  - feature/transformer
---

Quartz 支持许多 Obsidian 特有的语法功能。

## 语法

### 内部链接

Quartz 支持 Obsidian 风格的内部链接。这些链接使用双方括号语法: `[[page]]`。

- 基本链接: `[[page]]`
- 带有自定义显示文本的链接: `[[page|自定义文本]]`
- 带有标题的链接: `[[page#section]]`
- 带有标题和自定义显示文本的链接: `[[page#section|自定义文本]]`

### 嵌入

Quartz 支持嵌入其他页面和媒体。这些嵌入使用双感叹号语法: `![[page]]`。

- 嵌入整个页面: `![[page]]`
- 嵌入页面的一部分: `![[page#section]]`
- 嵌入图片: `![[image.png]]`
- 嵌入 PDF: `![[file.pdf]]`

### 标注

Quartz 支持 Obsidian 风格的标注。更多信息请参见[[callouts|标注]]页面。

### 标签

Quartz 支持 Obsidian 风格的标签。标签以 `#` 开头,可以包含字母、数字和破折号。

- 基本标签: `#tag`
- 嵌套标签: `#tag/subtag`

## 自定义

Obsidian 语法解析是 [[ObsidianFlavoredMarkdown]] 插件的功能。查看插件页面了解如何启用或禁用它们。 