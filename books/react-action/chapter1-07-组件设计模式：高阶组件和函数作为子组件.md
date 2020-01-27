## 07 组件设计模式：高阶组件和函数作为子组件


高阶组件和函数作为子组件是两种复用组件的比较新的方式。


### 高阶组件

组件通常从父组件中通过props接收参数，当层级很多的时候，通常需要一层一层往下传递。

如果只是为了传递数据，而其他什么事情也没干，可以使用高阶来解决这个问题。

**高阶组件** 接受组件作为参数，它通常不包含UI的逻辑。

举例 [c03/Clock.js](https://codesandbox.io/s/6n20nrzlxz)，该组件做了一个计时器每秒更新的功能。

想要在其他的组件中也展示Clock的功能，一个办法是直接引用Clock的组件，但是展示格式是受Clock控制的。

另外一个办法，是定义一个高阶组件，该组件 [c06/withTimer.js](https://codesandbox.io/s/6n20nrzlxz)，将传递进来的组件原封不同的返回了，只是增加了一个名为time的prop。

```
import React from "react";

export default function withTimer(WrappedComponent) {
  return class extends React.Component {
    state = { time: new Date() };
    componentDidMount() {
      this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {
      this.setState({
        time: new Date()
      });
    }
    render() {
      return <WrappedComponent time={this.state.time} {...this.props} />;
    }
  };
}
```

### 函数作为子组件

函数作为子组件是一种新的设计模式，而不是特殊类型的组件。

在使用组件的时候，会传递函数作为它的children，可以理解为外部对于内部怎么排版拥有了决定权。

```
<MyComponent>
	{(name) => (`···
		<div>{name}</div>
	)}
</MyComponent>
```

而在组件的render函数中，会使用它的children（是个模板函数）来进行渲染具体的内容。

```
class MyComponent extends React.Component {
	render() {
		return (
		<div>
			{this.props.children('Nate Wang')
		</div>);
	}
}
```

[c06/AdvancedTabSelector.js](https://codesandbox.io/s/6n20nrzlxz)提供了一个更复杂一些的例子。