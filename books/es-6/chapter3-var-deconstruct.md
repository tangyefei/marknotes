# 变量的解构赋值

> 1. 数组的解构赋值
2.对象的解构赋值
3.字符串的解构赋值
4.数值和布尔值的解构赋值
5.函数参数的解构赋值
6.圆括号问题
7.用途

## 1.数组的解构赋值

## 基本用法

```
let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```


可遍历的结构（具有 Iterator 接口），都可以采用数组形式的解构赋值。

```
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"

function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```

### 默认值

当一个数组成员严格等于undefined，默认值才会生效。

```
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

默认值是一个表达式会惰性求值，上面代码中，因为x能取到值，所以函数f根本不会执行

```
function f() {
  console.log('aaa');
}

let [x = f()] = [1];


// 等价于如下代码

let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

## 2.对象的解构赋值


### 基本用法


```
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined


let { log, sin, cos } = Math;

const { log } = console;
log('hello') // hello
```

**变量名与属性名不一致**

```
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };

// 真正被赋值的是后者，而不是前者。
let { first: f, last: l } = obj;

f // 'hello'
l // 'world'
```

**容易造成混淆的`前者`**

```
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
```

p是模式，不是变量，因此不会被赋值，如果p也要作为变量赋值，可以写成下面这样。

```
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
```

还有更复杂的一个例子

```
const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}
```

**嵌套赋值**

```
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

obj // {prop:123}
arr // [true]
```


### 默认值

默认值生效的条件是，对象的属性值严格等于undefined。

```
var {x = 3} = {};
x // 3

var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"

```


## 3.字符串的解构赋值

```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let {length : len} = 'hello';
len // 5
```

## 4.数值和布尔值的解构赋值  

要等号右边的值不是对象或数组，就先将其转为对象

```
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true

let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

## 5.函数参数的解构赋值

```
[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```

本节介绍了一些风骚的用法，徒增理解难度，就不做笔记了。

## 6.圆括号问题

略。

## 7. 用途

列举了7中实际用途， 单**遍历 Map 结构**是自己并不知道的

```
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```
















































