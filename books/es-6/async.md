# async函数


## 含义

Generator 函数的语法糖。



## 基本用法

## 语法

依次读取两个文件的Generator函数如下：

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

gen函数可以写成async函数，就是下面这样。

```
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

```


async函数对 Generator 函数的改进，体现在以下四点

- Generator函数需要调用next语法，async自带执行器只需要向普通函数调用即可
- 语意更好
- 更广的适用性，await后面可以是原始类型的值
- async函数的返值是回是Promise，比Generator 函数的返回值是 Iterator 对象方便多了

async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。

## 基本用法

指定多少毫秒输出一个值的例子

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