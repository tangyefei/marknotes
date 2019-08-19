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


## 3. Promise.prototype.then()

接上面介绍的，then可以传入success和fail作为resolved和rejected的回调。

### then返回新的Promise实例


then方法返回的是一个新的Promise实例，可以采用链式写法，前面的then中return的结果会作为后一个then的参数被使用：

```
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```

### 在then中继续异步操作

如下的例子中，第一个then中又请求了另外一个请求，返回本身就是Promise对象，因此不会像上例中被转化一次，而是仅当 `getJSON(post.commentURL)` 经过resolve后，才走到第二个then输出comments的内容。

```
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function (comments) {
  console.log("resolved: ", comments);
}, function (err){
  console.log("rejected: ", err);
});
```

## 4. Promise.prototype.catch()

### 用法示例

Promise.prototype.catch() 是 `.then(null, rejection)`或`.then(undefined, rejection)`的另一种写法，catch的用法更推荐使用，因为它能捕获发生在then中的错误：

```
getJSON('/posts.json').then(function(posts) {
  reject(new Error('test'));、
}).catch(function(error) {
  console.log('发生错误！', error);
});
```
### resolved后再抛出错误无效

如果 Promise 状态已经变成resolved，再抛出错误是无效的。

```
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

### 错误一直向后传递直到遇到catch

```
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
```

### Promise中没有try/catch的错误不捕获


跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何影响外面代码的运行：


```
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```


但是如下例子，Promise 指定在下一轮“事件循环”再抛出错误。Promise 的运行已经结束了，所以这个错误是在 Promise 函数体外抛出的，会冒泡到最外层，成了未捕获的错误：


```
const promise = new Promise(function (resolve, reject) {
  resolve('ok');
  setTimeout(function () { throw new Error('test') }, 0)
});
promise.then(function (value) { console.log(value) });
// ok
// Uncaught Error: test
```

### catch方法返回Promise

catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法

```
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
// carry on
```

如果没有报错，则会跳过catch方法：

```
Promise.resolve()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
// carry on
```

### catch中还可以抛出错误

```
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  y + 2;
}).then(function() {
  console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
```

上面代码中，catch方法抛出一个错误，因为后面没有别的catch方法了，导致这个错误不会被捕获，也不会传递到外层。


```
someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  y + 2;
}).catch(function(error) {
  console.log('carry on', error);
});
// oh no [ReferenceError: x is not defined]
// carry on [ReferenceError: y is not defined]
```

改写后的方法使用了第二个catch来捕获catch中抛出的错误。
