# ES6 Module 




## 概述

如何理解ES6的”编译时运行“的说法，以及可以如何利用它带来的可能性？可能需要了解更底层一点的，即编程语言尤其是JavaScript是如何最终运行在浏览器上的？

## 严格模式

ES6的模块默认采用严格模式，不管是否在头部加了 `'use strict;'`

## export命令

关于export有多种使用方式，下面是一些常见用法的示例：
 
```

export var firstName = 'Michael';

export { firstName };

export function multiply(x, y) {
  return x * y;
};

function v1() { ... }

export {
  v1 as streamV1,
  v1 as streamV2
};
```
**需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。**

```
// 报错
export 1;

// 报错
var m = 1;
export m;

// 报错
export {
	m: 1
}

// 正确写法一
export var m = 1;

// 正确写法二
var m = 1;
export {m};

// 正确写法三
var n = 1;
export {n as m};
```


export语句输出的接口，与其对应的值是动态绑定关系。

```
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);

```


## import命令


```
import {firstName} from './profile.js';

import { lastName as surname } from './profile.js';
```

import后面的from指定模块文件的位置，可以是相对路径或绝对路径，.js后缀可以省略。

由于import是静态执行，不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

```
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
```

import语句会执行所加载的模块，因此可以有下面的写法。

```
import 'lodash';
```


目前阶段，通过 Babel 转码，CommonJS 模块的require命令和 ES6 模块的import命令，可以写在同一个模块里面，但是最好不要这样做。因为import在静态解析阶段执行，所以它是一个模块之中最早执行的。下面的代码可能不会得到预期结果。


```
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.promise');
import React from 'React';
```

## 模块的整体加载

```
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

```
// main.js

import { area, circumference } from './circle';

import * as circle from './circle';
```

尤其需要注意的一旦是 

## export default命令


使用者不需要知道模块中有什么变量，可以指定任意变量名，这时候`import`后面不能使用`{}`。



```
// export-default.js
export default function () {
  console.log('foo');
}
```

```
// import-default.js
import customName from './export-default';

customName(); // 'foo'
```


注：如下是比较容易犯错的用法

```
// config.js
var host = '';
var env = '';
export default {
	host,
	env,
}

// main.js

// right
import config from 'config.js';
console.log(config.path);

// error
import { host } from 'config.js';
```

```
// config.js
export var host = '';
export var env = '';

// main.js

// right
import { host } from 'config.js';

// error 
import host from 'config.js';
```
