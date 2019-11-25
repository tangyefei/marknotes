# JavaScript权威指南-第6版

# 第一部分

# 第6章 对象


原型式继承是JavaScript的核心特征，即JavaScript对象除了保持自有的属性，还可以从一个被称为原型的对象继承属性，对象的方法通常都是继承的属性，本章会详细讲述原型和属性继承。

本章会讲述对象的基础操作（create, set, query, delete, test, enumerate），然后介绍来自ECMAScript 5的高级主题：

属性包括名字和值，名字可以是字符串或Symbol对象，值可以是任意JavaScript值，除了名字和值之外，每个属性还有一个与之相关的值，称为属性特性（property attribute）：

- writable attribute：是否可以设置该属性的值
- enumerable attribute：是否可以通过for/in循环返回该属性
- configurable attribute：是否可以删除或修改该属性

在ECMAScript 5之前通过代码给对象创建的所有属性都是writable，enumerable，configurable的，在ECMAScript 5中可以对这些特性加以配置。

属性的值也可以是（ECMAScript 5定义）一个getter或setter函数（或两者都有）。

除了自身的属性外，每个对象还包含三个相关的对象属性（object abbribute），本章会详细介绍上面提到的三个特性的用法。

- 对象的原型（prototype）指向另外一个对象
- 对象的类（class）一个标志对象类型的字符串
- 对象的扩展标记（extensible flag）指明了（在ECMAScript 5中）是否可以向该对象添加新属性




最后定义一些术语用于区分三类JavaScript对象和两类属性：

- 内置对象，由 ECMAScript规范定义的类或者对象
- 宿主对象，有 JavaScript所嵌入的宿主环境定义的对象
- 自定义对象，运行中的JavaScript代码创建的
- 自有属性，直接在对象中定义的
- 继承属性，在对象的原型对象中定义的

## 6.1 创建对象

可以通过如下三种方式来创建对象：

- 对象直接量
- 关键字new
- Object.create()函数（ECMAScript 5中的）

#### a. 通过new常创建对象

使用new运算符来创建初始化一个对象的用法是，关键字new后面跟随一个函数调用，这里的函数称为构造函数（constructor），JavaScript语言核心中的原始类型都包含内置构造函数：

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

- 使用对象直接量创建的对象obj具有同一个原型对象，可以通过`obj.__proto__` 或 `Object.prototype` 获取到对它的引用。
- 使用关键字new和构造函数创建的对象原型就是构造函数的prototype属性的值。

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

#### d. 自总结

对象实例可以访问到原型上的值，但它原型是通过对象的构造函数来指定的，比如要在Object的原型上挂载东西，那么是通过`Object.prototype.x = 1`。如果你通过 `var o = {}; o.prototype={x:1};` 只是给o下面挂了一个名为prototype的属性，它的值是一个对象，想通过o.x访问到数值是undefined。


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


属性赋值要么失败（只读），要么在当前对象上创建/设置一个属性。

**但有一个例外，如果o继承自属性x，而这个属性是一个具有setter方法的accessor属性（参照6.6节）。**




## 6.3 属性的删除

delete 可以删除自有属性，不可以删除继承属性
delete 删除成功或者没有任何副作用都会返回true
delete 不能删除那些可配置型为false的属性

关于delete有一些注意事项，一些内置对象的属性是不可配置的，通过变量声明或函数声明创建的全局对象也是如此。如下为ES3中非严格模式下：

```
delete Object.prototype; //不能删除，属性不可配置
var x = 1; // 声明一个全局变量 
delete this. x; // 不能删除这个属性 
function f() {} // 声明一个全局函数 
delete this. f; // 也不能删除全局函数
```

## 6.4 检测属性

判断一个属性是否在对象中，可以通过如下方法来完成，甚至仅通过属性检查也可以做到这一点：

- `attr in obj`、
- `obj.hasOwnProperty(attr)`、
- `obj.propertyIsEnumerable(attr)` 

具体的使用说明：

- `in` 自有属性或者继承属性包含时返回`true`
- `hasOwnProperty` 仅在自有属性时返回`true`
- `propertyIsEnumerable` 仅在自有属性并且可枚举时返回`true`
- `o.attribute !== undefined` 也可以简单判定属性是否存在，但无法处理属性存在值为`undefined`的特例


