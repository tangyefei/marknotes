 [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

 - JavaScript是单线程
 - 任务被分为同步任务和异步任务
 - 同步任务会在主线程中排队执行，异步任务有了结果会放置一个事件到任务队列
 - 所有同步任务执行完毕以后，才会开始按照事件顺序执行异步任务（异步任务的回调函数）
 - 异步任务包括DOM的事件、ajax、setTimeout等
 - setTimeout只是将事件放置到了任务队列中，时间的到了未必能执行，需要等主线程中的任务执行完毕


