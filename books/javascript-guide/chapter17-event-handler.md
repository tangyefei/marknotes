# 第17章 事件处理


## 1. 事件类型

浏览器支持的事件数量在快速增长，来源有三个（1）3级DOM事件规范（2）HTML5规范及相关衍生规范的大量新API所定义（3）基于触屏的移动设备的出现。

书中关于事件的分类感觉很混乱，不用太纠结。大致可以分为几类

（1）依赖设备的输入事件，比如 mousedown touchmove

（2）独立于设备的输入时间，比如 click 可以通过鼠标、键盘、触感设备来实现

（3）用户界面事件

（4）特定API事件 比如 dragstart

（5）计时器和错误处理程序。

### 1.1 传统事件类型

#### 表单事件

表单的submit和reset，表单元素的 click，文字、选择项元素的 change，焦点变化引起的 focus和blur。
时间处理取消：submit和reset的默认操作，某些click事件也是如此。
focus和blur不会冒泡，但其他所有表单事件都可以。
textarea中不论何时文本插入都会触发（不同于change事件）。

#### Window事件

发生在浏览器窗口本身的事件：load, DOMContentLoaded, readystatechange， unload, beforeunreload, onerror。

img这样的元素也能给load和error注册处理程序。

focus和blur也能用作Window事件。

浏览器窗口大小调整时候回出发resize和scroll时间。

#### 鼠标事件

click, mousemove, mouseup, mousedown, dbclick, contextmenu, mouseover, mouseout（IE提供的不冒泡的版本是mouseenter和mouseleave）, mousewheel。

#### 键盘

keyup, keydown, keypress


### 1.2 DOM事件

3级DOM时间规范发展的过程中，会增加新事件替代一些事件，还有一些事件被废弃，关于一些事件如何使用更规范，可以参考这部分的介绍进行阅读，不再赘述。

### 1.3 HTML5事件

第22章会介绍HTML5定义的大量新的Web应用的API，这里列出这些HTML5和Web应用的事件：

- 音频和视频的事件
- 操作系统的拖放操作（此处应该指的浏览器吧?）
- 历史管理机制，设计hashchange和popstate
- 为表单定义了大量新特性，包括验证机制
- 增加了对Web离线应用的支持
- 可以使用message事件进行异步通信，通信受限于同源策略。它与WebWorker通信、Server-Sent、WebSocket进行网络通信类似。
- 不在窗口、文档和文档元素上 触发的时间，比如I/O的进度
- 少量庞杂的事件类型，比如在Web存储上的storage事件

### 1.4 触屏和移动设备事件

包含触摸、旋转、手势等事件。

## 2. 注册事件处理程序

给对象目标或文档元素设置属性，例如：

```
window.onload = function(){}
```

设置HTML标签属性为事件处理程序，例如：
```
<button onclick="alert('thank you')"></button>
```

addEventListener：

- 不会影响已经通过onclick属性的值
- 能用它注册多个处理程序，并且会按照注册的顺序依次调用

attachEvent：

IE提供的事件处理方法


## 3. 事件处理程序的调用

该部分介绍事件处理程序如何调用，也会介绍时间的传播机制。

### 3.1 事件处理程序的参数

通常把事件对象作为他们的一个参数，获取方法IE会比较特别，需要通过window.event来获取。

### 3.2 事件处理程序的运行环境

同样在IE上this是指向到Window，需要改写代码来修改指向。

### 3.3 事件处理程序的作用域

讲解令人费解，不是太重要，跳过。

### 3.4 事件处理程序的返回值

返回值为false通常是用来阻止默认行为

### 3.5 事件处理程序的返回值

- 通过设置对象属性、或者HTML属性注册的处理程序，优先调用。
- 使用addEventListener注册的处理程序，按照注册顺序调用。
- 使用attachEVent注册的处理程序，可能按照任何顺序调用。

### 3.6 事件传播

该部分讲解的太粗略了，不足以体现该知识的重要性。

### 3.7 事件取消

有三种技术：

- event.preventDefault()
- event.returnValue = false
- return false

