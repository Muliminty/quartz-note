---
title: "面包屑导航"
tags:
  - component
---

面包屑导航提供了一种使用其父文件夹列表来导航站点页面层次结构的方式。

默认情况下,页面最顶部的元素是面包屑导航栏(也可以在本页顶部看到!)。

## 自定义

大多数配置可以通过向 `Component.Breadcrumbs()` 传入选项来完成。

例如,这是默认配置的样子:

```typescript title="quartz.layout.ts"
Component.Breadcrumbs({
  spacerSymbol: "❯", // 面包屑之间的符号
  rootName: "Home", // 第一个/根元素的名称
  resolveFrontmatterTitle: true, // 是否通过前置元数据标题解析文件夹名称
  hideOnRoot: true, // 是否在根 `index.md` 页面隐藏面包屑
  showCurrentPage: true, // 是否在面包屑中显示当前页面
})
```

当传入你自己的选项时,如果你想保持某个字段的默认值,可以省略任何或所有这些字段。

你也可以通过调整[[layout|布局]](上下移动 `Component.Breadcrumbs()`)来调整面包屑的显示位置。

想要更多自定义?

- 移除面包屑: 从 `quartz.layout.ts` 中删除所有 `Component.Breadcrumbs()` 的使用。
- 组件: `quartz/components/Breadcrumbs.tsx`
- 样式: `quartz/components/styles/breadcrumbs.scss`
- 脚本: 内联于 `quartz/components/Breadcrumbs.tsx`
