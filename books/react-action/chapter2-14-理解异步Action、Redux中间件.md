## 14 理解异步Action、Redux中间件

### 异步Action

![redux-async-request](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/react-action/redux-async-request.png)

可以理解为一些action，到达dispatch的时候，会经过middlewares。

middlewares会去调用API，返回一个Promise对象，根据内部执行结果决定要dispatch什么action。

通常七请求分为了 请求开始、请求成功、请求失败 三个状态，它们对应三个不同的action。

action其实是同步的，只是经过middlewares处理，变成了不同的action，像是具有了异步功能。

### Redux中间件（Middleware）

它做到事情其实就是 截获action，进行中间处理，再发出action。最通用的一个例子就是输出日志。

### 例子

本节视频末尾介绍了一个例子，实践不得可以进行参考。