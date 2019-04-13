# JavaScript权威指南-第6版

## 第6章 对象


原型式继承是JavaScript的核心特征，即JavaScript对象除了保持自有的属性，还可以从一个被称为原型的对象继承属性，对象的方法通常都是继承的属性。

本章会讲述对象的基础操作（包括 create, set, query, delete, test, enumerate 它的属性），然后讲述来自ECMAScript 5的高级主题。

属性包括名字和值，值得可以是任意JavaScript值，也可以是（ECMAScript 5定义）一个getter或setter函数（或两者都有）。除了名字和值之外，每个属性还有一个与之相关的值，成为属性特性（property attribute）：

- writable attribute：是否可以设置该属性的值
- enumerable attribute：是否可以通过for/in循环返回该属性
- configurable attribute：是否可以删除或修改该属性


在ECMAScript 5之前通过代码给对象创建的所有属性都是writable，enumerable，configurable的，在ECMAScript 5中可以对这些特性加以配置。

除了包含属性外，每个对象还包含三个相关的对象属性（object abbribute）：

- 对象的原型（prototype）指向另外一个对象
- 对象的类（class）一个标志对象类型的字符串
- 对象的扩展标记（extensible flag）指明了（在ECMAScript 5中）是否可以向该对象添加新属性

本章会讲述原型和属性继承，然后详细介绍上面提到的三个特性。

最后定义一些术语用于区分三类JavaScript对象和两类属性：

- 内置对象，由 ECMAScript规范定义的类或者对象
- 宿主对象，有 JavaScript所迁入的宿主环境定义的
- 自定义对象，运行中的JavaScript代码创建的
- 自有属性，直接在对象中定义的
- 继承属性，在对象的原型对象中定义的

### 6.1 创建对象

可以通过如下三种方式来创建对象：

- 对象直接量
- 关键字new
- Object.create()函数（ECMAScript 5中的）

#### a. 通过new常创建对象

使用new运算符来创建初始化一个对象的用法是，关键字new后面跟随一个函数调用，这里的函数成为构造函数（constructor），JavaScript语言核心中的原始类型都包含内置构造函数：

```
var o = new Object();
var a = new Array();
var d = new Date();
var r = new RegExp();
```

除此之外用自定义的构造函数来初始化对象也是非常常见的（注：此处插入了第9章的内容）：

```
TODO 插入代码示例
```

#### b. 原型

每个JavaScript对象都和另一个对象（原型）关联，并从中继承属性：

- 使用对象直接量创建的对象具有同一个原型对象，可以通过Object.prototype获取到对它的引用。
- 使用关键字new和构造函数促进的对象原型就是构造函数的prototype属性的值。

原型的对象都是普通对象，普通对象又具有原型，比如 new Date()创建的对象date，原型是Date.prototype，它又继承自Object.prototype，因此date同时继承了Date.protype和Object.prototype，这种链接的原型对象就是所谓的”原型链“。

后面将会讲述 继承(6.2.2节)的工作机制，以及如何获取到对象的原型(6.8.1节)，以及原型和构造函数的更详细的讨论(第9章)，包括：

- 如何编写构造函数定义对象的类
- 给构造函数的prototype属性赋值让其实例可以直接使用原型上的属性和方法


#### c. Object.create()

Object.create()是一个静态函数，使用只需传入所需的原型对象即可：

```
var o  = Object.create({x: 1, y: 2});
```

通过传入null可以创建一个没有原型的对象，但这种方式创建的的对象不会继承任何东西，甚至不包括基础方法toString，它将不能合”+“一起工作。 如果想创建一个普通的空对象（等同于通过 `{}` 或 `new Object()` 创建的对象）需要 

```
var o = Object.create(Object.prototype);
```

这是强大的特性，因为可以通过任意原型创建新的对象达到继承的目的。这里提供了一个原型继承的实现：

