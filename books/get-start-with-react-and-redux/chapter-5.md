# 第 5 章 　 React 组件 的 性能 优化

## 1. 单个React组件的性能优化

Virtual DOM快就快在会比较DOM树的变化，然后之重绘变化的部分。

今天的主题要更早一些，即如何自己就能判定不需要重回，不需要React来比较渲染树。 

### 发现浪费的渲染时间

使用React Perf可以检测到，用在 Virtual DOM Compare上的没有必要的时间。

### 性能优化的时机

作者引入了高德迈的关于优化的一些哲学，值得一读。

### React-Redux的shouldComponentUpdate实现

React的Component组件有shouldComponentUpdate方法，返回值是true，默认有数据变动时候会调用生命周期的所有函数。

在TodoItem组件中，我们可以自己实现这个方法，即通过判断 props.text 和 props.completed 都不变化，则返回为false。

每个组价都实现自己的shouldComponentUpdate未免太麻烦，React-Redux替我们实现了该方法，它的逻辑是传递给它的所有prop都没变化的时候，会返回false。实际使用中在，只需要使用 connect方法来包裹我们的组件即可。

在实际使用中，我们需要区别对待的是，传入的对象/方法虽然看起来代码一样，但完全是新的对象，渲染上自然会重新渲染。

针对Todos中的例子，`<TodoItem>`组件除了传递 `text`等属性，还会传递`onToggle()=>{onToggle(data.id)}`等方法，有两种解决办法：

(1) 改写方法调用为 onToggle="onToggleItem"，`onToggleItem` 为我们定义的唯一的方法，并且需要传递 `id={id}`到 `<TodoItem>` 上用于给 onToggleItem 使用
(2) 将dispatch对应action的调用放到 TodoItem中，而非它的父级

## 2. 多个React组件的性能优化

我们发现todos的filter功能生效，比如3个组件，最后1个completed，使用completed过滤后，只有一个组件被重回了，讲道这里不得不讲下React使用的优化算法。

从根节点的元素开始比较，分两种情况：

如果节点是普通的DOM元素，元素的类型发生了变化，会导致整个子树重绘；否则之修改变化的部分
如果节点是一个React组件，则会按照第一节介绍的单个组件的性能优化的逻辑，进行组件的对照

讲到这里大概已经知道它的逻辑了，即按照结构去一次对比。

这里出现一个问题，一个数组中有100条数据，删除了第一条，理论上一个重绘（从有到无），实际上却会导致所有数据都被重回，这就是为什么我们需要在组件上加上key的原因。

## 3. 用resetlect提高数据获取性能

从state中获取数据的时候仍旧有可以优化的地方。即使用resetlect来缓存我们的计算结果。按照作者的理解，有了resetlect，我们可以很放心地进行范式化（即表关联表）的数据查询。

注：关于它的实现原理，自己是患有疑问的，还需再看看。