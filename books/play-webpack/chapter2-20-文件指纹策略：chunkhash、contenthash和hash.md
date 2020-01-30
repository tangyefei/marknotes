## 20 文件指纹策略：chunkhash、contenthash和hash

### 什么是文件指纹

打包输出的文件名的后缀就是文件指纹。

使用它好处是，在文件指纹没有发生改变的时候，浏览器会加载被缓存的资源文件。

只在文件内容发生改变，才有新的文件指纹，浏览器才会请求新的资源文件。

### 文件指纹的三种方式

#### hash

整个项目只要项目文件有修改，构建的hash值就会变。举例：

```
// webpack.prod.js
entry: {
	index: "./src/index",	
	search: "./src/search"
},
output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[hash:8].js",
    publicPath: "./dist"
}
```

注：`:8`代表只截取hash值的前8位


它的问题在于，两个entry打包出来的文件hash是相同的，只要任何一个依赖的资源变化，两个hash值都会发生变化。

#### chunkhash

和打包的chunk有关，不同的entry有不同的chunkhash值。它能避免一个chunk改变而重新给另一个chunk新的指纹。

#### contenthash

根据文件内容来定义hash，文件内容不变则contenthash不变。它的应用场景是CSS，并且它是属于MiniCssExtractPlugin插件提供的用法。举例：

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

modle.exports = {
	plugins: [
		new MiniCssExtractPlugin({
		  filename: '[name]_[contenthash:8].css'
		})
	],
	module: {
		{
	      test: /\.css$/, use: [MiniCssExtractPlugin.loader,'css-loader']
	    }
	}
}
```
只要有CSS文件的内容发生了变化，就会bulid出新的文件名。

#### 实际应用

上述配置直接可以使用，但是需要将mode改为'production', 并且将devServer和plugins中的HotModuleReplacementPlugin注释掉。

比较好的做法是，另外拷贝一个 webpack.prod.js出来，在package.json中通过如下命令指定运行

```
"scripts": {
	"build": "webpack --config webpack.prod.js",
}
```


### 图片的文件指纹

图片、字体的文件指纹和上述不一样，需要使用file-loader，并且它的占位符中 hash 就是代表的文件内容。

```
module.exporst = {
	module: {
		rules: [{
	      test: /\.(png|jpe?g|gif)$/i,
	      use: [{
	        loader: 'file-loader',
	        options: {
	          name: '[name]_[hash:8].[ext]'
	        }
	      }]
	    },{
	      test: /\.(woff|woff2|eot|ttf|otf)$/,
	      use: [{
	        loader: 'file-loader',
	        options: {
	          name: '[name]_[hash:8].[ext]'
	        }
	      }]
	    }]
	}
}
```

注：省略了无关的配置代码。



