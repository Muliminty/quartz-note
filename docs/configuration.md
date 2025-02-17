---
title: 配置
---

Quartz 旨在具有极强的可配置性,即使你不懂任何编程。大多数配置只需编辑 `quartz.config.ts` 或在 `quartz.layout.ts` 中更改[[layout|布局]]即可完成。

> [!tip]
> 如果你使用具有 TypeScript 语言支持的文本编辑器(如 VSCode)来编辑 Quartz 配置,当你在配置中出错时它会警告你,帮助你避免配置错误!

Quartz 的配置可以分为两个主要部分:

```ts title="quartz.config.ts"
const config: QuartzConfig = {
  configuration: { ... },
  plugins: { ... },
}
```

## 通用配置

这部分配置涉及可能影响整个站点的任何内容。以下是所有可配置内容的列表:

- `pageTitle`: 站点标题。这也用于生成你网站的[[RSS Feed|RSS 订阅]]。
- `pageTitleSuffix`: 添加到页面标题末尾的字符串。这只适用于浏览器标签标题,不适用于页面顶部显示的标题。
- `enableSPA`: 是否在你的站点上启用[[SPA Routing|单页应用路由]]。
- `enablePopovers`: 是否在你的站点上启用[[popover previews|弹出预览]]。
- `analytics`: 在你的站点上使用什么分析工具。值可以是
  - `null`: 不使用分析;
  - `{ provider: 'google', tagId: '<your-google-tag>' }`: 使用 Google Analytics;
  - `{ provider: 'plausible' }` (托管)或 `{ provider: 'plausible', host: '<your-plausible-host>' }` (自托管): 使用 [Plausible](https://plausible.io/);
  - `{ provider: 'umami', host: '<your-umami-host>', websiteId: '<your-umami-website-id>' }`: 使用 [Umami](https://umami.is/);
  - `{ provider: 'goatcounter', websiteId: 'my-goatcounter-id' }` (托管)或 `{ provider: 'goatcounter', websiteId: 'my-goatcounter-id', host: 'my-goatcounter-domain.com', scriptSrc: 'https://my-url.to/counter.js' }` (自托管) 使用 [GoatCounter](https://goatcounter.com);
  - `{ provider: 'posthog', apiKey: '<your-posthog-project-apiKey>', host: '<your-posthog-host>' }`: 使用 [Posthog](https://posthog.com/);
  - `{ provider: 'tinylytics', siteId: '<your-site-id>' }`: 使用 [Tinylytics](https://tinylytics.app/);
  - `{ provider: 'cabin' }` 或 `{ provider: 'cabin', host: 'https://cabin.example.com' }` (自定义域名): 使用 [Cabin](https://withcabin.com);
  - `{provider: 'clarity', projectId: '<your-clarity-id-code' }`: 使用 [Microsoft clarity](https://clarity.microsoft.com/)。项目 ID 可以在概览页面顶部找到。
- `locale`: 用于[[i18n|国际化]]和日期格式化
- `baseUrl`: 这用于需要知道你的站点"主页"所在位置的绝对 URL 的站点地图和 RSS 订阅。这通常是你的站点的部署 URL(例如,这个站点是 `quartz.jzhao.xyz`)。不要包含协议(即 `https://`)或任何前导或尾随斜杠。
  - 如果你在没有自定义域名的情况下在 GitHub pages 上[[hosting|托管]],这还应该包含子路径。例如,如果我的仓库是 `jackyzha0/quartz`,GitHub pages 会部署到 `https://jackyzha0.github.io/quartz`,那么 `baseUrl` 应该是 `jackyzha0.github.io/quartz`。
  - 请注意,Quartz 4 将尽可能避免使用这个,并在可能的情况下使用相对 URL,以确保你的站点无论最终部署在哪里都能正常工作。
- `ignorePatterns`: 当在 `content` 文件夹中查找文件时,Quartz 应该忽略且不搜索的 [glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) 模式列表。更多详情请参见[[private pages|私有页面]]。
- `defaultDateType`: 是否使用创建、修改或发布作为在页面和页面列表上显示的默认日期。
- `theme`: 配置站点的外观。
  - `cdnCaching`: 如果为 `true`(默认),使用 Google CDN 缓存字体。这通常会更快。如果你想让 Quartz 下载字体以实现自包含,禁用(`false`)这个。
  - `typography`: 使用什么字体。这里可以使用 [Google Fonts](https://fonts.google.com/) 上的任何字体。
    - `header`: 用于标题的字体
    - `code`: 用于内联和块引用的字体。
    - `body`: 用于其他所有内容的字体
  - `colors`: 控制站点的主题。
    - `light`: 页面背景
    - `lightgray`: 边框
    - `gray`: 图表链接,较重的边框
    - `darkgray`: 正文文本
    - `dark`: 标题文本和图标
    - `secondary`: 链接颜色,当前[[graph view|图表]]节点
    - `tertiary`: 悬停状态和已访问的[[graph view|图表]]节点
    - `highlight`: 内部链接背景,高亮文本,[[syntax highlighting|高亮代码行]]

## 插件

你可以把 Quartz 插件想象成一系列对内容的转换。

![[quartz transform pipeline.png]]

```ts title="quartz.config.ts"
plugins: {
  transformers: [...],
  filters: [...],
  emitters: [...],
}
```

- [[tags/plugin/transformer|转换器]]对内容进行**映射**(例如解析前置元数据,生成描述)
- [[tags/plugin/filter|过滤器]]**过滤**内容(例如过滤掉草稿)
- [[tags/plugin/emitter|发射器]]对内容进行**归约**(例如创建 RSS 订阅或列出所有具有特定标签的文件的页面)

你可以通过在 `transformers`、`filters` 和 `emitters` 字段中添加、删除和重新排序插件来自定义 Quartz 的行为。

> [!note]
> 每个节点都会按_顺序_被每个转换器修改。一些转换器对位置敏感,所以你可能需要特别注意它们是否需要在某些其他插件之前或之后。

你应该注意将插件添加到与其插件类型对应的正确条目中。例如,要添加 [[ExplicitPublish]] 插件(一个[[tags/plugin/filter|过滤器]]),你需要添加以下行:

```ts title="quartz.config.ts"
filters: [
  ...
  Plugin.ExplicitPublish(),
  ...
],
```

要删除插件,你应该删除 `quartz.config.ts` 中该插件的所有出现。

要进一步自定义插件,一些插件可能还有自己的配置设置,你可以传入这些设置。如果你不传入配置,插件将使用其默认设置。

例如,[[plugins/Latex|Latex]] 插件允许你传入一个指定 `renderEngine` 的字段,以在 Katex 和 MathJax 之间选择。

```ts title="quartz.config.ts"
transformers: [
  Plugin.FrontMatter(), // 使用默认选项
  Plugin.Latex({ renderEngine: "katex" }), // 设置一些自定义选项
]
```

一些插件默认包含在 [`quartz.config.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz.config.ts) 中,但还有更多可用的。

你可以在[[tags/plugin|这里]]看到所有插件及其配置选项的列表。

如果你想制作自己的插件,请参阅[[making plugins|制作自定义插件]]指南。
