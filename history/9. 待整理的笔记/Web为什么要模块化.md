##Require.js: Web为什么要模块化


注：译自[requirejs: why web modules?](http://www.requirejs.cn/docs/why.html)，英文版不复杂，纯粹为了督促自己认真阅读，所以自己做了一些翻译并添加上了自己的理解。如下。

- <a href="#problem">提出问题</a>
- <a href="#solution">解决方案</a>
- <a href="#apis">脚本加载APIs</a>
- <a href="#vs">同步和异步的比较</a>
- <a href="#xhr">脚本加载：XHR</a>
- <a href="#web-workers">脚本加载：Web Workers</a>
- <a href="#write">脚本加载：document.write()</a>
- <a href="#append">脚本加载：head.appendChild(script)</a>
- <a href="#function-wrapping">函数包装</a>

&nbsp;&nbsp;该篇内容主要讨论为什么要在Web中应用模块化，以及在如今的浏览器环境中有哪些机制是能够被应用的。在另外一篇中介绍了[为什么采用AMD的设计](http://www.requirejs.cn/docs/whyamd.html)，主要讲解RequireJS所用到的AMD标准里有着特定格式的方法。

<a name="problem"></a>

#### 提出问题
- Web页面更多的出现在移动app中，对性能要求更高
- 随着站点的变大代码复杂度也在增加
- 集成变得更加复杂
- 开发者想要分离JS文件/模块
- 发布的时候希望优化代码来达到尽可能减少HTTP请求的目的

【注：阅读完该文以后可以回过头来看这几个问题是否得到解答了】


<a name="solution"></a>
#### 解决方案

前端开发者希望解决方案有如下几个特点：

- 应该类似于 include/import/require的用法
- 能够加载所依赖的类库
- 使用简单，但是能够在部署的时候最终被优化

如下会介绍常用的一些做法和相对应的优缺点。


<a name="apis"></a>
#### 脚本加载APIs

我们可以整理出如下这些脚本加载的API：

- Dojo: dojo.require("some.module")
- LABjs: $LAB.script("some/module.js")
- CommonJS: require("some/module")

它们都能加载指定目录下的脚本，最最终选择了CommonJS的语法，因为它正在变得更加通用并且我们更希望复用一些已有的成果。

同时我们也希望包含一些语法能够允许加载普通的JavaScript文件，因为开发者不能为了得到脚本loading的好处而重写所有的脚本。

我们希望一些能够在浏览器中工作良好的东西，但是CommonJS的require方法只是一个同步的调用，并被期望马上返回模块。这一点似乎在浏览器中表现得并不好。


<a name="vs"></a>
#### 同步和异步的比较

如下一个例子能够说明这个问题。假定我们有一个Employee对象，并且我们有一个Manager对象要从Employee中派生(derive)而来。如下这个例子就会有一些问题。

```
var Employee = require("types/Employee");

function Manager () {
    this.reports = [];
}

//Error if require call is async
Manager.prototype = new Employee();
```

正如注释中所解释的，如果require是异步的方法，那么代码会出错。如果加载scripts是同步的，那么在浏览器中却意味着性能很糟糕。

【在AngularJs中是否也会出现加载顺序所导致的未定义的问题呢？】


<a name="xhr"></a>
#### 脚本加载：XHR

可以通过使用XMLHttpRequest来请求脚本。如果使用了XHR意味着脚本回来以后，我们（1）要用eval()或者 （2）将读取的内容写到页面中\<script\>标签中。


使用eval来执行模块的坏处：

- 开发者被告知eval()是不好的
- 有些开发环境不允许eval()
- 难以调试
- 不同的浏览器环境下eval()的上下文不同

使用script标签来包裹脚本内容的坏处：

- 调试时，行号也许并不匹配你所读取的脚本的行号


XHR同样有跨域请求的问题。一些浏览器有跨域请求的支持，但不是所有的浏览器都有。并且IE决定对于跨域请求采用创建不同的对象XDomainRequest。由此导致的是更多的支持性代码和更多的错误。 

尤其，你需要确认你没有发送一个非标准的HTTP请求头部或者有其他的预检请求已经因为要做跨域访问
被发送了。

Dojo使用过基于XHR使用eval()的加载器，但对开发者来说总是令人沮丧的（Dojo has an xdomain loader but it requires the modules to be modified via a build step to use a function wrapper, so that script src="" tags can be used to load the modules. There are many edge cases and moving parts that create a tax on the developer.
 - 该段不是很理解）。


<a name="web-workers"></a>
#### 脚本加载：Web Workers


Web Workers是加载脚本的另一种方式，但是：

- 没有得到很好的跨浏览器支持
- 他只是一个传递文本的API，获取到文本之后仍旧是需要传递给window然后使用上一节的方法来执行脚本，自然也就包括了前面提到的所有可能的问题。

<a name="write"></a>
#### 脚本加载：document.write()


可以通过document.write() 的方式来加载脚本，他甚至能够跨域请求脚本并且能够被浏览器正确的理解因此也就不能存在debug不方便的问题。

但是问题来了：

（1）在之前的例子中我们知道，使用一个脚本之前，我们必须确保脚本已经被load进来了。除非你真正执行，不然你无法确保这一点。

（2）页面加载完成以后无法再使用document.write()，一个提升网站性能的关键是按需加载。显然document.write()无法帮助我们做到这一点。

（3）document.write()会阻碍页面渲染。

<a name="append"></a>
#### 脚本加载：head.appendChild(script)

head.appendChild(script)的大致思路是这样的：

```
var head = document.getElementsByTagName('head')[0],
    script = document.createElement('script');

script.src = url;
head.appendChild(script);
```

这样做具备了document.write()的优点，但同时也有无法判定被依赖的脚本是否被成功加载了。


<a name="function-wrapping"></a>
#### 方法包装
因此我们需要的库应该是，执行前能够确保依赖加载成功。最好的做法是给我们的loading的API加上function wrapping。就像下面这样：

```
define(
    //The name of this module
    "types/Manager",

    //The array of dependencies
    ["types/Employee"],

    //The function to execute when all dependencies have loaded. The
    //arguments to this function are the array of dependencies mentioned
    //above.
    function (Employee) {
        function Manager () {
            this.reports = [];
        }

        //This will now work
        Manager.prototype = new Employee();

        //return the Manager constructor function so it can be used by
        //other modules.
        return Manager;
    }
);
```

这正是RequireJS所使用的语法，如果你只是想加载一个普通的js文件而不想定义模块，这样子做就好了：

```
require(["some/script.js"], function() {
    //This function is called after some/script.js has loaded.
});
```


这样的语法简洁（terse）并且允许我们使用使用head.appendChild(script)的方式来导入脚本。


为了让它能够在浏览器中正常工作它不同于常规的CommonJS语法。也有过一些建议说可以结合常规的CommonJS语法和head.appendChild(script)，只需要将模块添加function wrapper的工作交给server就行了。


而我个人始终认为，不让后台运行时的环境去处理代码是很重要的：

（1）那让调试变得很怪，因为所有来自后台的文件都被加上了function wrapper

（2）那会需要更多的辅助代码（gear），前台开发人员应该接收到静态文件就够了。


更多关于function wrapping结构的设计原则（design forces）也就是被称作AMD（Asynchronous Module Definition）的内容，可以参考[为什么采用AMD设计](http://www.requirejs.cn/docs/whyamd.html)。