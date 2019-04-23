# Generator函数的语法


## 简介

generator 生成器
yield 产出

### 基本概念

是一种异步编程解决方案，是一个状态机，封装了多个内部状态，执行 Generator 函数会返回一个遍历器对象。

是一个普通函数，但是有两个特征：function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态。


```
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

### yield表达式


只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数，yield表达式就是暂停标志。如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，没有return语句，则返回的对象的value属性值为undefined。

```
function* gen() {
  yield  123 + 456;
}
```

上面代码中，yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值。

yield表达式与return语句的，相似之处：都能返回紧跟在语句后面的那个表达式的值。不同之处：遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能；一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式；正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多个yield。



Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。

```
function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);
```

yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。

```
(function (){
  yield 1;
})()
// SyntaxError: Unexpected number
```

yield表达式如果用在另一个表达式之中，必须放在圆括号里面。

```
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
```

### 与Iterator接口的关系

调用任意一个对象的Symbol.iterator方法会返回该对象的一个遍历器对象。可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。

```
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```
