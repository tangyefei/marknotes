## 11-webpack核心概念之output


### 概念介绍

output：用来告诉webpack如何将编译后的文件输出到磁盘


### 基本用法

单入口配置

```
module.exports = {
	entry: "./src/index",
	output: {
	    path:path.join(__dirname, "dist"),
	    filename: "index.js"
	}
}	
```

多入口配置：通过占位符来确保文件名称的唯一

```
module.exports = {
	entry: {
		index: "./src/index",	
		login: "./src/search"
	},
	output: {
	    path:path.join(__dirname, "dist"),
	    filename: "[name].js"
	}
}	
```
