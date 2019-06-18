

# 实用的配置项

## 如何指定Alias

- [resolvealias](https://webpack.js.org/configuration/resolve/#resolvealias) 在引用js/css等文件的时候如果不希望记忆前面的路劲，可以使用alias

```
module.exports = {
  //...
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/')
    }
  }
};

import Utility from '../../utilities/utility';
```

## 解决css晚于DOM渲染好导致的 Flash_of_unstyled_content 问题

css-loader 会在js加载好，将样式代码以行内的格式插入到页面中，晚于DOM渲染，使用 [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/) 可以提前将css打包到指定文件夹，然后在html的head中提前引入就可以解决这个问题了。
