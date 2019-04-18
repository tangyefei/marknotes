# Webpack Using Guides

## [Concepts](https://webpack.js.org/concepts/) 

Webpack是一个JavaScript应用程序的模块打包工具，能将项目的依赖关系构建成图谱，它的核心概念有：


| 概念 | 定义  |
|---|---|
|  Entry |  定义打包的入口位置。即从哪个文件开始搜集打包的引用关系。 |
| Output  |  定义打包好的文件的存放位置和命名。 |
| Loaders | 允许对非JS/JSON的文件进行打包，需要配置test和use分别定义文件规则和loader。 |
| Plugins | 用于执行更广泛的任务比如打包文件的优化等，需要require引入并且用new构造实例。  |
| Mode  | 可以配置为development, production 或 none 来达成不同程度的优化。  | 

## [Guide](https://webpack.js.org/guides)



### [Installation](https://webpack.js.org/guides/installation/)


安装`webpack`和`webpack-cli`到本地而非全局是推荐的做法。

```
npm install webpack --save-dev
npm install webpack-cli --save-dev
```

### [Getting Started](https://webpack.js.org/guides/getting-started)

在介绍使用Webpack的例子之前，介绍了用传统的方式是怎么实现一个简单的`Hello webpack`的。

依赖的库`lodash`通过`index.html`中的`script`进行加载，在`src/index.js`中直接使用挂在全局下面的`_`，模块的依赖关系并不明确，并且`lodash`不论使用与否始终会被加载，`lodash`加载有问题的话会导致不能运行。

使用Webpack的做法是：安装`lodash`后通过`import`方式在需要使用的放引用，在`index.html`中指向被打包好的js文件路径，通过Webpack命令行进行打包。

初始化package.json

```
npm init -y
```

目录结构

```
 webpack-demo
  |- package.json
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

src/index.js

```
import _ from 'lodash';

function component() {
  let element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

dist/index.html

```
<!doctype html>
  <html>
   <head>
     <title>Getting Started</title>
   </head>
   <body>
     <script src="main.js"></script>
   </body>
  </html>
```

执行下面的命令，它会把`src/index.js`当做入口的js文件，并生成最最终的`dist/main.js`作为输出的文件。

```
npx webpack
```

在 `src/index.js` 中我们看到了 `import` 这样的语法，作为ES6的标准，在浏览器端还不能得到很好的支持的情况下，Webpack帮我们做一些转化处理让这种语法能工作。

在Webpack 4中，配置文件不是必须的，当然你也可以指定自己的配置文件 `webpack.config.js`，用于做更复杂的配置

webpack.config.js

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

指定使用该配置文件

```
npx webpack --config webpack.config.js
```

当然如果嫌使用 `CLI` 的 `npx` 命令不好，可以在`package.json` 配置一些执行的 `script`: 

package.json

```
"build: "webpack"
```

这是时候再执行`npm run build`也能达到一样的效果。

