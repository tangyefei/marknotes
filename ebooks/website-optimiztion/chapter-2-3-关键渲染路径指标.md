# 2.3 关键渲染路径指标

## 优化的方法

因为页面由DOM和CSSOM最终组成Render Tree，因此减少DOM数量，减少CSSOM的大小，能优化关键渲染路径。同样减少HTML文件的大小也能优化关键渲染路径。

因此通过Minify、Compress、Cache，可以减少请求资源的大小，从而缩短加载时间。

我们都知道通过媒体查询，可以针对不同的设备、视口去应用样式。

同样我们可以通过将样式拆分到不同的css文件，然后引入时候通过媒体查询检测到设备类型、屏幕方向等属性，网页只在符合条件的设备、视口时候采取加载对应的CSS，从而缩短加载时间。

```
// html
<link ref="stylesheet" href="style.css">
<link ref="stylesheet" href="style-print.css" media="print">

//style.css
body {
	font-size: 16px;
}
@media screen and (orientation: landscape) {
	.menu {
		float: right;
	}
}

//style-print.css
@media print  {
	body {
		font-size: 12px;
	}
}
```

JavaScript拥有修改页面中的DOM结构，或者修改CSSOM结构的能力。对于一些不会修改DOM和CSSOM的JavaScript，可以通过在script标签上增加async让JavaScript不对DOM解析和CSSOM构建阻塞，而是等到可以直接后台执行。

讲上述提到的优化方法可以进行总结：

1. Minify, Compress, Cache

该条对于HTML、CSS、JavaScript都适用

2. 减少阻塞渲染的资源：CSS

具体做法包括在link上使用媒体查询、使用内联的CSS样式

3. 减少阻塞解析的资源：JavaScript

包括了延缓JavaScript的执行、在script标签上使用async标签

## 衡量的三个指标

基于上述的介绍，有一个标准常被用来衡量CRP(关键渲染路径)的性能，他们分别是

- CRP resourcs，代表了请求资源的数量
- CRP KB，代表了所有CRP resources资源的大小
- CRP length，代表了从请求从客户端到服务端来回的次数

内联的CSS，async或defer的JavaScript不参与到上述几个指标的计算中。因此一个网页的上述三个指标适用的文件数量等于 1 + 直接请求的CSS和Javascript文件数量，其中1是HTML文件内容。


在PC端打开该网页

```
<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
  </head>
  <body>
    <p>
      Hello <span>web performance</span> students!
    </p>
    <div><img src="awesome-photo.jpg"></div>
    <script src="app.js"></script>
    <script src="analytics.js" async></script>
  </body>
</html>
```


- CRP resourcs，数量为2
- CRP KB，大小为`style.css`、`analytics.js`文件大小之和
- CRP length，长度为2


## DOMContentLoaded和load事件

	
文档的readyState可以是下面三种状态中一种：

- loading，document仍在加载
- interactive，文档已被解析，但是诸如头像、样式表的子资源仍旧在加载
- complete，文档和所有的子资源完成加载

属性值变化的时，document对象上的readystatechange事件将被触发，其中

- 状态变为interactive，意味着要触发DOMContentLoaded时间(等同于jQuery的ready事件）
- 状态变为complete，以为这要出发load事件

DOMContentLoaded和load使用语法分别为：

```
document.addEventListener('DOMContentLoaded', function(){});

window.onload = function(){}
```
