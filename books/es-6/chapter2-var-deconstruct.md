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

