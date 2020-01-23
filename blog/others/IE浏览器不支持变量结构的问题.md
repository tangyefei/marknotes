## 1. Edge浏览器不支持解构语法

### a. 问题

Vue的项目在Edge上打开为空白页，报错信息为 `Expected identifier, string or number`。

### b. 解决

最终参考 [stackoverflow: edge-script1028-expected-identifier-string-or-number](https://stackoverflow.com/questions/53628191/edge-script1028-expected-identifier-string-or-number/53628253#53628253) 知道，Edge浏览器不支持形如 `let name = {...obj}` 的解构语法。


途径是参考 Vue-CLI创建的项目，参考它的 .babelrc 文件中获取有用的部分：

```
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-vue-jsx", "transform-runtime"]
}
```

参考 [https://babeljs.io/docs/en/presets](https://babeljs.io/docs/en/presets) 基本能确定需要增加 `env` 的配置。`stage-2` 包含了更多的规范，`transform-runtime`则提供了一些优化的功能。

尝试将三者都添加，会发现 `stage-2` 已经不被支持到 presets 中了，`transform-runtime` 则会引起其他的报错，仅保留 `env`的配置就可以，即：

```
$ npm install --save-dev @babel/preset-env
```

在 `.babelrc` 中的 `presets` 中增加如下配置，重启项目再在Edge上发现不再报错。

```
["@babel/preset-env", {
  "modules": false,
  "targets": {
    "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
  }
}]    
```