```
function  inherit(p) {
  if  (p  ==  null)  throw  TypeError();
  if  (Object.create) return  Object.create(p);     
  var t =  typeof  p;                   
  if  (t  !==  "object"  && t  !==  "function")  throw  TypeError();
  function  f()  {};                    
  f.prototype =  p;                     
  return  new  f();                     
}
```

在后续部分会介绍Object.create()还可以传入第二个参数，用于对对象的属性进行进一步的描述。

#### d. 总结

对象实例可以访问到原型上的值，但它原型是通过对象的构造函数来指定的，如果你通过 var o = {}; o.prototype={x:1}; 只是给o下面挂了一个对象，想通过o.x访问到数值是undefinfed，正确的做法是o.constructor.prototype.x=1来指定，但是会导致所有的对象实例都有指定的值，所以合理的做法是通过提供自己的构造函数，然后给构造函数制定原型，通过构造函数得到的对象就继承了原型的属性。


#### e. 疑问

如下代码的undefiend怎么解释?

```
function F(){}
F.prototype ={x:1};
var f = new F();
f.constructor.prototype.x // undefined;
```

## 6.2 属性的查询和设置

关于查询有两种方式，即通过（.） 和（[]）的方式，此处不做过多说明。

在JavaScript中，只有在查询属性时才会体会到继承的存在，而设置属性则和继承无关，这是JavaScript的一个重要特性，该特性让程序员可以有选择地覆盖（override）继承的属性。

```
var  unitcircle = {  r:1  };  
var c =  inherit(unitcircle); 
c.x =  1;  c.y =  1;          
c.r =  2;                     
unitcircle.r;   //  =>  1，原型对象没有修改
```


属性赋值要么失败（只读），要么创建一个属性，要么在原始对象（非被继承对象）中设置属性。

但有一个例外，如果o继承自属性x，而这个属性是一个具有setter方法的accessor属性（参照6.6节）。




## 6.3 属性的删除
## 6.4 检测属性
## 6.5 属性的枚举
## 6.6 属性的getter和setter
## 6.7 属性的特性
## 6.8 对象的三个属性

### a. 原型属性

对象的原型属性是在对象创建之处就设置好的

- 通过对象直接量创建的对象使用Object.prototype作为它的原型
- 通过new创建的对象使用构造函数的prototype作为它的原型
- 通过create()创建的对象使用第一个参数作为它的原型

ECAMScript 5可以将对象作为参数传入Object.getPrototypeOf()中查询它的原型。

在ECAMScript 5中没有与之等价的函数，常使用表达式 o.constructor.prototype来检测一个对象的原型。

- new表达式创建的对象，继承一个construct属性，这个属性指向这个对象的构造函数。不适合用上述的方法进行检测对象原型，9.2节会提到原因。
- 通过对象直接量或Object.create()创建的对象包含一个名为constructor的属性指代Object()这个- 构造函数。对象直接量的真正原型是constructor.prototype，但Object.create()创建的对象往往不是这样（是传入的对象）。


```
<!--看下面这个例子上使用constructor.prototype来判定原型就知道有多不靠谱了-->

var o1 = {x: 1};
o1.constructor.prototype === Object.prototype; // true
Object.prototype.isPrototypeOf(o1); // true

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

### b. 类属性

通过toString方法可以获取到对象的类相关的信息，形如 `[object String]`，因此通常截取 [8, -1]位置的字符串得到类信息。

因为某些对象比如Date已经重写了这个方法，需要使用 `Object.prototype.toString.call(o).slice(8, -1)` 的方式来得到类。

### c. 可扩展性

可扩展性(extensible)用以表示是否可以给对象添加新属性。

- Object.isExtensible() Object.preventExtensions() 
- Object.isSealed() Object.seal() 进一步将所有自有属性变为不可配置的，即除了不能增加新属性，已有的属性不能删除和配置
- Object.isFreezen() freeze() 最严格的除了上面的限制，还将所有属性设置为只读


## 6.9 序列化对象
## 6.10 对象方法
