## 31 代码分割和动态import

### 代码分割的意义

当某些代码块是在某些特殊的时候才会被使⽤到，将它们放在一个个⽂件中显然是不够有效的。

通过脚本懒加载，使得初始下载的代码更⼩。

### 懒加载 JS 脚本的⽅式

CommonJS：require.ensure

ES6：动态 import（⽬前还没有原⽣⽀持，需要 babel 插件转换）

### 在前端项目中使用动态import

安装babel插件

```
npm install @babel/plugin-syntax-dynamic-import --save-dev
```

在 .babelrc 中增加如下行

```
"plugins": ["@babel/plugin-syntax-dynamic-import"],
```

修改组件代，增加按钮，点击时候动态加载组件内容，并且渲染在界面上：

思考：`{Text ? Text : null}`代码直接改成`{ Text }`动态加载不能渲染，为什么？


```
// search/index.js

constructor() {
    super(...arguments);
    this.state = {
      Text: null
    }
    this.loadComponent = this.loadComponent.bind(this);
  }
  loadComponent()  {
    import("./text.js").then(Text => {
      this.setState({
        Text: Text.default
      })
    })
  }
  render() {
    const {Text} = this.state;
    return <div> 
      Search Component?
      <img src={logo}/>
      <button onClick={this.loadComponent}>加载</button>
      {Text ? Text : null}
    </div>
  }
```

```
// search/text.js

import React from 'react';
export default ()=><div>动态导入</div>
```


