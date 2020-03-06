# 36-优化构建命令行的显示日志

## stats参数的使用

不同的日志等级输出的日志信息不同，默认是所有日志，我们可以根据需要进行选择：


```
module.exports = {
  //...
  stats: 'errors-only'
};
```


[官方文档给出了不同配置的含义](https://webpack.js.org/configuration/stats/) 

## 使用friendly-errors-webpack-plugin美化输出


```
$ npm i friendly-errors-webpack-plugin -D
```

```
//webpack.config.js

var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var webpackConfig = {
  // ...
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ],
  // ...
}
```

通过安装和使用friendly-errors-webpack-plugin，在日志输出界面可以根据成功、警告、失败来显示不同的颜色。 	