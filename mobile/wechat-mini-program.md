
# Part1 小程序开发 - 指南


侧重基础概念的介绍：

[https://developers.weixin.qq.com/miniprogram/dev/quickstart/basic/introduction.html](https://developers.weixin.qq.com/miniprogram/dev/quickstart/basic/introduction.html)


## 起步
WeixinJSBridge最初是微信提供给腾讯内部业务使用的API，后被外部开发者使用，进一步包装成​对公的JS-SDK。

小程序和普通网页开发的区别在于：
（1）网页开发，渲染线程和脚本线程互斥；小程序，二者是可以运行在不同的线程中。
（2）网页开发，可以使用浏览器暴露出来的DOM API；小程序，逻辑层运行在JSCore中，没有DOM API和BOM API，导致一些熟悉的JS库无法运行，同时一些NPM的包也无法运行。
（3）网页开发，开发环境是浏览器、WebView；小程序，环境是微信客户端、辅助开发工具。
（4）网页开发，使用浏览器和辅助工具或编辑器；小程序，申请账号、安装开发者工具、配置项目。

[示例源码](https://github.com/wechat-miniprogram/miniprogram-demo)

## 目录结构

- 小程序主体，在根目录下，包含 app.js/json/wxss
- 小程序页面，包含 js/wxml/json/wxss

## 配置小程序

全局配置app.json可以配置页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。

小程序页面也可以使用同名.json页面配置覆盖 app.json 的 window 中相同的配置项。

sitemap 配置：根目录下的 sitemap.json 文件用来配置小程序及其页面是否允许被微信索引。


## 小程序框架

**场景值**

用来描述用户进入小程序的路径。可以在 App 的 onLaunch 和 onShow，或wx.getLaunchOptionsSync 中获取。

**逻辑层**

逻辑层-JavaScript代码层面。

- 注册小程序：在 app.js 中调用 App 方法注册小程序示例，绑定生命周期回调函数、错误监听和页面不存在监听函数等。
- 注册页面：每个页面，都需要在页面对应的 js 文件中调用 Page 方法注册页面示例，指定页面的初始数据、生命周期回调、事件处理函数等。
- 页面生命周期：[大概以后会用得上](https://developers.weixin.qq.com/miniprogram/dev/guide/framework/page-life-cycle.html)
- 页面路由：介绍了路由的概念和操作的一些方法
- 模块化：将一些公共的代码抽离成为一个单独的 js 文件，作为一个模块。模块只有通过 module.exports 或者 exports 才能对外暴露接口。
- API：分为事件监听 API、同步 API、异步 API	


**视图层**

- WXML(WeiXin Markup language) 用于描述页面的结构。
- WXS(WeiXin Script) 是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构。
- WXSS(WeiXin Style Sheet) 用于描述页面的样式。
- 组件(Component)是视图的基本组成单元。
- 事件的使用方式
- 基础组件：框架为开发者提供了一系列基础组件，开发者可以通过组合这些基础组件进行快速开发。
- 获取界面上的节点信息：提供了响应的API可以调用
- 响应显示区域变化：默认情况下，小程序显示区域的尺寸自页面初始化起就不会发生变化。但以下两种方式都可以改变这一默认行为。
- 动画：动画的常见方式

## 小程序运行时

**运行环境**

微信小程序运行在三端：iOS（iPhone/iPad）、Android 和 用于调试的开发者工具。

三端的脚本执行环境以及用于渲染非原生组件的环境是各不相同的。尽管三端的环境是十分相似的，但是还是有些许区别，比如JavaScript 语法和 API 支持不一致。

开发者工具仅供调试使用，最终的表现以客户端为准。

**JavaScript支持情况**

[表格参阅](https://developers.weixin.qq.com/miniprogram/dev/guide/runtime/js-support.html)

**运行机制**

小程序分为冷、热启动两种方式，不同的操作决定；在后台持续的时间长短和性能开销等因素，会决定在后台时是否被销毁。

**更新机制**

冷启动是会自动加载最新的小程序包，在其他若干个时机微信也会去检查小程序的版本更新。

# Part2 实践