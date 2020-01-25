## 05 React组件的生命周期及其使用场景

![生命周期](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/react-action/life-cycle.jpeg)

### constructor

1. 用于初始化内部状态，很少使用
2. 唯一可以直接修改 state 的地方，其他地方需要用setState

### getDerivedStateFromProps

1. 当state 需要从 props 初始化时使用
2. 尽量不要使用：维护两者状态一致性会增加复杂度
3. 每次 render 都会调用
4. 典型场景：表单控件获取默认值

### componentDidMount

1. UI渲染完成后调用
2. 只执行一次
3. 典型场景：获取外部资源


### componentWillUnmount

1. 组件被移除时调用
2. 使用场景：资源释放


### getSnapshotBeforeUpdate

1. 在页面 render 之前调用，state 已经更新
2. 典型场景：获取render之前的DOM状态


### componentDidUpdate

1. 每次UI更新时候被调用
2. 典型场景：页面需要根据props变化重新获取数据


### shouldComponentUpdate

1. 决定Virtual DOM是否要重绘
2. 一般可由PureComponent自动实现
3. 典型场景：性能优化


### 示例1

[c03/Clock.js](https://codesandbox.io/s/6n20nrzlxz)

```
import React from "react";

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    console.log("Clock constructed");
    this.state = { date: new Date() };
  }

  componentDidMount() {
    console.log("Clock did mount");
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    console.log("Clock will unmount");
    clearInterval(this.timerID);
  }

  componentDidUpdate() {
    console.log("Clock did update");
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

可以看到输出的顺序为：
```
Clock constructed
Clock did mount
Clock did update
```

### 示例2

[c04/SnapshotSample.js](https://codesandbox.io/s/6n20nrzlxz)

默认可以看到每次插入的数据，会自动顶替前面的位置，造成列表在刷新的感觉。

注释代码部分可以拿到界面更新之前的属性，从而通过处理，让新增数据平滑无感知。

