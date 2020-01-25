## 02 历史背景及特性介绍


2013年由Facebook推出。

### 历史背景

”简单功能“一再出现bug，问题出现的根源：

1. 传统的UI操作太关注DOM操作的细节
2. 应用状态分散在各处，难以跟踪和维护

### 解决办法

为了解决第一个问题，它的解决方案是始终整体刷新页面，无需关注细节。

React的做法很简单：

1. 1个新概念：组件的方式描述UI
2. 4个必须的API：上手非常简单
3. 单向数据流
4. 完善的错误提示

对于第二个问题，数据模型的问题如何解决？

传统的问题在于，model和view的对应关系可能很很复杂，很难于定义。

针对这个问题，它提出了Flux的架构

![flux插图](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/react-action/flux-flow.png?q-sign-algorithm=sha1&q-ak=AKID1widSAHJfw6RfgwJva4RQEuDMJ7jEUWO&q-sign-time=1579915380;1579922580&q-key-time=1579915380;1579922580&q-header-list=&q-url-param-list=&q-signature=086c1c79e70046be3ea270bfa3a9c195176155c0)



Flux标准的接收程度非常高，最后脱颖而出的实现是Redux 和 MobX，本课程重点介绍前者。

### 启发

好的创造，都是能看似稀疏平常的实际问题，很多人却对此视而不见。


