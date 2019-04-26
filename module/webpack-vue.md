# Webpack+Vue 

- [vue-loader](https://vue-loader.vuejs.org/)


## Install vue-loader and compilier
```
npm install -D vue-loader vue-template-compiler
```

每个版本的`vue `发布的同时，会同时发布相应的`vue-template-compiler`版本，因此我们需要单独安装vue-template-compiler并确保兼容。

## Webpack config

webpack.config.js

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/main.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack vue'
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
    ]
  }
};

```

package.json

```
{
  "name": "webpack-vue",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open",
    "watch": "webpack --watch"
  },
  "devDependencies": {
    "@babel/core": "^7.4.3",
    "@babel/preset-env": "^7.4.3",
    "babel-loader": "^8.0.5",
    "css-loader": "^2.1.1",
    "file-loader": "^3.0.1",
    "html-webpack-plugin": "^3.2.0",
    "jquery": "^3.4.0",
    "mini-css-extract-plugin": "^0.6.0",
    "style-loader": "^0.23.1",
    "vue-loader": "^15.7.0",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.30.0",
    "webpack-cli": "^3.3.0",
    "webpack-dev-server": "^3.3.1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "vue": "^2.6.10"
  }
}
```

要特别注意的一点是，Babel从7开始，包的名字从规则 `babel-core` 变成了 `@babel/core`，因此 `babel-loader` 也期望是比较新的版本，否则会引用老版本的 `babel-core` 而导致报错。


问题1：index.html会被覆盖，从而无法再上面加id=app


