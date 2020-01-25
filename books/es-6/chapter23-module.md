# Module的语法


## 1.概述


### ES6之前是没有模块体系的

JavaScript不像Python或Ruby那样，有自己的模块体系，通过require或import之类的语法，就可以将程序的各个模块组织起来。

在ES6之前，社区形成了一些模块加载方案，包括CommonJS、AMD、UMD，前者用于服务器，后者用于浏览器，第三者希望将两者都整合在一起。

### ES6之前的模块设计

ES6之前的规范，只能在运行时确定依赖关系和输入输出变量，比如：

```
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

因为在运行时候才得到 _fs这个对象，因此是无法做编译时候的”静态优化“的。

### ES6的模块设计

ES6的模块设计中，它的加载方式称为”编译时加载“，它在编译时就能确定模块的依赖关系。

它的效率要比之前的模块加载方式高，当然也导致了没法引用ES6模块本身，因为模块不是对象。


```
// ES6模块
import { stat, exists, readFile } from 'fs';
```

### ES6模块设计的好处

因为编译时加载的特性，ES6模块还进一步拓宽了JavaScript的语法，比如引入宏和类型检查。

除此之外，它还有如下好处：

- 将来服务器和浏览器都会支持ES6模块格式，不再需要UMD模块格式
- 浏览器新的模块和命名空间，不用再做成全局变量，可以通过模块提供

## 2. 严格模式

ES6的模块默认采用严格模式，不管是否在头部加了 `'use strict;'`。

严格模式是在ES5中定义的，它主要有以下限制：

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用`with`语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
- `eval`不会在它的外层作用域引入变量
- `eval`和`arguments `不能被重新赋值
- `arguments`不会自动反映函数参数的变化
- 不能使用`arguments.callee`
- 不能使用`arguments.caller`
- 禁止this指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected`、`static`和`interface`）

## 3. export命令

### 概念简介

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。

### export的两种两种写法

```
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```

```
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```

### 函数变量的export

```
export function multiply(x, y) {
  return x * y;
};
```

### 使用`as`对关键字进行重命名

```
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

### 错误的写法

```
// 报错，导出的是值
export 1;

// 报错，导出的仍旧是值
var m = 1;
export m;

// 正确，写法一
export var m = 1;

// 正确，写法二
var m = 1;
export {m};

// 正确，写法三
var n = 1;
export {n as m};
```

```
// 报错，导出是函数值
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
```

### 输出的值是实时的

```
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```

外部可以拿到最新的值 `baz`。

### export的书写位置


可以出现在模块的任何位置，只要处于模块顶层就可以。下例报错是因为处于条件代码块之中（没法做静态优化，违背ES6 模块的设计初衷）：

```
function foo() {
  export default 'bar' // SyntaxError
}
foo()
```

## 4. import命令


### 基本用法

```
// main.js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

### 使用别名

```
import { lastName as surname } from './profile.js';
```

### 不允许修改接口

```
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
```

如果a是一个对象，改写a的属性是允许的。但是建议凡是输入的变量，都当作完全只读。

```
import {a} from './xxx.js'

a.foo = 'hello'; // 合法操作
```

### 语法特点

`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js后缀可以省略。

果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

```
import {myMethod} from 'util';
```

### 提升效果

import会提升到整个模块的头部，首先执行。

```
foo();

import { foo } from 'my_module';
```

###  静态执行不能使用变量和表达式

```
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

### 简略写法

import语句会执行所加载的模块，因此可以有下面的写法。

```
import 'lodash';
```

### 多次执行同一个import

```
import 'lodash';
import 'lodash';
``` 

加载了两次lodash，但是只会执行一次。

### 分别加载不同的变量

```
import { foo } from 'my_module';
import { bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
```

虽然foo和bar在两个语句中加载，但是它们对应的是同一个my_module实例。

### 不建议跟其他模块方式混用

import在静态解析阶段执行，所以它是一个模块之中最早执行的。下面的代码可能不会得到预期结果。

```
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.promise');
import React from 'React';
```

## 5. 模块的整体加载

### 用法

用星号（*）指定一个对象，所有输出值都加载在这个对象上面。

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

### 注意事项

模块整体加载所得到的对象，不允许改变。

```
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```

## 6. export default命令


### 为什么要有 export default

使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。

使用 export default 可以不用阅读文档就能加载模块。

### export的语法

```
// export-default.js
export default function () {
  console.log('foo');
}
```

用在非匿名函数前，也是可以的。

```
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;
```

### import的语法

不需要知道原模块输出的函数名，可以取任意名字。这时import命令后面，不使用大括号。




```
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

### export default只能使用一次

一个模块只能有一个默认输出，因此export default命令只能使用一次。

所以，import命令后面才不用加大括号。

### export default的实现本质

export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。

```
export default add;

// 等同于

function add(x, y) {
  return x * y;
}
export {add as default};
```
<hr>

```
import foo from 'modules';

// 等同于 

import { default as foo } from 'modules';
```

因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。

它本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。


```
// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```


### 使用它的好处

同时输入默认方法和其他接口，可以写成下面这样。

```
import _, { each, forEach } from 'lodash';
```

对应上面代码的export语句如下。

```
export default function (obj) {
  // ···
}

export function each(obj, iterator, context) {
  // ···
}

export { each as forEach };
```

### 用于输出类

```
// MyClass.js
export default class MyClass { ... }

// main.js
import MyClass from 'MyClass';
let o = new MyClass();
```


### 理解不深导致的错误用法

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
