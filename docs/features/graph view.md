---
title: "图表视图"
tags:
  - component
---

Quartz 提供了一个图表视图功能,可以显示本地图表视图和全局图表视图。

- 本地图表视图显示链接到当前文件或从当前文件链接出去的文件。换句话说,它显示所有_最多_一跳距离的笔记。
- 全局图表视图可以通过点击本地图表视图右上角的图表图标来切换。它显示_所有_笔记以及它们之间如何相互连接。

默认情况下,节点半径与该文件的传入和传出内部链接总数成正比。

此外,类似于浏览器如何用不同颜色显示已访问的链接,图表视图也会用不同颜色显示你已访问过的节点。

> [!info]
> 图表视图需要在[[configuration|配置]]中存在 `ContentIndex` 发射器插件。

## 自定义

大多数配置可以通过向 `Component.Graph()` 传入选项来完成。

例如,这是默认配置的样子:

```typescript title="quartz.layout.ts"
Component.Graph({
  localGraph: {
    drag: true, // 是否允许平移视图
    zoom: true, // 是否允许放大和缩小
    depth: 1, // 显示多少跳的笔记
    scale: 1.1, // 默认视图比例
    repelForce: 0.5, // 节点之间应该互相排斥多少
    centerForce: 0.3, // 尝试使节点居中时使用多少力
    linkDistance: 30, // 链接默认应该有多长?
    fontSize: 0.6, // 节点标签应该是什么大小?
    opacityScale: 1, // 缩小时标签的淡出速度有多快?
    removeTags: [], // 从图表中移除哪些标签
    showTags: true, // 是否在图表中显示标签
    enableRadial: false, // 是否约束图表,类似于 Obsidian
  },
  globalGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 0.9,
    repelForce: 0.5,
    centerForce: 0.3,
    linkDistance: 30,
    fontSize: 0.6,
    opacityScale: 1,
    removeTags: [], // 从图表中移除哪些标签
    showTags: true, // 是否在图表中显示标签
    enableRadial: true, // 是否约束图表,类似于 Obsidian
  },
})
```

当传入你自己的选项时,如果你想保持某个字段的默认值,可以省略任何或所有这些字段。

想要更多自定义?

- 移除图表视图: 从 `quartz.layout.ts` 中删除所有 `Component.Graph()` 的使用。
- 组件: `quartz/components/Graph.tsx`
- 样式: `quartz/components/styles/graph.scss`
- 脚本: `quartz/components/scripts/graph.inline.ts`
