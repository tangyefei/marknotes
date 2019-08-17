# 第3章 从Flux到Redux

## Flux

传统MVC框架的问题在于View和Model之间的通信会扰乱数据流转，从而变的难以为胡。而Flux的做法是：

- 状态数据存储于Store中
- Store中通过继承EventEmitter实现了 add/removeListener,trigger
- View的操作会触发Action
- Action通过Dispatcher来执行动作
- Dispatcher的定义中，则包括操作Store的数据 和 通过Store去trigger
- 在View中，把Store中获取到的数据设置到state中，Store的addListener的处理回调中使用View中的onChange方法，就可以监听数据变化了，一旦变化，再获取State数据，设置到自己的State中


## Redux