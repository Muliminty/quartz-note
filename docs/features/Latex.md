---
title: LaTeX
tags:
  - feature/transformer
---

Quartz 默认使用 [Katex](https://katex.org/) 在构建时排版内联和块数学表达式。

## 语法

### 块数学

块数学可以通过用 `$$` 分隔数学表达式来渲染。

```
$$
f(x) = \int_{-\infty}^\infty
    f\hat(\xi),e^{2 \pi i \xi x}
    \,d\xi
$$
```

$$
f(x) = \int_{-\infty}^\infty
    f\hat(\xi),e^{2 \pi i \xi x}
    \,d\xi
$$

$$
\begin{aligned}
a &= b + c \\ &= e + f \\
\end{aligned}
$$

$$
\begin{bmatrix}
1 & 2 & 3 \\
a & b & c
\end{bmatrix}
$$

$$
\begin{array}{rll}
E \psi &= H\psi & \text{展开哈密顿算子} \\
&= -\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2} \psi + \frac{1}{2}m\omega x^2 \psi & \text{使用假设 $\psi(x) = e^{-kx^2}f(x)$,希望消除 $x^2$ 项} \\
&= -\frac{\hbar^2}{2m} [4k^2x^2f(x)+2(-2kx)f'(x) + f''(x)]e^{-kx^2} + \frac{1}{2}m\omega x^2 f(x)e^{-kx^2} &\text{从两边移除 $e^{-kx^2}$ 项} \\
& \Downarrow \\
Ef(x) &= -\frac{\hbar^2}{2m} [4k^2x^2f(x)-4kxf'(x) + f''(x)] + \frac{1}{2}m\omega x^2 f(x) & \text{选择 $k=\frac{im}{2}\sqrt{\frac{\omega}{\hbar}}$ 来消除 $x^2$ 项,通过 $-\frac{\hbar^2}{2m}4k^2=\frac{1}{2}m \omega$} \\
&= -\frac{\hbar^2}{2m} [-4kxf'(x) + f''(x)] \\
\end{array}
$$

> [!warn]
> 由于[底层解析库](https://github.com/remarkjs/remark-math)的限制,Quartz 中的块数学需要 `$$` 分隔符在新行上,如上所示。

### 内联数学

类似地,内联数学可以通过用单个 `$` 分隔数学表达式来渲染。例如,`$e^{i\pi} = -1$` 生成 $e^{i\pi} = -1$

### 转义符号

有时在一个段落中可能会有多个 `$`,这可能会意外触发 MathJax/Katex。

要解决这个问题,你可以通过使用 `\$` 来转义美元符号。

例如:

- 错误: `我有 $1 而你有 $2` 生成 我有 $1 而你有 $2
- 正确: `我有 \$1 而你有 \$2` 生成 我有 \$1 而你有 \$2

### 使用 mhchem

在 `quartz/plugins/transformers/latex.ts` 顶部添加以下导入(在所有其他导入之前):

```ts title="quartz/plugins/transformers/latex.ts"
import "katex/contrib/mhchem"
```

## 自定义

LaTeX 解析是 [[plugins/Latex|Latex]] 插件的功能。有关自定义选项,请参阅插件页面。
