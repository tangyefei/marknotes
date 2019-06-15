#前端篇 - CSS预编译器Less的深入学习


- 为什么要使用预编译器
- 流行的预编译器之间的关系是怎么样的
- 如何使用Less预编译器
- 介绍一种编译工具的实现

## 为什么要使用预编译器

1. 语法不够强大，比如无法嵌套书写导致模块化开发中需要书写很多重复的选择器；
2. 没有变量和合理的样式复用机制，使得逻辑上相关的属性值必须以字面量的形式重复输出，导致难以维护。

所以这就决定了 CSS 预处理器的主要目标：提供CSS 缺失的样式层复用机制、减少冗余代码，提高样式代码的可维护性。

## 流行的预编译器之间的关系是怎么样的

Less、Sass 和 Stylus彼此独立，Scss是一种Sass的增强体。

## 如何使用Less预编译器


Less runs inside Node, in the browser and inside Rhino. There are also many 3rd party tools that allow you to compile your files and watch for changes.





参考来源：

[维基百科：关于Less的介绍](https://en.wikipedia.org/wiki/Less_(stylesheet_language\)) 

[Less官网](http://lesscss.org/) [Less语法特性](http://lesscss.org/features/)

[再谈 CSS 预处理器](http://efe.baidu.com/blog/revisiting-css-preprocessors/)

有用的链接：

[SublimeText3中使用Less插件](https://packagecontrol.io/packages/LESS)

