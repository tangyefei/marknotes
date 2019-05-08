#17章 事件处理


## 1. 事件类型

浏览器支持的事件数量在快速增长，来源有三个（1）3级DOM事件规范（2）HTML5规范及相关衍生规范的大量新API所定义（3）基于触屏的移动设备的出现。

书中关于事件的分类感觉很混乱，不用太纠结。大致可以分为几类（1）依赖设备的输入事件，比如 mousedown touchmove（2）独立于设备的输入时间，比如 click 可以通过鼠标、键盘、触感设备来实现（3）用户界面事件（4）特定API事件 比如 dragstart（5）计时器和错误处理程序。

### 1.1 传统事件类型

#### 表单事件

表单的submit和reset，表单元素的 click，文字、选择项元素的 change，焦点变化引起的 focus和blur
时间处理取消 submit和reset的默认操作，某些click事件也是如此
focus和blur不会冒泡，但其他所有表单事件都可以
textarea中不论何时输入都会触发（不同于change事件）

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


### 1.3 HTML5事件
### 1.4 触屏和移动设备事件

## 2. 注册事件处理程序

## 3. 事件处理程序的调用

### 3.6 事件传播

