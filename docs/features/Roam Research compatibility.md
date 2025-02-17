---
title: Roam Research 兼容性
tags:
  - feature/transformer
---

[Roam Research](https://roamresearch.com) 是一个以独特和互联的方式组织你的知识图谱的笔记工具。

Quartz 通过 [[RoamFlavoredMarkdown]] 插件支持将 Roam Research 的特殊 Markdown 语法(如 `{{[[components]]}}` 和其他格式)转换为普通 Markdown。

```typescript title="quartz.config.ts"
plugins: {
  transformers: [
    // ...
    Plugin.RoamFlavoredMarkdown(),
    Plugin.ObsidianFlavoredMarkdown(),
    // ...
  ],
},
```

> [!warning]
> 如上所示,`Plugin.RoamFlavoredMarkdown()` 在 `quartz.config.ts` 中的位置非常重要。它必须位于 `Plugin.ObsidianFlavoredMarkdown()` 之前。

## 语法

### 块引用

Quartz 支持 Roam Research 风格的块引用。这些引用使用 `((block-id))` 语法。

例如:

```markdown
这是一个块引用 ((block-id))
```

### 块别名

Quartz 也支持块别名。这些别名使用 `[alias]((block-id))` 语法。

例如:

```markdown
这是一个带别名的块引用 [自定义文本]((block-id))
```

## 自定义

Roam Research 语法解析是 [[RoamFlavoredMarkdown]] 插件的功能。查看插件页面了解如何启用或禁用它们。
