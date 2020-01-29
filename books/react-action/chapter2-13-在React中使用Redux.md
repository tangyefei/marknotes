## 13 在React中使用Redux

[c12/Counter.js](https://codesandbox.io/s/6n20nrzlxz)

**（1）首先先需要引入 react-redux**

```
import { Provider, connect } from "react-redux";
```

**（2）然后使用connect  + mapStateToProps + mapDispatchToProps 包装自己的组件**

```
function mapStateToProps(state) {
  return {
    count: state.count
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ plusOne, minusOne }, dispatch);
}

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);
```

其中mapStateToProps将store中的state.count属性映射到了组件的count属性中。

mapDispatchToProps将上下文中的两个方法plusOne, minusOne使用bindActionCreators处理。

最后connect相当于是一个高阶组件，调用Counter得到了ConnectedCounter。


**（3）在使用的组建外，提供Provider的包裹**

```
<Provider store={store}>
    <ConnectedCounter />
</Provider>
```

如下为完整的代码示例：

```
import React from "react";
import { bindActionCreators, createStore } from "redux";
import { Provider, connect } from "react-redux";

// Store initial state
const initialState = { count: 0 };

// reducer
const counter = (state = initialState, action) => {
  switch (action.type) {
    case "PLUS_ONE":
      return { count: state.count + 1 };
    case "MINUS_ONE":
      return { count: state.count - 1 };
    case "CUSTOM_COUNT":
      return { count: state.count + action.payload.count };
    default:
      break;
  }
  return state;
};

// Create store
const store = createStore(counter);

// Action creator
function plusOne() {
  // action
  return { type: "PLUS_ONE" };
}

function minusOne() {
  return { type: "MINUS_ONE" };
}

export class Counter extends React.Component {
  render() {
    const { count, plusOne, minusOne } = this.props;
    return (
      <div className="counter">
        <button onClick={minusOne}>-</button>
        <span style={{ display: "inline-block", margin: "0 10px" }}>
          {count}
        </span>
        <button onClick={plusOne}>+</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ plusOne, minusOne }, dispatch);
}

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default class CounterSample extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedCounter />
      </Provider>
    );
  }
}

```