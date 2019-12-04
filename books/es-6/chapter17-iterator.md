# Iterator 和 for...of 循环

> 1.Iterator（遍历器）的概念
2.默认 Iterator 接口
3.调用 Iterator 接口的场合
4.字符串的 Iterator 接口
5.Iterator 接口与 Generator 函数
6.遍历器对象的 return()，throw()
7.for...of 循环

## Iterator（遍历器）的概念


## for ... of

### 数组

for ... of 遍历每个元素内容

for ... in 得到数组的下标（也是属性的一种），并且会把挂在数组对象下的属性也得到

```
let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); //  "3", "5", "7"
}
```

### 对象

for ... of会报错 is not iterable

for ... in得到对象的属性，**跟数组其实都属于对象上的遍历**






























