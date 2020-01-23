# 基于Webpack+Vue+Vue-Router搭建前端开发环境

前端开发一步步发展催生了很多工具、组件、脚手架，好处是确实便利了项目的快速搭建，但是害处也很大：用惯了工具也许开发，也许两年过去了仍旧对基础原理仍旧一无所知。

比如，如何用原生dom来操作界面绑定事件都没学会，就开始用Vue；再比如对Webpack的所解决的时间开发问题没有感知前就开始用Vue-Cli也是一样。

本篇尝试从最简单的例子开始，一步一步介绍如何基于Webpack+Vue+Vue-Router配置项目环境，并随着项目开发的深入介绍一些更进阶的配置。

## 1. 准备

基础的前端开发知识HTML/JS/CSS是必须的，然后应该能够基于Webpack的文档将 [Concepts](https://webpack.js.org/concepts/)、[Guide](https://webpack.js.org/guides/)、[Asset Management](https://webpack.js.org/guides/asset-management/)、[Development](https://webpack.js.org/guides/development/) 部分动手实践过。

## 2. 初始化


```
mkdir simplest-webpack-vue
cd simplest-webpack-vue
npm init -y
npm install -D webpack webpack-cli webpack-dev-server
```

此时的项目结构如下：

```
simplest-webpack-vue
  - dist
    - index.html
  - src
    - main.js
  - packge.json
  - webpack.config.js
```

webpack-config.js

```
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/main.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  }
};
```

main.js
```
var ele = document.createElement('div');
ele.innerText = 'hello';
document.body.append(ele);
```

index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>my project</title>
</head>
<body>
  <script src="./index.bundle.js"></script>
</body>
</html>
```

## 3. 集成Vue


我们参考 [vue-loader](https://vue-loader.vuejs.org/) 先安装 `vue`  `vue-loader`  `vue-template-compiler`。然后在 `webpack.config.js` 中配置 `vue-loader`。

因为webpack加载非JS的文件会按照配置的rules依次进行处理，而在标准的vue文件中，除了`template`包裹的html内容意外，还会有`<style>`包裹的css 和 `<script>`包裹的JS，因此还需要提供css-loader+style-loader用于处理样式，babel-loader用于处理JS。


```
npm install -P vue
npm install -D @babel/core @babel/preset-env vue-loader vue-template-compiler babel-loader css-loader  vue-style-loader css-loader 
```


webpack.config.js 增加的部分如下

```

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {

  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
    ]
  }
};
```

关于babel需要特别注意的一点是，从版本7开始，balbel包名规则从 `babel-core` 变成了 `@babel/core`，如果发现 `babel-loader` 报出了 依赖的`babel-core`未找到的错误，我们需要制定 babel-loader安装最新的版本即可。

此时的项目结构如下


```
simplest-webpack-vue
  - dist
    - index.html
  - src
    - App.vue
    - main.js
  - packge.json
  - webpack.config.js
```


dist/index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>my project</title>
</head>
<body id="app">
  <script src="./index.bundle.js"></script>
</body>
</html>
```



src/App.vue

```
<style>
  .app {color: red}
</style>

<template>
  <div class="app">{{msg}}</div>
</template>
<script>
export default {
  data() {
    return {msg}
  }
}
</script>
````

src/main.js
```
import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: h => h(App),
}).$mount('#app');
```


执行 `npm run start` 可以看到 HTML渲染了来自JS的变量并且颜色被应用成了CSS红色。


## 3. 集成 Vue-Router

首先安装 `vue-router`

```
npm install -D vue-router
```

继续修改和新增必要的文件，文件夹结构图如下所示：

```
simplest-webpack-vue
  - dist
    - index.html
  - src
    - components
      - Home.vue
      - Products.vue
    - js
      - common
        - router-config.js
    - App.vue
    - main.js
  - packge.json
  - webpack.config.js
```


webpack.config.js

```
module.exports = {

  resolve: {
    alias: {
      cp: path.resolve(__dirname, 'src/components/'),
      js: path.resolve(__dirname, 'src/js/'),
      css: path.resolve(__dirname, 'src/css/')
    }
  },
  
}  
```

src/main.js

```
import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterConfig from 'js/common/router-config.js';

import App from './App.vue';

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router: new VueRouter(RouterConfig)
}).$mount('#app');
```

js/common/router-config.js

```
import Home from "cp/Home.vue";
import Products from "cp/Products.vue";

export default {
  routes: [{
    name: 'home', path: '/', component: Home
  },{
    name: 'products', path: '/products', component: Products
  }]
}
```

src/App.vue


```
<template>
  <div id="app"><router-view></router-view></div>
</template>
```

src/components/Home.vue

```
<template>
  <div class="home-page">
    home page
  </div>
</template>
```

src/components/Products.vue

```
<template>
  <div class="products-page">
    products
  </div>
</template>
```

执行 `npm npm run start`可以通过切换 `/` 和 `/products` 来看到不同的内容被渲染成功。

