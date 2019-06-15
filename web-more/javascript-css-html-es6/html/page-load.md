# 网页如何加载、解析、渲染

参考 

- [Stackoverflow: script-tag-async-defer](https://stackoverflow.com/questions/10808109/script-tag-async-defer)
- [简书：浏览器加载解析渲染](https://www.jianshu.com/p/e141d1543143)
- [知乎：CSS加载会造成阻塞吗](https://zhuanlan.zhihu.com/p/43282197)
- [javascript.info：Page: DOMContentLoaded, load, beforeunload, unload
](https://javascript.info/onload-ondomcontentloaded)

## 1. CSS和JS文件加载的影响

当用户访问网页，浏览器发送请求给DNS服务器，解析得到IP地址后，然后发送请求得到HTML文件，然后自上而下加载。

在加载过程中会遇到图片、CSS、JS等外部文件，浏览器会发出异步请求来加载。

### 1.2 外部文件的加载顺序

文件加载通常先出现的标签先加载，但并不串行，即它们的过程可同时进行。结果就是一些比较大的文件虽然先加载，但可能后加载完成。

### 1.3 衡量加载、解析、渲染先后的方法

我们需要借助于浏览器的调试工具，将请求的网速调到较低，才可以肉眼直观看到下面一些示例的过程。


### 1.4 JS文件加载的影响

#### JS对HTML解析的影响

JS文件在加载和解析过程是连续进行的，在这个过程中，HTML文档的渲染会被阻塞，即在JS文件加载完成以前，它网页内容是看不到的。

```
<script 加载一个大的js文件比如一个jquery的源文件
<h1 一个普通的文本暂时

# 可以看到在等待js文件加载完毕以前，h1的内容是看不到的
```

#### JS对后面JS的加载和解析的影响

那么对于多个JS文件之间，假定按照顺序先后加载了a.js和b.js，其中a.js文件很大需要花较长时间，b.js的文件很快加载好，这时候b.js却会等到a.js执行完毕后才执行。

```
a.js 写入比较多的内容比如jquery的内容
b.js 直接输出一行$('body')

# 可以看到不会因为b.js先加载完就执行，而导致$未定义，而是等到a.js加载执行完毕后，b.js中的内容才在console中输出
```

#### JS对后面CSS的加载和解析的影响


和JS类似的，我们可以看到CSS文件可能很早就加载完毕了，但是会直到JS加载解析完毕后，样式才被应用到界面上。

```
<h1
<script 加载一个大的js文件比如一个jquery的源文件
<style 加载一个普通的给h1设置颜色的文件

# 可以看到，h1的颜色会等到JS文件加载和解析才生效
```

### 1.5 CSS文件加载的影响

#### 1.5.1 对HTML文档的影响

CSS加载不会影响于HTML文档的解析和渲染。关于这一点和 https://zhuanlan.zhihu.com/p/43282197 提到的不一致，需要分辨是否可能不同的浏览器或者版本会有差异。

```
<script 执行一个setTimeout(0的脚本，最快会12ms后执行，去查找h1
<style 加载一个很大的样式文件比如boostrap的css用于增加耗时
<h1

#可以看到console中输出了NodeList，但是界面没看到标签，需要等到样式文件加载完毕。
```

#### 1.5.2 对JS解析的影响

不影响JS文件的加载，但会影响JS文件的解析。

```
<style 加载一个很大的样式文件比如boostrap的css用于增加耗时
<script 输出一行执行的log代码

# 可以看到执行的代码会等到样式文件加载完毕才执行
```

#### 1.5.3 对后面CSS的加载和渲染的影响

不影响后面的CSS的加载，渲染需要等到当前的CSS渲染完毕。

```
<link 给h1添加一个颜色
<h1
<link 导入很大的bootstrap.css文件
# 可以看到h1出现的时候带上了颜色，bootstrap的样式加载好以后字体变化

<h1
<link 导入很大的bootstrap.css文件
<link 给h1添加一个颜色
# 可以看到文字先出现，颜色会等到boostrap字体效果加载好才生效


<h1
<link 给h1添加一个颜色
<link 导入很大的bootstrap.css文件
# 可以看到文字先出现，颜色变化，然后再是boostrap的样式被应用

```


## 2. 加载的实践

有第1节可以得出如下的表格：

```
    HTML             JS         CSS 
JS  阻塞             加载不执行  可加载/解析，不渲染
CSS 构建DOM不渲染白屏  加载不执行  加载，不渲染
```

因为JS会阻塞HTML的加载和渲染，所以应该讲JS文件放在</body>结束之前，一方面确保先让界面出来，另一方面防止提前操作了还不存在的DOM。

CSS的加载太久导致界面白屏，因此要想办法提高加载CSSD速度，可用的策略有：使用CDN、对CSS进行压缩、使用缓存技术、减少HTTP请求数将多个css文件合并。


## 3. defer 和 async

```
<script       src="myscript.js"></script>

<script async src="myscript.js"></script>

<script defer src="myscript.js"></script>
```

Without `async ` or `defer`, browser will run your script immediately, before rendering the elements that's below your script tag.

With `async ` (asynchronous), browser will continue to load the HTML page and render it while the browser load and execute the script at the same time.

With `defer`, browser will run your script when the page finished parsing. (not necessary finishing downloading all image files. This is good.)


## 4. DOMContentLoaded, onload, beforeunload, unload


onLoad表示所有资源都加载完毕，DOMContentLoaded表示页面内容渲染完毕，beforeunload表示用户正在离开页面，unload表示用户已经基本离开了页面。

因为JS会阻塞HTML渲染，CSS会阻塞JS的解析，因此DOMContentLoaded的触发时机就有几种情况：

- 只有CSS，那么不等到CSS加载渲染完毕，就会事件该事件
- JS在CSS前面，也不需要等待CSS加载完毕，就会触发该事件
- CSS在JS前面，必须要等到JS和CSS都加载完毕，才会触发该事件

在load阶段，因为资源已经被加载好了，我们可以获取到图片大小之类的信息。
在beforeunload阶段，我们可以检查未被保存的信息，并且提示用户是否确定要离开。
在unload阶段我们可以做一些数据的统计请求的发送。