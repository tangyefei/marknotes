## 13-webpack核心概念之plugins

### 概念介绍

通常用于loaders输出后的文件内容的优化，包含资源管理，环境变量的注入。

可以理解为用loaders无法做的事情，都交给plugins来做。

### 常用的plugins

- CommonChunsPlugin，把被多个chunks都依赖的模块代码提取成公共的js
- CleanWebpackPlugin，清理构建目录
- ExtractTextWebpackPlugin，将CSS从bundle文件里提取成独立的CSS文件
- CopyWebpackPlugin，将文件或文件夹拷贝到构建的输出目录
- HtmlWebpackPlugin，创建html文件去加载输出的bundle
- UglifyjsWebpackPlugin，压缩js
- ZipWebpackPlugin，将打包出的资源生成一个zip包

### 基础用法

```
module.exports = {
	plugins:[
		new HTMLWebPlugin({template: "./src/index.html"})
	]
}	
```