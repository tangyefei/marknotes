# Promise

## Promise的含义

Promise是一种异步编程解决方案，包含 pending, fulfilled, rejected 三种状态，只有异步操作可以决定当前是哪一种状态；一旦状态改变就不会再变，任何时候都可以得到这个结果。后续用resolved代表fulfilled状态。

它的好处是可以将异步操作用同步的流程表达出来，避免层层嵌套；缺点是无法取消，如果不设置回调函数Promise内部的错误不会抛出到外部，处于pending状态时无法知道处于哪一状态（刚开始还是将完成）。

## 基本用法

如下是用Promise来封装setTimeout的例子

```
function timeout(ms) {
 return new Promise((resolve, reject) => { setTimeout(resolve, ms, 'done');});
}
timeout(100).then((value) => {console.log(value);});
```

Promise新建后就会立即执行

```
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

用Promise封装Ajax操作的例子

```
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

`resolve`函数的参数还可以是另外一个Promise实例，下例中`p1`决定了`p2`的状态


```
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```

resolve 或者 resolve 不会终结 Promise 函数内的执行
```
new Promise((resolve, reject) => {
  resolve(1);
  setTimeout(function(){console.log(1.5)},0);
  console.log(2);
}).then(r => {
  setTimeout(function(){console.log(r)},0);
});
console.log(3);
// 2 该行会立即执行
// 3 立即resolve要到本轮事件的末尾
// 1.5 
// 1 
```