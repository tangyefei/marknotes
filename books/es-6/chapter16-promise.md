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
- 异步的resolve后的callback

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

## 5. Promise.prototype.finally()

### finally介绍

finally方法是ES2018 引入标准的，不管 Promise 对象最后状态如何，都会执行它。

```
server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);
  
```

finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的。

### 使用then来实现finally

```
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
}  
```

如下是它的具体实现：

```
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

这里使用 P.resolve的操作方式 前后都么有没有介绍过，理解下来就是生成了一个Promise对象。


### 使用finally和then得到的结果不同

finally方法总是会返回原来的值（其实对于上例value/reason是怎么传递的，一辆懵，大概需要理解解释器层面的东西才会懂？）

```
// Promise {<resolved>: undefined}
Promise.resolve(2).then(() => {}, () => {})

// Promise {<resolved>: 3}
Promise.resolve(2).finally(() => {})

// Promise {<reject>: undefined}
Promise.reject(3).then(() => {}, () => {})

// Promise {<reject>: 3}
Promise.reject(3).finally(() => {})
```

## 6. Promise.all()



### 概念介绍

```
const p = Promise.all([p1, p2, p3]);
```

Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。上面代码中，p1、p2、p3都是 Promise 实例，如果不是就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。

### 回调函数获取的值

p的状态由p1、p2、p3决定，分成两种情况：

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

### 一个简单例子


```
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
```

### 另外一个例子

```
const databasePromise = connectDatabase();

const booksPromise = databasePromise
  .then(findAllBooks);

const userPromise = databasePromise
  .then(getCurrentUser);

Promise.all([
  booksPromise,
  userPromise
])
.then(([books, user]) => pickTopRecommendations(books, user));
```

### 自带catch的Promise不会再触发all的catch


```
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]
```


p1会resolved，p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，p2指向的实际上是这个实例。该实例执行完catch方法后，也会变成resolved，导致Promise.all()方法参数里面的两个实例都会resolved。

因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。

如果p2没有自己的catch方法，就会调用Promise.all()的catch方法。

```
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// Error: 报错了
```

## 7. Promise.prototype.race()

### 概念介绍

```
const p = Promise.race([p1, p2, p3]);
```

只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

与Promise.all方法一样，p1、p2、p3如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。

### 一个例子

```
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
```

如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，触发catch方法指定的回调。

## 8. Promise.resolve()

### 语法介绍

Promise.resolve方法可以将现有对象转为 Promise 对象

```
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```


### resolve参数的四种情况


#### 情况1：参数是一个 Promise 实例

Promise.resolve将不做任何修改、原封不动地返回这个实例。

#### 情况2：参数是一个thenable对象

thenable对象指的是具有then方法的对象，Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

```
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```

#### 情况3：参数不是具有then方法的对象，或根本就不是对象


Promise.resolve方法返回一个状态为resolved的Promise 对象，Promise.resolve方法的参数，会同时传给回调函数。

#### 情况4：不带有任何参数

直接返回一个resolved状态的 Promise 对象。


### 立即resolve()后执行then回调

立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。

```
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```







## 9. Promise.reject()


### 概念介绍

```
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

### 特殊之处

Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。因此如果传入的是一个thenable的对象，catch中的e就不是”出错了“，而是整个thenable对象：

```
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true
```

## 10. 应用

### 加载图片

```
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```

### Generator 函数与 Promise 的结合


使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。

```
function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

const g = function* () {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  const it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(error));
    });
  }

  go(it.next());
}

run(g);
```

~ 例子似乎有点牵强

## 11. Promise.try


注：该部分自己做了一些幅度略大的整理

我们希望使用 then catch 这套流程去处理 同步 和 异步函数，如下代码就能满足需求么？

```
func() {console.log(1);}
Promise.resolve().then(func);
console.log(2);
```


存在两个问题（当然作者不讲我是丝毫不知道错误捕获存在这些差异的）：

（1）如果func是同步函数，它会在本轮事件的末尾执行，即后面 123 的输出会先于 func执行。
（2）同样func作为同步函数，如果抛出了错误（同步错误），是无法使用 `.catch` 捕捉到的。

对应的有了 Promise.try(）的提案，使用 Promise.try嵌套func，就可以先输出1再输出2，同理使用Promise.try()包裹异步操作，可以在后续的catch中捕获 异步 和 同步的异常。

当然在Promise.try之前，为了解决上述的问题（1），作者还列举了两种做法，一种是 将func定义为async类型，另一种是是使用 new Promise(resolve => resolve(func()))。

注：另外两种做法中的第一种，作者提到了使用 async 了以后异常会被吞没，需要使用catch捕获，对于异常捕获的理解几乎为0，要补功课。

注：上面这个new Promise要注意，跟Promise().then(func)在本轮末尾执行不同， resolve内写的是 `func()` 会立即执行。

~ 对同步和异步的理解还不够，因此对 Promise.try() 存在的意义还是有些感到费解。






