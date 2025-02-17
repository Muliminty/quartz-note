---
title: 单页应用路由
tags:
  - feature/transformer
---

Quartz 支持单页应用(SPA)路由。这意味着在页面之间导航时不会重新加载整个页面,而是只更新内容。这可以提供更流畅的浏览体验。

## 自定义

SPA 路由可以在 [[configuration|配置]]中通过 `enableSPA` 选项来启用或禁用。

```ts title="quartz.config.ts"
{
  configuration: {
    enableSPA: true, // 启用 SPA 路由
    // ...
  }
}
```

> [!warning]
> 如果你的站点依赖于每次页面加载时重新运行的脚本,你可能需要禁用 SPA 路由。
