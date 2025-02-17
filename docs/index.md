---
title: 欢迎使用 Quartz 4
---

Quartz 是一个快速、功能齐全的静态网站生成器，它可以将 Markdown 内容转换为完整的网站。成千上万的学生、开发者和教师已经在 [[showcase|使用 Quartz]] 来发布个人笔记、网站和 [数字花园](https://jzhao.xyz/posts/networked-thought) 到网络上。

## 🪴 快速开始

Quartz 需要 **至少 [Node](https://nodejs.org/) v20** 和 `npm` v9.3.1 才能正常运行。在继续之前，请确保你的计算机已安装这些版本。

然后，在你的终端中，逐行输入以下命令：

```shell
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm i
npx quartz create
```

这将引导你初始化 Quartz 并添加内容。完成后，你可以了解如何：

1. 在 Quartz 中 [[authoring content|撰写内容]]
2. [[configuration|配置]] Quartz 的行为
3. 更改 Quartz 的 [[layout|布局]]
4. [[build|构建和预览]] Quartz
5. 通过 [[setting up your GitHub repository|GitHub]] 同步你的更改
6. [[hosting|托管]] Quartz 到线上

如果你更喜欢视频教程，可以观看 Nicole van der Hoeven 的
[Quartz 设置视频指南](https://www.youtube.com/watch?v=6s6DT1yN4dw&t=227s)。

## 🔧 功能

- [[Obsidian 兼容性]]、[[全文搜索]]、[[图谱视图]]、笔记嵌入、[[维基链接]]、[[反向链接]]、[[features/Latex|Latex]]、[[代码高亮]]、[[弹出预览]]、[[Docker 支持]]、[[i18n|国际化]]、[[评论]]以及[更多功能](./features)，开箱即用  
- 配置和内容的热重载  
- 简单的 JSX 布局和 [[creating components|页面组件]]  
- [[SPA Routing|超快的页面加载速度]] 和极小的打包体积  
- 通过 [[making plugins|插件]] 实现完全可自定义的解析、过滤和页面生成  

想要查看完整的功能列表，请访问 [功能页面](/features)。你还可以在 [[philosophy|理念]] 页面了解这些功能背后的设计理念，并在 [[architecture|架构]] 页面查看技术概览。

### 🚧 故障排除 + 更新

在使用 Quartz 时遇到问题？请尝试使用搜索功能查找你的问题。如果你还没有这样做，可以 [[upgrading|升级]] 到 Quartz 的最新版本，看看是否能解决问题。

如果问题仍然存在，你可以在 [GitHub 提交问题](https://github.com/jackyzha0/quartz/issues)，如果你认为发现了一个 Bug，或者在我们的 [Discord 社区](https://discord.gg/cRFFHYye7t) 请求帮助。