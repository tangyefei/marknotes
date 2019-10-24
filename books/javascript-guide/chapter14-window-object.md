lv1 14章 Window对象

lv2 多窗口和窗体

浏览器窗口可以打开多个页签，它们上下文独立，有各自的Window对象，脚本通常不知道其他标签页的存在，更不可能有交互操作。

lv3打 开和关闭窗口

lv4 打开窗口

但是窗口可以打开/关闭新的窗口，这样也就不算是完全没有关系。

```
window.open(url, name, args, replaceHistory)
```

第一个参数为限时文档的URL

第二个参数是新窗口的名字，如果名字是已经存在的窗口名会直接使用已经打开的窗口，否则打开新的窗口并将指定名字赋给它，如果省略参数，则会使用指定的`_blank`参数打开新的**未命名的**窗口。


第三个参数是用于表明窗口是如何打开的各种参数，省略该参数将会用默认大小打开。概述形式非标准的，HTML5规范也主张忽略它。

第四个参数只有在第二个参数是已存在的窗口才有用，它表示是替换窗口的浏览器历史条目，创建新的条目。注：书中提及false是默认，但在Chrome上尝试下来发现true才是默认。


open方法的返回值是新创建窗口的对象，可以通过该引用对象调用窗口上的方法。在被打开的窗口中，可以通过opener引用到打开它的窗口。


因为广告商会通过上述方法在窗口弹出广告，因此浏览器通常会过滤它，只有通过手动点击按钮或链接的时候才会调用。


```
// 窗口1中执行

var w = window.open('https://baidu.com');
w.alert('alert window 2');
w.opener == w;

// 窗口2中执行

opener.alert('alter window 1');
```

lv4 关闭窗口

如果创建了Window对象，可以通过close方法将它关掉：

w.close();

在运行窗口上则可以通过如下JavaScript代码把自己关掉 

window.close();

大多数浏览器只允许关闭自己创建的窗口，如果要关闭其他窗口，可以用对话框提示用户。在非顶级窗口（猜想应该是iframe)的Window对象上执行close犯法，不会有任何效果。

一个窗口关闭额，代表它的Window对象仍然存在，但有一个closed为true属性，它的document是null，它 的方法也通常无法工作（对document和方法无法工作表示怀疑）。

疑问：window和Window的关系是什么


lv3 窗体之间的关系

JavaScript代码中可以使用window或self来引用自己的窗口/窗体，使用parent可应用包含它的窗口/窗体的Window对象。如果本省就是顶级的窗口，那么parent属性就是本身：`parent == self`。parent的引用可以层层嵌套，top可以直接引用顶层窗口，如果本身就是顶级窗口，那么`top == self`。


我们通过iframe创建窗体，可以有多重方式来获取它。

 <iframe id="f1"></iframe> 那么该元素的对象可以通过如下方式获取到
 
```
var iframeElement = document.getElementById('f1');
var contentWindow = iframeElement.contentWindow;
```

通常可以使用Window对象的frames属性，它包含了包含的窗口和窗体的子窗体，作为数组独享，可以通过数字或窗体名来进行索引。比如要引用第二个窗体的第三个子窗体，可以通过如下方式：

```
frames[1].frames[2]
```

注意上述返回的是Window对象，而不是iframe对象，如果给iframe指定了id或name，还可以通过名字来进行索引，比如 `frames.f1`。

尽管可以通过document.getElementById/Name拿到窗体，它和frames的引用还是不同的。它查询到的是元素对象，而frames引用的是窗体对象。相当于frames是一个船体组成的数组，可以通过frames[0]或frames.f1来获得对具体某个窗体的引用.


lv3 交互窗口中的JavaScript

假定在Web页面中有iframe元素分别叫A和B，在A中定义的变量 `var i = 3` 在B中可以通过 `parent.A.i = 4`来改变。同理，在A中定义的函数也可以通过该方式进行调用。


因为窗体不同，要建立在同一个上下文中的对象，必须显式引用父级的构造函数来创建新的对象。此处有空可以再深入了解下。


































