# 32 在webpack中使用ESLint

使用ESLint辅助团队避免常见的错误，比较流行的有airbnb的ESLint配置。

## 配置原则
在自己团队已制定ESLint规范的时候，一定要遵循如下几个原则：

1. 不要重复造轮子，基于eslint:recommend配置改进
2. 能够帮助发现代码错误的规则全部都开启
3. 帮助团队保持代码风格统一即可，不要限制开发体验


## 如何落地

### 方案1：和CI/CD系统集成

- 在build前增加一个lint pipline，通过之后再走下一阶段
- 通过scripts中增加`'precommit': 'lint-staged'`在提交前进行检查

### 方案2：和Webpack集成

首先安装依赖包（有多个，下面是一个安装命令的缩写)

```
npx install-peerdeps --dev eslint-config-airbnb
```

然后安装 eslint-loader  和 eslint-config-airbnb

```
npm i eslint-loader eslint-config-airbnb - D
```

修改webpack.prod.js中对js的解析

```
{
  test: /\.js$/, use: ['babel-loader', 'eslint-loader']
},
```

最后在项目根目录增加一个配置文件 .eslintrc.js

```
module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true
  }
}
```

启动打包命令后，可以看打包失败，报出了很多错误/警告。

当然对于规则需要修改的，可以在`eslintrc.js `中通过rule属性覆盖。

具体配置参考：[https://eslint.org/docs/user-guide/configuring](https://eslint.org/docs/user-guide/configuring) 。









