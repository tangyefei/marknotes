# JavaScript权威指南-第6版

# 第二部分

# 第13章 Web浏览器端的JavaScript

本章从概述开始，介绍了JavaScript在Web文档/应用中的角色，并介绍了后续章节的内容，还解释了JavaScript代码如何嵌入HTML并执行的，最后还会介绍一兼容性、可访问性、安全性等问题。

## 1. 客户端JavaScript

Window对象表示浏览器的窗口或窗体，它的属性和方法是全局变量和全局函数，Window对象上有一个window属性引用自身。

可以通过location获取到Location对象，可以通过直接调用alert获得定义在Window的方法。因为Window对象是全局对象，位于作用域链的顶端，所以可以不通过window而是直接引用即可。**14章**还会介绍在Window下的重要的属性、方法、和构造函数。最重要的一个属性是document，它应用了Document对象，查询、遍历、修改文档的方法会在**15章**介绍。

每个Element元素都有stlye和className，**第16章**会介绍相关的编程技术。

**第17章**会介绍在Window、Document、Elment上的事件。

我们在Web文档里开发的JavaScript，概念开始衍生到Web应用，即围绕着浏览器的更多的高级的服务，比如**18章**介绍的XMLHttpRequest、包含在HTML5标准内的数据存储和绘制图像，还有这些都会在**20-22章**介绍。

## 2. 在HTML里嵌入JavaScript

- 内联，放在 <script>和</script>标签之间
- 放置在由<script></script>标签的src属性指定的外部文件中
- 放置在HTML事件处理程序中
- 放在一个URL里，这个URL使用特殊的 “javascript:”协议

一个有用的实践是可以把包含 "javascript:代码" 的链接收藏到浏览器中，浏览器会执行代码中的内容，有两点需要注意：即便代码是多行写成的，HTML也会把它解析成一行，并且在其中的`//`注释是无效；另外注意代码里面不能包含`href=`后面所使用的引号。

## 3. JavaScript程序的执行

当Web页面包含使用iframe嵌入的窗体，文档和被嵌入的文档会有不同的全局对象，但是如果文档来自于同一个服务器，两个文档上是可以交互的，你可以把它当做一个程序的两个不同部分，在**14.8.3节**会介绍。

JavaScript的程序执行有两个阶段，第一阶段载入文档内容，并按照文档中（并不总是）中的出现顺序执行；第二阶段Web浏览器调用事件处理程序来响应异步发生的事件，它可以是用户操作，也可以是网络活动或者代码中的错误来触发。**13.3.4节**会介绍这两个阶段。

脚本和事件处理程序在同一时间只Web能执行一个，没有并发性，在**13.3.3节**会介绍单线程执行模型。

### 3.1 同步、异步和延迟的脚本

当HTML解析器遇到`<script>`元素时，它默认必须先执行脚本，然后再恢复文档的解析和渲染。

可以使用defer和async属性来改变脚本的执行方式，即浏览器会下载脚本时继续解析和渲染文档。它们都是不带值的布尔属性，出现在<script></script>标签里即可。

- defer属性使得浏览器延迟脚本执行，直到文档的载入和解析完成

- async属性是的浏览器尽可能快地执行脚本，而不用在下载脚本时阻塞文档解析

defer的脚本会按照他们在文档中的出现顺序执行，async会在它们载入后就执行，意味着它们可能是无序的。

在不支持的async浏览器中，可以通过动态创建<script></script>元素并把它插入文档中，来实现脚本的异步载入和执行。

作者提示使用它们的时候，考虑浏览器的实际实现程度。


### 3.2 事件驱动的JavaScript

事件和时间处理是**第17章**的内容，这一节仅提供一个快速概览。

### 3.3 客户端JavaScript线程模型

HTML5定义了一种作为后台线程的 "Web Worker",单客户端JavaScript还是像严格的单线程一样工作，甚至可能并发执行的时候，客户端JavaScript也不会知道是否真的有并行逻辑在执行。

单线程的执行是为了让编程更简单，意味着浏览器在事件处理程序执行时停止用户输入，如果脚本和时间处理程序太长时间，可能带来的影响有：用户无法在脚本完成前看到文档内容；浏览器无法响应，让用户人为浏览器崩溃了。对应的处理是应该在有较多的计算导致延迟之前，将文档完全载入，并且能在计算机计算的时候告知用户浏览器没有挂起。

**22.4节**介绍了Web worker的更多信息，它是用来执行密集任务而不冻结用户界面的后台线程。

### 3.4 客户端JavaScript时间线

