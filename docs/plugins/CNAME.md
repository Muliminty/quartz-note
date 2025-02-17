---
title: CNAME
tags:
  - plugin/emitter
---

CNAME 插件允许你为你的 Quartz 站点指定一个自定义域名。这对于在 GitHub Pages 上托管你的站点特别有用。

## 配置

```ts
CNAME({
  // 你想要使用的域名
  name: "quartz.jzhao.xyz",
})
```

## 使用方法

这个插件会在你的站点的根目录下创建一个 `CNAME` 文件,其中包含你指定的域名。这个文件告诉 GitHub Pages 将你的站点重定向到你的自定义域名。

要使用自定义域名,你需要:

1. 在你的 DNS 提供商处添加一个 CNAME 记录,指向 `<username>.github.io`
2. 在你的 Quartz 配置中添加 CNAME 插件
3. 部署你的站点

更多信息请参见 [GitHub Pages 文档](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)。

## API

- 类别: Emitter
- 函数名称: `Plugin.CNAME()`
- 源代码: [`quartz/plugins/emitters/cname.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/cname.ts)
