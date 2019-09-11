# JavaScript权威指南-第6版

# 第一部分

# 第3章 类型、值和变量

## 3.1 数字

### 整型直接量

用数字序列表示一个十进制正式，也可以使用 `0x` 或者 `0X` 表示一个十六进制，ECMAscript标准不支持八进制直接量，但在某些实现中支持，它以`0`开始。

### 浮点型直接量

浮点数可以使用 `[整数部分][小数点][小数部分]` 组成，也可以使用浮点技术法表示  `[实数][e|E][+|-][整数]` 表示，例如

```
6.02e23 // 6. 02 × 1023
```

### JavaScript中的算术运算

除了加减乘除求余之外，通过Math对象的属性可以获得更复杂运算的能力。

比较特殊的介绍在 overflow、underflow、被零整除时候的情况

#### overflow

数字超过能表示的最大边界，会用 Infinity 表示，负数则用 - Infinity表示。基于它的加减乘除运算还是一样的结果。

#### underflow

运算结果无限接近于零并且比JavaScript所能表示的最小的值还小时，JavaScript会返回0，当数字为负数的时候为-0。0和-0除了用在除法中，几乎完全一样（0===-0。

#### 被零整除

在JavaScript中被零整除不会报错，它只是简单地返回无穷大（Inifinity）或者（-Infinity）。

特殊的零除以零是没有意义的，返回NaN。NaN比较特殊，和任何值都不相等（包括自身），需要使用isNaN来判断（实现方式为x!=x)



### 二进制浮点数和四舍五入错误

JavaScript能表示的浮点数个数是有限的，因为它采用的是二进制表示法，可以精确表示1/2 1/4 1/8，常用的1/10却无法精确表示。结果就是一些计算结果不符合预期：

```
var x = .3 - .2; // 30 美分 减去 20 美分 
var y = .2 - .1; // 20 美分 减去 10 美分 
x == y // => false: 两 值 不相等! 
x == .1 // => false: .3-. 2 不等于 .1 
y == .1 // => true: .2-. 1 等于 .1
```

因此你可能更愿意使用整数“分” 而不是小数“元”来进行计算。

### 日期和时间

这里提供了一个日期计算的简单教程

```
var then = new Date( 2011, 0, 1); // 2011 年 1 月 1 日 
var later = new Date( 2011, 0, 1, 17, 10, 30);// 同一 天, 当地时间 5: 10: 30pm, 
var now = new Date(); // 当前 日期 和 时间 
var elapsed = now - then; // 日期 减法： 计算 时间 间隔 的 毫秒 数 
later. getFullYear() // => 2011 
later. getMonth() // => 0: 从 0 开始 计数 的 月份 
later. getDate() // => 1: 从 1 开始 计数 的 天数 
later. getDay() // => 5: 得到 星期 几， 0 代表 星期日， 5 代表 星期一 
later. getHours() // => 当地时间 17: 5pm 
later. getUTCHours() // 使用 UTC 表示 小时 的 时间， 基于 时区
```

## 3.2 文本

字符串由一组由16位（2字节）值组成的不可变的有序序列，字符串长度为所含16位值的个数。

JavaScript用UTF-16编码的Unicode字符集，常用字符用16位内码表示，不能表示为16位的字符则用两个16位值组成的序列表示，这意味着一个字符从长度成为了2。

注：在阮一峰的文章中，说到JavaScript是用UCS-2进行编码的，而UTC-16是UCS-2的超集。语言到底是用的什么标准？

JavaScript中的字符方法是基于16位值，而非字符；在ES6中增加了一些方法(String.getCodePointAt等) 和 遍历属性（for...of)。

### 字符串直接量

ES3中字符必须写在同一行，ES5中可以使用`\`将字符拆成若干行书写(实际展示还是紧凑的字符)，希望字符串直接另起一行可以使用 `\n`。字符用单双引号括起来，和字符串内部引号冲突时，可以使用`\`转译。

### 转译字符

使用反斜杠可以使我们避免使用常规方式来解释一些字符。


![转译表](./converter.png)


一个通用规则是，使用 `\x` 表示Latin-1中的字符，使用`\u`表示Unicode中的字符 

```
"\xA9" //©
"\u03C0" //π
```


### 字符串的使用

字符串是不可变的，很多操作字符串的方法都是返回的新字符串。

可以使用 `+` 来拼接字符串，可以使用`.length`来获取字符串长度，还有很多可供调用方法：

```

var s = "hello, world" // 定义 一个 字符串 
s. charAt( 0) // => "h": 第一个 字符 
s. charAt( 
s. length- 1) // => "d": 最后 一个 字符 
s. substring( 1, 4) // => "ell": 第 2~ 4 个 字符 
s. slice( 1, 4) // => "ell": 同上 
s. slice(- 3) // => "rld": 最后 三个 字符 
s. indexOf(" l") // => 2: 字符 l 首次 出现 的 位置 
s. lastIndexOf(" l") // => 10: 字符 l 最后 一次 出现 的 位置 
s. indexOf(" l", 3) // => 3: 在 位置 3 及之 后 首次 出现 字符 l 的 位置 
s. split(", ") // => ["hello", "world"] 分割 成 子串 
s. replace(" h", "H") // => "Hello, world": 全文 字符 替换 
s. toUpperCase() // => "HELLO, WORLD"

```

### 模式匹配

JavaScript定义了RegExp这个文本匹配对象，在String和RegExp中都定义了一些用于匹配的函数。

```

