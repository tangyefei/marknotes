## [译]React的生命周期

参考资料：

- [React.Component](https://reactjs.org/docs/react-component.html)
- [React Lifecycle Methods – A Deep Dive](https://programmingwithmosh.com/javascript/react-lifecycle-methods/)

## 什么是生命周期方法

生命周期方法可以理解为发生在React组件从生到死的各阶段的事件。

组件的生命周期又可以分为三阶段：

- Mounting, 出生
- Update，生长
- Unmounted，死亡

## 生命周期方法概观

如下截图是来自 [react-lifecycle-methods-diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)，它列举了生命周期中的重要方法：

![react-lifecycle-diagram](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/blogs/react/react-lifecycle-diagram.png)

## 生命周期方法详解


### static getDerivedStateFromProps()


该方法会在Mounting和Update阶段，就每次render调用之前被调用（如果有声明的话）。

一旦prop发生改变，它就会更新state，相应的它的调用结果会是一个对象，如果没有任何改变被应有到state，则返回null。

由于它是个静态方法，不需要通过this来获取实例。如下是一个示例：

```
static getDerivedStateFromProps(props, state) {
    if (props.currentRow !== state.lastRow) {
      return {
        isScrollingDown: props.currentRow > state.lastRow,
        lastRow: props.currentRow,
      };
    }
    // Return null to indicate no change to state.
    return null;
}
```

### render()

render方法唯一一个组件中必须包含的方法，它的作用是渲染组件到UI，它会发生在`Mounting`和`Update`阶段。

> render方法必须是`纯净`的

即它在同样的输入(props和state）条件下，调用的结果是完全一样的。这意味着，你不能在render方法中调用setState。

保持render方法的简单和”纯净“让你的应用更可控。

### componentDidMount

组件被挂载就位以后的事件是componentDidMount，你可以在这里初始化API的调用。

你可以在该方法中调用setState方法，调用会导致state更新，进而导致一次新的绘制。

不过它会在浏览器完成当前这次UI的更新后才开始，从而避免同时进行两次UI的更新。

> 谨慎使用setState

最好的初始state的做法是在constructor中，要使用它的原因应该是诸如：tooltip、modals或者类似的你需要根据DOM节点位置来决定渲染效果。

### shouldComponentUpdate

当你不想让React重新根据state和props渲染的时候，可以使用这个方法。

它应该被谨慎地应用于性能优化中，并且不应该过度依赖他，因为他可能导致一些bug。

你不能在该方法中更新state。

```
shouldComponentUpdate(nextProps, nextState) {
 return this.props.title !== nextProps.title || 
  this.state.input !== nextState.input }
```

上述例子表明，该方法应该始终放回一个布尔值，用于告诉React是否应该重新渲染组件。

### getSnapshotBeforeUpdate

该方法在DOM被更新后会马上被调用，调用的返回值会被传递给componentDidUpdate方法。

同样需要注意的是，这个方法不应该被频繁使用。

```
getSnapshotBeforeUpdate(prevProps, prevState) {
	// ...
}
```

### componentDidUpdate

组件更新完成后会马上调用该方法，你可以在该方法中使用setState，但是应该带上条件，否则会导致死循环。

```
componentDidUpdate(prevProps) {
 //Typical usage, don't forget to compare the props
 if (this.props.userName !== prevProps.userName) {
   this.fetchData(this.props.userName);
 }
}
```

### omponentWillUnmount()

方法会在组件被卸载并且销毁的时候调用，你可以做一些诸如清除timers, 结束API调用, 清理缓存等操作。

同样我们不能在它上面调用setState因为组件被再次渲染。


## 生命周期方法总结

参考上节中的图，可以看到在渲染过程又分为三个时间阶段

### Render阶段

流程可能是下面两种序列：

constructor -> getDerivedStateFromProps -> render

constructor -> getDerivedStateFromProps ->  shouldComponentUpdate -> render

<hr/>

**constructor**：用于初始化state

**getDerivedStateFromProps**：通过返回对象用于基于props增强state

**shouldComponentUpdate**：通过返回boolean用于性能优化减少React的组件更新

**render**：用于绘制DOM

<hr/>

该阶段的是”纯净“的，出了前两个会初始state，后两个之负责调整流程 和 绘制。

### Pre-commit阶段

可以理解为它是DOM被渲染完成之前的几个阶段，仅有一个方法 getSnapshotBeforeUpdate可以用，可以让你获取到上次的props和state并将结果返回给componentDidMount。

### Commit阶段

如果是在Mounting流程中，包含componentDidMount方法。
如果是在Updating流程中，包含componentDidUpdate方法。

上述两个方法都可以调用setState的，但是应该谨慎使用，避免死循环。

<hr>

如果是在Unmounting阶段，包含componentWillUnmount方法。

不能调用setState，适宜做一些清理timer、取消API调用、清除缓存的事情。