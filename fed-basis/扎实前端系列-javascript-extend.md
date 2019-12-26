# 扎实前端系列：JavaScript实现继承

本篇将介绍在JavaScript中如何实现继承，涵盖了原型的介绍、对象和方法的原型、`__proto__` 和`prototype `的区别、如何使用原型实现类的继承，以及有了ES6的Class语法后如何实现继承。


## 什么是原型

在ES6之前，JavaScript是没有类这个概念的，继承都是通过原型来实现的。

每一个JavaScript对象（null除外）都和另外一个对象关联，“另一个”对象就是我们熟知的原型，每一个对象都从原型继承属性。

## 万物皆对象

在JavaScript中，除了基础数据值以外的所有数据值都看成对象。

```
var o = new Object();
function f() {}
```


比如：对象实例`o`是对象，函数`f`是对象，`o`的构造函数`Object`既是函数，也是对象。

## 获取原型对象

```
var o = {};
o.__proto__ === Object.prototype; //可以使用__proto__获取到原型对象的引用

function f(){}
f.__proto__ === Function.prototype; //true
f.prototype; //{constructor: f}
```

可以通过对象实例的`__proto__`属性获取到实例的原型对象，它指向构造函数的`prototype`属性。

函数是对象的一种，但比较特殊地，函数有`prototype`属性，比如上例中作为构造函数的`Object`。`prototype` 本质上也是一个对象，该对象上对象包含了一个叫`constructor`的属性指向了函数自身。

## 原型对象图谱

既然 `prototype` 只是一个普通的对象，那 `prototype.__proto__` 也会继续指向另外一个对象。

```
function f(){}
f.__proto__ === Function.prototype; //true
f.__proto__.__proto__ === Object.prototype; //true
```

下图完整的展示了对象、函数、构造函数之间关系，特殊地`Object.prototype`也是一个普通对象，但它`__proto__`为null。


![javascript prototype vs __proto__](./javascript-prototype-proto.jpg)


## 原型应用


```
var o = {};
o.x = 1;

function Board(value){
	this.y = value;
}
Board.prototype = o;
Board.prototype.constructor = Board;

var b = new Board(2);

b.x  // 1
```

可以看到，我们给`Board`函数设置的`prototype`指向对象`o`，基于`Board`构造的对象实例`b`查询为上面并不存在的`x`属性的时候，能成功查询到原型对象`o`上的`x`属性。

## 创建对象的三种方式

这三种方式分别是：直接量的方式、`Object.create `创建、使用构造函数创建：

```
var o = {};

var proto = {name: 'parent'};
var a = Object.create(proto)


function Person(){}
var b = new Person();
```

第二种方式中的`proto`会作为创建结果的原型，可以达到对象继承的目标：`a`继承`proto`的属性。

第三种方式稍加改造就可以得到常用的`类`继承，我们把构造函数名（通常是大写）当成类的标志。

## 原型实现类的继承

在下面例子之前，先进行一些总结：

我们通过给构造函数`Person`指定一个`{x:1}`对象作为`prototype`，从而让`Person`的实例拥有查询`x`的能力；我们也曾通过`Object.create({name:'parent'})`的方式，让的实例可以直接查询到`name`。

它们的本质上都是一样的，即：对象调用了自身不存在属性以后，会通过 `__proto__` 去获取对原型对象，然后在原型对象上查询。

下例中的用法使得子类直接继承了父类的原型对象（中的行为），而具体的值则是通过借用父类的构造函数赋值在自身对象上。


```
function A(){}
A.prototype = {
	doSomething(){}
}
function B(args){
	A.call(this, args); // 此处args代表可能的任意参数
}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = A;

var b = new B();
b. doSomething();
```

关于类的原型继承，具体写法可能会有不同，比如下面不优雅的例子，用父类构造出来的对象作为子类的原型对象：

```
function A(){}
function B(){}
B.prototype = new A();
```

## ES6中的类继承

ES6的语法支持类和类的继承，比起原型的方式方便了很多：

```
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	toString() {
		return this.x + ',' + this.y;
	}
}

class ColorPoint extends Point {
	constructor(x, y, color) {
		super(x, y);
		this.color = color;
	}
	toString() {
		return this.color + ' ' + super.toString();
	}
}

var cp = new ColorPoint(1,2,'red');
console.log(cp.toString());//red 1,2
```
