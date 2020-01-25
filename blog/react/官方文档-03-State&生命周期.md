## State & 生命周期


### 通过render更新

开篇先提供了一个例子，会用外部的不断更新状态，来不断刷新Clock的组件内容。

```
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

### 通过修改State来更新

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
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

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

### 正确地使用State

1. 不要直接修改State，而是通过setState
2. State 的更新可能是异步的，可以参考下例在setState中使用函数
3. State 的更新会被合并，提供的对象合并到当前的 state

```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### 数据是向下流动的


state除了拥有并设置了它的组件，其他组件都无法访问。
组件可以选择把它的 state 作为 props 向下传递到它的子组件中。


