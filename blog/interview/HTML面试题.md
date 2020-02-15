# HTML面试题


## 1.介绍一下meta标签中的name="viewport"

- [MDN 在移动浏览器中使用viewport元标签控制布局](https://developer.mozilla.org/zh-CN/docs/Mobile/Viewport_meta_tag)
- [Responsive Web Design - The Viewport](https://www.w3schools.com/css/css_rwd_viewport.asp)

### viewport的概念

> 浏览器的 viewport 是可以看到Web内容的窗口区域，通常与渲染出的页面的大小不同。

你以为你理解了上面这段话吗，什么是”可以看到Web内容的窗口区域“？什么是”渲染出的页面的大小“？

举个例子，你们家的锅的大小是`20cm*20cm`，大饼的大小是`30cm*30cm`，那么可以吃的饼的大小`30cm*30cm`就是”可以看到Web内容的窗口区域“，一瞬间摊饼的面积`20cm*20cm`就是”渲染出的页面的大小“。

> 这种情况下，浏览器会提供滚动条以滚动访问所有内容。

为了把饼都摊熟，肯定要挪动饼在锅上的位置。


### 窄屏设备为什么要缩放

早起的许多页面是是直接写死固定大小的，没有针对移动端做优化（比如媒体查询），为了在小屏幕中展示，窄屏设备做了一个优化：

> 如果移动屏幕的宽度为x(比如x=320px），则可能会用980px的虚拟视口渲染页面，然后缩小页面以适应x的窗口大小。

这样做结果就是，未做移动端优化的网站在窄屏设备上也能看到完整的展示。

### 缩放会有什么问题

如果虚拟视口宽980px，在 640px 或 480px 或更小宽度要起作用的媒体查询就不会触发了，浪费了这些响应式设计。

### viewport的使用

典型的针对移动端优化的站点包含类似下面的内容：

```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

它表示”可以看到Web内容的窗口区域“的大小等于设备的宽度大小，width可以是具体数字或者device-width。

还有initial-scale、maximum-scale、minimum-scale、user-scalable属性控制允许用户对缩放做控制。

### 设置viewport与否的对比


![设置viewport与否的对比](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/blogs/html/viewport-compare.png)

## 2. defer和async的区别


[我的博客文章：网页如何加载、解析、渲染](http://tech.tangyefei.cn/html/%E7%BD%91%E9%A1%B5%E5%A6%82%E4%BD%95%E5%8A%A0%E8%BD%BD%E3%80%81%E8%A7%A3%E6%9E%90%E3%80%81%E6%B8%B2%E6%9F%93.html)

默认地JS脚本加载好后直接执行，会阻塞后续DOM的渲染。

async (asynchronous)

- JS不会阻塞DOM的解析，它会在加载好就直接执行
- 规范要求脚本按照出现的先后顺序执行，都先于DOMContentLoaded执行，现实未必如此，因此最好只包含一个延迟脚本

defer

- 浏览器会在你页面解析完成前开始执行，但不会等待所有资源加载完毕
- 适用于外部脚本文件，并不保证按照它们的先后顺序执行，比较适用于谷歌分析这类不依赖其他脚本的库

页面解析完成对应DOMContentLoaded事件，所有资源都加载完毕对应onLoad事件。如下例子对于上述的结论进行了验证：


```
//test.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script>
    window.addEventListener('DOMContentLoaded', function(){
      console.log('DOMContentLoaded trigger...');
    });
  </script>
  <script defer src="defer.js"></script>
  <script async src="async.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body onload="onloadHandle()">
  <h3 id="testH3">hello, tecent</h3>
  <script>
  function onloadHandle(){
    console.log('onload trigger...');
  }
  </script>
</body>
</html>
```

```
//async.js
console.log('async:');
console.log(document.getElementById('testH3'))
```

```
//defer.js
console.log('defer:');
console.log(document.getElementById('testH3'))
```

输出结果：

```
async:
null
defer
  <h3 id="testH3">hello, tecent</h3>
DOMContentLoaded trigger...
defer-and-async.html:22 onload trigger...  
```





