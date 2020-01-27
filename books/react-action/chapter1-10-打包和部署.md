## 10 打包和部署

### 为什么要打包

1. 编译ES6语法特性、编译JSX
2. 整合资源，例如图片、Less/SASS
3. 优化代码体积

当前最流行的是使用Webpack进行打包。

### 打包注意事项

1. 设置nodejs环境为production
2. 禁用开发时专用代码
3. 设置应用根路径，`package.json`中指定的home就是发布的根目录