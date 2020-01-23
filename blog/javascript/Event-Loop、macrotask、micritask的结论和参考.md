## Event Loop、macrotask、micritask的结论和参考

### 参考资料

- [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

- [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)


- [理解 JavaScript 中的 macrotask 和 microtask](https://juejin.im/entry/58d4df3b5c497d0057eb99ff)

- [difference-between-microtask-and-macrotask-within-an-event-loop-context](https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context#)

### Event Loop

JavaScript是单线程的语言，为了处理一些耗时的任务，会将任务分布到主线程和任务队列中。

一旦主线程的所有任务执行完毕，就会读取任务队列里面的任务。

## macrotask vs microtask

任务队列里的任务又分macrotask和microtask，并且单独维护。

如果你需要在同步中进行异步任务，那么使用microtask；否则就使用macrotask。

- macrotasks: setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering

- microtasks: process.nextTick, Promises, Object.observe, MutationObserver


## 执行顺序

1. 执行主线程的任务
2. 遇到一些非立即执行的任务，分别放到macrotask和microtask队列中。
3. 立即执行microtask中所有的任务。
4. 开始执行macrotask中的第一个任务，并且可能继续产生新的任务。
5. 如果4产生了microtask，会继续执行3。
6. 接着4开始执行下一个macrotask任务。

## 执行示例

下面提供了4个例子，可以先自己推算下对不对，其中最后一个是需要在node.js环境中执行。

```
console.log(1);

setTimeout(() => {
  console.log(2);
})

setTimeout(() => {
  console.log(3);
})

new Promise((resolve)=>{
  console.log(4);
  resolve();
}).then(()=>{
  console.log(5);
})

// 1 4 5 2 3
```

```
console.log(1);

setTimeout(() => {
  console.log(2);
})

setTimeout(() => {
  console.log(3);
})

new Promise((resolve)=>{
  console.log(4);
  resolve();
}).then(()=>{
  console.log(5);
  new Promise((resolve) => {
    console.log(6);
    resolve();
  }).then(() => {
    console.log(7);
  })
})
// 1 4 5 6 7 2 3 
```

```
console.log(1);
****
setTimeout(() => {
  console.log(2);
  new Promise((resolve) => {
    console.log(6);
    resolve();
  }).then(() => {
    console.log(7);
  })
})

setTimeout(() => {
  console.log(3);
})

new Promise((resolve)=>{
  console.log(4);
  resolve();
}).then(()=>{
  console.log(5);
})
// 1 4 5 2 6 7 3
```

```
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

1 7 6 8 2 4 3 5 9 11 10

```