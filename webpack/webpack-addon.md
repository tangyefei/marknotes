
还存在一种情况，你的的html中有一些样式的引入，或者你希望在 `<body>`中内置一个 `<div id="app"></div>` 用于 Vue的根实例的挂载，因此你期望自己的html可以拿来当模板。这时候就需要使用到template，你可以将模板定义在对应html文件中，然后进行如下配置：


```
  entry: {
    index: './src/main.js',
    login: './src/login.js'
  },
  plugins: {
    new HtmlWebpackPlugin({
		inject: false,
		file: 'login.html',
		chunks: ['login'],
		template: './dist/login.html'
    }),
	 new HtmlWebpackPlugin({
		inject: false,
		file: 'index.html',
		chunks: ['index'],
		template: './dist/login.html'
    }),
  }
```

这里略微有点让犯错误，让我们分别解释下：

- template：指明了我们从来注入到 virtual 中的模板

- inject: false 意味着我们自己已经写好了 <script 中对 bundle 文件的引用了，不用webpack帮我们注入到模板中。如果不指定 `inject: false` 该项意味着 bundle 文件会被重复注入到我们的模板中，npm run start运行一次注入一次。也许你会说，那在html模板中不写  <script 对 bundle 文件的引用，到线上环境配置中我们再解释。

- chunks: 则指明了我们要基于哪个js文件进行打包（因为我们会设置inject为false，所以它跟 template 和 file 是没什么关系的）

- file 指明了 我们的模板的内容最终会输出到哪个virtual的html文件中，如果不指明它，会发生奇怪的想象，即 /index.html 访问到的是 login.html的内容，并且都加载了 login.bundle.js 和 index.bundle.js，而 /login.html则无法访问。其实不难解释：因为没有指定file，index.html 和 login.html中 先后被设置为 virtual index.html的内容，而通过 /index.html 访问到的其实是 login.html的内容，