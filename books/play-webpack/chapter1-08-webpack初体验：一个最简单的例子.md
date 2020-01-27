## 08 webpack初体验：一个最简单的例子

在安装好webpack和webpack-cli后，我们来实现一个最简单的例子。


在一个空项目新增src文件夹，并新增两个js文件：


```
// src/index.js

import { helloworld } from './helloworld';

document.write(helloworld());
```

```
// src/helloworld.js

export function helloworld() {
  return 'hello world';
}
```

配置文件 

```
// webpack.config.js

const path = require('path');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path:path.join(__dirname, "dist"),
    filename: "bundle.js"
  }
}
```

在html文件引用打包的文件

```
// dist/index.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
  <script src="bundle.js"></script>
</body>
</html>
```

运行命令 `node_modules/.bin/webpack`，然后用浏览器打开 dist/index.html  可以看到内容被输出到了文档中。

