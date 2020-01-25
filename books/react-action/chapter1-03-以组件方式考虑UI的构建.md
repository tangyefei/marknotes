## 03 以组件方式考虑UI的构建

### 课前预习

- [组件 & Props](https://react.docschina.org/docs/components-and-props.html)
- [State & 生命周期](https://react.docschina.org/docs/state-and-lifecycle.html)
- [React理念](https://react.docschina.org/docs/thinking-in-react.html)

### 将UI组织成组件树的形式

### 理解React组件

外部传递的props + 内部维护的state => view

1. React组件一般提供放阿飞，而是某种状态机
2. React组件可以理解为一个纯函数
3. 单向数据绑定

### 创建一个简单的组件 TabSelect

1. 创建静态UI
2. 考虑组件的状态组成
3. 考虑组件的交互方式

```
value
options
onChange

render函数
	loop options
	option.value == value selected
```

所有状态都来自外部，点中某个按钮的时候，必须要告诉外部发生了变化。

外部使用者，传递options和value，并绑定onChange事件。

组件分为 受控组件 vs 非受控组件

受控组件来自于外部

非受控组件状态来自内部

初学者可能容易混淆这两个概念

### 如何创建组件

- 单一职责原则，每个组件只做一件事
- 如果组件变的复杂，应该拆分成小的组件

### 数据状态管理的原则

DRY原则（Don't Repeat Yourself）

1. 能计算得到的状态，就不要单独存储
2. 组件尽量无状态，所需数据通过props获取







