---
title: "构建你的 Quartz"
---

一旦你已经[[index#🪴 开始使用|初始化]]了 Quartz,让我们看看它在本地是什么样子:

```bash
npx quartz build --serve
```

这将启动一个本地 Web 服务器来在你的计算机上运行 Quartz。打开网页浏览器并访问 `http://localhost:8080/` 来查看它。

> [!hint] 标志和选项
> 要查看完整的帮助选项,你可以运行 `npx quartz build --help`。
>
> 这些选项大多数都有合理的默认值,但如果你有自定义设置,可以覆盖它们:
>
> - `-d` 或 `--directory`: 内容文件夹。这通常就是 `content`
> - `-v` 或 `--verbose`: 打印出额外的日志信息
> - `-o` 或 `--output`: 输出文件夹。这通常就是 `public`
> - `--serve`: 运行一个本地热重载服务器来预览你的 Quartz
> - `--port`: 运行本地预览服务器的端口
> - `--concurrency`: 用于解析笔记的线程数

> [!warning] 不要用于生产环境
> 服务模式仅用于本地预览。
> 对于生产工作负载,请参阅[[hosting|托管]]页面。
