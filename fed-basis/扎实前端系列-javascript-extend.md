### 扎实前端系列：JavaScript实现继承


在ES6之前，JavaScript是没有类这个概念的，继承都是通过原型来实现的。

#### 什么是原型

每一个JavaScript对象（null除外）都和另外一个对象关联，“另一个”对象就是我们熟知的原型，每一个对象都从原型继承属性[[1]](6.1.3)。

#### 万物皆对象

在JavaScript中，除了基础数据类型外，可以把所有数据值都看成对象。

比如，对象实例`o`是对象，对象`o`的构造函数`Object`即是函数、也是对象；方法`f`是对象，方法的构造函数`Function`也是对象。

```
var o = new Object();
function f() {}
```

#### 获取原型对象

我们可以通过对象的`__proto__`获取到对象实例的原型对象，它指向对象的构造函数的`prototype`属性。

```
var o = {};
o.__proto__ === Object.prototype; //可以使用__proto__获取到原型对象的引用
```

由此可见，对象和函数（对象的一种）的一个区别是，函数除了有`__proto__`属性外，还有`prototype`属性。

这个 `prototype` 属性到底是个什么呢？可以理解为它就是一个普通的对象，对象包含了一个 `constructor`属性执行了函数自身


```
function f(){}
f.__proto__ === Function.prototype; //true
f.prototype; //{constructor: f}
```

那么问题来了，既然 `prototype` 只是一个普通的对象，那 `prototype.__proto__` 也会继续指向另外一个对象。最终在`Object.prototype`这个原型对象上，这条链最终到终点。

```
f.__proto__.__proto__ === Object.prototype; // true
Function.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null;
```

![javascript prototype vs __proto__](./javascript-prototype-proto.jpg)





比如，`f`的`__proto__`指向的是构造函数的`Function.prototype`属性，`f.`的`prototype`指向的是自然就是`f.prototype`。

function Person(){}

var p = new Person();
p.__proto__ === Person.prototype;
```

#### 原型继承

```
var o = {};
o.x = 1;

function P1(){}
P1.prototype = o;
var p1 = new P1();
p1.y = 2;

function P2(){}
P2.prototype = p1;
var p2 = new P2();
p2.z = 3;

p2.x + p2.y  // 3
```

在p2中查找属性x发现不存在，会去p2的原型对象（即P2.prototype)中去找，如果也没有则会继续往p1的原型对象上找，最终找到结果为1。




[1 JavaScrpt权威指南第6.1.3节](JavaScrpt权威指南第6.1.3节)




