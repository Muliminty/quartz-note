---
title: 目录
tags:
  - component
  - feature/transformer
---

Quartz 可以为每个页面生成目录。目录会自动从页面内容中提取标题。

你可以通过在页面的前置元数据中添加 `enableToc: false` 来隐藏该页面的目录。

默认情况下,目录会显示从 H1 (`# 标题`) 到 H3 (`### 标题`) 的所有标题,并且只有在页面上有多个标题时才会显示。

## 自定义

大多数配置可以通过向 `Component.TableOfContents()` 传入选项来完成。

例如,这是默认配置的样子:

```typescript title="quartz.layout.ts"
Component.TableOfContents({
  // 目录组件的标题
  title: "目录",

  // 折叠目录的默认状态
  collapseByDefault: false,

  // 是否显示目录标题
  showTitle: true,
})
```

当传入你自己的选项时,如果你想保持某个字段的默认值,可以省略任何或所有这些字段。

想要更多自定义?

- 移除目录: 从 `quartz.layout.ts` 中删除所有 `Component.TableOfContents()` 的使用。
- 组件: `quartz/components/TableOfContents.tsx`
- 样式: `quartz/components/styles/toc.scss`
- 脚本: `quartz/components/scripts/toc.inline.ts`

目录是 [[TableOfContents]] 插件的功能。查看插件页面了解更多自定义选项。

它还需要 `TableOfContents` 组件,默认显示在右侧边栏。你可以通过自定义[[layout|布局]]来更改这一点。TOC 组件可以通过 `layout` 参数进行配置,可以是 `modern`(默认)或 `legacy`。
