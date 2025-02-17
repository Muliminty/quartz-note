---
title: 链接预览
tags:
  - component
---

Quartz 支持在悬停链接时显示丰富的预览。这些预览包括页面的标题、描述和反向链接。

![[preview.png]]

## 自定义

大多数配置可以通过向 `Component.Popover()` 传入选项来完成。

例如,这是默认配置的样子:

```typescript title="quartz.layout.ts"
Component.Popover({
  // 在预览中显示多少个反向链接
  maxBacklinks: 8,

  // 在预览中显示多少个前向链接
  maxForwardLinks: 8,

  // 在预览中显示多少个标签
  maxTags: 8,

  // 在预览中显示多少个文件树条目
  maxFileTree: 8,

  // 在预览中显示多少个嵌入内容
  maxEmbed: 1,
})
```

当传入你自己的选项时,如果你想保持某个字段的默认值,可以省略任何或所有这些字段。

想要更多自定义?

- 移除预览: 从 `quartz.layout.ts` 中删除所有 `Component.Popover()` 的使用。
- 组件: `quartz/components/Popover.tsx`
- 样式: `quartz/components/styles/popover.scss`
- 脚本: `quartz/components/scripts/popover.inline.ts` 