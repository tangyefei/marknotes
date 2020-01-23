

## Webpack项目的性能优化

Webpack的Code Splitting介绍了三种减少加载包大小的技术，可以尝试运用两种：

- Entry Points: 通过配置文件中的entry手动指定
- Prevent Duplication: 通过 SplitChunksPlugin 拆分 和 杜绝重复
- Dynamic Imports: 通过行内调用来拆分代码

### SplitChunksPlugin


项目中已经采用第一种技术，根据页面的不同打成不同的bundle；现在可以通过SplitChunksPlugin将常用的commons打包。


webpack.config.js


``` 
{
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  output {  	
    chunkFilename: '[name].bundle.js'
  }
}  
```

可以看到的原本生成的 index.bundle.js，现在变成了 vendors~index.bundle.js + index.bundle.js。

另外需要注意的是，如果我们有两个entry，除了生成各自的bundle以外（vendors~index.bundle.js 和 vendors~login.bundle.js)，基于这两个bundle的通用部分又被抽象成了 vendors~index~login.bundle.js，需要注意依次引入，不要遗漏。如下是示例：

dist/index.html

```
    <script src="./vendors~index~login.bundle.js"></script>
    <script src="./vendors~index.bundle.js"></script>
    <script src="./index.bundle.js"></script>
```


webpack.config.js

```
plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'login.html',
      template: './dist/login.html',
      chunks: ["vendors~index~login", "vendors~login", "login"]
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      template: './dist/index.html',
      chunks: ["vendors~index~login", "vendors~index", "index"]
    }),
```

    <script src="./vendors~index~login.bundle.js"></script>
    <script src="./vendors~index.bundle.js"></script>
    <script src="./index.bundle.js"></script>

### Routes Dynamic Imports

首先在项目的根目录新建文件 .babelrc：

```
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

将路由都从

```
import AppFrame from "cp/app-frame.vue";
```

改成如下的写法

```
const AppFrame = () => import('cp/app-frame.vue');
```

这时候可以看到每次加载一个新组件的时候，都会请求单独的js。


### 按需加载element UI

参考 [element quick start](https://element.eleme.cn/#/en-US/component/quickstart) 进行配置，可以将对应的bundle文件减小，其中development环境bundle文件大小从7.5M减小到5M，production大小从 1.2M 减小到 815KB。

## 5. pacakge-lock.json冲突、无法被添加到.gitignore


[resolving-lockfile-conflicts](https://docs.npmjs.com/files/package-locks.html#resolving-lockfile-conflicts)

> As of npm@5.7.0, these conflicts can be resolved by manually fixing any package.json conflicts, and then running npm install [--package-lock-only] again. npm will automatically resolve any conflicts for you and write a merged package lock that includes all the dependencies from both branches in a reasonable tree. 


[cant-make-git-stop-tracking-package-lock-json](https://stackoverflow.com/questions/44600721/cant-make-git-stop-tracking-package-lock-json)

> gitignore only works for untracked files. If you have a tracked file that is also in your .gitignore, the fact that the file is tracked overrides the fact that it is also in .gitignore.


[do-i-commit-the-package-lock-json-file-created-by-npm-5](https://stackoverflow.com/questions/44206782/do-i-commit-the-package-lock-json-file-created-by-npm-5)

> Yes, package-lock.json is intended to be checked into source control. If you're using npm 5, you may see this on the command line: created a lockfile as package-lock.json. You should commit this file.
