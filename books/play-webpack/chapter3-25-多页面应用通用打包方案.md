## 25 多页面应用打包通用方案

页面跳转的时候，返回新的html文档，即多页应用。

### 思路

多个entry对应多个html-webpack-plugin配置 + 动态获取和设置html-webpack-plugin数量。


可以自己写nodejs实现，也可以使用glob这个库来实现。

## 实现

### 安装glob


```
npm i glob -D
```

### 按照规则存放文件

我们期望用  `src/${modulename}/index.js`  这样的规则来存放文件，有几个入口就新建几个文件夹。

将入口文件都改成index.js移动到对应目录，同时还需要将所有被入口文件依赖的文件也移动到对应目录。

### 修改配置

```
// webpack.prod.js

function setMPA() {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, 'src/*/index.js'));

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/\/src\/(.*)\/index.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;

    htmlWebpackPlugins.push(new HtmlWebpackPlugin({ 
      template: path.join(__dirname, `src/${pageName}/index.html`), 
      filename: `${pageName}.html`, 
      chunks: [pageName], 
      inject: true, 
      minify: { 
        html5: true, 
        collapseWhitespace: true, 
        preserveLineBreaks: false, 
        minifyCSS: true, 
        minifyJS: true, 
        removeComments: false        
      }
    }));
    console.log(pageName);
  })
  return {entry, htmlWebpackPlugins}
}

const {entry, htmlWebpackPlugins} =setMPA();
```

将entry和htmlWebpackPlugins替换原先的entry 和 多处new HtmlWebpackPlugin的位置。

执行npm run build成功后，可以查看到多页面的访问效果。