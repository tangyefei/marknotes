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

疑问：上述例子如不对i重新赋值，输出的i是从父亲自动复制过来的吗？

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

**和let一样，只在块级作用域有效，不存在提升和死区，不可重复声明**

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