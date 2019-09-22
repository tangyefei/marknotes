# JavaScript权威指南-第6版


# 第9章 类和模块

## 9.1 类和原型

第6章的inherit()函数通过继承自传入的对象，返回一个新创建的对象，定义了一个JavaScript类，通常该类是实例还需要进一步的初始化，通常是通过定义一个函数来创建并初始化这个对象：


```
function inherit(proto) {
	if(Object.create) 
		return Object.create(proto);
	else {
		let f = function(){};
		f.prototype = proto;
		return new f();
	}
}

function  range(from,  to) {
  var r =  inherit(range.methods);
  r.from =  from;
  r.to =  to;
  return  r;
}
range.methods = {
  includes:  function  (x) {
    return  this.from  <= x  && x  <=  this.to;  
  },
  foreach:  function  (f) {
    for  (var x =  Math.ceil(this.from); x  <=  this.to;  x++)  f(x);
  },
  toString:  function  ()  {
  	return  "(" +  this.from +  "..." +  this.to +  ")";
  }
 };
 var r = range(1,3);
 r.includes(2);
 r.foreach(console.log);
 console.log(r);
```

## 9.2 类和构造函数

相比9.1中的例子，Range()构造函数是通过new关键字调用的，在调用构造函数之前就已经创建了新对象，Range()只不过是初始this而已，甚至不必返回新创建的对象。

```

function Range( from, to) {
	this. from = from; 
	this. to = to; 
}
Range.prototype = {
	includes: function (x) { 
		return this. from <= x && x <= this. to; 
	}, 
	foreach: function (f) { 
		for (var x = Math. ceil( this. from); x <= this. to; x++) f( x); 
	},
	toString: function () {
		return "(" + this. from + "..." + this. to + ")";
	} 
};
```

### 构造函数和类的标志

原型对象是类的唯一标志，初始化对象的构造函数则不能作为类的标志，因为两个不同个构造函数的prototype属性可能指向同一个原型对象。但因为构造函数的”外在表现“，它的名字常被用作类名。


```
r instanceOf Range // 如果r继承自Range.prototype，则返回true
```

跟直观的理解不同，我们会以为如上只要r是通过Range构造函数构造出来的，就会返回true，实际上检验的是r是否继承自Range.prototype，不过 instanceOf运算符强化了 ”构造函数是类的共有标志“ 的概念。

### constructor属性

```
var F = function(){}
var p = F.prototype;
var c = p.constructor;
c === F
```

可以看到函数的prototype上可以直接拿到构造函数，于是构造函数是类的”公共标志“，因此这个构造函数为对象提供了类：

```
var o = new F();
o.constructor ==== F;
```

如下图示能基本概括构造函数 和 和原型对象之间的关系，包括原型对象对构造函数的反向引用以及构造函数创建的实例。

![relationship](./constructor-prototype-relationship.png)

在9.2的例子中，我们看到Range的整个prototype对象被重写了，因此新的实例中是不含有constructor属性的的，我们可以有两种办法修正它：

- 在prototype的覆盖对象中指定 `constructor: Range`
- 通过不直接设置Range.prototype，而是赋值单个方法，例如给prototype中添加includes方法

```
Range.prototype.includes = function(){...}
```

## 9.3 JavaScript中Java式的类继承

JavaScript中的类牵扯三类对象：构造函数、原型对象、实例对象。定义类的步骤可以分为三步：

- 定义构造函数初始实例对象的属性
- 给构造函数的prototype添加实例方法
- 给构造函数添加类属性和类函数

## 9.4 类的扩充

继承原型的继承机制，意味着创建对象后，修改了原型上的方法，对象的方法也会受到影响。

## 9.5 类和类型

只是关注数据类型，我们只需要使用 typeof 即可，在我们想要具体区分类的时候，可能要用到别的检测手段

- instanceof
- constructor
- 构造函数的名字
- 鸭式辩论

### instanceof运算符

`o instanceo p`，如果`o`继承自`p.prototype`，上述结果返回true。

表达式的右操作数虽然是构造函数，实际上检测的是对象的继承关系。

