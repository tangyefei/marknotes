# 《Flutter实战》

# 开篇

作者现字节跳动工程师，开元了Gitme、CookieJar、Dio、Flukit等多个项目。

广告：长期招聘前端、移动端高工，有意者请发简历到duwen32767@163.com 或加微信Demons-du.

# 起步

## 移动开发技术简介

原生开发优势是移动端功能支持度好、速度快；缺点是，开发成本高，动态化弱。

### 跨平台技术简介(Hybrid)

- H5+原生（Cordova、Ionic、微信小程序）
- JavaScript开发+原生渲染 （React Native、Weex、快应用）
- 自绘UI+原生(QT for mobile、Flutter)

### H5+原生

通过原生的网页加载控件WebView (Android)或WKWebView（iOS）来加载需要动态变动的内容，H5部分是可以随时改变而不用发版，动态化需求能满足；同时，由于h5代码只需要一次开发，就能同时在Android和iOS两个平台运行，这也可以减小开发成本。缺点是性能不好，对于复杂用户界面或动画，WebView不堪重任。

我们称这种h5+原生的开发模式为混合开发 ，采用混合模式开发的APP我们称之为混合应用或Hybrid APP ，如果一个应用的大多数功能都是H5实现的话，我们称其为Web APP 。

WebView实质上就是一个浏览器内核，对于大多数系统能力都没有访问权限，如无法访问文件系统、不能使用蓝牙等。而混合框架一般都会在原生代码中预先实现一些访问系统能力的API， 然后暴露给WebView以供JavaScript调用，我们把这种消息传输协议的工具称之为简称 JsBridge。

### JavaScript开发+原生渲染

#### React Native和Weex

React Native是Facebook于2015年4月开源的跨平台移动应用开发框架，和React原理相通，并且Flutter也是受React启发，此处深入了解一下React原理。

React是一个响应式的Web框架，有两个重要的概念：DOM树与响应式编程。

（1）**DOM树与控件树**

DOM树和控件树是等价的概念，只不过前者常用于Web开发中，而后者常用于原生开发中。

（2）**响应式编程**

状态改变则UI随之自动改变，而React框架本身就是响应用户状态改变的事件而执行重新构建用户界面的工作，这就是典型的响应式编程范式。


React Native 和 React的主要的区别在于虚拟DOM映射的对象是什么？React中虚拟DOM最终会映射为浏览器DOM树，而RN中虚拟DOM会通过 JavaScriptCore 映射为原生控件树。

相对于混合应用，由于React Native是原生控件渲染，所以性能会比混合应用中H5好很多，同时React Native是Web开发技术栈，也只需维护一份代码，同样是跨平台框架。


Weex是阿里巴巴于2016年发布的跨平台移动端开发框架，思想及原理和React Native类似

#### 快应用

国内9大主流手机厂商共同制定的轻量级应用标准，原生控件渲染，与React Native和Weex相比主要有两点不同：采用JavaScript语言开发；渲染/排版引擎是集成到ROM中的，应用中无需打包，安装包体积小。

### 自绘UI+原生

####  QT简介

自绘UI+原生通过在不同平台实现一个统一接口的渲染引擎来绘制UI，而不依赖系统原生控件，所以可以做到不同平台UI的一致性。注意，自绘引擎解决的是UI的跨平台问题，如果涉及其它系统能力调用，依然要涉及原生开发。

自绘制引擎的思路并不是什么新概念，Flutter并不是第一个尝试这么做的，在它之前有一个典型的代表，即大名鼎鼎的QT。

因为种种原因，尽管QT是移动端开发跨平台自绘引擎的先驱，但却成为了烈士。

#### Flutter简介

就QT失败的种种原因，我们看看Flutter的现状。基于如下三点，可以看到Flutter未来一篇光明：

- 生态：活跃用户正在高速增长，社区现在已经很庞大，文档、资源也越来越丰富。
- 支持：Google对Flutter的投入的资源不小，所以在官方技术支持这方面，大可不必担心。
- 效率：热重载在模拟器或真机上可以毫秒级热重载，并且不会丢失状态，完胜原生的编译速度。

### 总结

![mobile-dev-compare](./mobile-dev-compare.png)


## Flutter简介


# 第一个Flutter应用

Material是一种标准的移动端和web端的视觉设计语言， Flutter默认提供了一套丰富的Material风格的UI组件。

“综上所述，可以发现，对于StatefulWidget，将build方法放在State中，可以给开发带来很大的灵活性。” -- 第二点理解不深，暂不深究，改日回来再看。



切换路由的用法 以及 路由对象的定义：

```
Navigator.push( context,
	new MaterialPageRoute(builder: (context) {
	      return new NewRoute();
	 }));
	},
),
     
MaterialPageRoute({
    WidgetBuilder builder,
    RouteSettings settings,
    bool maintainState = true,
    bool fullscreenDialog = false,
})
```  
  
- builder 是一个WidgetBuilder类型的回调函数，它的作用是构建路由页面的具体内容，返回值是一个widget。我们通常要实现此回调，返回新路由的实例。
- settings 包含路由的配置信息，如路由名称、是否初始路由（首页）。
- maintainState：默认情况下，当入栈一个新路由时，原来的路由仍然会被保存在内存中，如果想在路由没用的时候释放其所占用的所有资源，可以设置maintainState为false。
- fullscreenDialog表示新的路由页面是否是一个全屏的模态对话框，在iOS中，如果fullscreenDialog为true，新页面将会从屏幕底部滑入（而不是水平方向）。



我们需要先注册路由表后，我们的Flutter应用才能正确处理命名路由的跳转。注册方式很简单，我们回到之前“计数器”的示例，然后在MyApp类的build方法中找到MaterialApp，添加routes属性，代码如下：




```
// 疑问：下方的ModalRoute是个啥？

return new MaterialApp(
  title: 'Flutter Demo',
  theme: new ThemeData(
    primarySwatch: Colors.blue,
  ),
  //注册路由表
  routes:{
   "new_page":(context)=>EchoRoute(),
  } ,
  home: new MyHomePage(title: 'Flutter Demo Home Page'),
);

class EchoRoute extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    //获取路由参数  
    var args=ModalRoute.of(context).settings.arguments
    //...省略无关代码
  }
}
```

通过路由名打开新路由页：

```
Navigator.pushNamed(context, "new_page");
Navigator.of(context).pushNamed("new_page", arguments: "hi");
```