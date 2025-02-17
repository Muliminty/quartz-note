import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 配置
 *
 * 此配置文件用于设置 Quartz 静态网站生成器。
 * 更多详细信息，请访问：https://quartz.jzhao.xyz/configuration
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🪴 Quartz 4.0", // 网站的主标题
    pageTitleSuffix: "", // 页面标题的后缀，如果有的话
    enableSPA: true, // 启用单页应用模式
    enablePopovers: true, // 启用弹出框以显示附加信息
    analytics: {
      provider: "plausible", // 用于跟踪网站使用情况的分析提供商
    },
    locale: "zh-CN", // 网站的语言环境设置
    baseUrl: "quartz.jzhao.xyz", // 网站的基本 URL
    ignorePatterns: ["private", "templates", ".obsidian"], // 在网站生成过程中忽略的模式
    defaultDateType: "created", // 默认的日期类型，用于排序或显示
    generateSocialImages: false, // 是否生成社交媒体图片
    theme: {
      fontOrigin: "googleFonts", // 主题中使用的字体来源
      cdnCaching: true, // 启用 CDN 缓存以加快加载速度
      typography: {
        header: "Schibsted Grotesk", // 标题的字体
        body: "Source Sans Pro", // 正文的字体
        code: "IBM Plex Mono", // 代码块的字体
      },
      colors: {
        lightMode: {
          light: "#faf8f8", // 浅色模式的背景色
          lightgray: "#e5e5e5", // 浅色模式的浅灰色
          gray: "#b8b8b8", // 浅色模式的灰色
          darkgray: "#4e4e4e", // 浅色模式的深灰色
          dark: "#2b2b2b", // 浅色模式的深色
          secondary: "#284b63", // 浅色模式的次要颜色
          tertiary: "#84a59d", // 浅色模式的第三颜色
          highlight: "rgba(143, 159, 169, 0.15)", // 浅色模式的高亮颜色
          textHighlight: "#fff23688", // 浅色模式的文本高亮颜色
        },
        darkMode: {
          light: "#161618", // 深色模式的背景色
          lightgray: "#393639", // 深色模式的浅灰色
          gray: "#646464", // 深色模式的灰色
          darkgray: "#d4d4d4", // 深色模式的深灰色
          dark: "#ebebec", // 深色模式的深色
          secondary: "#7b97aa", // 深色模式的次要颜色
          tertiary: "#84a59d", // 深色模式的第三颜色
          highlight: "rgba(143, 159, 169, 0.15)", // 深色模式的高亮颜色
          textHighlight: "#b3aa0288", // 深色模式的文本高亮颜色
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(), // 处理 markdown 文件中的前置数据
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"], // 确定创建/修改日期的优先级
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light", // 浅色模式的语法高亮主题
          dark: "github-dark", // 深色模式的语法高亮主题
        },
        keepBackground: false, // 是否保留代码块的背景色
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }), // 支持 Obsidian 风格的 markdown
      Plugin.GitHubFlavoredMarkdown(), // 支持 GitHub 风格的 markdown
      Plugin.TableOfContents(), // 自动生成目录
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }), // 使用最短路径解析 markdown 链接
      Plugin.Description(), // 生成页面描述
      Plugin.Latex({ renderEngine: "katex" }), // 支持使用 KaTeX 渲染 LaTeX
    ],
    filters: [Plugin.RemoveDrafts()], // 过滤掉草稿内容
    emitters: [
      Plugin.AliasRedirects(), // 为别名 URL 发出重定向
      Plugin.ComponentResources(), // 发出组件资源
      Plugin.ContentPage(), // 发出内容页面
      Plugin.FolderPage(), // 发出文件夹页面
      Plugin.TagPage(), // 发出标签页面
      Plugin.ContentIndex({
        enableSiteMap: true, // 启用站点地图生成
        enableRSS: true, // 启用 RSS 订阅生成
      }),
      Plugin.Assets(), // 发出静态资源
      Plugin.Static(), // 发出静态文件
      Plugin.NotFoundPage(), // 发出 404 未找到页面
    ],
  },
}

export default config
