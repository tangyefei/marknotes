# JavaScript面试题


## 9. 闭包

- [why use closure](http://howtonode.org/why-use-closure)
- [学习Javascript闭包（Closure）](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)
- [权威指南第8章 第5节 闭包](http://book.tangyefei.cn/javascript-guide/_book/chapter8-function.html)

### 什么是闭包（What)

技术角度来讲，函数都是闭包，它们都关联到作用域链。

函数的执行依赖于变量作用域，这个作用域是在函数定义时决定的，而不是函数调用时决定的。

当定义函数的作用域链和调用函数时闭包所指向的作用域链不是指向同一个，就形成了强大的编程技术。

```
var scope = 'global scope'
function checkscope(){
    var scope = 'local scope';
    function f(){ return scope; }
    return f();
}
checkscope();  // 'local scope' 定义时候的作用域链
```

### 它有什么作用，什么场景使用它(When/Where）

作用就在于它能读取到函数内部的变量，并且变量能始终驻留在内存中。


比如下面两个额匿名函数，其中第一个函数被赋值给了全局变量，第二个函数作为第一个结果被返回，而变量count又被第二个函数返回，意味着counter永远不会被垃圾回收掉。

```
var uniqueInteger = (function(){
    var counter = 0;
    return function(){
        return counter ++;
    }
})();
```

####  第一个场景：对外部隐藏一些状态

```
function greeter(name, age) {
  var message = name + ", who is " + age + " years old, says hi!";

  return function greet() {
    console.log(message);
  };
}

// Generate the closure
var bobGreeter = greeter("Bob", 47);

// Use the closure
bobGreeter();
```

#### 第二个场景：作为面向对象的一种实现方式

```
// Define the factory
function newPerson(name, age) {

  // Store the message in a closure
  var message = name + ", who is " + age + " years old, says hi!";

  return {

    // Define a sync function
    greet: function greet() {
      console.log(message);
    },

    // Define a function with async internals
    slowGreet: function slowGreet() {
      setTimeout(function () {
        console.log(message);
      }, 1000);
    }

  };
}

// Export this file as a module
module.exports = newPerson;
```

```
var newPerson = require('./personfactory');

var tim = newPerson("Tim", 28);

tim.greet();
```

#### 场景三：作为回调获取到参数

```
function setAlarm(message, timeout) {

  // Define handle in the closure
  function handle() {
    console.log(message);
  }

  setTimeout(handle, timeout);
}

setAlarm("Wake UP!", 100);
```



### 使用它有什么要注意的（Why）

不能内存回收，意味着着内存泄漏会带来的性能开销，最好能将不使用变量删除。


## 8. bind、apply、call

### 怎么用（Why/What）

用法都是为了改变this的指向，或者传递一些额外的参数。

特殊的bind apply call的第一个参数必须传值吗？传递null、undefined的时候会默认指向global/window，在严格模式下则是传递什么指向什么。

### 什么时候会用到（Where & When）

方法借用 

```
Object.prototype.toString.call(date) 
Array.prototype.forEach.call(domList, ()=>{});
```

React组价中的方法指向

```
constructor() {
	//...
	this.func = this.func.bind(this);
}
```


## 7. 变量提升

- [js变量提升](https://zhuanlan.zhihu.com/p/43159665)
- [javascript为什么会存在变量提升](https://juejin.im/post/5d0301495188253df07da7db#heading-2)

变量提升是什么？为什么会有变量提升？在let/const中有变量提升吗？

### 什么是变量提升（what）

通过var声明的变量，可以在它之前的代码获取到这个变量（虽然值是undefined）。

### 为什么会有变量提升（why)

代码执行分为创建阶段、执行阶段

- 创建阶段会创建作用域、函数、变量、求值'this'等
- 执行阶段初始化变量的值和函数的引用，解释执行代码

函数声明`function func(){}`不同于函数定义`function func(){}`，它在声明阶段就有值，并且在定义同名的变量，发现已经存在了同名声明，是不会已经存在的属性的。

```
(function() {
    console.log(typeof foo); // 函数指针
    console.log(typeof bar); // undefined

    var foo = 'hello',
        bar = function() {
            return 'world';
        };
        
    function foo() {
        return 'hello';
    }
}());
```

### let/const中是否也存在变量提升

变量也是存在提升的， 只不过在没有赋值的时候，直接使用变量是会报ReferenceError的：

```
var a = 2;
function test() {
    console.log(a);
    let a = 5;
}
test();
```



## 6. 箭头函数跟普通函数有什么区别


[ECMAScript 6 入门：函数的扩展](http://es6.ruanyifeng.com/#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%20%E4%BD%BF%E7%94%A8%E6%B3%A8%E6%84%8F%E7%82%B9) “箭头函数-使用注意点” 的部分进行了一些阐述。

- 语法会更简练（注：返回对象需要加`()`)
- 没有自己的this，使用定义所在的环境的this，因此也不能使用bind apply call
- 没有自己的arguments，可以使用ES6的restrest `(...变量名)` 在函数中引入变量



## 5. this的指向问题

函数指向window

方法指向所在对象

bind、apply、call后能修改this，修改对箭头函数无效


## 4.数据类型判定

typeof 可以判定5种基本数据类型和对象，null的结果为object，对于所有对象（子）类都为object

toString 方法可以获取到对象的具体类型

因此判定方法可以是 null、undefined用===，对象用toString截取字符串判定的方法。

[我的简书文章：JavaScript中的类型和判定方法的实用总结](https://www.jianshu.com/p/b32888500243)



## 3. 前端模块系统的比较

[掘金的文章：前端模块化的前世今生](https://juejin.im/post/5ca333c3f265da30c231a66f)

模块化主要是用来抽离公共代码，隔离作用域（避免变量冲突）。

### IIFE

Immediately invoked function expression，使用自执行函数（闭包）来编写模块化。

### AMD

作为RequireJS推广过程中的产物，特点是所有依赖必须提前声明好，在导入模块的时候，也会先加载对应的依赖模块，然后再执行接下来的代码。

```
define('./index.js',function(code){
    // code 就是index.js 返回的内容
    return {
        sayHello: function(name) {
            return "Hello, " + name;
        }
    }
});

```


### CMD

阿里的玉伯提出，对应的实现库为SeaJS，区别在于依赖模块加载后并不立即执行，而要遇到require语句才执行；如果使用require.async()方法，可以实现模块的懒加载。

```
define(function(require) {

   //通过require引用模块

   var path=require.resolve('./cmdDefine');

   alert(path);

});
```


思考：依赖模块加载后并不立即执行，难道它分析了所有的resolve并提前加载好了？

### CommonJS

Node.js采用了该规范，特点是同步阻塞加载，无法按需异步加载。

### ES Modules

ES6中通过import和export引入模块，相比较CommonJS而言，是不能修改的导出的模块的。

### UMD

兼容AMD 、CommonJS模块语法。

### Webpack

可以支持使用上述多种方式进行打包，对于ES6不能按需加载的问题，Webpack 2.x后支持通过`import()`函数来实现异步加载（路由中的组件引入是函数，React中通过import导入组件）


## 2. JavaScript中的线程和执行顺序

[我的简书文章：Event Loop、macrotask、micritask的结论和参考](https://www.jianshu.com/p/00e7d4942f05)


## 1. 介绍一下JavaScript中的事件机制

[我的简书文章：扎实前端系列：简单却容易误解的事件流](https://www.jianshu.com/p/0426a073f0ce)
