## 03 以组件方式考虑UI的构建

### 课前预习

- [组件 & Props](https://react.docschina.org/docs/components-and-props.html)
- [State & 生命周期](https://react.docschina.org/docs/state-and-lifecycle.html)
- [React理念](https://react.docschina.org/docs/thinking-in-react.html)

### 将UI组织成组件树的形式

[c02/TabSelector/CommentBox.js](https://codesandbox.io/s/6n20nrzlxz) 的例子介绍了，在React中是如何将界面转化组件树的。


### 理解React组件

> 外部传递的props + 内部维护的state => view

1. React组件一般不提供方法，而是某种状态机
2. React组件可以理解为一个纯函数
3. 单向数据绑定

### 创建一个简单的组件TabSelect

1. 创建静态UI
2. 考虑组件的状态组成
3. 考虑组件的交互方式

[c02/TabSelector/TabSelector.js](https://codesandbox.io/s/6n20nrzlxz) 的例子介绍了上述理念。w


### 受控组件 vs 非受控组件

受控组件是说值由外部传入，并且发生变化的时候需要通过onChange事件同步给外部。

非受控组件则自洽，不需要受到控制 和 跟外部交互。

![受控组件和非受控组件](http://a.b)

### 如何创建组件

- 单一职责原则，每个组件只做一件事
- 如果组件变的复杂，应该拆分成小的组件

### DRY原则

数据状态管理的原则：DRY原则（Don't Repeat Yourself）

1. 能计算得到的状态，就不要单独存储
2. 组件尽量无状态，所需数据通过props获取







