# 33 打包组件和基础库

Webpack除了可以打包应用，还可以用来打包js库。本节列举了打包大整数加法的例子，主要实现：

- 打包分为压缩版和非压缩版
- 支持AMD/CJS/ESM模块引入，还可以通过script方式引用


## 打包不同的js

新建新的文件夹 larger-number，并安装基础配置

```
mkdir larger-number
cd larger-number
npm i webpack webpack-cli terser-webpack-plugin -P
```

作者在实现本节例子的时候，用了个实现大整数的函数，方便起见只直接将结果相加：

```
// src/index.js

export default function add(a, b) {
    return a + b;
}
```

```
npm i terser-webpack-plugin -P
```

```
// webpack.config.js

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: {
    'large-number': './src/index.js',
    'large-number.min': './src/index.js',
  },
  output: {
    filename: '[name].js',
    library: 'largeNumber',
	 libraryTarget: 'esm',
    libraryExport: 'default'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      })
    ]
  }
}
```

同一个源文件配置了两个入口，将mode改为'none'(因为默认会压缩），通过使用TerserPlugin，只针对打包文件名中有`min`的进行压缩。执行打包命令，可以看到两个不同的js文件被打包出来。


## 配置入口根据环境引用


截止到目前为止，只是把js文件打包成普通版 和 压缩版本。

下一步是配置入口，发布好的库被引用的时候，我们希望返回的是普通版还是压缩版，能根据用户的process.env来判断。

在项目根目录下增加一个文件

```
// index.js

if(process.env.NODE_ENV == 'production') {
  module.exports = require('./dist/large-number.min.js');
} else {
  module.exports = require('./dist/large-number.js');
}
```

## 发布到NPM


然后在执行 npm的发布，首先你需要有npm账号，然后在命令行执行 `npm login`，然后就可以通过`npm publish`来发布包了。

为了在每次发布的时候，都能自动打包，我们还可以在配置文件中增加如下行：

```
// webpack.config.js

"scripts": {
+	"republish": "webpack"
}
```

注：发布成功后去npm官网搜索可能不能马上看到，属于延迟。

在其他项目中可以安装该包：

```
npm i larger-number-b
```

并且引入使用（省略不相关代码）：

```
import largeNumber from 'large-number-b';

largeNumber()
```
