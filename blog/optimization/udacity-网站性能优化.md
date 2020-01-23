# Udacity 网站性能优化

## 第1课 准备工作


简单介绍了课程，并介绍了电脑上如何连接到移动设备，并像在自己电脑上查看网页那样来查看移动设备。

## 第2课 关键渲染路径

![关键渲染路径](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/critical-render-path.png)
 
上图呈现了HTML内容最终显示在浏览器的过程，后面讲首先介绍如何构建DOM、CSSOM，以及构建Render Tree，然后会介绍JavaScript是如何影响整个过程的。


### 探索时间线工具




然后介绍了如何使用Chrome进行页面性能的分析：https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference

**Converting HTML to DOM**

HTML文档被解析为一个一个的token，与此同时token会被解析为一个一个的node，node最后会被构建成DOM tree，构建成DOM Tree的过程是逐步进行的。



**Converting CSS to the CSSOM**

CSS文档被解析为tokens，然后被转化为Nodes，最后组合成CSSOM，CSSOM的构建需要等到所有的CSS内容都被收到以后，因为样式属性是可以重叠的。

另外再多个样式规则中，比如 h1 和 div p 中，前者的属性设置会更早被计算出来，而 div p 意味着要先找到p，然后回溯确定它上游还有div，因此计算会更慢。

这里提供了一个建议，在重写CSS代码之前，利用Chrome Devtools的记录功能，在优化之后可以进行对比。可以类比到其他代码的书写。


**The Render Tree**

将DOM Tree 和 SCSOM Tree合并成Render Tree，注意只会处理可见的内容：有display:none;属性的DOM是不会被构建哎Render Tree中的；head中的部分也是不可见的，不会出现在Render Tree中。

作者介绍了网站的CSS Recalculate是如何损耗性能的，黄金法则是，批量修改样式，避免频繁重新计算样式。

**关于一个网页被渲染出来的完成过程的描述**

1. 接收HTML并解析它
2. DOM的解析构建是逐步完成的，遇到了CSS和JS的请求标签时候，会发出相应资源的请求
3. 在获得CSSOM之前，是无法执行JavaScript的，所以要尽快创建好CSSOM（言下之意是会阻塞JavaScript的执行）
4. 完成CSSOM构建后，JavaScript的执行不再被限制，可以在收到它以后立即执行
5. JavaScript的执行完成后，可以继续DOM的构建
6. DOM和CSSOM都被构建奥以后，就可以合并成Rener Tree，然后进行布局和绘制

## Lesson 3 Optimizing CRP

Render Tree需要依赖DOM Tree和CSSOM Tree，因此只有在HTML中的CSS的内容也被被请求回来并且构建好CSSOM Tree以后，网页才会被绘制出来。

注：我猜这里是CSS的引用在head中出现的情况，因为如果link放在正常的dom之后， 是可能先显示，后再重绘的。

在引用CSS的link中，可以采用媒体查询，仅仅符合媒体查询条件的样式文件会阻塞网页的渲染，不符合媒体查询的（比如仅在打印时候用到的css）就不会阻塞，进而提高加载速度。

通过一个混入了行内JavaScript的例子，我们可以看到JavaScript会阻塞后面的DOM的渲染，理论上JavaScript代码执行的很快，但是当我们从外部请求JS的时候，JS的请求可能耗费很多的时间。

CSS会阻塞DOM的渲染，也会阻塞JavaScript的执行，因此优化CSS的大小很重要。

不修改DOM或CSSOM的JavaScript脚本，不应该妨碍脚本的执行办法，有几种处理办法：

- body结束位置引入js
- 在script中加入async，它不会阻碍DOM和CSS

行内的JavaScript不论是否加async，都不会阻碍DOM和CSS。

想要让JavaScript不被CSS阻塞，还有一种办法是在CSS的引入之前就引入JavaScript。

常见的优化方法

- Minify, Compress, Cache
- Minimize use of render blocking resources (CSS)
	1. Use media query on link
	2. Inline css 
- Minimize use of parser blocking resource (JS)
	1. Defer JavsScripit execution
	2. Use async attribute script

上述的方法按照类别可以进行归类

1. Minize Bytes（资源大小）
2. Reduce critical resource（资源个数）
3. Shorten CRP length（请求次数，多个请求可以并行发出，因此算1次）



## Lesson 4 JavaScript
  

通过将耗费较多运行时间的JavaScript隔离到Web Worker中，可以达到减少页面卡顿的目的。

当JavaScript运行垃圾收集器的时候，是不会运行别的代码的，这时候就可能出现页面卡顿，可以通过Devtools中检查memory的变化量，当memory出现骤减，通常是垃圾回收在起作用，如果发现内存只升不减，通常是内存出现了泄漏。

本章提供了两个练习，让你学习如何将JavaScript代码来解决运行过程中的卡顿问题，另外还提供了解决问题所会用到的Web Worker和垃圾回收的材料。




















