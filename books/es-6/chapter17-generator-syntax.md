# Generator函数的语法

> 1. 简介
2. next 方法的参数
3. for...of 循环
4. Generator.prototype.throw()
5. Generator.prototype.return()
6. next()、throw()、return() 的共同点
7. yield* 表达式
8. 作为对象属性的 Generator 函数
9. Generator 函数的this
10. 含义
11. 应用


本章详细介绍 Generator 函数的语法和 API。

## 1. 简介

### 基本概念

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。


可以把Generator函数看成是一个状态机，封装了多个内部状态，执行 Generator 函数会返回一个遍历器对象，代表 Generator 函数的内部指针。虽然Generator函数是一个普通函数，但是有两个特征：（1）function关键字与函数名之间有一个星号；（2）函数体内部使用yield表达式，定义不同的内部状态。

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

每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

### yield表达式


只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数，yield表达式就是暂停标志。

如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，没有return语句，则返回的对象的value值为undefined。


#### 惰性求值

```
function* gen() {
  yield  123 + 456;
}
```

yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值。

#### yield与return的相同之处

都能返回紧跟在语句后面的那个表达式的值。

#### yield与return的不同之处


1. 遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能；

2. 一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式；

3. 正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多个yield。


#### 可以不用yield表达式

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


#### yield只能用在Generator 函数内

yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。

```
(function (){
  yield 1;
})()
// SyntaxError: Unexpected number
```

#### yield表达式放在另一个表达式中加括号

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


调用任意一个对象的Symbol.iterator方法会返回该对象的一个遍历器对象。

```
var list = [];
list[Symbol.iterator]
ƒ values() { [native code] }
```

Generator 函数就是遍历器生成函数。

可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。

```
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]

```

Generator 函数执行后，返回一个遍历器对象，遍历器对象的Symbol.iterator属性执行后返回自身。

```
function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g
// true

g[Symbol.iterator] === gen
//false
```

## 2. next 方法的参数



### 概念解释

yield表达式本身没有返回值，或者说总是返回undefined。

next方法每次执行，会停留在一个yield的位置，将表达式的值得作为 {value, done} 返回。

next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。

### 一个蹩脚的例子


```
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

因为next方法传入的是上一次yield的返回值，因此第一次调用next方法的停留位置是第一个yield，没有上一个yield，因此不需要传入任何值。

第二次next，x + 1 应该是6，我们在代码中直接传入了12，那么y的值就变成了2 * 12 = 24。

第三次next，y / 3 应该是8，我们在代码中直接传入了13，那么最终返回的就是5 + 24 + 13 = 42。

当然可以通过封装，代为做第一次next，然后将用户的每一次next传值，都在输出中输出中体现出来：

```
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});

wrapped().next('hello!')
// First input: hello!
```

### 一个看着实用些的例子

```
function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';
}

let genObj = dataConsumer();
genObj.next();
// Started
genObj.next('a')
// 1. a	
genObj.next('b')
// 2. b
```

## 3. for...of 循环

### 概念介绍

for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象。

```
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

### 实现斐波那契数列

```
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}
```

### 遍历任意对象（object）的两种方法


```
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

```
function* objectEntries() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

### Generator 函数返回的 Iterator 对象的用途

```
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2
```

## 4. Generator.prototype.throw()

### 概念介绍


Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。下面例子中的第一个错误，**已经被内部的catch捕获了，第二个错误会被外部的catch捕获**。throw方法可以接受一个参数（建议抛出Error对象的实例），被catch语句接收。

```
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
```

注意三连：

- 捕获的条件之一是，代码执行位置正好在generator的`try`中，例如把上面的yield放到`try`之外，内部捕获就无法触发了。

- 要混淆遍历器对象的throw方法和全局的throw命令。后者只能被外部的的`cath`语句捕获

- 如果generator函数体内部没有`try catch`，通过`i.throw`抛出的错误将被外部的代码块捕获。
### 

- 如果generator函数体内外都没有`try catch`，那么程序将在报错后中断执行。

- throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法。下例。

```
function* gen() {
  try {
    yield 1;
  } catch (e) {
    console.log('内部捕获');
  }
}

var g = gen();
g.throw(1);
// Uncaught 1
```

### throw被捕获后会顺带执行yield

```
var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
}

var g = gen();
g.next() // a
g.throw() // b
g.next() // c
```

throw的时所在的位置，其实可以理解为上一次yield所在的位置。

另外如果没有被内部的`try catch`捕获，而是只被外部的`try catch`捕获，那么generator函数内部的代码将不再执行：

```
var gen = function* gen(){
    yield console.log('a');
  yield console.log('b');
  yield console.log('c');
}

var g = gen();
g.next() // a
try {
  g.throw() // b
}catch(e){
  console.log('外部捕获' + e); // 外部捕获undefined
}
g.next() // {value: undefined, done: true}
g.next() // 

```


### 内部错误反过来被外部捕获

```
function* foo() {
  var x = yield 3;
  var y = x.toUpperCase();
  yield y;
}

var it = foo();

it.next(); // { value:3, done:false }

try {
  it.next(42);
} catch (err) {
  console.log(err); // TypeError: x.toUpperCase is not a function
}
```

### Generator的内部错误没被捕获将执行不下去

注意看例子中 `第二次运行next方法` 没有执行。

```
function* g() {
  yield 1;
  console.log('throwing an exception');
  throw new Error('generator broke!');
  yield 2;
  yield 3;
}

function log(generator) {
  var v;
  console.log('starting generator');
  try {
    v = generator.next();
    console.log('第一次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第二次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第三次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  console.log('caller done');
}

log(g());
// starting generator
// 第一次运行next方法 { value: 1, done: false }
// throwing an exception
// 捕捉错误 { value: 1, done: false }
// 第三次运行next方法 { value: undefined, done: true }
// caller done
```



在此还要强调一些概念：

1. 未经捕获的Error会影响后续代码的执行
2. try/catch只能捕获一个异常，第二异常开始会无法被catch处理
3. try中的代码一旦抛出了Error，后续代码就无法执行了
4. try中的代码经过Generator的实例抛出的Error


