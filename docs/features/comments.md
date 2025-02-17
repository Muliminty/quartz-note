---
title: 评论
tags:
  - component
---

Quartz 还可以连接到各种提供商,使读者能够在你的网站上留下评论。

![[giscus-example.png]]

截至今天,开箱即用只支持 [Giscus](https://giscus.app/),但欢迎提交 PR 来支持其他提供商!

## 提供商

### Giscus

首先,确保你用于 Quartz 的 [[setting up your GitHub repository|GitHub]] 仓库满足以下要求:

1. **仓库是[公开的](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/setting-repository-visibility#making-a-repository-public)**,否则访问者将无法查看讨论。
2. **已安装 [giscus](https://github.com/apps/giscus) 应用**,否则访问者将无法评论和回应。
3. **已启用讨论功能**,方法是[为你的仓库启用它](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository)。

然后,使用 [Giscus 网站](https://giscus.app/#repository)来确定你的 `repoId` 和 `categoryId` 应该是什么。确保为讨论类别选择 `Announcements`。

![[giscus-repo.png]]

![[giscus-discussion.png]]

在输入你的仓库并选择讨论类别后,Giscus 将计算一些你需要提供给 Quartz 的 ID。你不需要手动添加脚本,因为 Quartz 会处理这部分,但你需要在下一步中使用这些值!

![[giscus-results.png]]

最后,在 `quartz.layout.ts` 中,编辑 `sharedPageComponents` 的 `afterBody` 字段,包含以下选项,但使用你从上面获得的值:

```ts title="quartz.layout.ts"
afterBody: [
  Component.Comments({
    provider: 'giscus',
    options: {
      // 来自 data-repo
      repo: 'jackyzha0/quartz',
      // 来自 data-repo-id
      repoId: 'MDEwOlJlcG9zaXRvcnkzODcyMTMyMDg',
      // 来自 data-category
      category: 'Announcements',
      // 来自 data-category-id
      categoryId: 'DIC_kwDOFxRnmM4B-Xg6',
    }
  }),
],
```

### 自定义

Quartz 还公开了一些其他的 Giscus 选项,你可以用与提供 `repo`、`repoId`、`category` 和 `categoryId` 相同的方式提供它们。

```ts
type Options = {
  provider: "giscus"
  options: {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string

    // 自定义主题的文件夹 URL
    // 默认为 'https://${cfg.baseUrl}/static/giscus'
    themeUrl?: string

    // 亮色主题 .css 文件的文件名
    // 默认为 'light'
    lightTheme?: string

    // 暗色主题 .css 文件的文件名
    // 默认为 'dark'
    darkTheme?: string

    // 如何映射页面 -> 讨论
    // 默认为 'url'
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname"

    // 使用严格标题匹配
    // 默认为 true
    strict?: boolean

    // 是否为主帖启用反应
    // 默认为 true
    reactionsEnabled?: boolean

    // 评论输入框相对于评论的位置
    // 默认为 'bottom'
    inputPosition?: "top" | "bottom"
  }
}
```

#### 自定义 CSS 主题

Quartz 支持 Giscus 的自定义主题。要使用自定义 CSS 主题,将 `.css` 文件放在 `quartz/static` 文件夹中并设置配置值。

例如,如果你有一个亮色主题 `light-theme.css`、一个暗色主题 `dark-theme.css`,并且你的 Quartz 站点托管在 `https://example.com/`:

```ts
afterBody: [
  Component.Comments({
    provider: 'giscus',
    options: {
      // 其他选项

      themeUrl: "https://example.com/static/giscus", // 对应 quartz/static/giscus/
      lightTheme: "light-theme", // 对应 quartz/static/giscus/ 中的 light-theme.css
      darkTheme: "dark-theme", // 对应 quartz/static/giscus/ 中的 dark-theme.css
    }
  }),
],
```

#### 有条件地显示评论

Quartz 可以根据前置元数据中的 `comments` 字段有条件地显示评论框。默认情况下,所有页面都会显示评论,要为特定页面禁用它,将 `comments` 设置为 `false`。

```
---
title: 这里禁用评论!
comments: false
---
```