如果`p`又继承自`d.protoype`, `o instanceof d` 也返回true。

也可以使用 `p.isPrototypeOf(o)`来检测原型。

### constructor属性

构造函数是类的公共标志，可以使用如下代码识别对象：

```
function typeAndValue( x) { 
	if (x == null) return ""; // Null 和 undefined 没有 构造 函数 
	switch( x. constructor) { 
	case Number: return "Number: " + x; // 处理 原始 类型 
	case String: return "String: '" + x + "'"; 	
	case Date: return "Date: " + x; // 处理 内置 类型 
	case RegExp: return "Regexp: " + x; 
	case Complex: return "Complex: " + x; // 处理 自定义 类型 
	}
}
```

存在的问题是，有些对象可能没有constructor，比如在定义类的prototype对象的时候，就没指定constructor。

```
function T(){}
var t = new T();
t.constructor === T; // true
T.prototype = {};


var tt = new T();
tt.constructor === T; //false
t.constructor === T; // true
```

### 构造函数的名称

不论instanceof还是constructor，在在上下文中存在多个上下文的时候是无法准确判断的，因此可以考虑使用构造函数的名字，而不是构造函数的本身作为判定依据。

### 鸭式辩论

不关注”类是什么“，而关注”对象能做什么“。

## 9.6 JavaScript中的面向对象技术

### 比较方法

类的实例要进行比较，需要定义合适的方法，这里会尝试借用Java中的方法功能，要注意的是相等比较通畅需要根据上下文来决定。

如下是Range类实现的equals方法

```
// Range 类 重写 它的 constructor 属性， 现在 将它 添加 进去 Range. prototype. constructor = Range; // 一个 Range 对象 和 其他 不是 Range 的 对象 均不 相等 // 当 且 仅 当 两个 范围 的 端点 相等， 它们 才 相等 Range. prototype. equals = function( that) { if (that == null) return false; // 处理 null 和 undefined if (that. constructor !== Range) return false; // 处理 非 Range 对象 // 当 且 仅 当 两个 端点 相等， 才 返回 true return this. from == that. from && this. to == that. to; }
```

Set的实现则稍微复杂一点

```
Set. prototype. equals = function (that) { // 一些 次要 情况 的 快捷 处理 if (this === that) return true; // 如果 that 对象 不是 一个 集合， 它 和 this 不相等 // 我们 用到 了 instanceof， 使得 这个 方法 可以 用于 Set 的 任何 子类 // 如果 希望 采用 鸭 式 辩 型 的 方法， 可以 降低 检查 的 严格 程度 // 或者 可以 通过 this. constructor == that. constructor 来 加强 检查 的 严格 程度 // 注意， null 和 undefined 两个 值 是 无法 用于 instanceof 运算 的 if (! (that instanceof Set)) return false; // 如果 两个 集合 的 大小 不一样， 则 它们 不相等 if (this. size() != that. size()) return false; // 现在 检查 两个 集合 中的 元素 是否 完全 一样 // 如果 两个 集合 不相等， 则 通过 抛出 异常 来 终止 foreach 循环 try { this. foreach( function (v) { if (!that. contains( v)) throw false; }); return true; // 所有 的 元素 都 匹配: 两个 集合 相等 } catch( x) { if (x === false) return false; // 如果 集合 中有 元素 在另 外 一个 集合 中 不存在 throw x; // 重新 抛出 异常 } };
```

要使用关系运算符比较对象时，会首先使用valueOf()将对象转化为原始对象，但valueOf()不存在时，我们模仿Java定义compareTo方法，根据比较结果返回大于/等于/小于零的值。

比如可以给Range定义compareTo用于比较

```
// 根据 下 边界 来 对 Range 对象 排序， 如果 下边 界 相等 则 比较 上 边界 // 如果 传入 非 Range 值， 则 抛出 异常 // 当 且 仅 当 this. equals( that) 时， 才 返回 0 Range. prototype. compareTo = function( that) { if (!(that instanceof Range)) throw new Error(" Can' t compare a Range with " + that); var diff = this. from - that. from; // 比较 下 边界 if (diff == 0) diff = this. to - that. to; // 如果 相等， 比较 上 边界 return diff; };

```

