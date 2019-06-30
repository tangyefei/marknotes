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
注：安装后的 `webpack` 和 `webpack-cli` 可以通过类似于 `node_modules/.bin/webpack` 来执行。

### [Getting Started](https://webpack.js.org/guides/getting-started)

在介绍使用Webpack的例子之前，介绍了用传统的方式是怎么实现一个简单的`Hello webpack`的。

依赖的库`lodash`通过`index.html`中的`script`进行加载，在`src/index.js`中直接使用挂在全局下面的`_`，模块的依赖关系并不明确，并且`lodash`不论使用与否始终会被加载，`lodash`加载有问题的话会导致不能运行。

使用Webpack的做法是：安装`lodash`后通过`import`方式在需要使用的放引用，在`index.html`中指向被打包好的js文件路径，通过Webpack命令行进行打包。

初始化package.json

```
npm init -y
npm install --save lodash
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

## [Asset Management](https://webpack.js.org/guides/asset-management)

本篇会介绍如何load各种非JS的资源，先从CSS开始。

### Loading CSS

```
npm install --save-dev style-loader css-loader
```

然后在 webpack.config.js 增加代码行

```
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
```

增加一个 src/style.css文件，并在index.js中进行引用

src/style.css

```
.hello {
  color: red;
}
```

src/index.js

```
import './style.css';

element.classList.add('hello');
```

除了CSS之外，你还可以load各种i能想到的CSS相关的文件：postcss，sass，less等。

### Loading Images

```
npm install --save-dev file-loader
```

src/index.js
```
import Icon from './icon.png';

// Add the image to our existing div.
var myIcon = new Image();
myIcon.src = Icon;

element.appendChild(myIcon);
```

src/style.css

```
background: url('./icon.png');
```

### Loading Fonts/Loading Data 

略

### Global Assets

因为在Webpack中可以灵活的加载任何位置的资源，所以我们可以根据需求将资源按照模块进行归类，这有利于我们将模块拷贝复用到其他项目，比起传统的将所有的资源都放在`/assets`的做法，显然更有利于更方便的，如果你有一些资源是被多个组件服用的，那也没关系提取出一个通用的`base`文件夹就好了。


## [Output Management](https://webpack.js.org/guides/output-management)

假定我们需要加载另外一个`print.js`的模块，然后再在`index.js`中引入其用于打印一些信息。除此外，我们还希望基于不同的entry来打包js文件：

src/print.js

```
export default function printMe() {
  console('I get called from print.js!');
}
```

src/index.js

```
import _ from 'lodash';
import printMe from './print.js';

