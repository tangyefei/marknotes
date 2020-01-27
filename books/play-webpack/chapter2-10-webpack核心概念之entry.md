## 10 webpack核心概念之entry

### 概念介绍

entry：用来指定webpack的打包入口。

为什么叫entry呢，因为webpck中的所有资源都会被当成模块，只有通过入口文件，到它的依赖的其他资源，最终形成依赖树才能加载所有的依赖资源。

### 基本用法

单入口：

```
module.exports = {
	entry: "./src/index"
}
```

多入口：

```
module.exports = {
	entry: {
		index: "./src/index",	
		login: "./src/login"
	}
}
```
