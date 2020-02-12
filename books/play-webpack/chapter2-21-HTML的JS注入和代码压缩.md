## 21 HTML的JS注入、HTML/CSS/JS的代码压缩


### HTML的JS注入和压缩

需要使用插件为html-webpack-plugin，它能基于模板html文件，将打包的资源名注入到script标签中，再输出到制定目录的html中（这里是dist目录)。

先安装


```
npm i html-webpack-plugin -D
```


再在它的配置项中指定参数即可：

```
plugins: [ 
	new HtmlWebpackPlugin({ 
		template: path.join(__dirname, 'src/search.html'), 
		filename: 'search.html', 
		chunks: ['search'], 
		inject: true, 
		minify: { 
			html5: true, 
			collapseWhitespace: true, 
			preserveLineBreaks: false, 
			minifyCSS: true, 
			minifyJS: true, 
			removeComments: false 
		} 
	})
]
```

将对应的html从dist拷贝到src一份，去除掉bundle的引入代码，然后执行build。

查看dist下html文件，可以看到内容都被压缩了，再用浏览器html文件，功能也都正常。

注：这里并没有指明html输出到哪里，可见直接使用了output.path的值来决定输出目录。

### CSS压缩

需要使用插件optimize-css-assets-webpack-plugin，并同时依赖cssnano（CSS解释器)。

首先安装两个依赖：


```
npm i optimize-css-assets-webpack-plugin cssnano -D
```

然后修改配置文件：

```
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	plugins: [
		new OptimizeCSSAssetsPlugin({
			assetNameRegExp: /\.css$/g, 
			cssProcessor: require('cssnano')
		}) 
	]
}	
```

执行打包命令前可以看到CSS文件之前是没有压缩的，执行过后，所有空格

### JS压缩

webpack内置了uglifyjs-webpack-plugin，开启了production mode的时候已经进行了压缩，可以通过打开dist目录下的文件进行查看。

