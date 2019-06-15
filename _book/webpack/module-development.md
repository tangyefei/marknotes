# 模块化编程


模块化的目的是组织大规模的程序开发，做法可以是定义一个类、一组相关的类、一个函数库、一些待执行的代码，只要以模块的形式编写代码，任何JavaScript代码段都可以当做一个模块。


## 最早的开发

前端开发的早期JavaScript文件都是被嵌到`<script>`标签中，并且共享一个全局变量window，问题是容易导致变量冲突，比如一个脚本的变量会修改了另外一个脚本在用到的全局变量。

## 使用立即执行函数

当Web项目的规模和复杂度变大以后，大家都意识到这种做法不是很好，围绕如何将JavaScript代码模块化，前端生出了一些实践
- 简单把函数放在一起，就当做一个模块。污染全局变量
- 把所有函数写在对象里面，当做一个模块。变量容易被篡改
- 使用立即执行函数（闭包）。
- 使用放大模式在已有模块上增加方法。无法处理好已有模块是否优先被加载好的问题。
- 宽放大模式。谁先加载好谁被设置为默认模块。
- 输入全局变量。在闭包内部可以通过全局变量来跟外部进行交互。


如下是立即执行方法用来规避作用域污染的例子：

```
void function() {
  window.mathlib = window.mathlib || {}
  window.mathlib.sum = sum

  function sum(...values) {
    return values.reduce((a, b) => a + b, 0)
  }
}()

mathlib.sum(1, 2, 3)
// <- 6
```





## RequireJS和AngularJS

但它没有解决依赖加载顺序的问题，开发人员还是需要手动决定哪个模块先加载。然后RequireJS和Angular中的模块注入等机制的出现，允许我们按照名字来声明不同的模块。比如我们在RequireJS中可以使用`define`和`require`来生命和引用模块，它们的优势不仅仅在于帮我们免去了操心相互关系的模块的麻烦，更大的意义在于让组件跟其他部分的关系更加明朗，有利于实现更大程度的模块化。

但是RequireJS的问题在于它是异步加载模块的，以为这产品发布时候表现会很差，在执行大多数代码之前你调用了非常多的网络请求，因此需要使用其他的工具来协助进行优化发布的过程。

另外在结束长长的依赖列表的准备，会执行你定义的回调函数，函数会发现回调函数依赖了不同的模块并且这些模块有着不同的调用，让执行这些模块变的复杂了。

AngularJS也收到这样问题的困扰，它采用了一些取巧的办法可以不用定义依赖的模块的数组，但是在压缩的时候会出现问题，进一步的需要用其他的方法来处理这样的问题，结果就是大家会更喜欢使用类似于 RequireJS的声明依赖的模块列表的方式。如下是Angular v1中模块定义的形式：

```
module.factory('calculator', function(mathlib) {
  // …
})
```

## CommonJS



因为后端可以直接加载本地文件，所以不存在文件加载太慢影响后端代码执行的问题，到了前端则收限与浏览器请求的速度，因此需要进行一步请求加载，这也是AMD（Asynchromous Module Define)的由来。它的用法跟CommonJS一样都是使用require()，不过它的第二函数是加载完模块后要执行代码，即 `require([module1, module2], function(){...})`


Node.js的一个创新是发明了CommonJS模块系统，因为能够直接读取文件系统，它更像是传统的模块加载的方式，每个文件是一个有自己作用域和上下文的模块，依赖的模块需要使用`require`来加载:

```
const mathlib = require('./mathlib')
```

它跟RequireJS和AngularJS一样可以使用目录来引用模块，但是差别在于可以不使用回调的样板方法并且依赖的模块参数列表不用再写，只需要将加载的模块指向都一个变量中，就可以在任何地方使用了。相对于RequireJS和AngularJS定义的比较开放，CommonJS中一个文件只能定义为一个模块，通过 `require` 来加载模块，通过 `module.exports` 来导出为模块。这样的结果是更有利于代码的分析，因为工具可以清楚地知道模块之间的树形结构。


## Borwserify

Borwserify的发明是为解决CommonJS在Node.js的server端和浏览器端的差异。通过使用它提供的命令，我们可以方便的直接指定目录进行模块的加载，另外加上 npm package registry的特性，逐渐让Browserify占据了模块加载的优势地位。

坦率地讲npm不仅仅限于CommonJS module 或者 JavaScript的包，但这是它的主要用途。有很多的包在你的项目目录中可以被使用，已经成为非常具备竞争性的优势。


## ES6, Babel, ESM

随着ES6在2015年成为标准，Babel编译器能够将ES6编译成ES5，革命性的变化到来了。ES6规范包含了语言自己的魔铠系统，通常成为ECMAScript Module（ESM）。

ESM借鉴了CommonJS和它的前辈的有点，提供了静态声明的API，与此同时它也提供基于promise的动态API的声明。ESM相对于CommonJS的一个优势是它鼓励使用静态的模块导入，这样就允许记性静态分析，这大大简化了编译和分析的过程。

在8.5.0版本的Node中，ESM的模块使用已经可以通过使用标记的方式被引入，常用的浏览器也支持用标记的方式来引入模块。


## Webpack

Webpack最终因为得益于更多的特性，能够管理全局的模块打包而在跟Browserify中胜出，比如在Babel/ES6的使用行，Webpack对使用 `import` `export`的支持度做的很好，并且也支持动态的 `import()`方式。同时它引入了code-spliting的机制，能将应用陈旭拆分为不同的捆绑包，从而提高了首次加载的性能。考虑到ESM是语言的native特性，相比较CJS而言，在将来的数年更能够成为一个模块管理的统治地位。


```
import mathlib from './mathlib'
import('./mathlib').then(mathlib => {
  // …
})
```




CommonJS的典型代表有require.js，使用它主要为了解决的问题是

- 1）实现js文件的异步加载，避免网页失去响应；
- 2）管理模块之间的依赖性，便于代码的编写和维护。


[Javascript模块化编程（三）：require.js的用法](www.ruanyifeng.com/blog/2012/11/require_js.html) 介绍了require.js的基础用法，如果我们需要加载除JavaScript之外的其他文件，需要使用它提供个一些列插件。



参考

- [《JavaScript权威指南》-第6版](https://book.douban.com/subject/10549733/) 
- [阮一峰 Javascript模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
- [阮一峰 Javascript模块化编程（二）：AMD规范](www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
- [阮一峰 Javascript模块化编程（三）：require.js的用法](www.ruanyifeng.com/blog/2012/11/require_js.html)
- [JavaScript模块简史](https://ponyfoo.com/articles/brief-history-of-modularity)