---
title: 引用
tags:
  - plugin/transformer
---

引用插件允许你在你的 Quartz 站点中使用学术引用。它支持 BibTeX 和 CSL-JSON 格式。

## 配置

```ts
Citations({
  // 你的引用文件的路径
  path: "content/citations.bib",
})
```

## 使用方法

要使用引用，你需要：

1. 创建一个包含你的引用的 BibTeX 或 CSL-JSON 文件
2. 在你的 Quartz 配置中添加引用插件
3. 在你的内容中使用 `[@citationKey]` 语法引用文献

例如，如果你的 `citations.bib` 文件包含：

```bibtex
@article{smith2023,
  title={示例文章},
  author={Smith, John},
  year={2023}
}
```

你可以在你的内容中这样引用它：

```markdown
这是一个引用 [@smith2023]。
```

## API

- 类别: Transformer
- 函数名称: `Plugin.Citations()`
- 源代码: [`quartz/plugins/transformers/citations.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/citations.ts) 