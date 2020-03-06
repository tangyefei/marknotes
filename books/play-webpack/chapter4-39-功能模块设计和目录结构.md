# 39 功能模块设计和目录结构 

作者介绍如何将配置提取到一个文件夹中（用于发布到npm）后可以随取随用。

分布在各个配置文件中的内容分别包含了：

![配置文件中的功能分布](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/play-webpack/webpack-division-tree.png)

最终新建的文件夹结构为：

```json
+ |- /test 
+ |- /lib 
	+ |- webpack.dev.js 
	+ |- webpack.prod.js 
	+ |- webpack.ssr.js 
	+ |- webpack.base.js 
+ |- README.md 
+ |- CHANGELOG.md 
+ |- .eslinrc.js 
+ |- package.json 
+ |- index.js

```

作者只是在该节就上述内容分类进行了实操，自己也可以尝试将前述中的的配置进行抽取。