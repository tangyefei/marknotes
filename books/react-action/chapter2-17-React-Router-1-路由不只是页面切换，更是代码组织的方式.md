## 17 路由不只是页面切换，更是代码组织的方式


[c16/RouterSample.js](https://codesandbox.io/s/6n20nrzlxz) 介绍了一个简单的使用例子。


### 核心API

- Link：普通链接，像a那样，但是会被react-router接管进行处理
- NavLink：和Link类似，可以给匹配的该NavLink添加一个class
- Prompt： 满足条件时提示是否离开当前页面
- Redirect：重定向，例如登陆判断
- Route：路由匹配时候的对应组件（并不排他，如果path匹配多个component，它们都会被展示）
- Switch：Router如果被放在Switch中，只显示匹配的第一个

### React Router的特性

 1. 声明式路由定义：任何地方都可以定义Route
 2. 动态路由：不出现在模板中的不会被解析，render的才会被实时解析



### React Router的三种实现方式
 
 1. URL路径：BrowserRouter
 2. Hash路由：HashRouter
 3. 内存路由：MemoryRouter 不会反应到URL上

 
 
### 基于路由进行资源组织的优点
 
1. 业务逻辑松耦合
2. 易于扩展，重构和维护
3. 路由页面Lazy Load

### 附上个人使用总结

1. React Router的版本升级很快，目前（2020-02-01）已经到V5，找资料的时候要看下版本
2. BrowserRouter/HashRouter的使用要生效，需要套在组件的最外层，Provider提上就不生效
3. 组件的嵌套，可以比较灵活，如下例（已经省略无关代码）：



```
// index.js

import { HashRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
<Router>
  <Provider store={store}>
      <Route path="/">
        <App>
          <Route path="/Home" component={Home}/>
          <Route path="/Account" component={Account}/>
        </App>
      </Route>
  </Provider>
</Router>,
document.getElementById('root')
);
```

```
// app.js {this.props.children}把接收的组件直接渲染在了对应位置 第7课介绍过类似

class App extends React.Component {  
  render() {
    return (
      <div className="app-frame">
        <main className="app-main">
          <Header></Header>
          <div className="page-main-outer">
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}
```


### 课程示例源码

[router-sample](https://codesandbox.io/s/6n20nrzlxz)的源码

```
import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { MemoryRouter } from "react-router";

const Home = () => <h1>Home</h1>;
const Hello = () => <h1>Hello</h1>;
const About = () => <h1>About Us</h1>;

export default class RouterSample extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <ul id="menu">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/hello">Hello</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>

          <div id="page-container">
            <Route path="/home" component={Home} />
            <Route path="/hello" component={Hello} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}
```

