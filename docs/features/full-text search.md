---
title: 全文搜索
tags:
  - component
---

Quartz 中的全文搜索由 [Flexsearch](https://github.com/nextapps-de/flexsearch) 提供支持。它足够快,可以在不到 10ms 的时间内为大小达到 50 万字的 Quartz 返回搜索结果。

可以通过点击搜索栏或按 `⌘`/`ctrl` + `K` 来打开它。每个查询会显示前 5 个搜索结果。匹配的子词会被高亮显示,并会摘录最相关的 30 个单词。点击搜索结果将导航到该页面。

要按标签搜索内容,你可以按 `⌘`/`ctrl` + `shift` + `K` 或在查询前加上 `#` (例如 `#components`)。

这个组件也支持键盘操作:Tab 和 Shift+Tab 将在搜索结果中向前和向后循环,Enter 将导航到高亮的结果(默认为第一个结果)。你也可以使用 `ArrowUp` 和 `ArrowDown` 来导航搜索结果。

> [!info]
> 搜索需要在[[configuration|配置]]中存在 `ContentIndex` 发射器插件。

### 索引行为

默认情况下,它会索引站点上的每个页面,并**移除 Markdown 语法**。这意味着例如链接 URL 不会被索引。

它正确地对中文、韩文和日文字符进行分词,并为标题、内容和标签构建单独的索引,将标题匹配的权重放在内容匹配之上。

## 自定义

- 移除搜索: 从 `quartz.layout.ts` 中删除所有 `Component.Search()` 的使用。
- 组件: `quartz/components/Search.tsx`
- 样式: `quartz/components/styles/search.scss`
- 脚本: `quartz/components/scripts/search.inline.ts`
  - 你可以编辑 `contextWindowWords`、`numSearchResults` 或 `numTagResults` 来满足你的需求
