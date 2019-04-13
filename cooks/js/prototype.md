> 如下的代码会输出什么?

```
Object.prototype.a = function(){console.log('object');}
Function.prototype.b = function(){console.log('function');}
function F(){};
var f = new F();
F.a(); 
F.b(); 
f.a(); 
f.b(); 
```

`F`即是`Function`的实例，也是`Object`的实例，所以前两个分别会输出`object`和`function`.

`f`是一个普通的对象，是`Object`的实例，因此`f.a()`输出`object`, f.b()报错`f.b() is not a function`
