---
title: "深色模式"
tags:
  - component
---

Quartz 开箱即用地支持深色模式,它会遵循用户的主题偏好。未来手动切换深色模式开关的操作会保存在浏览器的本地存储中,这样就可以在将来的页面加载中保持这个设置。

## 自定义

- 移除深色模式: 从 `quartz.layout.ts` 中删除所有 `Component.Darkmode()` 的使用。
- 组件: `quartz/components/Darkmode.tsx`
- 样式: `quartz/components/styles/darkmode.scss`
- 脚本: `quartz/components/scripts/darkmode.inline.ts`

你也可以监听 `themechange` 事件来执行任何自定义逻辑,当主题改变时。

```js
document.addEventListener("themechange", (e) => {
  console.log("主题改变为 " + e.detail.theme) // 可能是 "light" 或 "dark"
  // 你的逻辑在这里
})
```
