## 11 前端为何需要状态管理库

### 介绍

Redux是一个状态管理框架，被认为是React生态圈中最为困难的一部分。

它基于Flux的设计模式，提出的前端状态管理框架。

由dan_abramov提出，后进入了Facebook，进而成为了Facebook的官方的状态管理框架。

state跟dom的对应关系，被移到了store和所有组件的映射关系：

![redux绘图描述](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/react-action/redux-theory.png)

### 特性

1. ingle Source of Truth，状态值存储在唯一的Store中
2. 可预测性，state + action = new state，状态变化一定由一个action产生的
3. 纯函数更新store，由action触发，通过reducer生成新的store，输出结果由action参数决定