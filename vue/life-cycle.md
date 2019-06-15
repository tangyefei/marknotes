# Vue的生命周期的理解

- [Vue官方说明](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram)
- [alligator的博客](https://alligator.io/vuejs/component-lifecycle/)


大阶段分为Creation，Mounting，Updating，Destruction四个阶段

- `beforeCreate`处在最早期什么事情都还没做，`created`阶段data和event被初始化
- `beforeMount`开始在准备template函数等的构造，`mounted`将dom挂载到了界面上
- `beforeUpdate`可以在渲染前获取到新的数据值，`updated`则是同步了数据改变到界面
- `beforeDestory`包含一些数据清理工作，`destoryed`阶段组件已经清理完毕了基本没什么工作要做

一些使用的原则

- 在还没准备好的阶段做不能做的事情即可（比如尝试在created中去拿dom）
- mounted则是一个最常用的钩子，通常会被用来请求数据和操作dom
- 在什么阶段请求数据，mounted和created即可，理论上越早越好

![life-cycle](./life-cycle.png)