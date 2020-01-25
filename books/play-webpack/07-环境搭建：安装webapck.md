## 07-环境搭建：安装webapck



### 安装node和npm

本篇教程作者先安装了了nvm，然后基于nvm来安装node和npm。感兴趣可以了解下nvm的使用。

### 安装webpack和webpack-cli

```
$ npm init
$ npm i webpack webpack-cli -D
```

### 配置webpack.config.js



```
const path = require('path');
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js"
  }
}
```

上述配置以`index.js`为入口，将打包结果输出到 `dist.js`中。

定义它们进行一些输出，再定义一个html文件中引用`bundle.js` 即可。

```
- src
	- index.js
- dist
	- bundle.js
	- index.html
```

执行`node_modules/.bin/webpack`命令，它会找到`webpack.config.js`并执行。



