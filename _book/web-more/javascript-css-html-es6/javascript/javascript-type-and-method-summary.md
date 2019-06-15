# JavaScript中的类型和判定方法的实用总结

## 1. 语言类型

JavaScript定义了7种语言类型：

Undefined, Null, Boolean, String, Number, Symbol, Object。

围绕Object，又有很多特殊的类型：

Date, String, Number, Boolean, RegExp, Function。

## 2. 类型判断


### undefined

Undefined类型表示未经赋值的”空值“，该类型只有一个值，可以用全局变量undefined来表示。使用 variable === undefined 或者 variable === void 0 可以判断一个值是否为该类型，后者在ES5之前更可靠因为那时的全局变量undefined是可以被更改的。

### null

Null类型只有一个值，那就是null，它是JavaScript的关键字，可以直接用null来判定值 variable === null。

### Boolean, String, Number

这里的数字、字符串、布尔类型是可以是原始类型，也可以它们的包装对象。简单通过如下代码即可进行类型判定：

```
typeof num === 'number'
typeof str === 'string'
typeof bol === 'boolean'
```

比较特殊的一点是typeof null 得到的是 object，可以把它当做一个”非对象“类型的对象。

### Symbol

同样可以直接使用 typeof 判断Symbol类型

```
typeof sy === 'symbol'
```

### Object

JavaScript是面向对象的编程语言，在开发过程中会用到大量的对象，仅仅使用 typeOf 显然无助于了解更多跟对象相关的信息


我们可以使用 `Object.prototype.toString.apply(variable)` 会返回类似于 `[object Object]`的结构，第二个`Object`会随着构造函数的不同而不同。

因此我们就可以使用如下代码来判断具体的类型：


```
Object.prototype.toString.apply(o).slice(8, -1) === 'Object'
Object.prototype.toString.apply(n).slice(8, -1) === 'Number'
Object.prototype.toString.apply(s).slice(8, -1) === 'String'
Object.prototype.toString.apply(b).slice(8, -1) === 'Boolean'
Object.prototype.toString.apply(d).slice(8, -1) === 'Date'
Object.prototype.toString.apply(r).slice(8, -1) === 'RegExp'
Object.prototype.toString.apply(r).slice(8, -1) === 'Function'
Object.prototype.toString.apply(c).slice(8, -1) === 'CustomClass'
```

## 3. 其他相关方法

### instanceOf运算符

该运算符期望做操作数是对象，有操作符是表示对象的类， 因为所有的对象都是Object的实例，所以判断一个对象是否是一个类的实例的时候，所有对该类的"父类"的检测也能通过。

```
var d = new Date();
d instanceof Date; //true
d instanceof Object; //true
```


为什么不能直接使用instanceOf作为类型检测？原因是Web浏览器可能有多个窗口或者frame存在，每个窗口都有自己的JavaScript环境，都有自己的全局对象，因此一个窗体中的对象将不是另外窗体的的构造函数的实例。




### isPrototypeOf vs constructor.prototype vs constructor

JavaScript希望将原型对象作为类的唯一标志，例如，如下的Cat的实例可以通过isPrototypeOf的方法来判定它是否是属于Cat类：

```
function Cat(){}
var cat = new Cat();
Cat.prototype.isPrototypeOf(cat);
```

创建对象的三种方法中，通过new和Object.create创建的过程中如果指定了prototype，通过constructor.prototype来判定对象所属类是不可靠的：

```
function F(){};
F.prototype = {y: 1};
var o2 = new F();
o2.constructor.prototype === F.prototype; // false 
o2.constructor.prototype === Object.prototype; // true 
F.prototype.isPrototypeOf(o2); // true

var p = {x:1};
var o3 = Object.create(p);
o3.constructor.prototype === p; // false
o3.constructor.prototype === Object.prototype; // true 
p.isPrototypeOf(o3); // true

```

初始化对象的constructor则不能作为类的标志，因为两个不同个构造函数的prototype属性可能指向同一个原型对象。但因为构造函数的”外在表现“，它的名字常被用作类名，而且instanceOf的表现强化了”构造函数是类的共有标志“的印象。


## 4. 使用总结

| 判定  | 逻辑  |
|---|---|
| null  |  val === null |
| undefiend  |  val === undefined |
| boolean  |  typeof val === 'boolean' |
| string  |  typeof val === 'string' |
| number  |  typeof val === 'number' |
| object  |  Object.prototype.toString.apply(val).slice(8, -1) === 'Object' |
| date  |  Object.prototype.toString.apply(val).slice(8, -1) === 'Date' |
| array  |  Object.prototype.toString.apply(val).slice(8, -1) === 'Array' |

















