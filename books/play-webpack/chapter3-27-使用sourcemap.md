## 27 使用source map

## 为什么要使用source map

前端代码经过压缩混淆、多文件合并、其他语言编译之后，难于阅读。

在浏览器上运行出错的时候，为了方便调试，最好能够定位到“源”代码的具体位置。

这需要实际执行代码能链接到一个map文件，map文件使用某种表示法，能够将告诉你实际运行代码的每一个位置对应到“源”代码的什么位置。

同样浏览器需要支持source map，才能在出现error或者断点的时候，将“源”代码呈现给用户。

## 如何在webpack中使用sourcemap

可以在配置文件中将mode先设置为none，然后在js代码中插入debugger。

分别给devtool配置不同的值，可以查看到打包后的文件以及debugger查看的效果。

### none


不给devtool设置值，可以看到代码的可读性很不好

```
index_145d737c.js   4.16 KiB       0  [emitted] [immutable]  index
```                


![none](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/play-webpack/webpack-devtool-none.png)

### eval

将devtool设置为'eval'，打包文件大小略微增加，因为在代码中插入了eval会包含一些跟map相关的信息

```
index_145d737c.js   4.29 KiB       0  [emitted] [immutable]  index
```

可读性虽然不好，但是能够看到代码是被分离了，而非跟其他js文件代码混杂在一起：

![eval](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/play-webpack/webpack-devtool-eval.png)

### source-map

将devtool设置为'source-map'，打包多了一个.map文件

```
index_145d737c.js    4.2 KiB       0  [emitted] [immutable]  index
index_145d737c.js.map   3.89 KiB       0  [emitted] [dev]        index
```

调试查看的代码跟源代码几乎无差异

![source-map](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/play-webpack/webpack-devtool-sourcemap.png)


## 了解更多

更详细的关于sourcemap的可以参考下面的介绍

- [webpack devtool](https://webpack.js.org/configuration/devtool/)
- [webpack source map options](https://blog.scottlogic.com/2017/11/01/webpack-source-map-options-quick-guide.html)


