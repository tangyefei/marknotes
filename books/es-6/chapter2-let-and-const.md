# let 和 const 命令

> 1. let 命令
2. 块级作用域
3. const 命令
4. 顶层对象的属性
5. globalThis 对象



## 1. let命令

### 基本用法

**只在所在代码块内有效**

```
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

```
for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);
// ReferenceError: i is not defined
```

**for循环中使的var是同一个变量**

```
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```
**for循环中使用的let是不同的变量**

每一轮循环中，相当于都声明了一个新的变量，JavaScript引擎负责记录上一轮的值



```
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```


**for循环的特别之处**

设置循环变量的那一部分是父作用域，而循环体内部是一个子作用域

```
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```


### 不存在变量提升

**let声明的变量必须先声明后使用**

```
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

### 暂时性死区（temporal dead zone，简称 TDZ）

**let所在的块，定义的变量不受到外面影响**

只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。使用let命令声明之前区域，都属于对应tmp的“死区”：

```
let tmp = 'gigigi';
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

**typeof曾经是绝对安全的操作，有了let后不再是**

```
typeof undeclared_variable // "undefined"
```


```
typeof undeclared_variable // ReferenceError
let undeclared_variable;
```

**一些隐蔽的死区**

```
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错
```

```
// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined
```
**不存在变量提升 和 暂时性死区 的好处**

为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。


### 不允许重复声明

```
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
```

```
function func(arg) {
  let arg;
}
func() // 报错

function func(arg) {
  {
    let arg;
  }
}
func() // 不报错
```

## 2. 块级作用域

### 为什么需要块级作用域？ 

内层变量可能会覆盖外层变量。

```
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined
```

用来计数的循环变量泄露为全局变量。

```
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```

### ES6 的块级作用域

let实际上为 JavaScript 新增了块级作用域。块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。

### 块级作用域与函数声明

这是一个相当令人混淆的问题。

ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

但是浏览器没有遵守这个规定，为了兼容旧代码，还是支持在块级作用域之中声明函数。

ES6 引入了块级作用域，明确允许在块级作用域之中声明函数，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。

真的在 ES6 浏览器中运行，函数声明还是会提升到全局作用域或函数作用域的头部。

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

```
// 块级作用域内部的函数声明语句，建议不要使用
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
```

## 3. const命令

### 基本用法


**声明之后不能改变**

声明一个只读的常量，一旦声明，常量的值就不能改变。

```
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

**意味着声明之后必须马上初始化**

```
const foo;
// SyntaxError: Missing initializer in const declaration
```

**和let一样，只在块级作用域有效，不存在提升，有死区，不可重复声明**

```
if (true) {
  const MAX = 5;
}

MAX // Uncaught ReferenceError: MAX is not defined
```

```
if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}
``` 

```
var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
```

### 本质

**并非值不可改动，而是指向内存地址不能改动**

对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，重新赋值值就等于改了内存地址，简单数据类型等同于常量。

复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，指针不可改，指针指向的数据结构可变。

```
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

**要想将对象冻结，应该使用freeze方法**

```
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

## 4. 顶层对象的属性

顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。

ES6 为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。


```
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

## 5. globalThis 对象 

有一个提案，在语言标准的层面，引入globalThis作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。