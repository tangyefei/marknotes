#《玩转webpack》 


## 第一章 构建发展历史和wepack的helloworld


### 1.1 为什么要使用构建工具

- 转换ES6语法
- 转化JSX
- CSS前缀补全、预处理器
- 压缩混淆
- 图片压缩

### 1.2 为什么选择Webpack

- 社区生态丰富
- 配置灵活和插件扩展
- 官方迭代速度快


### 1.3 课程介绍

![content-desc](./assets/content-desc.png)

### 1.4 基础入门

![webpack-base](./assets/webpack-base.png)


- 命令是在 node_modules/.bin下面去找执行文件的
- webpack的默认执行文件是 webpack.config.js

## 第二章 基础用法

### 2.1

thread-loader以多进程的形式打包css和js

### 2.2

url-loader也可以用来加载图片

### 2.3


![hot-reload](./assets/hot-reload.png)

### 2.4  

有三种形式：hash，chunckhash, contenthash

1. js文件常用chunckhash
2. css常用contenthash
3. 图片字体等常用hash

### 2.5 压缩

1. webpack4中内置了 uglifyjs 进行了js的压缩
2. css要使用plugin进行压缩 **optimaze-css-assets-webpack-plugin**、cssnao
3. html 文件使用 html-webpack-plugin 在 minify中指定参数进行压缩，source/target的html文件需要指定不同位置

## 第三章 进阶用法

### 3.1 清理构建目录

rm命令、使用 clean-webpack-plugin

### 3.2 CSS功能的增强

PostCSS插件自动补全css前缀（postcss-loader)

### 3.3 适合移动端和Pad的CSS自动转化为rem工具

px2rem-loader、lib-flexible（就是在HTML上设置一个font-size然后通过px2rem-loader来将px转化为rem，很傻瓜式地）

### 3.4 资源内联到HTML中


* 代码层面的好处 ：初始化脚本、上报相关打点、CSS内敛避免页面闪动
* 请求层面的好处：减少HTTP请求的数量（小图片或字体内联）
* HTML和JS内敛：raw-loader
* CSS内联
  * style-loader 使用属性可以将所有style打在一起
  * **html-inline-css-webpack-plugin**（将打包好的css插入到对应位置）

### 3.5 多页面应用打包通用方案

多页面通常需要配置多个entry/htmlwebpackplugin，作者介绍了**Glob**工具可以读取到某个规则的文件比如 `src/*/index.js`，然后通过书写js代码来准备entry/htmlwebpackplugin，个人感觉意义不大，因为项目不会频繁增减入口。
   
   

### 3.6 sourcemap

在webpack中可以有多重配置来使用sourcemap，除了问题默认是定位到打包过后的代码不好调试，其他一些可用参数可以让自己以更细的粒度进行代码调试。

### 3.7 提取页面公共资源资源

可以使用webpack-externals-plugin和splitChunks来进行公共资源提取。

           