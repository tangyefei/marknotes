# JavaScript权威指南-第6版

# 第一部分

# 第7章 数组

## 7.1 创建数组

可以使用数组直接量和构造函数的方式来创建数组。一些比较特殊的点

使用 `var arr = [,,]`方式构建的数组长度为2。

使用构造函数有三种写法：

1. `new Array()` //创建空数组
2. `new Array(10)` //创建长度为10的数组
3. `new Array(10, 1)` / new Array('content') //创建内容为 [10,1] 或 ['content']的数组


## 7.2 数组元素的读和写 

数组是对象的特殊形式，使用方括号访问数组元素就像使用方括号访问对象属性一样，JavaScript将数字索引1转换为字符串'1'，唯一不同的是它会自动维护length属性。

所有的索引都是属性名，但只有索引在在0~2^32－2之间的整形数组才是索引。所有数组都是对象，因此可以创建任意形式的属性。

使用非正整数作为索引会有如下的结果：

```
a[1.23]=true; // 这将创建一个名为"1.23"的属性
a["1000"]=0; // 这是数组的第1001个元素
a[1.000]; // 和a[1]相等
```

## 7.3 稀疏数组

可以使用如下几种方式创建数组：

```
var arr = [,,];

var arr2 = new Array();
arr2[10] = 1;

var arr3 = [1,2,3];
delete arr3[0];
```

## 7.4 数组长度

直接给数组元素的长度赋值会有特殊行为：如果赋值大于数组的长度，则数组的length变为赋值的长度；如果赋值的小于数组长度，则会截取多余的属性值。

## 7.5 数组元素的添加和删除

可以使用 arr[index] 直接给元素的某个索引下赋值；可以使用 delete arr[index] 或 arr.length = len 来删除某些属性值。

还有通用的方法可以用来进行数组操作：push()、unshift()、pop()、shift()、splice()。



## 7.6 数组遍历

可以使用 for循环、for...in、forEach。

需要注意的是 for...in 遍历到的是可枚举的属性名（即 0 -> arr.length-1 的数值），容易混淆。

## 7.7 多维数组

用数组中嵌套数组来表示多为数组。

## 7.8 数组方法

- join
- reverse
- sort
- concat，创建并返回新数组，[].concat(1,[2,[3]]) // [1,2,[3]]
- concat
- slice
- splice
- push和pop
- shift和unshift，[].unshift(2,3)// [2,3]而非[3,2]
- toString和toLocaleString

## 7.9 ECMASCript 5中的数组方法

ECMASCript 5中的数组方法概述，它接收一个函数作为参数，该函数又有三个参数：数组元素、索引、数组本身，会对数组中的每一个元素调用该函数，稀疏数组中不存在的元素不会调用该函数。数组方法除了函数作为第一个参数外，第二个参数还可以是用于指明在第一个参数中this所指向的对象。


- forEach，无法想for循环一样通过break跳出，需要放在try语句中抛出异常
- map，稀疏数组会返回相同长度的稀疏数组
- filter，跳过稀疏数组中的元素，返回结果总是稠密的
- every、some
- reduce、reduceRight，区别在于后者按索引从高到低索引数组
- indexOf、lastIndexOf，第二个参数为开始搜索的位置


如下是reduce/reduceRight的用法。数组为空而不指定初始值会报错，空数组制定索引值或者数组只有一个元素而不指定索引值，将简单返回唯一的元素。

```
var a = [1, 2, 3, 4, 5] 
var sum = a. reduce( function( x, y) { return x+ y }, 0); // 数组 求和 
var product = a. reduce( function( x, y) { return x* y }, 1); // 数组 求积 
var max = a. reduce( function( x, y) { return (x> y)? x: y; }); // 求 最大值
```

## 7.10 数组类型

可以使用Array.isArray来判定一个未知对象是否是数组。

在没有该方法之前 typeof o 为 “object“

使用 o instanceof Array 则可能因为Web浏览器中有多个窗体存在，一个窗体的对象不可是另外一个窗体的构造函数的实例。**能否自验证下呢？**

因此更早时候使用的方法是：

```
typeof o == Array && Object.prototype.toString.call(o) == '[object Array]'。

```

## 7.11 类数组对象

添加索引的普通对象、arguments、document获取DOM元素s的方法、字符串。可以通过原型方法调用call/apply来在类数组对象上获取类似数组调用的行为：

```
var a = {"0":" a", "1":" b", "2":" c", length: 3}; // 类 数组 对象 
Array. prototype. join. call( a, "+") // => "a+ b+ c" 
Array. prototype. slice. call( a, 0) // => ["a"," b"," c"]： 真正 数组 的 副本 Array. prototype. map. call( a, function( x) { return x. toUpperCase(); }) // => ["A"," B"," C"]:
```

## 7.12 数组的字符串

字符串是不可变值，把它们当数组看待时，他们是只读的，push/sort/reverse/splice等方法会修改数组，它们在字符串上是无效的，不仅如此使用字符串方法来修改数组会导致错误，并且不提示。

注：很少通过Array.prototype.method.call(str)的方式来调用操作数组，因此感受并不深。










