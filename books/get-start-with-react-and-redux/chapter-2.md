# 第2章 设计高质量的React组件

”差劲的程序员操心代码，优秀的程序员担心数据结构和他们的关系。“

- Linus Torvalds，Linux创始人


外部世界将数据传递给React组件可以通过prop，同样React组件可以通过传递进来的函数把数据反馈给外部世界。

可以通过propTypes对外部传递的prop进行校验，包含支持什么prop 以及 prop 应该是什么格式的。

## 生命周期

### 装载过程

- constructor：初始化state 或 绑定成员函数的目的
- getInitialState和getDefaultProps：属于使用React.createClass这种历史产物的部分，实际上在现在用ES6方式构造的组件中不会被使用
- render：返回JSX描述的结构，最终由React来操作渲染
- componentWillMount和componentDidMount：在render的前后分别被调用，通常在componentWillMount不会做什么事，可以在componentDidMount上做获取到DOM、获取数据填充组件的逻辑


### 更新过程

跳过。

### 卸载过程

跳过。

## 向外传递数据

简言之组件通过调用props中的函数，能够成功操作父组件暴露的操作数据的接口（使用详查2.5）。

## State和Prop的局限


数据可能存在不一致的情况下，重点是想引入Redux的概念。
