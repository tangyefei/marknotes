# JavaScript权威指南-第6版


# 第8章 函数

函数除了实参以外，每次调用还会拥有另一个值 -- 本次调用的上下文，即this关键字的值。

如果函数挂载在对象上作为对象的属性，就称它为对象的方法，通过对象来调用它时候，该对象就是此次调用的上下文(context)，也就是该函数this的值。

## 8.1 函数定义

### 定义方式

函数定义有两种方式（结合下面的例子）：

- 定义表达式，局部作用域将包含绑定到函数对象的名称；可以被作用域内前面的代码所调用
- 声明语句，尽管变量提前申明了，但是赋值没有提前申明因此是无法使用的

``` 
// 定义表达式
function add(){} 

// 声明语句
var a = function(){} 


method1(); // 1
method2(); // Error: method2 is not function
function method1(){console.log(1)};
var method2 = function(){console.log(2)};
```

### 返回值

函数的返回值，如果有return语句则返回表达式的值给调用者（如果return后面没跟表达式就是undefined），如果没写return语句则返回undefined。

### 嵌套函数

可以访问嵌套它们的函数的参数和变量

~~疑问：关于两种定义方式哪种不可以出现在循环、条件判断、或try/catch/finally以及with语句?~~

## 8.2 函数调用

### 作为函数调用

ECMAScript3和非严格的ECMASript5，调用的上下文（this的指向）是全局对象，严格模式下则是unfedined。

### 作为方法调用

方法和this关键字是面向对象编程范例的核心。

在对象中调用的函数称为方法调用，通过this指向调用的对象（上下文）。

如果方法调用仍旧返回一个对象，那么又可以继续进行调用，从而形成方法链条的写法，比如：

```
shape.setX(100).setY(100).setSize(50).setOutline("red").setFill("blue").draw();
```

在嵌套调用中，this关键字不会从调用它的函数继承this，如果嵌套函数作为方法调用，则this指向它的对象，如果作为函数调用则指向全局变量（非严格模式下）或者unfefined（严格模式下）：

```
var o = {
	m: function(){
		var self = this;
		console.llg(this === o); // true
		f();
		function f(){
			console.log(this === o); // false, this是全局对象或者undefined
			console.log(self === o); // true
		}
	}
}
```
### 作为构造函数调用

构造函数会基于构造函数的prototype创建一个新的空对象，并将这个对象作为调用的上下文，因此可以在构造函数中通过this来引用这个新创建的对象。比较有欺骗性的，new o.m()看起来是一个方法调动，但调动上下文不是o。

构造函数不用return返回新构造的对象，如果显示地使用return返回一个对象，那么调用表达式的值就是这新对象，如果没有返回值或者返回的是一个原始的值，它将忽略返回值并将仍旧使用新对象作为调用结果。

### 间接调用

可以用call和apply来显示地指定调用时this所指向的值，哪怕这个函数并不属于那个对象。

### 箭头函数（自补充）


this始终指向定义所在上下文的this, call/apply/bind都不能改变它的指向

```
var o = {m: function(){var f = ()=>{console.log(this);}; f(); }}
o.m() // {m:f}
var m = o.m; m(); //window

var o = {m: function(){function f(){console.log(this);};f(); }}
o.m() // window

var f = ()=>{console.log(this);};
f.call({x:1}); // window
```

## 8.3 参数的实参和形参

本节介绍调用函数的实参个数和定义的形参个数不一致时的情形，以及如何测试实参个数类型，并处理非法传入的参数。

### 可选形参

当传入的实参可能比定义的形参要少的时候，最好让后面的形参变为可选的，通过注释加以说明，并在传入和不传入的时候都能得到处理：

```
functiongetPropertyNames(o,/*optional*/a){if(a===undefined)a=[];//如果未定义，则使用新数组for(varpropertyino)a.push(property);returna;}//这个函数调用可以传入1个或2个实参vara=getPropertyNames(o);//将o的属性存储到一个新数组中getPropertyNames(p,a);//将p的属性追加至数组a中

(美)David Flanagan. JavaScript权威指南（原书第6版） (Chinese Edition) (Kindle Locations 3697-3701). 机械工业出版社. Kindle Edition. 
```

### 可变的实参列表，实参对象

当传入函数的实参个数超过形参个数的时候，可以通过arguments获取到实参对象的引用。

实参对象具有一个重要的特性，即在ES3和ES5非严格模式下，arguments对象只是参数的别名，改其中一个会被另外一个同步到。在严格模式下，则无法使用arguments无法给他赋值。

```
function f(x){
	arguments[0] = 2;console.log(x);
}
f(1);
```

在非严格模式下，通过实参对象还可以获取到两个对象callee和caller，它们分别指向当前正在执行的函数 和 执行函数的函数。

### 将对象属性用作实参

这样的好处是，参数的传递顺序无需在关心。

### 实参的类型

形参并未声明类型，传入的之前也未作任何检查，可以在函数代码中根据需求对实参类型进行检验。


## 8.4 作为值(对象)的函数

函数是一种特殊的值，它也可以拥有属性，但我们再函数调用的过程中需要一些”静态“变量来保持某些值不变，最简便的办法就是给函数定义属性，而非定义全局变量。

```
uniqueInteger.counter = 0;
function uniqueInteger(){
	return uniqueInteger.counter++; 
}
```
```
function factorial(n){
	if(!(n in factorial)) {
		factorial[n]  = n * factorial(n - 1);
	}
	return factorial[n];
}
factorial[1] = 1;
```

