// import { PageLayout, SharedLayout } from "./quartz/cfg"
// import * as Component from "./quartz/components"

// // components shared across all pages
// export const sharedPageComponents: SharedLayout = {
//   head: Component.Head(),
//   header: [],
//   afterBody: [],
//   footer: Component.Footer({
//     links: {
//       GitHub: "https://github.com/Muliminty",
//       // "Discord Community": "https://discord.gg/cRFFHYye7t",
//     },
//   }),
// }

// // components for pages that display a single page (e.g. a single note)
// export const defaultContentPageLayout: PageLayout = {
//   beforeBody: [
//     Component.Breadcrumbs(),
//     Component.ArticleTitle(),
//     Component.ContentMeta(),
//     Component.TagList(),
//   ],
//   left: [
//     Component.PageTitle(),
//     Component.MobileOnly(Component.Spacer()),
//     Component.Search(),
//     Component.Darkmode(),
//     Component.Explorer(),
//   ],
//   right: [
//     Component.Graph(),
//     Component.DesktopOnly(Component.TableOfContents()),
//     Component.Backlinks(),
//   ],
// }

// // components for pages that display lists of pages  (e.g. tags or folders)
// export const defaultListPageLayout: PageLayout = {
//   beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
//   left: [
//     Component.PageTitle(),
//     Component.MobileOnly(Component.Spacer()),
//     Component.Search(),
//     Component.Darkmode(),
//     Component.Explorer(),
//   ],
//   right: [],
// }


// 从 quarts/cfg 模块导入 PageLayout 和 SharedLayout 类型，
// 以及从 quarts/components 模块导入各个组件
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 定义一个共享组件的布局，这些组件会在所有页面中共享使用
export const sharedPageComponents: SharedLayout = {
  // 页头组件（通常用于页面的 <head> 部分）
  head: Component.Head(),

  // 页头区域，当前为空数组，表示没有额外的内容
  header: [],

  // body 后面的区域，当前为空数组，表示没有额外的内容
  afterBody: [],

  // 页脚组件，包含了 GitHub 链接，注释掉了 Discord 社区链接
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/Muliminty", // GitHub 链接
      // "Discord Community": "https://discord.gg/cRFFHYye7t", // Discord 社区链接（暂时注释掉）
    },
  }),
}

// 定义展示单一页面内容的布局（例如：单个笔记的页面）
export const defaultContentPageLayout: PageLayout = {
  // 页面主体部分之前的组件，例如面包屑导航、文章标题、文章元数据、标签列表等
  beforeBody: [
    Component.Breadcrumbs(),   // 面包屑导航
    Component.ArticleTitle(),  // 文章标题
    Component.ContentMeta(),   // 文章元数据（如作者、日期等）
    Component.TagList(),       // 文章标签列表
  ],

  // 左侧区域，通常是侧边栏，包含一些常见的导航组件
  left: [
    // Component.PageTitle(),             // 页面标题
    // Component.MobileOnly(Component.Spacer()), // 仅在移动端显示的间隔组件
    // Component.Search(),                // 搜索框
    // Component.Darkmode(),              // 黑暗模式切换
    Component.Explorer(),              // 页面资源或文件的浏览器组件
  ],

  // 右侧区域，通常显示相关内容或推荐内容
  right: [
    // Component.Graph(),                 // 显示图表的组件
    Component.DesktopOnly(Component.TableOfContents()), // 仅桌面端显示的目录（文章目录）
    // Component.Backlinks(),             // 反向链接组件
  ],
}

// 定义展示页面列表的布局（例如：标签页面或文件夹页面）
export const defaultListPageLayout: PageLayout = {
  // 页面主体部分之前的组件，例如面包屑导航、文章标题、文章元数据等
  beforeBody: [
    Component.Breadcrumbs(),   // 面包屑导航
    Component.ArticleTitle(),  // 文章标题
    Component.ContentMeta(),   // 文章元数据
  ],

  // 左侧区域，包含常见的导航组件
  left: [
    Component.PageTitle(),             // 页面标题
    Component.MobileOnly(Component.Spacer()), // 仅在移动端显示的间隔组件
    Component.Search(),                // 搜索框
    Component.Darkmode(),              // 黑暗模式切换
    Component.Explorer(),              // 页面资源或文件的浏览器组件
  ],

  // 右侧区域，当前为空数组，表示右侧区域没有额外的内容
  right: [],
}
