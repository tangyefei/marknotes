# 1.基本数据类型

```
undefined、null、Boolean、String、Number、Symbol
```

# 2. JavaScript原型、原型链有什么特点？

## 原型
每个对象都和另外一个对象关联，这个对象就是原型。可以通过`Object.prototype`或`o.__proto__`获得对原型对象的引用。

每个`Function`对象都会在其内部初始化一个属性，就是`prototype`(原型)，当我们访问一个对象的属性时， 如果这个对象内部不存在这个属性，那么他就会去`prototype`里找这个属性，这个`prototype`又会有自己的`prototype`，于是就这样一直找下去，也就是我们平时所说的原型链的概念。<br/>

特点： `JavaScript`对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变。

## 原型链

```js
function Person() {}
let p = new Person();
// 原型链关系
Person.__proto__ === Function.prototype;
p.__proto__ === Person.prototype;

Person.prototype.__proto__ === Object.prototype
Object.prototype.__proto__ === null

class A {}
class B extends A {}
let a = new A();
let b = new B();
// 原型链关系
a.__proto__ === A.prototype;
b.__proto__ === B.prototype;
b.__proto__.__proto__ === A.prototype;

B.__proto__ === A;
B.prototype.__proto__ === A.prototype;

A.__proto__ === Function.prototype;
A.prototype.__proto__ === Object.prototype;

```
# 3.如何实现数组的随机排序？

```js
let arr = [1,2,3,4,5,6,7,8,9,10]; 
function randSort1(arr) {
  for(let i = 0, len = arr.length; i < len; i++) {
    let rand = parseInt(Math.random() * len);
    [arr[rand], arr[i]] = [arr[i], arr[rand]];
  }
  return arr;
}
```
```js
// 著名的Fisher–Yates shuffle 洗牌算法
function shuffle(arr) {
  let m = arr.length;
  while(m > 1) {
    let index = parseInt(Math.random() * m--);
    [arr[index], arr[m]] = [arr[m], arr[index]]
  }
  return arr;
}
```
```js
let arr = [1,2,3,4,5,6,7,8,9,10];
arr.sort(() => {
  return Math.random() - 0.5;
})
```
# 4.数组去重
```js
function removeDup(arr) {
  let result = [];
  let map = {};
  for(let i = 0; i < arr.length; i++) {
    let temp = arr[i];
    if(!map[temp]) {
      map[temp] = true;
      result.push(temp)
    }
  }
  return result;
}
// reduce
function removeDup(arr) {
  return arr.reduce((res, cur) => {
    let index = res.findIndex(i => i === cur);
    if(index == -1) {
      res.push(cur)
    }
    return res
  }, [])
}
```
```js
Array.from(new Set(arr))
```
```js
[...new Set(arr)]
```
# 5.`typeof`运算符和`instanceof`运算符以及`isPrototypeOf()`方法的区别

`typeof`是一个运算符，用于检测数据的类型，比如基本数据类型`undefined、string、number、boolean`，以及引用数据类型`object、function`，但是对于正则表达式、日期、数组这些引用数据类型，它会全部识别为`object`，无助于了解我们自定义的类的更多信息；<br/>

```
function Cat(){}
var cat = new Cat();
typeof cat //'object'
typeof Cat //'function'
```

`instanceof`同样也是一个运算符，它就能很好识别数据具体是哪一种引用类型，但问题是`instanceof`多个父类都会返回为true。它与`isPrototypeOf`的区别就是它是用来检测构造函数的原型是否存在于指定对象的原型链当中；

```
var d = new Date();
d instanceof Date; //true
d instanceof Object; //true
```

而`isPrototypeOf`是用来检测调用此方法的对象是否存在于指定对象的原型链中，所以本质上就是检测目标不同。

```
function Cat(){}
var cat = new Cat();
Cat.prototype.isPrototypeOf(cat);
```

<br/>

# 6. 描述以下变量的区别：`null`、`undefined`或`undeclared`

- `null` 表示"没有对象"，该处初始化了一个空值，转为数值时为0。<br/>
- `undefined`表示"缺少值"，就是定义没有初始化任何值，转为数值时为`NaN`。<br/>
- `undeclared`:`js`语法错误，没有声明明直接使用，`js`无法找到对应的上下文。<br/>

# 7.`==`和`===`有什么区别？