## 6.5 属性的枚举

某些内置属性是不可枚举的，比如

```
Object.prototype.propertyisEnumerable("toString") // false 
```

- `for in`遍历可枚举的属性，包括自有的和继承的
- `Object.keys()`列举所有可枚举的自有属性
- `Object.getOwnPropertyNames()`获取所有自有属性而不管它是不是可枚举的

**注意 in 和 for...in 的区别**

## 6.6 属性的getter和setter

对象由名字、值和一组特性（attributes）组成，在ES5中属性值可以用一个或两个方法代替（getter和setter），用这样的方式定义的属性叫做存取器属性（accessor property）。和数据属性不同，存储器属性不具有writable attribute，加上没有 value attribute，存储器属性包含四个特性：

- getter
- setter
- enumerable
- configurable


我们可以使用Object.getOwnPropertyDescriptor(o, propertyName)方法来获取到属性特性的描述对象。

```
var o = {
	x: 1.0,
	get location() {},
	set location(value) {},
}
Object.getOwnPropertyDescriptor(o, 'location') // {get: ƒ, set: ƒ, enumerable: true, configurable: true}
```

定义存取器属性的方法如下：	

```
var o = {
	x: 1.0,
	get location() {},
	set location(value) {},
}
```

和数据属性一样，存储器属性是可以继承的；另外如果对象中定义了重复的值的属性和存储器属性，在定义的顺序上后出现的覆盖前出现的。


注：如果set/get属性和值属性同时存在，后出现的将会覆盖先出现的。


## 6.7 属性的特性


我们把属性的值看成属性的特性，因此一个属性包含一个名字和四个特性：value、writable、enumerable、configurable。

存储器属性setter/getter不具备value、writable特性（而是由setter是否存在决定的），因此也有四个特性： set、get、enumerable、configurable。


ECMAScript 5中定义了名为 property descriptor 的对象，可以使用 Object.getOwnPropertyDescriptor()获取对象的特定属性的描述符，可以使用Objbect.defineProperty()来修改属性特性。

```
var o = {};
Object.defineProperty(o, 'x', {
	value: 1,
	writable: true,
	enumerable: false,
	configurable: true
});
o.x;
Object.keys(o);//[]
Object.defineProperty(o,'x', {writable: false});
o.x = 2;
o.x; // 1
Object.defineProperty(o, 'x', {value: 2}); // configurable为true所以可以修改
o.x; // 2
Object.defineProperty(o, 'x', {get: function(){return 0;}})
o.x; // 0
```

Object.defineProperty不必传入所有的四个特性，未传递的值默认为false或undefined。

Object.defineProperty不能修改继承属性。

可以使用Object.defineProperties来修改/创建多个属性，只需要将第二个参数改为一个如下的映射对象即可。

Object.defineProperties(o, {'x': { value: 1, writable: true, enumerable: false, configurable: true }});
  
参照6.8.3节，给不可扩展的对象新增属性会抛出类型错误异常。

对于那些不允许创建或修改的属性，如果使用对其操作，会抛出类型错误异常。完整规则如下：
 
- 如果属性是不可配置的，则不能修改它的可配置性和可枚举性
- 如果存取器属性是不可配置的，则不能修改其getter和setter方法，也不能将它转换为数据属性
- 如果数据属性是不可配置的，则不能将它转换为存取器属性
- 如果数据属性是不可配置的，则不能将它的可写性从false修改为true，但可以从true修改为false
- 如果数据属性是不可配置且不可写的，则不能修改它的值。然而可配置但不可写属性的值是可以修改的（实际上是先将它标为可写的，然后修改它的值，最后转换为不可写的）。


如下实现了将属性之外的特性也赋值的extend方法：

```

Object.defineProperty(Object.prototype,"extend",
  {
    writable:true,
    enumerable:false,
    configurable:true,
    value:function(o){
      var names=Object.getOwnPropertyNames(o);
      for (vari=0;i<names.length;i++){
        if(names[i]inthis)
          continue;
        var desc=Object.getOwnPropertyDescriptor(o,names[i]);
        Object.defineProperty(this,names[i],desc);
        }
      }
    }
);
```


在6.6节中通过set/get在对象直接量中定义了对象的存储器属性，另外专门有一些方法用于对存储器属性进行查询和设置。

