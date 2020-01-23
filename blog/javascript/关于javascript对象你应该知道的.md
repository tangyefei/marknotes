
# 关于对象应该知道的


### 1. 如何判定一个对象上是否有某个属性

```
obj[attr] != undefined; //自有的 + 继承的 属性，不能判定属性值本身就是undefined的情况，和枚举无关
attr in obj; // 自有的 + 继承的 属性，和枚举无关
obj.hasOwnProperty(attr) // 自有的属性
obj.propertyIsEnumerable(attr) //自有的 & 可枚举的属性
```

### 2. 如何枚举一个对象上的属性

```
for(attr in obj); // 遍历 自有 + 继承的可枚举的属性
Object.keys(obj); //返回  自有的 & 可枚举的属性数组
Object.getOwnPropertyNames(obj); //返回 自有的属性，而不管是否可枚举
```

### 3. 属性的特性

对象上的属性具有如下三个特性

- writable attribute：是否可以设置该属性的值
- enumerable attribute：是否可以通过for/in循环返回该属性
- configurable attribute：是否可以删除或修改该属性

如果是属性使用存储器来表示，那么它没有writable attribute，多了set和get属性

  
- getter attribute
- setter attribute
- enumerable attribute
- configurable attribute


### 4. 判定属性的原型


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

