## 06 初识webpack

默认配置文件是`webpack.config.js`。

可以在package.json中通过`webpack --config`指定来指定配置文件。

零配置（什么都不写）的webapck，会默认应用的配置包含如下的内容：

```
module.exports = {
	entry: "./src/index.js",
	output: "./dist/main.js"
}
```