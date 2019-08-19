# Promise对象

> 1. Promise的含义
2. 基本用法
3. Promise.prototype.then()
4. Promise.prototype.catch()
5. Promise.prototype.finally()
6. Promise.prototype.all()
7. Promise.prototype.race()
8. Promise.resolve()
9. Promise.reject()
10. 应用
11. Promise.try



## 1. Promise的含义


Promise是一种异步编程解决方案，最早由社区提出和实现，ES6将其写入了语言标准，提供了原生的Promise对象。

**它有两个特点：**

（1）对象状态不受外部影响。状态包含 pending, fulfilled, rejected 三种状态，只有异步操作可以决定当前是哪一种状态，状态流转只有  pending -> fulfilled  或 pending -> rejected。

（2）一旦状态改变就不会再变，任何时候都可以得到这个结果。而不像事件，错过了就无法再监听到，而Promise则一直保持着这个结果。


为了行为方便，后续会用resolved代表fulfilled状态。

**它的好处是：**

可以将异步操作用同步的流程表达出来，避免层层嵌套，以及提供的Promise对象提供的统一的API使操作异步操作更容易。

**它的缺点是：**

一旦新建，它就会立即开始，无法中途取消；如果不设置回调函数Promise内部的错误不会抛出到外部；处于pending状态时无法知道处于哪一状态（刚开始还是将完成）。

## 2. 基本用法

### 创建实例

```
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

构造函数内传递一个函数作为参数，resolve和reject是引擎提供的两个函数，作用分别是将：

- resolve，将状态从pending变为resolved，并把异步操作的结果作为参数传递出去
- reject，将状态从pending变为rejected，并把异步操作抛出的错误作为参数传递出去

### 指定回调

```
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

then中传递的两个函数分别是状态变为 resolved 和 rejected时候调用，都接受Promise对象传出的值作为参数。其中第二个参数是可选的。

### 简单例子


如下是用Promise来封装setTimeout的例子

```
function timeout(ms) {
 return new Promise((resolve, reject) => { 
 	setTimeout(resolve, ms, 'done');
 });
}

timeout(100).then((value) => {console.log(value);});
```

100毫秒以后，'done'被作为参数传递给了resolve函数，然后触发了resolved状态的回调函数，输出了'done'。

### 执行顺序

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

Promise新建后就会立即执行，这里的输出顺序是

- 新建Promise的执行
- 同步的console
- 异步的resolve后的calblack

### 加载图片

```
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}
```

### 封装Ajax

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

### resolve另一个Promise实例


`resolve`函数的参数还可以是另外一个Promise实例，如下：

- `p2`自己的状态无效
- `p1`决定了`p2`的状态
- `p2`1秒后等待`p2`的状态
- 再过（3-1）秒`p1`的处理结果被传递给`p2`
- 结果最终被catch中的函数处理

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

### resole/reject对后续执行的影响


resolve 或者 reject 不会终结 Promise 函数内的执行

```
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```


调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。

所以，最好在它们前面加上return语句，这样就不会有意外。

```
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```


