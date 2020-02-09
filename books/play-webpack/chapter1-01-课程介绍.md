## 01 课程介绍


课件地址：[geektime-webpack-course ppt](https://github.com/geektime-geekbang/geektime-webpack-course/tree/master/ppt)

### 1. 作者介绍

程柳峰，在腾讯负责约40人的工程效率建设，曾主导团队将FIS3构建切换到Webpack4，该过程涉及

- 多页面打包
- SSR
- PWA
- Prerender

等多种构建场景，以及

- 多实例构建
- 并行压缩
- 公共资源分包
- treeshaing
- 动态Polyfill

等构建策略，对Webpack的打包速度和体积优化有丰富的经验。



### 2. 为什么要掌握Webpack

#### 应用场景和开发方式

随着手机、移动平板等设备的普及，软件开发不只是PC端的开发，还包括了多终端的开发。

要支持多终端的开发，做不同的打包显得尤其重要，比如PC端中后台应用需要打包成SPA应用，而H5则因为对网速的要求，需要进行服务端渲染和PWA离线缓存。

#### Node.js社区的异常繁荣

很多的js包被开发出来，但是浏览器通常无法直接使用npm的组件，需要使用Webpack等工具来构建。

#### 前端的三大框架的发展

JSX、Vue指令在浏览器中是无法解析的，需要使用Webpack等工具进行转换，框架的使用无论走哪个方向都需要Webpack的知识。学习Webpack以后，对其他跨站应用的开发，Weex、React Native等也能快速上手。

### 3. 初学Webpack会遇到什么困难

一切皆为模块；需要掌握众多概念；配置异常灵活。

### 4. 内容划分

- 基础篇，核心概念和开发必备技巧
- 进阶篇，构建配置和优化策略
- 源码片，剖析内部源码并编写自定义的loader和插件
- 实战篇：从项目出发应用学习到的知识


