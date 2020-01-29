## 19-webpack中的热更新及原理分析

### 热更新 webpack-dev-server


- WDS不刷新浏览器
- WDS不输出文件，而是存放在内存中
- 需要使用使用webpack内置的HotModuleReplacementPlugin插件


只需要安装 webpack-dev-server即可

```
$ npm i webpack-dev-server -D
```

修改配置文件增加devServer选项 和 修改plugins部分：

```
//已省略无关代码

const webpack  = require('webpack');

devServer: {
	contentBase: "./dist",
	hot: true
},
plugins: [new webpack.HotModuleReplacementPlugin()],
```

package.json的scripts中增加命令

```

"dev": "webpack-dev-server --open"
```

启动 npm run dev后，修改文件内容可以发现浏览器自动更新了。

**因为例子简单，修改后看似整个浏览器都刷新了，和不刷新浏览器这个说法有所不符合？**

### 热更新原理（HMR）


![热更新原理](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/play-webpack/webpack-dev-server-theory.png)

原理分为两条线

1. Webpack Compiler将资源编译成bundle文件，Bundle Server提供给浏览器访问：1-2-A-B
2. 编译改动文件文件，HMR Server通知浏览器端的HRM Runtime获取更新：1-2-3-4

### 热更新：webpack-dev-middleware

它的优点在于自己可以控制中间过程，更适合灵活定制的用户。

```
$ npm i webpack-dev-middleware -D
```

新建 webpack-server.js

```
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require("./webpack.config.js");
const compiler = webpack(config);
const express = require('express');
const app = express();

app.use(
  middleware(compiler, {
    publicPath: config.output.publicPath
  })
);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
```

注释掉 webpack.config.js 中的 devServer 和 HotModuleReplacementPlugin后，执行。

访问 http://localhost:3000/index.html，奇怪访问的是 Cannot GET /index.html。

**为什么呢？**