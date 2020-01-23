
# 线程的总结

JavaScript是一门单线程语言。

浏览器的执行除了主线程外，分为宏队列（普通的script，setTimeout，setInterval）、微队列（Promise，process.nextTick）。

执行规律在浏览器端和Node.js上有些差异，如下为自己总结出来的执行顺序：

执行主线程后，把对应任务推到宏队列 和 微队列中，然后优先执行微队列的任务，再执行宏队列中的任务，一旦宏队列中多个任务中，又产生了微队列的任务，会优先执行微队列的任务，然后再继续执行宏队列的任务。

下面是两个例子：

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
```

上述执行顺序为 1 4 5 2 3


```
console.log(1);

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
```

上述执行顺序为 1 4 5 2 6 7 3
