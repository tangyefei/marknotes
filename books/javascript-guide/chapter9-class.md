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

