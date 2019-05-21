# 第13章 事件

## 1. 事件流

想象画在纸上的一组同心圆，如果你把手指放在圆心上，那么你指向的不是一个圆，而是纸上所有圆。事件流描述的是从页面上接收事件的顺序，IE和Netscape开发团队提出了完全相反的事件流概念，IED事件流是冒泡流，Netscape Communicator的事件流是时间捕获流。

### 1.1 时间冒泡

IE的事件流叫做事件冒泡（event bubbling），开始于最具体的元素，然后逐级向上传播到较为不具体的节点。

现代版本浏览器都支持时间冒泡，但在具体上有一些差别，比如是否传递到window对象，是否跳过HTML对象等。


### 1.2 事件捕获

Netscape Communicator提出的事件流叫时间捕获，它的思想是从不太具体的节点更早地接收到时间，而具体的节点最后接收到事件。

事件捕获是Netscape Communicator唯一支持的事件流模型，一些浏览器目前不那么完全按照 ”DOM2级事件“ 规范支持事件流模型，差异体现在并非从document对象开始传播，而是从window开始传播。

老版本浏览器不支持事件捕获，可以放心地使用事件冒泡，有特殊需要的时候再使用事件捕获。

### 1.3 事件流

DOM2级事件 规定事件流包含三个阶段：事件捕获阶段、处于目标阶段、时间冒泡阶段。

事件的目标在捕获阶段不会接收到事件，要在“处于目标”阶段才会发生，并在事件处理中被当做冒泡的一部分，最后冒泡阶段发生事件有传回文档。

## 2. 事件处理程序

### 2.1 HTML事件处理程序

即直接在HTML中通过类似 onclick="doSomething()" 来调用的方式，JS代码和HTML代码耦合，通常不太使用这种方式。


### 2.2 DOM0级事件处理程序

即通过JavaScript制定事件处理程序，类似 btn.onclick = function(){//do something}，简单并且具有跨浏览器的优势。方法中this的指向为元素。

通过这种方式添加的注册程序，会在事件流的冒泡阶段被处理。

### 2.3 DOM2级事件处理程序

addEventListener() 和 removeEventListener()

包含三个参数，要处理的事件名、事件处理程序、布尔值（true - 捕获阶段调用事件处理程序，false - 在冒泡阶段调用事件处理程序）。

使用DOM2级方法的好处是可以添加多个事件处理程序。

### 2.4 IE级事件处理程序

attachEvent() 和 detachEvent()

支持和2.3节相同的两个参数，IE8及更早版本只支持冒泡。有一些需要注意的点：

- 它的注册事件名，点击事件是通过 attachEvent('onclick'
- 它的事件处理程序的作用域，DOM0/DOM2级方法是所属元素的作用域，attachEvent是在全局作用域下。
- 它可以添加多个事件处理程序，但是不会按照添加顺序去执行。

### 2.5 跨浏览器的事件处理程序

自己恰当地运用能力检测（`element.addEventListener`、`element.attachEvent`、`element['on'+type]`），就可以保证事件处理程序在大多数浏览器中一致地运行，但还是要注意IE中的作用域上不同的问题。

## 3. 事件对象

### 3.1 DOM中的事件对象

无论使用什么方法的事件处理程序，都会传入一个event对象，需要关注的属性和方法有：

- bubbles，是否冒泡
- cancellabel，是否可取消默认行为
- currentTarget，当前处理的那个元素
- target，目标元素
- eventPhase，处理程序所在的阶段，1-捕获 2-处于目标，3-冒泡阶段
- preventDefault()，取消事件默认行为
- stopPropagation，取消事件的进一步捕获或冒泡
- type，事件的类型


在事件处理程序中，this和currentTarget相等。

关于eventPhase这里有一个很好的例子，警告弹出的顺序会是 1->2->3：

```
var btn = document. getElementById(" myBtn"); 

btn. onclick = function( event){ alert( event. eventPhase); //2 }; 

document. body. addEventListener(" click", function( event){ 
	alert( event. eventPhase); //1 
}, true); 

document. body. onclick = function( event){ alert( event. eventPhase); //3 };
```

### 3.2 IE中的事件对象
### 3.3 跨浏览器的事件对象
