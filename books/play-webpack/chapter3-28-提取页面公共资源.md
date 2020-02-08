## 28 提取页面公共资源

公共资源分为基础库（比如react、react-dom）和 被多个entry引用的代码（比如通用的utils方法）。

### 使用CDN提取基础库

通过通过CDN引入，我们可以加快打包时间，减少bundle文件的大小从而提高加载的速度。

首先安装html-webpack-externals-plugin

```
$ npm i html-webpack-externals-plugin -D
```

修改配置，增加对HtmlWebpackExternalsPlugin的使用。

```
//webpack.prod.js 

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

new HtmlWebpackExternalsPlugin({
  externals: [
    {
      module: 'react',
      entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
      global: 'React',
    },
    {
      module: 'react-dom',
      entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
      global: 'ReactDOM',
    }
  ]
})
```

同样需要在html文件中增加对CDN的库文件的引用（html-webpack-externals-plugin的文档中尤其强调了这一点）：

```
// search.html

<head>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
</head>
```

**思考：**

其实不太理解的是，为什么在配置文件中指明了CDN文件以后，在html中还需要引用一次。


发现在plugins中，HtmlWebpackExternalsPlugin在前htmlWebpackPlugins在后，能得到预期的结果。

出现顺序对调后发现CDN的引用会被自动插入到html中文件，有几个entry就冗余几次。

比如：有search和index两个entry，在没有给html文件中引用它们的script的情况下，react和react-dom的script引用分别被插入到html文件两次。

### 使用splitChunks提取基础库


先移除上一节增加的配置和html中的标签，然后增加如下配置：


```
//webpack.prod.js

chunks: ['vendors', pageName], 


optimization: {
	splitChunks: {
	  cacheGroups: {
	    common: {
	      test: /(react|react-dom)/,
	      name: 'vendors',
	      chunks: 'all'
	    }
	  }
	}
},
```

打包后可以看到多出一个vendor开头的文件，对应的search打包出来的文件小了很多。

### 使用splitChunks提取公用代码

在项目根目录下新建一个common/index.js，然后在我们的两个entry中引入它。

再稍加修改optimization的配置：

任意大小的js，只要被两个地方引用了，就单独打包成commons命名的包

```

optimization: {
	splitChunks: {
	  minSize: 0,
	  cacheGroups: {
	    common: {
	      name: 'commons',
	      chunks: 'all',
	      minChunks: 2
	    }
	  }
	}
},
```

minSize、chunks、minChunks等更多参数的的配置可以参考[split-chunks-plugin](https://webpack.js.org/plugins/split-chunks-plugin/)。