有了compareTo方法以后，Array进行排序就变得更简单了，直接将compareTo方法传递给sort的处理函数即可。

### 方法借用

方法只是赋值给对象属性的函数，它同样可以被赋值给其他对象，比如我们可以将Array.prototype的方法赋值给类数组对象，在JavaScript中称为方法借用。

### 私有状态

要模拟类似Java语言中的私有变量，可以在构造函数中再定义一个函数，该函数可以访问构造函数的参数/变量。

```
function Range( from, to) { // 不要 将 端点 保存 为 对象 的 属性， 相反 // 定义 存取 器 函数 来 返回 端点 的 值 // 这些 值 都 保 存在 闭 包 中 this. from = function () { return from; }; this. to = function () { return to; }; } // 原型 上 的 方法 无法 直接 操作 端点 // 它们 必须 调用 存取 器 方法 Range. prototype = { constructor: Range, includes: function (x) { return this. from() <= x && x <= this. to(); }, foreach: function (f) { for (var x = Math. ceil( this. from()), max = this. to(); x <= max; x++) f( x); }, toString: function () { return "(" + this. from() + "..." + this. to() + ")"; } };

```

要注意的是，这里的from、to的值是不可以直接访问到的，必须通过方法，但是from() to()函数是可以被重写的。

```
var r = new Range( 1, 5); //一个 不可 修改 的 范围 r. from = function() { return 0; }; //通过 方法 替换 来 修改 它
```

注：使用闭包来封装类的会运用更多内存。


### 构造函数重载和工厂函数

下面例子实现了根据传入参数的不同，执行不同的初始化

```
function Set() { this. values = {}; // 用 这个 对象 的 属性 来 保存 这个 集合 this. n = 0; // 集合 中 值 的 个数 // 如果 传入 一个 类 数组 的 对象， 将 这个 元素 添加 至 集合 中 // 否则， 将 所有 的 参数 都 添加 至 集合 中 if (arguments. length == 1 && isArrayLike( arguments[ 0])) this. add. apply( this, arguments[ 0]); else if (arguments. length > 0) this. add. apply( this, arguments); }
```

下面的例子是使用一个工厂方法来初始化Set对象

```
Set. fromArray = function( a) { s = new Set(); //创建 一个 空 集合 s. add. apply( s, a); //将 数组 a 的 成员 作为 参数 传入 add() 方法 return s; // 返回 这个 新 集合 };
```

## 9.7 子类

### 定义子类

这两行代码是JavaScript中创建子类的关键：

```
B. prototype = inherit( A. prototype); // 子类 派生 自 父 类 B. prototype. constructor = B; //重载 继承 来的 constructor 属性
```

### 构造函数和方法链

在子类中调用父类的构造函数和方法：

```
/* * NonNullSet 是 Set 的 子类， 它的 成员 不能 是 null 和 undefined */ function NonNullSet() { //仅 链 接到 父 类 //作为 普通 函数 调用 父 类 的 构造 函数 来 初始化 通过 该 构造 函数 调用 创建 的 对象 Set. apply( this, arguments); } // 将 NonNullSet 设置 为 Set 的 子类 NonNullSet. prototype = inherit( Set. prototype); NonNullSet. prototype. constructor = NonNullSet; // 为了 将 null 和 undefined 排除 在外， 只须 重写 add() 方法 NonNullSet. prototype. add = function() { //检查 参数 是不是 null 或 undefined for (var i = 0; i < arguments. length; i++) if (arguments[ i] == null) throw new Error(" Can' t add null or undefined to a NonNullSet"); //调用 父 类 的 add() 方法 以 执行 实际 插入 操作 return Set. prototype. add. apply( this, arguments); };
```

### 组合 vs 子类

面向对象中一条广为人知id设计原则是：组合优于继承。下面的例子尝试说明其原理：

