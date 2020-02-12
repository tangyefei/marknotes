# 2.4 关键渲染路径的优化实践



## 优化资源大小

webpack-bundle-analyzer是一个工具，使用它我们可以打包项目的过程，将打包结果输出到它的配置文件中，然后在用可伸缩的区块来展示依赖资源的大小。

![webpack-bundle-analyzer](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/webpack-bundle-analyzer.png)


webpack-bundle-analyzer的简单使用为：

### 1. 安装 

```
$ npm i -D webpack-bundle-analyzer
```

### 2. 增加配置文件 

配置完全拷贝自己项目的一份配置命名为`webpack.generate.js`即可。

### 3. 配置 package.json

```
{
	"scripts": {
		"generate": "webpack --config webpack.generate.js --profile --json > stats.json",
		"analyze": "webpack-bundle-analyzer --port 8888 stats.json"
	}
}
```

### 4. 依次执行命令

```
$ npm run generate
$ npm run analyze
```

可以在浏览器上看到打开的资源大小的色图，在知道了各项资源的大小了以后，可以分析项目中是否有很大的资源，但是在项目中实际使用率很低，或者完全可以被更轻便的方法替代。


## 优化资源数和路径长度

更多地，你需要在项目开发过程中，去把握如何发送尽可能少的资源请求，以及那些资源是可以通过async（JavaScript）或inline（CSS）的方式来加载的。