首先，`== equality` 等同，`=== identity` 恒等。`==`，两边值类型不同的时候，要先进行类型转换，再比较。`===`，不做类型转换，类型不同的一定不等。

`===`比较

- 如果类型不同，就不相等
- 如果两个都是数值，并且是同一个值，那么相等；例外的是，如果其中至少一个是`NaN`，那么不相等。（判断一个值是否是`NaN`，只能用`isNaN()`来判断） 
- 如果两个都是字符串，每个位置的字符都一样，那么相等；否则不相等。 
- 如果两个值都是`true`，或者都是`false`，那么相等。 
- 如果两个值都引用同一个对象或函数，那么相等；否则不相等。 
- 如果两个值都是`null`，或者都是`undefined`，那么相等。 

`==`比较

- 如果一个是`null`、一个是`undefined`，那么[相等]。 
- 如果一个是字符串，一个是数值，把字符串转换成数值再进行比较。 
- 如果任一值是 `true`，把它转换成 `1` 再比较；如果任一值是 `false`，把它转换成 `0` 再比较。 
- 如果一个是对象，另一个是数值或字符串，把对象转换成基础类型的值再比较。

类型转化概述

1. 类型转换发生在：程序期望某个类型数据，而实际格式不符的时候，通常特征是使用了：+、-、*、运算符，或者 if(variable) 判断
2. 类型转换分为（1）原始值到原始值的转换（2）原始值到对象的转换（3）对象到原始值的转换
	1. 	原始值到原始值比较特殊的有：“”转成布尔是false；合规字符串可以转化为数字，两头有非数字/空格组成部分的会转成NaN
	2. 原始值到对象，通过 `String(val)/Number(val)/Boolean(val)` 显式转化成包装对象
	3. 对象到原始值，参考第10条
3. 发生类型转化并不意味着两者相等，比如：`if(undefined) {}` 中，`undefined `被转化为了`false`，并不意味着 `undefined == false`。
4. 运算符管理啊的具体操作规则：`+`（一个是字符串另一个也会转化成字符串），一元运算`++/--`符会将操作转化为数字、一元运算`!`将操作数转化为布尔并取反、`*/-`运算符将两边的转化为数字。
5. 可以使用函数在数字和字符串之间做精准的转化：数字到字符串有 toFixed/toExponential/toPrecisioin，字符串到数字有 Number(str)/parseInt(str)/parseFloat(str)/
6. 对象到原始值：到布尔（都返回true，null为false），到字符串toString->valueOf的处理顺序，到数字遵循valueOf->toString()的处理顺序，获取到原始值时候会停下来用 String/Number显示转化后返回
7. 不同的操作符（`+/-/</==/!=`)，处理对象的时候转化成原始值，有的可能是数字，有的可能是字符串，比如 `[1]+1`//'11'，`[1]-1`//0



对象到数字的转化例子：

```
//[] == 0 的转化过程

[] 
valueOf([]) // []
toString([])  // ''
Number('') // 0

//[2] == 2 的转化过程

[2] 
valueOf([2]) // [2]
toString([2])  // '2'
Number('2') // 2
```





# 8.简述`js`中`this`的指向

第一准则是：`this`永远指向函数运行时所在的对象，而不是函数被创建时所在的对象。
```
var o = {a:function(){console.log(this);}}
o.a();//{a:f}o
var b = o.a;
b();//Window
```

函数作为谁的方法被调用调用，`this`就是谁。<br/>

构造函数的话，如果不用new操作符而直接调用，那即`this`指向`window`。用`new`操作符生成对象实例后，`this`就指向了新生成的对象。<br/>

匿名函数或不处于任何对象中的函数指向`window`。<br/>
如果是`call，apply`等，指定的`this`是谁，就是谁。

# 9. 基本数据类型和引用数据类型

基本数据类型指的是简单的数据段，有`5`种，包括`null、undefined、string、boolean、number、symbol`；<br/>
引用数据类型指的是有多个值构成的对象，包括`object、array、date、regexp、function`等。<br/>

主要区别：<br/>

声明变量时不同的内存分配：前者由于占据的空间大小固定且较小，会被存储在栈当中，也就是变量访问的位置；后者则存储在堆当中，变量访问的其实是一个指针，它指向存储对象的内存地址。<br/>

也正是因为内存分配不同，在复制变量时也不一样。前者复制后2个变量是独立的，因为是把值拷贝了一份；后者则是复制了一个指针，2个变量指向的值是该指针所指向的内容，一旦一方修改，另一方也会受到影响。<br/>

