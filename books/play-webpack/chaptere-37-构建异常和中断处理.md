# 37 构建异常和中断处理

构建后，可以通过输出`echo $?`查看错误码，如果不为0，说明构建失败。

在Webpack4中会直接抛出错误码（Webpack3中需要结合process.exit来做一些处理）。

具体配置如下：

```
//webepack.prod.js

plugins: [
    function() {
      this.hooks.done.tap('done', (stats) => {
        if(stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('-watch')) {
          console.log('build error');
          process.exit(1);
        }
      })
    },
]
```	

上述只是一个示例，process和error code具体的含义可以细看下。

在CI/CD中构建失败时候，是否需要做上报，都可以在相关代码位置添加。