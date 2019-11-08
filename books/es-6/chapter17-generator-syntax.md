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

**next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。**

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


## 5. Generator.prototype.return()

### 概念介绍

遍历器对象的return方法，可以返回指定的值，并终结遍历Generator函数。

```
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```

当return中没传递参数的时候，value为undefeind。


### try finally结合使用

Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会先执行到finally中的代码块。

```
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
```
## 6. next()、throw()、return() 的共同点 

```
const g = function* (x, y) {
  let result = yield x + y;
  return result;
};

const gen = g(1, 2);
gen.next(); // Object {value: 3, done: false}
```


可以把 next()、throw()、return()  看做让Generator函数恢复执行的方式：


```
gen.next(1); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;

gen.throw(new Error('出错了')); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));

gen.return(2); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;
```


## 7. yield* 表达式


### 原始的用法

Generator函数内部再调用Generator函数，需要手动遍历完成。

```
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  // 手动遍历 foo()
  for (let i of foo()) {
    console.log(i);
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// x
// a
// b
// y
```

实现上只是一个语法糖


```
function* concat(iter1, iter2) {
  yield* iter1;
  yield* iter2;
}

// 等同于

function* concat(iter1, iter2) {
  for (var value of iter1) {
    yield value;
  }
  for (var value of iter2) {
    yield value;
  }
}
```

### yield * 表达式

```
function* bar() {
  yield 'x';
  yield* foo(); // 如果直接使用 yield foo() 将返回一个遍历器对象
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

另外一个例子

```
let delegatedIterator = (function* () {
  yield 'Hello!';
  yield 'Bye!';
}());

let delegatingIterator = (function* () {
  yield 'Greetings!';
  yield* delegatedIterator;
  yield 'Ok, bye.';
}());

for(let value of delegatingIterator) {
  console.log(value);
}
// "Greetings!
// "Hello!"
// "Bye!"
// "Ok, bye."
```

### yield* Array

```
function* gen(){
  yield* ["a", "b", "c"];
}

gen().next() // { value:"a", done:false }
```

任何数据结构只要有 Iterator 接口，就可以被yield*遍历。

```
let read = (function* () {
  yield 'hello';
  yield* 'hello';
})();

read.next().value // "hello"
read.next().value // "h"
```

### 被代理的Generator有return

如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。return的返回值不会出现在 `...` 和 `for of`的结果中。

```
function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned(genObj) {
  let result = yield* genObj;
  yield 'c';
  console.log(result);
}

[...logReturned(genFuncWithReturn())]
// The result
// 值为 [ 'a', 'b', 'c' ]
```

### 取出嵌套数组的所有成员

```
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}

// 等同于 

[...iterTree(tree)] // ["a", "b", "c", "d", "e"]

// a
// b
// c
// d
// e
```

### 完全遍历二叉树（略复杂点的例子）

```
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}

result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```

## 8. 作为对象属性的 Generator 函数

一个对象的属性是Generator函数可以写成如下的形式：

```
let obj = {
  * myGeneratorMethod() {
    ···
  }
};
```

## 9. Generator 函数的this


### 函数返回实例的特征

Generator 函数总是返回一个遍历器，遍历器是 Generator 函数的实例，继承了 Generator 函数的prototype对象上的方法。

```
function* g() {}

g.prototype.hello = function () {
  return 'hi!';
};

let obj = g();

obj instanceof g // true
obj.hello() // 'hi!'
```

### Generator 函数无法当普通构造函数

```
function* g() {
  this.a = 11;
}

let obj = g();
obj.next();
obj.a // undefined
```

并且直接和new命令一起使用会报错：

```
function* F() {
  yield this.x = 2;
  yield this.y = 3;
}

new F()
// TypeError: F is not a constructor
```

### 让Generator方法保留普通对象的行为

```
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {};
var f = F.call(obj);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

obj.a // 1
obj.b // 2
obj.c // 3
```

更进一步，让`f`和`obj`统一为一个对象的方法：

注：上述`F`函数内其实是通过yield来触发赋值`this`，如果不使用 `yield`，调用一次`next()`即可。

```
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var f = F.call(F.prototype);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```

更进一步，让F变的像一个构造函数：

```
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}

