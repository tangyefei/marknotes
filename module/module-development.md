# 模块化编程

模块化的目的是组织大规模的程序开发，做法可以是定义一个类、一组相关的类、一个函数库、一些待执行的代码，只要以模块的形式编写代码，任何JavaScript代码段都可以当做一个模块。

很多JavaScript库和框架都包含了一些模块协同，用以声明和加载模块；CommonJS服务器端JavaScript规范创建了一个模块规范使用require函数。它们通常用来处理模块加载和依赖性管理。ECMAScript 6中提供了import export的语法进行模块的管理。


围绕如何将JavaScript代码模块化，前端生出了一些实践
- 简单把函数放在一起，就当做一个模块。污染全局变量
- 把所有函数写在对象里面，当做一个模块。变量容易被篡改
- 使用立即执行函数（闭包）。
- 使用放大模式在已有模块上增加方法。无法处理好已有模块是否优先被加载好的问题。
- 宽放大模式。谁先加载好谁被设置为默认模块。
- 输入全局变量。在闭包内部可以通过全局变量来跟外部进行交互。


node.js的兴起诞生了CommonJS规范，因为后端可以直接加载本地文件，所以不存在文件加载太慢影响后端代码执行的问题，到了前端则收限与浏览器请求的速度，因此需要进行一步请求加载，这也是AMD（Asynchromous Module Define)的由来。它的用法跟CommonJS一样都是使用require()，不过它的第二函数是加载完模块后要执行代码，即 `require([module1, module2], function(){...})`

CommonJS的典型代表有require.js，使用它主要为了解决的问题是

- 1）实现js文件的异步加载，避免网页失去响应；
- 2）管理模块之间的依赖性，便于代码的编写和维护。



[Javascript模块化编程（三）：require.js的用法](www.ruanyifeng.com/blog/2012/11/require_js.html) 介绍了require.js的基础用法，如果我们需要加载除JavaScript之外的其他文件，需要使用它提供个一些列插件。



参考

- [JavaScript权威指南-第6版](https://book.douban.com/subject/10549733/) 
- [Javascript模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/ javascript_module.html)
- [Javascript模块化编程（二）：AMD规范](www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
- [Javascript模块化编程（三）：require.js的用法](www.ruanyifeng.com/blog/2012/11/require_js.html)