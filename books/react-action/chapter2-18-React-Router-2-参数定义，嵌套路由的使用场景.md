## 18 参数定义，嵌套路由的使用场景

### 通过URL传递参数

1. 传递：`<Route path="topic/:id" .../>`
2. 获取：`this.props.match.params`
3. 更多：[这里有匹配规则的具体介绍](https://github.com/pillarjs/path-to-regexp)


### 嵌套路由

每个组件都可以是路由容器，容器内可以在定义子的路由。

### 课程示例源码*2

[c17/router-params](https://codesandbox.io/s/6n20nrzlxz)的源码：

```
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

const Topic = ({ match }) => (
  <h1>Topic {match.params.id}</h1>
);

export default class RouterParams extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <ul id="menu">
            <li>
              <Link to="/topic/1">Topic 1</Link>
            </li>
            <li>
              <Link to="/topic/2">Topic 2</Link>
            </li>
            <li>
              <Link to="/topic/3">Topic 3</Link>
            </li>
          </ul>

          <div id="page-container">
            <Route path="/topic/:id" component={Topic} />
          </div>
        </div>
      </Router>
    );
  }
}

```

[c17/nested-route](https://codesandbox.io/s/6n20nrzlxz)的源码：

```
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

const Category = ({ match }) => (
  <h1>Sub Category {match.params.subId}</h1>
);

const SubCategory = ({ match }) => (
  <div>
    <h1>Category {match.params.id}</h1>

    <ul id="menu">
      <li>
        <Link to={`/category/${match.params.id}/sub/1`}>
          Sub Category 1
        </Link>
      </li>
      <li>
        <Link to={`/category/${match.params.id}/sub/2`}>
          Sub Category 2
        </Link>
      </li>
      <li>
        <Link to={`/category/${match.params.id}/sub/3`}>
          Sub Category 3
        </Link>
      </li>
    </ul>
    <div id="page-container-2">
      <Route
        path="/category/:id/sub/:subId"
        component={Category}
      />
    </div>
  </div>
);

export default class NestedRoute extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <ul id="menu">
            <li>
              <Link to="/category/1">Category 1</Link>
            </li>
            <li>
              <Link to="/category/2">Category 2</Link>
            </li>
            <li>
              <Link to="/category/3">Category 3</Link>
            </li>
          </ul>

          <div id="page-container">
            <Route
              path="/category/:id"
              component={SubCategory}
            />
          </div>
        </div>
      </Router>
    );
  }
}
```