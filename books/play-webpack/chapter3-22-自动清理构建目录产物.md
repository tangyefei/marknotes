## 21 自动清理构建目录产物


### 当前构建的问题

每次构建会输出一些文件，如果不清理文件会越来越多，可以再命令中配置 

```
rm -rf ./dist && webpack
```

### 使用插件清理目录

更优雅的做法是借助插件 clean-webpack-plugin

```
npm i clean-webpack-plugin -D
```

然后在配置中引入后执行发现之前生成的文件被删除了

```
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

plugins:[
	new CleanWebpackPlugin()
]
```

注：课程中的写法是下面这样，执行会报`CleanWebpackPlugin is not constructor`，修改成上述后可通过。

```
const CleanWebpackPlugin = require('clean-webpack-plugin');
```



