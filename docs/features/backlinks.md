---
title: 反向链接
tags:
  - component
---

笔记的反向链接是从其他笔记指向该笔记的链接。如果你启用了[[popover previews|弹出预览]]功能,反向链接面板中的链接也会显示丰富的预览。

## 自定义

- 移除反向链接: 从 `quartz.layout.ts` 中删除所有 `Component.Backlinks()` 的使用。
- 空时隐藏: 如果给定页面不包含任何反向链接则隐藏 `Backlinks`(默认为 `true`)。要禁用此功能,使用 `Component.Backlinks({ hideWhenEmpty: false })`。
- 组件: `quartz/components/Backlinks.tsx`
- 样式: `quartz/components/styles/backlinks.scss`
- 脚本: `quartz/components/scripts/search.inline.ts`
