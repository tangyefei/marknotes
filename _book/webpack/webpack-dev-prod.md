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