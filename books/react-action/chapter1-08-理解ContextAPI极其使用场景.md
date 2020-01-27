## 08 理解Context API极其使用场景


### 概念介绍

Context API在React中存在了很长一段时间时间，直到React 16.3才开发给开发者。

它的设计目的就是在层层的状态传递过程中，可以把状态放在context，那么依赖context的组件都能用到这些状态。



![Context API的用法](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/react-action/context-api.png)


### 使用介绍

[c07/LocaleSample.js](https://codesandbox.io/s/6n20nrzlxz)是一个切换上下文语言的例子。

注意：为了演示错误的用法`<LocaledButtons />`故意定义了两个。

