# [《Flutter实战》](https://book.flutterchina.club/)

# 开篇

作者现字节跳动工程师，开源了Gitme、CookieJar、Dio、Flukit等多个项目。

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
 
**跨平台自绘引擎**

Flutter与用于构建移动应用程序的其它大多数框架不同，因为Flutter既不使用WebView，也不使用操作系统的原生控件。 相反，Flutter使用自己的高性能渲染引擎来绘制widget。

**高性能**

Flutter采用Dart语言并支持AOT，加上使用自己的渲染引擎来绘制UI，可以带来可观的性能。


### Flutter框架结构

![flutter-framework.png](./flutter-framework.png)

Widgets层是Flutter提供的的一套基础组件库，在基础组件库之上，Flutter还提供了 Material 和Cupertino两种视觉风格的组件库。而我们Flutter开发的大多数场景，只是和这两层打交道。

Engine 这是一个纯 C++实现的 SDK，其中包括了 Skia引擎、Dart运行时、文字排版引擎等。在代码调用 dart:ui库时，调用最终会走到Engine层，然后实现真正的绘制逻辑。



### 如何学习Flutter

- 资源：官网、源码及注释、Github、Gallery源码（官方提供的示例App 源码的examples目录下）
- 社区：stackoverflow、flutter中文社区、掘金


## 搭建Flutter开发环境


### 连接Android真机设备


- 在Android设备上启用 开发人员选项 和 USB调试(设置-关于本机-系统版本号上连续点击7下）。
- 使用USB将手机插入电脑，授权你的电脑可以访问该设备。
- 在命令行运行 flutter devices 命令以验证Flutter识别您连接的Android设备。
- 运行启动你应用程序 flutter run。


```
Error: ADB exited with exit code 1
Performing Streamed Install

adb: failed to install /Users/yefeitang/Documents/flutter_projects/flutter_widgets/build/app/outputs/apk/app.apk: Failure [INSTALL_FAILED_ABORTED: User rejected permissions]
Error launching application on VTR AL00.

```

运行遇到了如上所示的问题，将 ”监控 ADB 安装应用“ 关闭即可。

## 连接iOS真机设备

略

## 常见配置问题

略

## Dart语言简介


其他略。留个印象（异步支持：Future、Async/await、Stream）。


# 第一个Flutter应用

## 计数器示例

Material是一种标准的移动端和web端的视觉设计语言， Flutter默认提供了一套丰富的Material风格的UI组件。

关于如下对描述不是很理解，暂不深究，改日回来再看：

> 综上所述，对于StatefulWidget，将build方法放在State中，可以给开发带来很大的灵活性。


## 路由管理

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

## 包管理

Pub（https://pub.dartlang.org/ ）是Google官方的Dart Packages仓库，除此外我们还可以依赖本地包和git仓库。

## 资源管理

略。

## 调试Flutter应用

### Dart分析器

运行 `flutter analyze` 可以分析代码的错误。

如果使用的编辑器安装了Flutter创建，通常已经启用了Dart分析器。

### Dart Observatory (语句级的单步调试和分析器)

**debugger()声明**

可以在代码顶部添加 `import 'dart:developer';`，然后在需要断点的位置增加`debugger()`。

**print、debugPrint、flutter logs**

可以使用`print`和`debugPrint`来输出日志，可以在启动命令行中 或者 通过 `flutter logs` 命令来查看日志。



### 调试模式断言

- flutter run 调试模式
- flutter run --profile 中间模式（保留除Observatory之外的所有调试工具）
- flutter run --release 发布模式

### 调试应用程序层

该部分接介绍了一些高级调试的技巧。使用的时候查询。


### 可视化调试

介绍了调试可视化布局的一些配置项。使用的时候查询。

### 调试动画

通过配置参数来减慢速度可以调试动画。


### 调试性能问题

可以在启动命令中增加参数来衡量应用启动时间，可以通过执行自定义性能跟踪和测量Dart任意代码段的wall/CPU时间。

###  Performance Overlay

可以通过 MaterialApp 的构造函数传递参数，来要获得应用程序性能图。


### Material grid

将Material Design基线网格覆盖在应用程序上可能有助于验证对齐


## Dart线程模型及异常捕获

Dart大致运行原理：

![error-report.png](./error-report.png)

在事件循环中，当某个任务发生异常并没有被捕获时，程序并不会退出，而直接导致的结果是当前任务的后续代码就不会被执行了，也就是说一个任务中的异常是不会影响其它任务执行的。

Dart中可以通过try/catch/finally来捕获代码块异常。在Dart中，异常分两类：同步异常和异步异常，同步异常可以通过try/catch捕获，而异步异常则比较麻烦，感兴趣可以参考[该部分](https://book.flutterchina.club/chapter2/thread_model_and_error_report.html)。






