---
title: RSS 订阅
tags:
  - feature/emitter
---

Quartz 可以为你的站点生成 RSS 订阅。这允许读者使用 RSS 阅读器订阅你的内容更新。

## 自定义

RSS 订阅是 [[plugins/RSS|RSS]] 插件的功能。查看插件页面了解如何启用或禁用它。

默认情况下,RSS 订阅将使用你在 [[configuration|配置]]中设置的 `pageTitle` 作为订阅标题。它还会使用你的 `baseUrl` 来生成正确的链接。

要控制哪些页面出现在 RSS 订阅中,你可以:

1. 使用 `date` 前置元数据字段来指定页面的发布日期。没有日期的页面将不会出现在 RSS 订阅中。
2. 使用 `lastmod` 前置元数据字段来指定页面的最后修改日期。这将用于确定页面在 RSS 订阅中的顺序。
3. 使用 `draft: true` 前置元数据字段来将页面标记为草稿。草稿页面不会出现在 RSS 订阅中。 