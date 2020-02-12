## 30 Scope-Hoisting使用和原理分析

### 不使用有什么问题

每个模块都被包裹了一层形如下面这样的包裹代码，它做到事情是兼容一些不支持import/export的代码：

```
/***/ (function(module, __webpack_exports__, __webpack_require__) {
/***/ })
```

模块多时无疑会代码统计增大，同时因为函数作用域变多，内存开销会跟大。


### scope hoisting

scope hoisting的原理是：将所有模块代码按照引用顺序，放在一个函数U作用域，适当重命名防止命名冲突。

开启mode:'production'后，会默认开启scope hoisting的，我们可以手动在plugins中增加选项：

注：Concatenation译为级联

```
new webpack.optimize.ModuleConcatenationPlugin()
```

执行打包命令后，可以看到，模块所依赖的其他模块会被内联到一个包裹代码中：

- document.write是来自`index/index.js`的代码
- helloworld()是来引用自`index/helloworld.js`模块的代码
- common是被多处用到的通用代码，被独立提取到其他文件了

```

/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/index/helloworld.js
function helloworld() {
  return 'hello world';
}
// EXTERNAL MODULE: ./common/index.js
var common = __webpack_require__(0);

// CONCATENATED MODULE: ./src/index/index.js


document.write(helloworld() + Object(common["a" /* default */])());

/***/ })
```