var text = "testing: 1, 2, 3"; // 文本 示例 
var pattern = /\d+/ g // 匹配 所有 包含 一个 或 多个 数字 的 实例 
pattern. test( text) // => true: 匹配 成功 
text. search( pattern) // => 9: 首次 匹配 成功 的 位置 
text. match( pattern) // => ["1", "2", "3"]: 所有 匹配 组成 的 数组 
text. replace( pattern, "#"); // => "testing: #, #, #" 
text. split(/\ D+/); // => ["","1"," 2"," 3"]: 用 非 数字 字符 截取 字符串

```






## 3.3 布尔值

任意JavaScript的值都可以转换为布尔值。下面这些值会被转换成false：

```
undefined
null
0
-0
NaN
""  // 空字符串
```

所有其他值，包括所有对象（数组）都会转换成true。

## 3.4 null和undefined


null是JavaScript语言的关键字，它表示一个特殊值，常用来描述“空值”。对null执行typeof预算，结果返回字符串“object”，也就是说，可以将null认为是一个特殊的对象值，含义是“非对象”。

undefined是预定义的全局变量（它和null不一样，它不是关键字），它的值就是“未定义”。在ECMAScript 3中，undefined是可读/写的变量，可以给它赋任意值。这个错误在ECMAScript 5中做了修正，undefined在该版本中是只读的。如果使用typeof运算符得到undefined的类型，则返回“undefined”。

undefined即未定义的值表示更深层次的“空值”。

## 3.5 全局对象

全局对象的属性是全局定义的符号JavaScript程序可以直接使用。

- ·全局属性，比如undefined、Infinity和NaN 
- ·全局函数，比如isNaN（）、parseInt（）（见3.8.2节）和eval（）（见4.12节） 
- ·构造函数，比如Date（）、RegExp（）、String（）、Object（）和Array（）（见3.8.2节） 
- ·全局对象，比如Math和JSON（见6.9节）

2.4.1节列举了全局对象，本章和其他章节都会讲道它们。第三部分可以找到它们，第四部分还可以看到在window下额外增加的全局属性。


代码的最顶级可以用this来获取到全局对象的信用，在客户端JavaScript中，全局Window对象有一个属性window引用其自身，它可以代替this来引用全局对象。

## 3.6 包装对象

只要引用了基本类型的属性，基本类型会被转化成对象，并拥有对象的方法。过程中伴随着包装对象的新建 以及使用在属性之后被销毁。因此在下面的属性设置通常是无效的。

```
var s =  "test";  //创建一个字符串
s.len =  4;       // 给它设置一个属性
var t =  s.len;   //  查询这个属性
```

当然也可以通过new String()、Number()、Boolean()显式创建包装对象。但它们和原始数值并不表现地相同，用typeof运算符，以及===都可以看出差异。

## 3.7 不可变的原始值和可变的对象引用

原始值是基于值得比较，对象值是基于引用的比较。

```
'123'==='123'//true
```

## 3.9 变量声明

如下是常见的合法声明：

```
var  i;
var  sum;

var  i,sum; 
var  message =  "hello";
var i =  0, j =  0, k =  0;

for(var i =  0; i <  10;  i++)  console.log(i);

for(var i =  0,  j=10; i <  10;  i++,j--)  console.log(i*j);

for(var p  in  o)  console.log(p);
```

重复声明仅相当于对变量重复进行了赋值，遗漏的声明会被挂在全局对象下（在ES5严格模式下则会报错）。

## 3.10 变量作用域

### 函数作用域和声明提前

在一些编程语言中，花括号内的每一段代码都具有各自的作用域，而且变量在声明它们的代码段之外是不可见的，称为块级作用域（block  scope）。

JavaScript中没有块级作用域，取而代之地使用了函数作用域（function  scope）：变量在声明它们的函数体以及这个函数体嵌套的任意函数体内都是有定义的。

JavaScript的这个特性被非正式地称为声明提前（hoisting），即JavaScript函数里声明的所有变量（但不涉及赋值）都被“提前”至函数体的顶部，看一下如下代码： 

```
var  scope =  "global";
function  f() {
  console.log(scope);    //  输出"undefined"，而不是"global"
  var  scope =  "local"; //  变量在这里赋初始值，但变量本身在函数体内任何地方均是有定义的
  console.log(scope);    //  输出"local"
}
```

另外举一个实际开发遇到的例子，可能涉及一些ES6 let的用法：

```
function test(index) {
console.log(index);
var index = 1;
}
test(0); // 0 
```

```
function test(index) {
console.log(index);
let index = 1; 
}
test(0); // Uncaught SyntaxError: Identifier 'index' has already been declared
```

### 作为属性的变量


当声明一个JavaScript 全局变量时，实际上是定义了全局对象的一个属性（见3. 5 节）。当使用var 声明一个变量时，创建的这个属性是不可配置的（见6. 7 节），也就是说这个变量无法通过delete 运算符删除？

```
var  truevar =  1;         //  声明一个不可删除的全局变量
fakevar =  2;             //  创建全局对象的一个可删除的属性
this.fakevar2 =  3;       //  同上
delete  truevar           //  =>  false:  变量并没有被删除
delete  fakevar           //  =>  true:  变量被删除
delete  this.fakevar2     //  =>  true:  变量被删除
```

JavaScript全局变量是全局对象的属性，这是在ECMAScript规范中强制规定的。对于局部变量则没有如此规定，但我们可以想象得到，局部变量当做跟函数调用相关的某个对象的属性。ECMAScript 3规范称该对象为“调用对象”（call  object），ECMAScript 5规范称为“声明上下文对象”（declarative environment  record）。

JavaScript可以允许使用this关键字来引用全局对象，却没有方法可以引用局部变量中存放的对象。这种存放局部变量的对象的特有性质，是一种对我们不可见的内部实现。然而，这些局部变量对象存在的观念有助于我们理解作用域链。


### 作用域链

层层上溯找声明，不赘述。