var f = new F();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```

## 10. 含义

### Generator与状态机

```
var ticking = true;
var clock = function() {
  if (ticking)
    console.log('Tick!');
  else
    console.log('Tock!');
  ticking = !ticking;
}
```

下面的写法外部变量ticking，更简洁，更安全（状态不会被非法篡改）。Generator 之所以可以不用外部变量保存状态，是因为它本身就包含了目前是否处于暂停态。

```
var clock = function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};
```

### Generator与协程

协程（coroutine）是一种程序运行方式，既可以用单线程实现，也可以用多线程实现。


#### 协程与子例程的差异

个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），等到稍后收回执行权的时候，再恢复执行。这种可以并行执行、交换执行权的线程（或函数），就称为协程。

传统的“子例程”（subroutine）采用堆栈式“后进先出”的执行方式，只有当调用的子函数完全执行完毕，才会结束执行父函数。

#### 协程与普通线程的差异

同一时间可以有多个线程处于运行状态，但是运行的协程只能有一个，其他协程都处于暂停状态。

普通的线程是抢先式的，到底哪个线程优先得到资源，必须由运行环境决定，但是协程是合作式的，执行权由协程自己分配。

由于 JavaScript 是单线程语言，只能保持一个调用栈。引入协程以后，每个任务可以保持自己的调用栈，一旦出错，原始的调用栈早就结束。

Generator 函数是 ES6 对协程的实现，被称为“半协程”（semi-coroutine），只有 Generator 函数的调用者能将执行权还给 Generator 函数。完全执行的协程，任何函数都可以让暂停的协程继续执行。


### Generator与上下文

Generator 函数遇到yield命令，就会暂时退出堆栈，里面的所有变量和对象会冻结在当前状态。

等到对它执行next命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。

注：感觉并不准确的例子

```
function* gen() {
  yield 1;
  return 2;
}

let g = gen();

console.log(
  g.next().value,
  g.next().value,
);
```

## 11. 应用

### 异步操作的同步化表达

```
function* numbers() {
  let file = new FileReader("numbers.txt");
  try {
    while(!file.eof) {
      yield parseInt(file.readLine(), 10);
    }
  } finally {
    file.close();
  }
}
```

### 控制流管理


#### 传统的嵌套

```
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});
```


#### Promise改写

使用Promise改写了代码以后可以看起来更简洁，前提是step1-4都具有 `resolve/reject` 的函数，或者对象的`then`的第一个方法为该种函数。

```
Promise.resolve(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(function (value4) {
    // Do something with value4
  }, function (error) {
    // Handle any error from step1 through step4
  })
  .done();
```

#### yield 改写
使用了 yield 以后可以使用如下的语法，但是仅限于同步的函数，因为一步不知道什么时候异步的回调结束，具体要参照"异步操作"的章节。

```
function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}

scheduler(longRunningTask(initialValue));

function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value
    scheduler(task);
  }
}
```
#### 多层yield嵌套

```
let steps = [step1Func, step2Func, step3Func];

function* iterateSteps(steps){
  for (var i=0; i< steps.length; i++){
    var step = steps[i];
    yield step();
  }
}

let jobs = [job1, job2, job3];

function* iterateJobs(jobs){
  for (var i=0; i< jobs.length; i++){
    var job = jobs[i];
    yield* iterateSteps(job.steps);
  }
}

for (var step of iterateJobs(jobs)){
  console.log(step.id);
}
```

`for...of`部分同等的代码执行逻辑如下

```
var it = iterateJobs(jobs);
var res = it.next();

while (!res.done){
  var result = res.value;
  // ...
  res = it.next();
}
```


### 作为数据结构

```

function* doStuff() {
  yield fs.readFile.bind(null, 'hello.txt');
  yield fs.readFile.bind(null, 'world.txt');
  yield fs.readFile.bind(null, 'and-such.txt');
}

for (task of doStuff()) {
  // task是一个函数，可以像回调函数那样使用它
}
```

等价的ES5表达

```
function doStuff() {
  return [
    fs.readFile.bind(null, 'hello.txt'),
    fs.readFile.bind(null, 'world.txt'),
    fs.readFile.bind(null, 'and-such.txt')
  ];
}
```

### 部署Iterator接口

```
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7
```

```
function* makeSimpleGenerator(array){
  var nextIndex = 0;

  while(nextIndex < array.length){
    yield array[nextIndex++];
  }
}

var gen = makeSimpleGenerator(['yo', 'ya']);

gen.next().value // 'yo'
gen.next().value // 'ya'
gen.next().done  // true
```