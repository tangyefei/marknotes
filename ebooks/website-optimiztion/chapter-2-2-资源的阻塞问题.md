# 2.2 资源的阻塞问题

关于关键渲染路径过程，非常重要的一点是，一些资源的请求是阻塞性的。这里先列举一般性的结论：


- HTML资源最先加载，其他资源依次并行加载，完成时间和加载顺序无关，和网络、文件大小有关。


- JS的加载，会阻塞HTML parse 和 CSS render；JS的执行按照标签出现的顺序执行。

- CSS的加载，会阻塞HTML parse 和 JS 执行；CSS render需要整个文件加载解析完成，CSS render的顺序和标签的出现顺序相同。



## 资源并行加载

虽然引入资源的代码在HTML文件的不同位置，但浏览器预加载程序会扫描页面，然后以并行的方式开始加载资源，从而加快在减少上花费的时间。结果就是一些比较大的文件虽然先加载，但可能后加载完成。


```
// html-CRP-block.html
<head>
  <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
  <script src="link-jquery.js"></script>
  <link rel="stylesheet" href="bg-color.css"></link>
</head>
<body>
  <p>Hello, CRP!!!</p>
</body>
```

```
//link-jquery.js
console.log('jquery download and executed ? ' + (!!$ ? 'yes' : 'not ye'));
```

```
//bg-color.css
p {
	background: red;
}
```

我们用Chrome Devtools的Performance记录下来网络情况（如下图），首当其冲的是HTML内容，然后是本地的 `link-jquery.js` 和 `bg-color.css`文件，虽然`jquery-3.4.1.js`先出现但是却后开始加载，也是后开始完成。


![resource load](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/resource-load.png)

## JS的按照加载顺序执行


如下为console中的输出结果，可见虽然js后面的先加载完，但是执行顺序还是严格依赖出现顺序的。

```
jquery download and executed ? yes
```

## JS的加载解析阻塞HTML/CSS的解析

```
// html-CRP-block.html
<head>
  <link rel="stylesheet" href="bg-color.css"></link>
</head>
<body>
  <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
  <script src="link-jquery.js"></script>
  <p id="hello">Hello, CRP!!!</p>
</body>
```

```
//link-jquery.js
console.log(document.getElementById('hello'));
```

如上代码中，我们可以在console中看到的输出结果为null，说明 **JS的加载执行过程，block了HTML的解析**，因为直接查询DOM Tree是没有该结构的。


```
//bg-color-red.css
p {
	background: red;
}
```

```
//bg-color-green.css
p {
	background: green;
}
```

```
// html-CRP-block.html
<body>
  <p id="hello">Hello, CRP!!!</p>
  <link rel="stylesheet" href="bg-color-red.css"></link>
  <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
  <link rel="stylesheet" href="bg-color-green.css"></link>
</body>
```




稍微修改代码，将Devtools的网络调整到`Slow 3G`，刷新界面可以看到背景色首先是红色，然后过了数秒后变成绿色。


![js-block-html-and-css](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/js-block-html-and-css.png)

![js-block-html-and-css](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/js-block-html-and-css-2.png)

同理，我们可以通过Devtools的Performance看到，最先加载的蓝色区域是HTML内容，两个紫色的CSS文件都早于jquery加载完成，但是一直等到jquery加载和执行完成以后，才会继续parseHTML、Parse StyleSheet，并且最终触发DOMContentReady事件，因此 **JS的加载同样也阻塞CSS的解析和渲染。**

## CSS的加载


CSS文件的加载是**加载和解析同步进行的，但只有等到整个CSS文件都被解析好，才会绘制CSSOM并且完成绘制**，这是因为CSS文件中属性是可以相互覆盖的，加载部分就进行渲染无疑会降低性能。

同样如下例子可以看到，界面长时间处于白色背景，然后才出现红色背景，和无padding的body，可见 **CSS 的绘制，同样按照标签的出现顺序进行绘制**。

```
// html-CRP-block.html
<body>
  <p id="hello">Hello, CRP!!!</p>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="bg-color-red.css"></link>
</body>
```

上述例子在网页中的效果是，先看到文字


## CSS的加载对HTML/JS的影响

```
//bg-color-red.css
p {
	background: red;
}
```

```
// html-CRP-block.html
<body>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
  <p id="hello">Hello, CRP!!!</p>
  <script src="link-jquery.js"></script>
  <link rel="stylesheet" href="bg-color-red.css"></link>
</body>  
```

网页中打开上述HTML可以看到，首先是页面空白，并且console中没有输出，然后过了数秒，才会出现红色背景的文字区域。

打开分析工具录制，可以看到蓝色的HTML先加载、然后是link-jquery.js、background-red.css先完成（虽然bootstrap.css先加载），在bootstrap.css加载完后，先Parse Stylesheet，然后继续 Parse HTML、Evaluate Script、Recalculate Style，可见 **CSS的加载和解析也会阻塞HTML的解析 和 JS的解析执行**。




![css-block-parse](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com//css-block-parse.png)

![css-block-parse](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com//css-block-parse-2.png)


## 练习

通过上述的介绍相信你能基本理解网页加载过程中的顺序，尤其是JS/CSS将会如何相互作用，下面是到练习题，你可以试试看：

![try-anwser-page-steps.png](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/try-anwser-page-steps.png)

答案是`1 3 6 2 4 5`，你也可以参考[视频](https://classroom.udacity.com/courses/ud884/lessons/1464158642/concepts/23732285930923)的讲解。