function component() {
  let element = document.createElement('div');

  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
```

dist/index.html

```
<!doctype html>
<html>
  <head>
    <title>Output Management</title>
    <script src="./print.bundle.js"></script>
  </head>
  <body>
    <script src="./app.bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```
 entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
```


执行 `npm run build` 过后可以看到生成了两个`bundle`文件，点击按钮可以在console中输出log。我们发现改动了`bundle`的文件名字后需要手动在`index.html`进行修改，下面尝试使用 `HtmlWebpackPlugin` 来解决这个问题。另外为了保持`dist`目录干净，可以让Webpack帮我们清理掉不被使用的模块，还需要安装一个 `clean-webpack-plugin`。关于Webpack是如何知道哪些模块有没有被用到，使用的是`manifest `，我们可以通过`WebpackManifestPlugin` 这个插件来导出`manifest `文件为json。

```
npm install --save-dev html-webpack-plugin clean-webpack-plugin
```

webpack.config.js

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
  
```

疑问：既然`print.js`的代码会最终都被打包到`app.bundle.js`中，print生成的`print.bundle.js`有什么意义呢，徒增加了一个js文件的加载。


## [Development](https://webpack.js.org/guides/development)

在开发过程中，模块之间相互引用，最后都被打成了一个`bundle`包，有报错的时候只会指向到该`bundle.js`往往无助于我们定位问题，为了更好的跟踪问题JavaScript提供了`source maps`的功能可以方便的定位到源代码的位置。

Webpack提供了很多选项可以用来做这件事情，此处只展示一个在开发环境的用法用于证实该功能，在实际的产品阶段会需要使用别的模式和参数配置，敬请区分。



webpack.config.js

```
mode: 'development',

devtool: 'inline-source-map',
```

src/print.js

```
export default function printMe() {
  cosnole.log('I get called from print.js!');
}
```

执行如下命令后访问页面，照例点击按钮可以在console中看到报错信息直接指向了 `print.js` 而非 `app.bundle.js`。


```
npm run build
```

每次都手动执行build命令明显太麻烦，有没有别的办法可以监听代码改动后自动编译呢，有三个工具可以达到这样的目的，下面将分开介绍这三个工具：

1. webpack's Watch Mode
2. webpack-dev-server
3. webpack-dev-middleware


### webpack's Watch Mode

package.json 

```
"watch": "webpack --watch",
```

执行 `npm run watch`后，再手动修改`print.js`代码可以看到命令行的自动编译。


### webpack-dev-server

它相当于提供了一个简单的web server可以实时刷新页面，当然它还提供了很多其他的配置参数可用可以自己去查。

```
npm install --save-dev webpack-dev-server
```

webpack.config.js

```
devServer: {
  contentBase: './dist'
},

```

package.json
```
"start": "webpack-dev-server --open",
```

### webpack-dev-middleware

可以通过它将由Webpack进行的文件处理过程交给server，在 `webpack-dev-server` 中内置了这个包，当然我们也可以单独使用它，比如通过跟`expres` server结合使用。


```
npm install --save-dev express webpack-dev-middleware
```

webpack.config.js

```
output: {
  publicPath: '/'
}

```

server.js

```
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

package.json

```
"server": "node server.js",
```


## [Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/)

HMR可以不用刷新的情况下，更新所有变动的模块。官方给了两个做法
（1）通过在`webpack.config.js`中增加配置，然后再在自己的js代码中通过类似于 `module.hot.accept`来处理变动，当然不适合自己的自动更新的需求。
（2）通过自定义web server，在配置项中指定 `hot: true` 来达到目的。

下面是第二种做法的代码，定义script后执行或者直接`node dev-server.js`即可

dev-server.js

```
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
```

对于我们在js代码中引入的css文件，也是一样会根据改动自动刷新。HMR不会用于设计给正式环境使用的，而是用于开发，在运行环境中的配置需要参考其他部分的文档。

当我们使用不同的前端框架或库的是时候，需要提供HMR功能，需要使用到不同的loaders，包括针对 Vue/React/AngularJS等，具体使用时候参考文档和示例。

## [Code Splitting](https://webpack.js.org/guides/code-splitting)


Code splitting允许你将代码拆分成多个bundle，这样可以用与按需 或 并行加载，从而实现加载的优化，如果使用得当它能显著减少加载所需的时间.有三种方式可以用来做 Code splitting。

- Entry Points: 通过配置文件中的entry手动指定
- Prevent Duplication: 通过 SplitChunksPlugin 拆分 和 杜绝重复
- Dynamic Imports: 通过行内调用来拆分代码

### Entry Points

假设我们在配置文件中的 entry 指定了多个文件：`src/index.js` 和 `src/another-module.js`，这两个文件都依赖 lodash，在build完以后我们发现两个bundle文件都包含了lodash文件，显然不是好的实践。

### Prevent Duplication


SplitChunksPlugin 会帮我们将common的依赖导出到单独的chunk中，这样就可以将上述例子中的`lodash`的重复问题解决掉。

webpack.config.js

```
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
```

通过在 webpack.config.js 中最外层配置如上代码，我们可以看到 lodash 被打成了单独的一个bundle。

还有一些其他有用的plugins或者loaders能够用于Code splitting：

- mini-css-extract-plugin：Useful for splitting CSS out from the main application.
- bundle-loader：Used to split code and lazy load the resulting bundles.
- promise-loader：Similar to the bundle-loader but uses promises.

### Dynamic Imports

在Webpack中有两种办法可以支持动态的Code splitting：
（1）通过ES6中提供的`import()`来实现
（2）通过Webpack遗留的`require.ensure()`来实现

下面将介绍第一种做法，在开始之前我们先仅保留 index 这一个entry，移除刚添加的 `optimization` 配置，并在 output中增加一行 `chunkFilename: '[name].bundle.js',`，它的目的是定义没有通过entry方式定义的文件的名字。最后的代码配置如下：

webpack.config.js

```

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
```


src/index.js

```

function getComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;

  }).catch(error => 'An error occurred while loading the component');
}

getComponent().then(component => {
  document.body.appendChild(component);
})
```

因为 import 返回的是是一个promise，可以用 async 函数来改写上面的代码：


```
async function getComponent() {
  var element = document.createElement('div');
  const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}
```

### Prefetching/Preloading modules


在4.6.0以及以后的版本中支持者连个参数，使用类似`import()`的方式导入模块时候可以指定 prefetch 和 preload参数，用于告知浏览器资源被使用的时机。

### Bundle Analysis

官方提供了一些工具用于分析bundle文件，当然社区也还有很多工具可以根据需求选择。


## [Tree Shaking](https://webpack.js.org/guides/tree-shaking)

简单来说就是一棵树树上不被引用到的枝丫和叶子会被砍掉，主要原理是使用的的 ES6的模块原生的机制，在实际使用需要在 webpack.config.js 和 package.json 上都进行配置。

## [Production](https://webpack.js.org/guides/production)

可以通过配置另外一个配置用来load prod的配置

```
scripts: {
	"build": "webpack --config webpack.prod.js"
}
```

并且在webpack.config.js中增加如下配置行：

```
mode: 'development',
```

以及在 pacakge.json中增加配置行

```
"sideEffects": false,
```

可以完成代码压缩和和tree-shaking的操作。