参数传递不同：虽然函数的参数都是按值传递的，但是引用值传递的值是一个内存地址，实参和形参指向的是同一个对象，所以函数内部对这个参数的修改会体现在外部。原始值只是把变量里的值传递给参数，之后参数和这个变量互不影响。

# 10. 深拷贝和浅拷贝

如何区分深拷贝与浅拷贝，简单点来说，就是假设`B`复制了`A`，当修改`A`时，看`B`是否会发生变化，如果`B`也跟着变了，说明这是浅拷贝，拿人手短，如果B没变，那就是深拷贝，自食其力。

```js
  function is(model, value) { return Object.prototype.toString.call(value).slice(8,-1) === model; }
  function isDate(value) { return is('Date', value); }
  function isRegExp(value) { return is('RegExp', value); }
  function isFunction(value) { return is('Function', value); }

  var source = {
    null: null, 
    boolean: 1, 
    undefined: undefined, 
    string: 's',  

    date: new Date(),
    regexp: /\w+/ig,
    func: ()=>{},

    object: {deep:true}, 
    array: [1,2,3],
  };

  function deepCopy(value){
    let type = typeof value;

    // 非复合数据类型，直接返回值
    if(value === null || (type != 'object' && type !=' function')) {
      return value;
    } 
    else if(isDate(value)) {
      const result = new value.constructor(+value)
      return result;
    } 
    else if(isRegExp(value)) {
      const result = new value.constructor(value.source, /\w*$/.exec(value))
      result.lastIndex = value.lastIndex
      return result
    } 
    else if(isFunction(value)) {
      return Object.create(Object.getPrototypeOf(value))
    }
    
    // update: Object.keys会将symbol直接转化为字符串
    const isArr = Array.isArray(value);
    const props = isArr ? value : Object.keys(value);

    let result = isArr ? new Array(value.length) : new Object();

    props.forEach((prop,index) => {
      if(isArr){
        result[index] = deepCopy(prop)
      } else {
        result[prop] = deepCopy(value[prop]);
      }
    });
    return result;
  }

  var target = deepCopy(source);

  console.log('null compare:' + source.null === target.null);
  console.log('boolean compare:' + source.boolean === target.boolean);
  console.log('undefined compare:' + source.undefined === target.undefined);
  console.log('string compare:' + source.string === target.string);
  console.log('date compare:' + source.date === target.date);
  console.log('regexp compare:' + source.regexp === target.regexp);
  console.log('func compare:' + source.func === target.func);
  console.log('object compare:' + source.object === target.object);
  console.log('array compare:' + source.array === target.array);
```
```js
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
```
数组深拷贝方法：
```js
// ...
var a=[1,2,3]
var [...b]=a;//或b=[...a]
b.push(4);
console.log(b);//1,2,3,4
console.log(a)//1,2,3

// concat
var a=[1,2,3]
var c=[];
var b=c.concat(a);
b.push(4);
console.log(b);//1,2,3,4
console.log(a)//1,2,3

// slice
var a=[1,2,3]
var b=a.slice(0);
b.push(4);
console.log(b);//1,2,3,4
console.log(a)//1,2,3

// JSON
var a=[1,2,3]
var c=JSON.stringify(a);
var b=JSON.parse(c);
b.push(4);
console.log(b);//1,2,3,4
console.log(a)//1,2,3
```
# 11.`JSON.parse(JSON.stringify())`实现对对象的深拷贝的一些缺陷

1、如果`obj`里面有时间对象，则`JSON.stringify`后再`JSON.parse`的结果，时间将只是字符串的形式;<br>
2、如果`obj`里有`RegExp、Error`对象，则序列化的结果将只得到空对象;<br>
3、如果`obj`里有函数或者`undefined`，则序列化的结果会把函数或`undefined`丢失;<br>
4、如果`obj`里有`NaN、Infinity`和`-Infinity`，则序列化的结果会变成`null`;<br>
5、`JSON.stringify()`只能序列化对象的可枚举的自有属性，例如 如果`obj`中的对象是有构造函数生成的， 则使用`JSON.parse(JSON.stringify(obj))`深拷贝后，会丢弃对象的`constructor`;<br>
6、如果对象中存在循环引用的情况也无法正确实现深拷贝<br>
