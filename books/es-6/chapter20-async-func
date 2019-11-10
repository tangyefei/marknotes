# async函数

1. 含义
2. 基本用法
3. 语法
4. async 函数的实现原理
5. 与其他异步处理方法的比较
6. 实例：按顺序完成异步操作
7. 顶层 await



## 1. 含义

### 读取文件的例子

async就是Generator函数的语法糖。如下是使用Generator函数依次读取两个文件的代码：

```
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

使用async函数改写后如下，语法上看只是简单地把 * 换成 async，yield 替换成 await 而已。

```
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

### async的优点 

但async对Generator函数的改进体现在如下四点：

- Generator必须依靠内置执行器（co模块）通过next语法执行，而async函数自带执行器执行起来像普通函数
- 更好的语义，比起*和yield，使用async和await语义更清楚
- 更广的适用性，yield命令后面只能是Trunk函数和Promise对象，而async的await后面可以是Promisee对象和原始值
- async函数的返回值是Promise对象，比起Generator函数的返回值是Iteretor翻遍，可以使用then方法指定下一步操作



## 2. 基本用法

### 获取股票报价的例子

```
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
  console.log(result);
});
```

### 指定时间输出的例子

```
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```

### async的多种使用形式

```
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};
```

## 3. 语法

async函数的语法规则总体上比较简单，难点是错误处理机制。

### 返回Promise对象

```
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"
``` 

```
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)
// Error: 出错了
```

### Promise对象的状态变化

async函数返回的Promise对象，只有等命令内部所有的await后面的Promise对象执行完毕才会发生状态变化（除非遇到return语句或者抛出错误）。


```
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2017 Language Specification"
```

上述例子中，只有 抓取网页、取出文本、匹配标题的操作全部完成，才回执行then方法里的console.log。

### await命令

如果await后面不是Promise对象，直接返回对应的值

```
async function f() {
  // 等同于
  // return 123;
  return await 123;
}

f().then(v => console.log(v))
// 123
```

如果await命令后面是一个thenable对象，会将其等同于Promise对象

```
class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }
  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(
      () => resolve(Date.now() - startTime),
      this.timeout
    );
  }
}

(async () => {
  const sleepTime = await new Sleep(1000);
  console.log(sleepTime);
})();
// 1000
``` 

借助await我们可以在JavaScript实现休眠效果

```
function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}

// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}

one2FiveInAsync();
```

async后面Promise对象的状态如果变为reject状态，参数会被catch方法的回调函数接收到(注意此处并没加return)

```
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
```

任何一个await语句后面的Promise变为reject状态，整个async函数都会中断执行，当然如果你还想让后面的await执行，可以在前一个await代码外层包裹try catch或通过后面连接 .catch的代码。

```
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
```

### 错误处理

如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject

```
async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  });
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// Error：出错了
```

多次重复尝试的例子

```
const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}

test();
```

### 使用注意点

1. await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
2. 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发来缩短程序执行时间。
3. await命令只能用在async函数之中，如果用在普通函数，就会报错。
3. async 函数可以保留运行堆栈。

## 4. async函数实现原理

async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。


```
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

spawn函数的实现，几乎就是前文自动执行器的翻版。

```
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

## 5. 与其他异步处理方法的比较

 
 假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。
 
使用Promise实现在于then/catch会干扰理解，而使用Generator则必须有执行器配合，使用async最简洁并且没有语义不相关的代码。


## 6. 实例：按顺序完成异步操作

使用Promise写法，按顺序完成一组请求结果的输出：


```
function logInOrder(urls) {
  // 远程读取所有URL
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // 按次序输出
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
``` 

改用async函数实现：

```
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
```

进一步使用并发请求：

```
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```

## 7. 顶层await


前面介绍的await命令只能出现在 async 函数内部，否则都会报错。

如果在模块层级，函数内部的结果被作为模块的导出内容，那么模块没加载好时，引用该模块的地方会得到undefined的值。

顶层的await命令，就是为了解决这个问题。它保证只有异步操作完成，模块才会输出值。

```
// awaiting.js
const dynamic = import(someMission);
const data = fetch(url);
export const output = someProcess((await dynamic).default, await data);

```

下面列举一些顶层模块的使用场景

```
// import() 方法加载
const strings = await import(`/i18n/${navigator.language}`);

// 数据库操作
const connection = await dbConnector();

// 依赖回滚
let jQuery;
try {
  jQuery = await import('https://cdn-a.com/jQuery');
} catch {
  jQuery = await import('https://cdn-b.com/jQuery');
}
```


如果加载多个包含顶层await命令的模块，加载命令是同步执行的。z.js并没有等待x.js加载完成，再去加载y.js。

```
// x.js
console.log("X1");
await new Promise(r => setTimeout(r, 1000));
console.log("X2");

// y.js
console.log("Y");

// z.js
import "./x.js";
import "./y.js";
console.log("Z");
```
