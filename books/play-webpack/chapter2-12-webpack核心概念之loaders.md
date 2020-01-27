## 12 webpack核心概念之loaders


### 概念介绍

webpack默认只支持JS和JSON，通过loaders可以支持其他类型，并转化为有效的模块

loader本身是一个函数，接受源文件作为参数，返回转化后的结果。

### 常见的loaders

- babel-loader：转换ES6、ES7等语法特性
- css-loader：支持.css文件的加载和解析
- less-loader：将less文件转化为css
- ts-loader：将TS转化为JS
- file-loader：进行图片字体等的打包
- raw-loader：将文件以字符串的形式导入
- thread-loader：多进程打包CSS和JS

### 基本用法


它的用法是，在module下面有一个rules数组，数组的每个对象包含了`test`用于指定文件名格式，`use`用于指定用什么loader去加载此类文件。


```
module.exports = {
  module: {
    rules: [{
      test: /\.txt$/, use: 'raw-loader'
    }]
  }
}	

```