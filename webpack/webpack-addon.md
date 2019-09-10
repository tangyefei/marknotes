
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
 
 