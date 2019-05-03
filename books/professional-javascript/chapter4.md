#第四章表达式和运算符


```
var d = new Date();//通过Date()构造函数来创建一个新对象
d instanceof Date;//计算结果为true，d是由Date()创建的
d instanceof Object;//计算结果为true，所有的对象都是Object的实例
d instanceof Number;//计算结果为false，d不是一个Number对象
var a = [1,2,3];//通过数组直接量的写法创建一个数组
a instanceof Array;//计算结果为true，a是一个数组
a instanceof Object;//计算结果为true，所有的数组都是对象
a instanceof RegExp;//计算结果为false，数组不是正则表达式
```

