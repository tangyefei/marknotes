- 模块化的目的
- Web现状
- CommonJS
- AMD
- 模块定义
- 模块命名
- Sugar
- CommonJS兼容性
- AMD使用情况
- 你能做什么

This page talks about the design forces and use of the Asynchronous Module Definition (AMD) API for JavaScript modules, the module API supported by RequireJS. There is a different page that talks about general approach to modules on the web.

该文会讨论使用 Asynchronous Module Definition (AMD) API 来做JavaScript模块化的动因，AMD API得到了RequireJS的支持。在另外一个页面你可以参考大这篇文章[Why Web Module?](http://www.requirejs.cn/docs/why.html)




### 模块化的目的

- 模块化的定义

  实现如何封装（encapsulate）一段代码成有用单元，并且能够注册功能、从中导出功能/值。

- 模块化的目的

  依赖引用。能够引用到其他的代码单元。
  
### Web现状

```
(function () {
    var $ = this.jQuery;

    this.myExample = function () {};
}());
```  

看如今的的JavaScript代码片段是如何定义的：
- 通过马上执行的工厂方法
- 依赖的引用是通过在HTML中书写的script标签来给全局变量上挂载上功能
- 依赖关系通常不能够十分清晰的被陈述：开发者需要知道依赖关系。比如包含了Backbone的文件不能在JQuery标签之前
- 发布时需要额外的工具来将代码片段集成成一个

这对于大项目来说是尤其困难的，尤其脚本一开始就有很多依赖（相互之间交叠和嵌套）。手写脚本也不是十分可靠，并且留下了按按需加载的问题。


### COMMONJS

```
var $ = require('jquery');
exports.myExample = function () {};

```


最初的 COMMONJS（CJS）list中的参与者决定弄出一套适用于如今的JavaScript模块的构建规则，但又不要太过于依赖所在的浏览器JS编译环境。当时的目的是使用一些权宜之计借此希望影响浏览器的开发商们来构建一些让他们的模块构建能更好地工作的解决方案。这个权宜之计的原则是：

- 不要为了达到使功能可用的目的而用服务器来处理CJS模块
- 或者使用XMLHttpRequest(XHR)来加载模块的文本内容然后在浏览器端执行这些文本

CJS模块的格式只允许一个模块对应一个文件，为了达成优化的目的"transport format"会被用来绑定多个模块到一个文件（原文：so a "transport format" would be used for bundling more than one module in a file for optimization/bundling purposes. - 没太理解）。

通过这样的方式，CommonJS的组织能够解决依赖引用和循环引用，以及如何获取到一些模块的属性的问题（如何就解决了？）。但是他们并没有考虑一些在浏览器端之间不会发生变化但是又会影响模块设计的东西：

- 网络加载
- 固有的异步（inherent asynchronicity）

这意味着让开发者实现这样的格式有很大的负担，并且不利于调试。eval执行的调试或者调试多个文被件被串联到一个文件中都有它的劣势。这些劣势也徐有一天会被浏览器解决，但是最终的结果是：在多数浏览器环境中使用CommonJS模块已经不是最佳的选择。


### AMD

```
define(['jquery'] , function ($) {
    return function () {};
});
```
通常我们会写一堆的script标签，然后相互之间几乎体现不出什么依赖关系，你需要手动安排好加载顺序来解决依赖关系。AMD的规范的目的就是改良这种做法，实现一种方便调试并且不需要服务端工具的方式。AMD最初来自于Dojo使用XHR+eval的经验，并努力避免它身上所带有的种种缺点。

他之所以算是一种改良是因为：

- 使用CommonJS中的IDs来表示一来的方式，让依赖声明变得简单并且消除了全局变量的乱用。
- IDs能够匹配到对应的路径上。这就允许了多种实现方式，这对于unit test非常有帮助。
- 封装额模块定义，使你有一套避免污染全局变量的工具。
- 清楚的路径来定义模块，而不是使用“return value”或者CommonJS的“explorts”语法，这对循环引用尤其有用（体会不到）。

这算是一种基于CommonJS的改良是因为：

- 它在浏览器端表现更好，没有了所设置的诸多陷阱：不便调试、跨域问题、需要服务器端工具等
- 定义了包含多个模块到一个文件的方式。在CommonJS中这种方式是"transport format"而CommonJS的组织并没有同意transport format的做法。
- 允许设置方法作为返回值。这对构造函数尤其有用。在CommonJS中这是令人尴尬（awkward）的，因为总需要为返回的对象做检测。Node支持module.exports = function () {}但这并不是CommonJS规范的一部分。

### 模块定义

使用JavaScript方法来封装是这样的：

```
(function () {
   this.myGlobal = function () {};
}());
```



That type of module relies on attaching properties to the global object to export the module value, and it is difficult to declare dependencies with this model. The dependencies are assumed to be immediately available when this function executes. This limits the loading strategies for the dependencies.

这种形式的模块加载是通过将属性挂载到全局对象上来导出模块的值，难以声明模块依赖关系。并且模块被期望执行了以后马上可以使用，这限制了依赖的加载策略。AMD通过如下的办法结局了这些问题：

- 注册工厂方法define(),而不是马上执行它们
- 将依赖作为一个字符串数组进行传递，而不是获取全局变量
- 只需要执行一次工厂方法，所有的一来都会被加载和执行
- 传递一来的模块名字作为参数给工厂方法

```
/Calling define with a dependency array and a factory function
define(['dep1', 'dep2'], function (dep1, dep2) {

    //Define the module value by returning a value.
    return function () {};
});
```

### 模块命名


上述模块并没有申明一个名字，这就让模块变得非常轻便。它允许开发者给定名字，但是AMD loader通常是会根据被引用的方式而自动分配一个名字。

但是，合并多个模块到一起的那些工具通常需要一个方法来给文件命名，这样的话AMD允许一个字符串作为define的第一个参数。

```
//Calling define with module ID, dependency array, and factory function
define('myModule', ['dep1', 'dep2'], function (dep1, dep2) {

    //Define the module value by returning a value.
    return function () {};
});
```

你应该避免自己命名，在开发的时候一个模块丢i文件。但是在发布时候使用工具，为了性能情况，模块记载的方案需要给出模块名定义的方式（说的有点模糊，具体实践才有体会）。

### SUGAR

如上的例子能够在所有的浏览器上工作，但是有错位的风险并且如果依赖非常多看起来也会很奇怪：

```
define([ "require", "jquery", "blade/object", "blade/fn", "rdapi",
         "oauth", "blade/jig", "blade/url", "dispatch", "accounts",
         "storage", "services", "widgets/AccountPanel", "widgets/TabButton",
         "widgets/AddAccount", "less", "osTheme", "jquery-ui-1.8.7.min",
         "jquery.textOverflow"],
function (require,   $,        object,         fn,         rdapi,
          oauth,   jig,         url,         dispatch,   accounts,
          storage,   services,   AccountPanel,           TabButton,
          AddAccount,           less,   osTheme) {

});
```

为了让包装CommonJS的模块更简单些，如下的顶一个是也是支持的：

```
define(function (require) {
    var dependency1 = require('dependency1'),
        dependency2 = require('dependency2');

    return function () {};
});
```


The AMD loader will parse out the require('') calls by using Function.prototype.toString(), then internally convert the above define call into this:

AMD加载器会将require.js中的调用解析出来（原文强调using Function.prototype.toString()的方式不是很理解），然后将上述调用转化成这个样子：

```
define(['require', 'dependency1', 'dependency2'], function (require) {
    var dependency1 = require('dependency1'),
        dependency2 = require('dependency2');

    return function () {};
});
```

这样允许加载器异步加载dependency1和dependency2，执行依赖然后再执行这个function。并不是所有的浏览器都有可用的Function.prototype.toString() 方法。As of October 2011, the PS 3 and older Opera Mobile browsers do not. Those browsers are more likely to need an optimized build of the modules for network/device limitations, so just do a build with an optimizer that knows how to convert these files to the normalized dependency array form, like the RequireJS optimizer. 

因为不支持toString方法的浏览器非常少，我们可以放心使用这样的方式来组织模块的依赖。


### CommonJS兼容性

多数（近95）的CJS模块都能良好地和上节中提到的包装方法兼容。不兼容的一些是因为对依赖做了动态估算，比如没有传递一个字符串表达式给require的方法调用或者看起来不像一个声明式的require调用。如下一些用法就就会出现问题：

```
//BAD
var mod = require(someCondition ? 'a' : 'b');

//BAD
if (someCondition) {
    var a = require('a');
} else {
    var a = require('a1');
}
```

AMD的执行更ECMAScript的Harmony模块是对应的。不能在AMD包装方法中工作的CommonJS模块同样不会能在Harmony模块中工作。AMD的代码执行是能够更好地与未来兼容的。

### VERBOSITY VS. USEFULNESS

略

### AMD的使用情况

2011年的时候，AMD已经得到了比如jQuery 1.7、Dojo 1.7、EmbedJS等的采纳。
  
### 我们能做什么

- 如果你构建应用程序
  -  尝试采用AMD加载器（RequireJS、curl、lsls、Dojo1.7+）
  - 如果你要采用AMD加载但是仍旧希望在HTML中载入脚本，Use the RequireJS optimizer either in command line mode or as an HTTP service with the almond AMD shim（没理解）。

- 如果你是一个脚本/库的作者
  - balabala 略
- 如果你写JavaScript的加载器/引擎/执行环境
  - balabala 略
  



