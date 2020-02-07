## 24 静态资源内联

### 为什么资源内联

1. 页面需要做一些初始化，需要在网页加载的时候进行，而非js请求回来后

比如上1节的lib-flexible，计算html的font-size需要很早就进行。

2. 页面加载的事件上报，需要需要内联的js代码去

3. 页面首屏加载为了避免白屏，将CSS资源内联到HTML中

4. 通过小图片或字体内联，可以减少HTTP请求数量（前述的url-loader)


### HTML 和 JS 内联

首先安装raw-loader（作者要求是如下的指定版本）：

```
npm i raw-loader@0.5.1 -D
```

网页的head中增加引入（因为我们使用html-webpack-plugin，它默认使用ejs作为模板因此支持花`${}`形式的语法）：

```
<head>
  ${ require('raw-loader!./meta.html') }
  <script>${ require('raw-loader!babel-loader!../node_modules/lib-flexible/flexible.js') }</script>
  <title>Document</title>
</head>
```



其中meta包含常见的meta信息，flexible.js则是上一节安装的js库。

```
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
```

执行npm run build后打包出来的html文件中可以看到meta和js都被正常内联显示了。

### CSS内联

**方法一：借助style-loader**

```
{
	loader: 'style-loader',
	options: {
		insertAt: 'top',
		singleton: true //将所有标签合并成一个
	}
}
```

关于CSS的有关的loader，这里做一些总结：

- postcss-loader, less-loader解析scss、less文件为css文件
- css-loader解析css文件为commonjs对象
- style-loader将css内容插入到style标签中
- MiniCssExtractPlugin.loader将style中内容抽成单个文件表示成用link引入的方式
- 在loader数组中的顺序，最先使用的出现在最后面

**方法二：html-inline-css-webpack-plugin**

具体使用略。