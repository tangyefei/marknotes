## 15-解析ECMAScript和React JSX

### 解析ECMAScript

为了能让Webpack解析ECMAScript，我们首先需要安装

```
npm i @babel/core @babel/preset-env babel-loader -D 
```

然后在配置文件中让代码对js都预先使用babel解析

```
module.exports = {
  module: {
    rules: [{
      test: /\.js$/, use: 'babel-loader'
    }]
  }
}	
```

balbel-loader会去项目文件夹下寻找 .babellrc 文件用于确认使用何种规则来解析ECMAScript


```
{
	"presets": [
		"@babel/preset-env"
	]
}
```

执行 `npm run build` 成功，可见配置生效了。

### 解析React JSX

要解析React JSX，需要安装 

```
npm i react react-dom @babel/preset-react -D
```

并在 .babelrc 中增加配置项

```
{
	"presets": [
		"@babel/preset-env",
		"@babel/preset-react"
	]
}

```

然后在 js/search.js 下些一个使用React的例子

```
import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {
  render() {
    return <div>Search Component</div>
  }
}

ReactDOM.render(
  <Search/>,
  document.getElementById('root')
)
```

最后修改dist/html，增加一个用于挂载的#root，并将script引用指向到seach.js。

```
<div id="root"></div>
<script src="search.js"></script>
```

执行 npm run build后，打开 dist/index.html 可以看到内容被成功渲染了。
 

用于指定打包时候的构建环境，分为：production、development、none。