在ECMAScript 5中我们已经有Object.getOwnPropertyDescriptor() 和 Object.defineProperty()方法，所以此处不再对老的API进行记录。

## 6.8 对象的三个属性

### a. 原型属性

对象的原型属性是在对象创建之初就设置好的，

ECAMScript 5可以将对象作为参数传入Object.getPrototypeOf()中查询它的原型。

如下例子还会结合使用`o.constructor.prototype`的方式判断原型，可以看到它有时是不可靠的：

**Case1** 通过对象直接量创建的对象使用Object.prototype作为它的原型

```
var o = {};
o.constructor == Object;//true
o.constructor.prototype == Object.prototype;//true

Object.getPrototypeOf(o) == Object.prototype;//true
Object.prototype.isPrototypOf(o);//true

```

**Case2** 通过new创建的对象使用构造函数的prototype作为它的原型

```

var d = new Date();
d.constructor == Date;//true
d.constructor.prototype == Date.prototype;//true

Object.getPrototypeOf(d) == Date.prototype;//true
Date.prototype.isPrototypOf(d);//true
```

**Case3** 通过create()创建的对象使用第一个参数作为它的原型

```
var p = {x:1}
var o = Object.create(p);

o.constructor == Object;

o.constructor.prototype == Object.prototype;//true
o.constructor.prototype == p;//false

p.isPrototypeOf(o); // true  o继承自p
Object.prototype.isPrototypeOf(o);//true p继承自Object.prototype 跟预期会有偏差

Object.getPrototypeOf(o) == p;//true
Object.getPrototypeOf(o) == Object.prototype;//false
```

另外，从如下例子中可以看出，尽管我们改了构造函数F的prototype，通过constructor.prototype访问到的仍旧是Object.prototype，可见使用提供的方法判定prototype更靠谱：

```
function F(){};
F.prototype = {y: 1};
var o2 = new F();
o2.constructor.prototype === F.prototype; // false 
o2.constructor.prototype === Object.prototype; // true 
F.prototype.isPrototypeOf(o2); // true
Object.getPrototypeOf(o2) == F.prototype;//true
```

### b. 类属性

通过toString方法可以获取到对象的类相关的信息，形如 `[object String]`，因此通常截取`Class.prototype.toString()` 的 [8, -1]位置的字符串得到类信息。

因为某些对象比如Date已经重写了这个方法，需要使用 `Object.prototype.toString.call(o).slice(8, -1)` 的方式来得到类。

### c. 可扩展性

可扩展性(extensible)用以表示是否可以给对象添加新属性。

- Object.isExtensible() Object.preventExtensions() 
- Object.isSealed() Object.seal() 进一步将所有自有属性变为不可配置的，即除了不能增加新属性，已有的属性不能删除和配置
- Object.isFreezen() freeze() 最严格的除了上面的限制，还将所有属性设置为只读


## 6.9 序列化对象


JSON（JavaScript Object Notation）的语法和对象/数组直接量的语法非常接近，它只是JavaScript语法的子集，因此不能表示JavaScript中的所有值。

序列化NaN、Infinity、-Infinity的结果为null，序列化Date的结果是ISO格式的字符串。

函数、正则表达式、Error、Undefined的值不支持序列化和还原。

JSON.stringify只可以序列化对象可枚举的自有属性。

JSON.stringify和JSON.parse都可以指定第二个参数，用于指定需要序列化或还原的属性列表。


## 6.10 对象方法


前述已经讨论过 Object.getPrototypeOf、Object.create()、isPrototypeOf()、 hasOwnProperty()、propertyIsEnumerable()，本章继续对Object.prototype中的方法进行详解。

### toString方法

在使用+号连接字符串和对象，或者在期望使用字符串的地方会调用toString方法。

Object默认的toString方法返回的非常有限 `[object Object]`，很多对象的子类的toString方法有自己的默认实现。

可以自己重写toString方法，详见9.6.3节。

### toLocaleString方法

返回一个表示这个对象的本地化字符串。

### toJSON方法

Object.prototype中是没有toJSON方法，调用JSON.stringify的时候如果发现有toJSON方法会调用它并把结果值当结果。

### valueOf方法

在需要将对象转化为原始值的时候才会调用。9.6.3节会介绍如何给自定义的对象类型定义valueOf方法。