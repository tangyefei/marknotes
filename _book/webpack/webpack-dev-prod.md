# 如何配置开发和线上环境


## 开发环境配置

安装 `webpack-dev-server`

```
npm install -D webpack-dev-server
```

在package.json的scripts中配置命令

```
{
	scripts: {
		"start": "webpack-dev-server --open",
	}
}
```


为了让我们bundle文件直接注入到默认的html文件中，我们需在配置中引入 html-webpack-plugin

```
npm install -D html-webpack-plugin
```

修改配置 webpack.config.js，


```
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/main.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
	 new HtmlWebpackPlugin({
	   title: 'My Application'
    }),
  ],
}
```

在 `npm run start` 启动过后，就可以正常访问项目地址了。

**注：这时候会发现它的输出内容默认 index.html 并不会出现在文件夹中，可以理解为 webpack-dev-server 是动态的创建内容然后作为结果返回给浏览器的。**

常见的一种情况是，可能需要有多个html的入口，比如有登陆页 和 项目主体页，可能就需要配置多个 HtmlWebpackPlugin，你可以这样进行配置，其中 chunks中的值跟entrys中对应：

```
  entry: {
    index: './src/main.js',
    login: './src/login.js'
  },
  plugins: {
    new HtmlWebpackPlugin({
		file: 'login.html',
		chunks: ['login'],
    }),
	 new HtmlWebpackPlugin({
		file: 'index.html',
		chunks: ['index'],
    }),
  }
```


## 线上环境配置

我们需要在webpack.config.js中配置mode，移除 devtool、devServer、HtmlWebpackPlugin


```
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/main.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

然后在 package.json 中配置 build

```
{
	scripts: {
		"build": "webpack"
	}
}
```


当然你也可以在开发环境中使用类似的配置，取一个更准确的名字即可

```
{
	scripts: {
		"watch": "webpack --watch"
	}
}
```

## 配置多入口的问题


在webpack中，使用HtmlWebpackPlugin对代码进行build常见的一种情形是：你有多个输出的html文件，比如登陆使用`login.html` 登陆成功后使用`index.html`。

这里的配置和容易出错的情形，看下面的示例配置会有什么问题



### 不指定chunk和file

```
  output: {
    path: '/build'
  },    
  entry: {
    index: './src/main.js',
    login: './src/login.js'
  },
  plugins: {
    new HtmlWebpackPlugin({
		inject: true,
		template: './public/login.html'
    }),
	 new HtmlWebpackPlugin({
		inject: true,
		template: './public/login.html'
    }),
  }
```

**问题1：**没有指名要将哪个chunk注入到html，结果是两个chunk的引用都会出现在输出的index.html中

**问题2：**template代表源文件，并不能代表最终生成的文件（需要使用file指定），结果是两个HtmlWebpackPlugin注入了不同模板内容到build/index.html，后者覆盖前者

现象是，build/index.html的内容来自于 /public/login.html，并且引入的js文件，包含了 `login.bundle.js`  和 `index.bundle.js`。

另外也存在一个 `build/login.html`，内容跟 `public/login.html` 一模一样，猜想是Webpack操作包含了 ”拷贝 + inject/写文件“，其中从 `public/login.html` 到 `build/login.html` 的拷贝正常，但是 "inject/写文件"操作 被错误映射到了 `/build/index.html` 中。

### 修改后的配置

```
  output: {
    path: '/build'
  }    
  entry: {
    index: './src/main.js',
    login: './src/login.js'
  },
  plugins: {
    new HtmlWebpackPlugin({
		inject: true,
		template: './public/index.html',
		file: 'index.html',
		chunks: ['index']		
	
    }),
	 new HtmlWebpackPlugin({
		inject: true,
		template: './public/login.html',
		file: 'login.html',
		chunks: ['login']
    }),
  }
```

chunks也制定了，输出文件也执行了，理论上应该正确了，结果发现 /build/index.html 和 /build/login.html中内容倒是都来自模板了，但是bundle都没有注入。

可以把filename和chunks分别注释掉，再进行build，会发现是chunks引起的。我们的代码必然是要使用chunks的， 因此找到了绕过它的方式。

### 曲线救国

首先配置`inject`为`false`我们再指定打包的`js/css`文件名的时候，不采用`[hash]`，而是直接使用 `[name].bundle.js` 和 `[name].css`的方式，再在  `public/login.html` 中 和 `public/index.html` 中引用即将被打包好的css/js即可。
 
 