## 8.5 作为命名空间的函数

3.10.1中介绍了在函数中声明的变量在整个函数体内，在函数外部不可见；不在任何函数中声明的变量是全局变量，在所有的JavaScript程序中都可以访问。JavaScript中是无法声明只在一个代码块内可见的变量，基于整个原因，我们将函数用作临时的命名空间，在这个空间内的变量不会污染到全局的命名空间。


## 8.6 闭包

技术角度来讲，函数都是闭包，它们都关联到作用域链。函数的执行依赖于变量作用域，这个作用域是在函数定义时决定的，而不是函数调用时决定的。真正微妙的是，当定义函数的作用域链 和 调用函数时闭包所指向的作用域链不是指向同一个。如下的函数嵌套中，嵌套的函数被作为返回值返回就发生了这种情况，很多强大的编程技术都用到了它，掌握它至关重要。

先看一个不难理解的例子，返回嵌套函数的执行结果：

```
var scope = 'global scope'
function checkscope(){
	var scope = 'local scope';
	function f(){ return scope; }
	return f();
}
checkscope();
```
我们再将代码修改一些看会发生什么：

```
var scrope = 'global scope'
function checkscope(){
	var scope = 'local scope';
	function f(){ return scope; }
	return f;
}
checkscope()();
```
我们在定义f这个函数的作用域外面调用这个嵌套的函数，会输出什么呢？

函数的执行用到了作用域链，作用域链是在函数定义的时候创建的，嵌套的函数定义在这个作用域链里，因此scope一定是局部变量，不论何时何地执行f()，这种绑定在执行f()时依然有效，这个特性强大到让人吃惊，它可以捕捉到局部变量（和参数）并一直保存下来。这个规则可以概括为，**函数定义的作用域链到函数执行时依然有效**。

在前例中uniqueInteger(）函数的自身属性保存了每次返回的值得，但是恶意代码很容易篡改它或者将非整数的值赋值给它，我们使用闭包将这个值设置成函数调用的局部变量：

```
var uniqueInteger = (function(){
	var counter = 0;
	return function(){
		return counter ++;
	}
})();
```
像counter的变量可以在内部定义的多个嵌套函数中访问，这些函数共享一个作用域链：

```
function counter() {
	var n = 0;
	return {
		count: function(){return n ++;},
		reset: function(){n = 0;}
	}
}
var c = counter(), d = counter();
c.count(); // 0
d.count(); // 0
c.reset(); 
c.count(); // 0
d.count(); // 1
```

每次调用counter()都会创建一个新的作用域链和新的私有变量，不同调用得到的计数器对象包含不同的私有变量。

需要小心的是那些不希望共享的变量会在不经意共享给其他闭包，看如下这个例子：

```
function constfunc(v) {return function(){return v}}
var funcs = [];
for(var i = 0; i < 10; i ++)funcs[i] = constfunc(i);
funcs[5](); //  5
```

```
function constfunc() {
	var funcs = [];
	for(var i = 0; i < 10; i ++) 
		funcs[i] = function(){return i}
	return funcs;
}
var funcs = constfunc();
funcs[5]; // 10
```

后面的例子中创建了10个闭包但是它们是在同一个函数中定义的，因此共享一个i值，因此数组中的函数返回值都是同一个，显然不是我们想要的效果。


**注：闭包再被嵌套的函数访问时候，是无法访问到this的，arguments同理，通常会定义别名来获取到引用。后续的例8.5中会解释使用编程技巧来定义闭包从而能访问到this和argumetns的值。**

## 8.7 函数属性、方法和构造函数

### length

代表函数形参的个数，可以跟arguments.length比较用于确认参数传递个数是否满足条件。

### prototype

指向函数的原型对象，每个函数的原型对象都不同。

### call方法和apply方法

它们的第一个参数是调用的上下文，在函数中可以通过this获取到。如下两小块代码功能很类似

```
var f = function(){}
f.call(o);

o.f = function(){};
o.f();
delete o.f();
```

ES5的严格模式下，第一个参数会变成this的值得，哪怕是null和undefined。

在ES3和ES5的非严格模式下，null和undefined会被全局对象替代，其他原始值则会被包装成相应对象。

### bind方法

关于bind你所不知道的是，除了第一个参数被绑定到this意外，第二个参数会被绑定到对应的实参，这种编程技术称为柯里化：

```
var sum = function(x,y){
return x + y;
}
var succ = sum.bind(null,1);
succ(2);
```

关于执行bind后的函数，如果用作构造函数的情形，该节有一些描述，此处略过。

### toString方法

大多数函数返回源码的字符串，内置函数则返回 `[navtive code]`的字样。



### Function构造函数

可以使用Function的构造函数来定义函数，如下两行代码是一致的:

```
var f = new Function('x', 'y', 'return x + y');//最后一个参数会作为函数体

function f(x, y) {return x + y;}
```

需要注意的是，使用Function所创建的函数，并不使用词法作用域，它作为顶层函数执行。

```
var o = {
	test(){
	  var f = new Function('x', 'y', 'console.log(this);return x + y');
	  f();
	}
}
o.test();//window
```

### 可调用的对象

可调用对象可以用函数表达式来调用，所有函数都是可调用的，并非所有可调用对象都是函数。该部分内容已经比较陈旧，不再论述。


## 8.8 函数式编程

**疑问：那么this的情况都有哪些情况呢？**
**疑问：throw Error回到之代码中断执行吗？**










23