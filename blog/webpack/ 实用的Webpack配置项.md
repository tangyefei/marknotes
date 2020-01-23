

# 实用的Webpack配置项

## 如何指定Alias

- [resolvealias](https://webpack.js.org/configuration/resolve/#resolvealias) 在引用js/css等文件的时候如果不希望记忆前面的路劲，可以使用alias

```
module.exports = {
  //...
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/')
    }
  }
};

import Utility from '../../utilities/utility';
```

## 解决css晚于DOM渲染好导致的 Flash_of_unstyled_content 问题

css-loader 会在js加载好以后，将样式代码以行内的格式插入到页面中，晚于DOM渲染，使用 [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/) 可以提前将css打包到指定文件夹，然后在html的head中提前引入就可以解决这个问题了。

```
npm i -D mini-css-extract-plugin
```

在webpack的配置文件中增加如下代码：
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  //...
  plugins: [
      // ...
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
  ],

  {
      test: /\.css$/,
      use: [
        // 'style-loader',
        {
          loader: MiniCssExtractPlugin.loader
        },
      ]
  ]
}
```

在打包成功后可以看到

```
Entrypoint index = vendors~index~login.css vendors~index~login.bundle.js vendors~index.css vendors~index.bundle.js index.css index.bundle.js
Entrypoint login = vendors~index~login.css vendors~index~login.bundle.js login.css login.bundle.js
```

将对应的css文件，插入到 html 的link中，形成引用即可：

index.html

```
<link rel="stylesheet" href="./vendors~index~login.css ">
<link rel="stylesheet" href="./vendors~index.css ">
<link rel="stylesheet" href="./index.css ">
```

login.html

```
<link rel="stylesheet" href="./vendors~index~login.css ">
<link rel="stylesheet" href="./vendors~login.css ">
<link rel="stylesheet" href="./index.css ">
```


## 对打包的css文件进行压缩，提高下载速度

发布到线上环境的时候，可以将CSS进行压缩，在prod的webpack中配置可以使用 `optimize-css-assets-webpack-plugin`

```
npm i -D optimize-css-assets-webpack-plugin
```

```
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  optimization: {
      splitChunks: {
        chunks: 'all',
      },
  }
}
```

公司项目使用 css-extract 和 optimize后的 js/css 大笑变化：

注：空单元格代表跟左边一列相等；n/a表示没生成

||Dev style|Dev extract|Dev extract+optimize|Prod style|Prod extract|Prod extract+optimize|
|---|---|---|---|---|---|---|
|vendors~index~login.bundle.js|1.1MB|946KB||154KB|74.5KB||
|vendors~index.bundle.js|9.3MB|7.8MB||1.3MB|827KB||
|index.bundle.js|379MB|337KB||53.8KB|42.7KB||
|vendors~index~login.bundle.css|n/a|203KB||n/a|76.2KB|56.9KB|
|vendors~index.bundle.css|n/a|1.4MB||n/a|526KB|228KB|
|index.bundle.css|n/a|27.5KB||n/a|10.0KB|5.0KB|