```
/* * 实现 一个 FilteredSet， 它 包装 某个 指定 的" 集合" 对象， * 并对 传入 add() 方法 的 值 应用 了 某种 指定 的 过滤器 * "范围" 类 中 其他 所有 的 核心 方法 延续 到 包装 后的 实例 中 */ var FilteredSet = Set. extend( function FilteredSet( set, filter) { // 构造 函数 this. set = set; this. filter = filter; }, { // 实例 方法 add: function() { // 如果 已有 过滤器， 直接 使用 它 if (this. filter) { for (var i = 0; i < arguments. length; i++) { var v = arguments[ i]; if (!this. filter( v)) throw new Error(" FilteredSet: value " + v + " rejected by filter"); } } // 调用 set 中的 add() 方法 this. set. add. apply( this. set, arguments); return this; }, // 剩下 的 方法 都 保持 不变 remove: function() { this. set. remove. apply( this. set, arguments); return this; }, contains: function( v) { return this. set. contains( v); }, size: function() { return this. set. size(); }, foreach: function( f, c) { this. set. foreach( f, c); } });

```

### 类的层次结构和抽象类

该节定义抽象的集合类，实现了继承。

示例代码比较长，考虑到有了ES6以后，深究价值不大，暂且跳过。

## 9.8 ECMAScript 5中的类

### 让属性不可枚举

例9-6中Wie了将对象存储为成员，给添加到集合的任何对象都定义了”对象id“属性，而它是只可以在for/in中被遍历到的，ECMAScript 5中可以设置”不可枚举“来避免属性被遍历到。

### 定义不可变的类

通过设置属性为不可枚举（就像内部属性一样），并使属性为只读的，可以定义不可变的类。

### 封装对象状态

通过ECMAScript 5中setter/getter方法将状态变量封装起来，这里两个方法配置为无法删除的，就能避免方法被覆盖。

### 防止类的扩展

- Object.preventExtensions()可以将对象配置为不可扩展的，从而不能给对象添加任何属性。
- Object.seal()更进一步能组织用户给对象添加新属性外，还能将已有属性设置为不可配置的，这样就不能删除这些属性了（但可以是可写的 以及 将将属性转化为只读）。

### 子类和ECMAScript 5

可以使用Object.create()方法来实现子类。

### 属性描述符

本例中应用了6.7节中介绍的属性描述符，主要包含配置对象的属性描述符以及获取描述符的对象。


## 9.9 模块

将代码组织到类中是为了让代码更加”模块化“，然而这不是唯一的模块化方式，只要以模块的形式编写代码，任何的代码块都可以当做模块。

JavaScript库定义了自己的模块系统，它们有自己的声明和加x载模块的方法。CommonJs作为服务端的规范，同样适用了require(）函数。模块化的核心是不同模块避免修改全局执行上下文，后续模块应该在它们所期待的上下文中执行。

后续将介绍如何在模块中使用全局标志，从而组织成一个模块代码。

### 用作命名空间的对象

在签署的例子中，我们定义了Set类，它上面包含属性和方法，其实就已经创造了一个命名空间，只是使用的时候，我们很难知道它是否会更其他人定义的模块冲突，可以用很长的命名空间来导入模块，并且让模块文件和命名空间相匹配，比如

```
var sets = com.davisflanagan.collection.sets;
```

按照约定应该被存放在

```
com/davisflanagan/collection/sets
```

### 作为私有命名空间的函数


在函数中定义的变量和函数都属于函数的局部变量，在函数的外部是不可见的，可以将这个函数用作模块的私有命名空间。将书中示例简单化，可以看到v2s玩不不可以访问的：

```
(function innovation(){

	function v2s(val){}
	
	function Set(){
		this.values = {};
	}
	Set.prototype.contains = function(value) {
		return this.values.hasOwnProperty(v2s(value));
	}
	return set;

})();
```

本节围绕上述原理还继续衍生出了几种不同的将导出公用的方法，比如：



```
var collections;

if(!collections) collections = {};

collections.sets = (function namepsace() {
   //在此处定义各种集合
	functio Set(){}
	return {
		Set
	}
})();
```


```
var collections;

if(!collections) collections = {};

collections.sets = (new function namepsace() {
   //在此处定义各种集合
	functio Set(){}
	this.Set = Set;
})();
```

