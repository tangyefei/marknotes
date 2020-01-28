## 18-webpack中的文件监听


在源码发生改变的时候，自动重新构建出新的输出文件。

有两种方式可以使用它：

- 启动webpack命令带上 --watch 参数（命令行或者package.json文件的scripts中）
- 在webpack.config.js配置文件中设置 watch:true

不过它存在一个缺点，即重新输出过后需要手动刷新浏览器。