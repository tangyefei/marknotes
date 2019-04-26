# Babel

将ES6代码转换为ES5代码从而可以在现有环境执行。

为了使用它，首先要安装 `@babel/core`，然后需要在 `.babellrc` 配置转码规则和插件：

```
{
	"presets": ["@babel/preset-es2015"], // 按年份定义的规则，不再推荐
	"presets": ["@babel/preset-env"], // 表最新的规则，推荐
	"plugins": []
}
```

想在node的命令行使用它，可以安装 `@babel/cli` 然后通过 `npx` 的调用了来执行。

`@babel/node` 则提供了一个支持ES6的REPL环境，可以直接运行ES6代码。


`@babel/register`模块改写require命令，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用 Babel 进行转码。

如果某些代码需要调用 Babel 的 API 进行转码，就要使用@babel/core模块。

```
var babel = require('@babel/core');

// 字符串转码
babel.transform('code();', options);
```


Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，必须使用`@babel/polyfill` 才能让这些API正常运行。

浏览器环境想要正常运行，可以将浏览器版本插入到网页中。
