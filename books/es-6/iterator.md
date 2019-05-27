
## for ... of

### 数组

for ... of 遍历每个元素内容

for ... in 得到数组的下标，并且会把挂在数组下面的属性也得到

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

for ... in得到对象的属性，跟数组其实都属于对象上的遍历