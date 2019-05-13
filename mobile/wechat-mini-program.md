## 小程序简介

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

场景值用来描述用户进入小程序的路径。可以在 App 的 onLaunch 和 onShow，或wx.getLaunchOptionsSync 中获取。

逻辑层-JavaScript代码层面。



WebView
ServiceWorker