1. 浏览器创建Document对象，解析Web页面，document.readystate的值是loading
2. 遇到不含async和defer属性的<script>元素时，将他们添加到文档中并开始执行，同时文档的解析器会停止，脚本就可以使用document.write来操作文档结构，这些脚本（同步脚本）可以看到它自己的<script></script>和它们之前的文档内容。
3. 遇到async属性的<script></script>元素时候，会下载脚本并继续解析文档，并且脚本会在下载完成后尽快执行，异步脚本禁止实用docuemnt.write方法。
4. 文档完成解析时，document.readyState编程interactive
5. 所有的defer脚本会按照在文档中的出现顺序执行，一步脚本可能会在这个时间执行，延迟脚本能访问完整的文档树，禁止实用docuemnnt.write方法（**为什么，这有点奇怪呀？**）
6. 浏览器在Document对象上触发DocumentContentLoad事件，标志着程序执行从同步执行阶段转化到了异步事件驱动阶段。
7. 文档完全解析完成，但可能还在等待其他内容的载入，比如图片，当所有这些内容载入，并且所有异步脚本完成载入和执行时，document.readyState编程complete，Web浏览器触发Window对象上的load事件。
8. 开始调用异步事件，异步响应用户输入、网络时间、计时器等。

如上是理想的时间线，具体文档什么时候对用户可见，浏览器什么时候必须开始响应用户输入，没有明确指定，根据不同的浏览器实现而有所不同。

## 4. 兼容性和互用性

问题可以归为三类

- 演化：发展演变中，新倡导的特性、API被实现，老版本的浏览器不支持。
- 未实现：不同浏览器对于特性是否有必要实现存在观点上的差异
- bug：浏览器自身存在bug或并没有按照规范准确地实现API

本节提供了一些可能有助于解决兼容性问题的网站，以及一些具体的解决兼容性问题的策略，遇到的时候可以细看。

## 5. 可访问性

用很小的篇幅概述了让有视觉障碍或肢体困难的用户正确获取信息的相关只是。

## 6. 安全性

### 6.1 JavaScript不能做什么

针对恶意代码的第一条防线是不支持某些功能，比如客户端JavaScript没有权限来写入或删除客户计算机上的任意文件或列出任意目录；客户端JavaScript没有通用的网络能力。

针对恶意代码的第二条防线是在自己支持的某些功能上的限制：

- 打开新的浏览器窗口受到限制，只有响应用户鼠标单击这样的事件才能使用
- 不允许未经过用户确认就关闭它的窗口
- FileUpload元素的value是只读的
- 脚本不能读取服务器载入的文档内容，除非脚本就是个该文档载入的；另外一个限制是脚本不能在来自不同服务器的文档上注册事件监听器（同源策略）

具体的浏览器实现上会有一些差异，会有自己的偏好。


### 6.2 同源策略

即JavaScript代码能操作哪些内容的一条完整的安全限制，当Web页面存在多个<iframe></iframe>元素或者打开其他浏览器窗口的时候，这一策略就会发挥作用。具体来说，脚本只能读取和所属文档来源相同窗口和文档的属性。

需要注意的是，脚本本身的来源和同源策略无关，而和脚本所嵌入的文档的来源有关。

同源策略还应用于使用XMLHttpRequest生成的HTTP请求（第18章）。

某些情况下，同源策略太过严格了，有三种手段相对宽松的方式来使用它：

- 有多个子域的大站点，可以通过在Document对象上设置domain属性，只要domain是一致的（域名本身是有效的前缀或本身，并且必须domain有一个点号），那么这两个窗口就不在受同源策略的约束，他们可以互相读取对方的属性。

- 第二项技术是已经被标准化的跨域资源共享（Cross-Origin Resource Sharing）。

- 第三种技术是跨文档消息（cross-document messaging)，允许文档的脚本传递消息到另外一个文档的脚本，而不管来源是否同源，具体我调用Window对象上的postMessage方法发送，使用onmessage时间接收。第22.3节有它的更多细节。


### 6.3 脚本化插件和ActiveX控件

很多Web浏览器有校本化的插件或者控件，可以增强客户端脚本的特性，但同时也可能引入安全问题，Jave和Flash插件看去具有健壮的安全性，ActiveX则有着糟糕的历史遗留问题。

### 6.4 跨站脚本

XSS（Cross-site scripting）即攻击者向目标网站注入HTML标签或脚本，比如：一个站点A的功能是从浏览器地址的search中获取到一个参数，然后document.write到文档中，如果这个search参数被恶意改成了一个包含了<script src></script>的内容，那么加载的js就可以在文档中盗取cookie等信息，发送给自己的服务器。

### 6.5 拒绝服务攻击

有一种攻击会通过无限循环alert或者setInterval来占用CPU，但作为网站所有者，你当然希望用户能正常访问，因此这不是一个常见的问题。

### 7. 客户端框架

框架发展日新月异，该部分的介绍颇有点过时，略。