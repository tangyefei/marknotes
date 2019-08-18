# Generator 函数的异步应用

## 传统方法


ES6 诞生以前，异步编程的方法，大概有下面四种

- 回调函数
- 事件监听
- 发布/订阅
- Promise 对象

## 基本概念

异步：略

回调函数：略

Promise：可以使用嵌套的调用稍微好看点

```
fs.readFile(fileA, 'utf-8', function (err, data) {
  fs.readFile(fileB, 'utf-8', function (err, data) {
    // ...
  });
});
```

```
var readFile = require('fs-readfile-promise');

readFile(fileA)
.then(function (data) {
  console.log(data.toString());
})
.then(function () {
  return readFile(fileB);
})
.then(function (data) {
  console.log(data.toString());
})
.catch(function (err) {
  console.log(err);
});
```

## Generator函数


### 协程

传统的编程语言的异步编程的解决方案中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。

举例来说，读取文件的协程写法如下。

```
function* asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}
```

它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。


### 协程的 Generator 函数实现


Generator 函数是协程在 ES6 的实现，整个 Generator 函数就是一个封装的异步任务，异步操作需要暂停的地方，都用yield语句注明。

```
function* gen(x) {
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```


### Generator 函数的数据交换和错误处理 

除了在Generator构造时候传递数值，也可以在next方法中传值当做上一个阶段异步任务的结果。

另外，也在Generator中捕获错误，而在外部通过throw去触发错误。


### 异步任务的封装 

~ 两个then，可读性并不是很好，自己也是理解的一知半解

```
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```
