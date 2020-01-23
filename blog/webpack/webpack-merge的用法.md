
## 5. webpack merge

在实际开发中，开发环境和生产环境提供了两份配置文件，绝大多数的配置都是相同的，差异仅仅体现在 

（1）mode: 为 development 或 production

（2）在 development 环境需要配置 devServer，和为devServer注入html所使用的 plugins.HTMLWebpackPlugin

通过 webpack-merge 可以将基础的配置抽象到 webpack.base.js中，开发环境和线上环境分别使用 webpack.dev.js 和 webpack.prod.js，然后 merge(webpack.base.js)即可。

