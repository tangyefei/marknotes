# 第一章 环境配置

## 1. Node.js和npm的安装

可以有很多方式可以安装Node.js和npm。
	
管理Node.js不同版本的比较好的做法是使用nvm。
	
## 2. Node.js脚本的执行

可以通过`$ node program.js`直接执行一个Node.js文件。

可以通过`$ node -e "console.log(new Date());"`执行一个语句。

可以通过如下方式在执行的Node.js文件中可以使用对应变量

```
$ NODE_ENV=production API_KEY=442CC1FE-4333-46CE-80EE-6705A1896832 node server.js
```

## 3. Node.js基础和语法

Node.js被构建在 Google Chrome V8引擎 和 ECMAScript之上，和客户端的JavaScript的非常相似。

弱类型、对象语法、函数、数组、原型特性、语法约定、通用对象上的方法、NPM使用、函数参数作为回调函数，这些客户端的JavaScript一致，下述只介绍Node.js中不同之处。

### 3.1 Buffer数据类型

Buffer是JavaScript的5中基础数据类型+对象数据类型之外的全新的数据类型，你可以使用它类读取文件、或者接受网络中获取的资源包。

### 3.2 全局变量和保留字

在客户端的JavaScript我们可以获取到window这个全局对象，但是在Node.js中，我们提供的是：

- process
- global
- module.exports 和 exports

#### process信息


每个Node.js脚本都是在一个进程下执行的， 可以通过process获取进程有关的信息，比如：

```
node -e "console.log(process.pid)"
```

#### 获取global变量

global是在任何地方都能获取到的对象，就像在客户端的setTimeout、console那样。

在global下有注入 global.process、global.require() 和 global.module 这样的属性或者方法。

global.process下同样提供了更多的方法或有用信息：

- process.pid: This process's ID
- process.argv: A list of command-line argument supplied to this process
- process.env: A list of environment variables
- process.platform: Platform name, such as darwin for macOS
- process.release: This Node's release URL
- process.versions: A list of versions of Google Chrome V8, zlib, uv, etc.
- process.stdin(): The standard input (for reading)
- process.stdout(): The Standard output (for writing)
- process.uptime(): Time of how long this process is running
- process.memoryUsage(): Resident set size, total heap and used heap memory usage
- process.exit(): Terminating this process
- process.kill(): Termination of another process

#### 导入或导出模块

浏览器JavaScript糟糕的地方是没有好的机制可以用于引入模块，但是ES6从标准层面解决了这个问题，只待浏览器普遍的支持。

在此之前，流行的CommonJS (http://www.commonjs.org) 和 RequireJS (http://requirejs.org) 解决了这个问题，Node.js的模块系统借鉴了CommonJS，并在此基础上增加了很多自己的实现。

可以使用如下的语法导出一个模块，模块中的message是一个对象


```
// practicalnode/message.js
const message = {
  find: function(req, res, next) {
  },
  add: function(req, res, next) {
  },
  format: 'title | date | author'
}
exports.message = message;
```

```
// practicalnode/index.js
const mod = require('./message.js')
console.log(mod.message);
```

当然我们也可以将一个函数导出成为整个模块

```
// practicalnode/practicalnode app.js
module.exports = (app) => {
  app.set('port', process.env.PORT || 3000)
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  return app
}
```

```
// practicalnode/index.js
const app = require('./app.js')
console.log(app)
```

为了处理不同环境的兼容性（斜杆的处理不同），我们最好使用path提供的方法来处理路径，比如：

```
const messages = require(path.join(__dirname, 'routes', 'messages.js'))
```

另外，需要注意区分的两个概念是，module.exports和exports有什么不同

- 真正导出的模块内容是module.exports的指向内容
- exports只是一个对module.exports指向对象的引用，在模块外部是不可见的
- 当module.exports指向到了一个新的内存，exports可能仍旧指向的老的对象

### 3.3 __dirname vs. process.cwd

简单理解为 

__dirname 所在源文件的地址
process.cwd 执行文件所在的地址

在直接在当前目录执行文件，结果是一样的，但是不同目录会有不同

```
// practicalnode/code/program.js

console.log(__dirname);
console.log(process.cwd());
```

直接在practicalnode下执行`node code/program.js `的结果是:

```
/Users/yefeitang/Documents/practicalnode/code
/Users/yefeitang/Documents/practicalnode/
```
### 3.4 Node.js核心模块

Node.js没有包含很重的核心，它之包含了构建应用的基础模块，其他模块则通过npm进行安装。

它的核心包含了：http, util, querystring, url, fs。

#### http

http是用于构建HTTP服务的模块，主要方法包括了：

- http.createServer()
- http.listen()
- http.createClient() 
- http.ServerRequest() 将请求交给对应handle处理
- http.ServerResponse 用于创建响应对象


#### util

util提供用于调试的工具方法，其中比较重要的一个是：

- util.inspect()，它可以呈现对象的字符串形式的展示，有点类似浏览器端的toString

#### querystring

querystring提供用于处理查询参数的方法，包括

- querystring.stringify()，将查询对象序列化为字符串
- querystring.parse()，将查询字符串转化为字对象

方法跟JSON的两个同名，但是使用目的完全不同


#### url

url用与处理请求URL，其中一个方法是

- parse() 用URL参数作为参数返回一个对象


#### fs

fs用与处理文件系统的读取，方法包括

- fs.readFile()，同步的方式读取文件
- fs.writeFile()，同步的方式写文件


上述介绍的核心模块的使用，只需要通过 `require`即可获取到。


### 3.5 好用的Node.js模块

- Crypto，提供了randomizer, MD5, HMAC-SHA1等算法
- Path，系统路径处理
- String decoder，用与在String和Buffer类型之间进行解码

### 3.6 使用Node.js读写文件系统

读写文件可以使用同步或异步，下面是一个同步的例子

```
const fs = require('fs')
const path = require('path')
fs.readFile(path.join(__dirname, 
  '/data.txt'), 
  {encoding: 'utf-8'}, (err, data) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(data)
  }
})
```


下面是一个同步写的例子

```
const fs = require('fs')
fs.writeFile('data.txt', 
  'Hello World!', (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log('Writing is done.')
  }
})
```

### 3.7 Node.js的流数据

Streaming Data in Node.js means processing data by Node.js application while transmission is in progress. Node supports streams. This feature is useful for extra large datasets, such as video or database migrations.

```
const fs = require('fs')
fs.createReadStream('./data/customers.csv').pipe(process.stdout)
```

### 3.8 使用Node.js创建一个Hellow World版本的Server

```
const http = require('http')
const port = 3000
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World\n')
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
```


## 4. 调试Node.js程序

### Node.js自带的Debugger

使用console.log当然很方便，但是我们得先明确知道在哪里输出log，并且会在代码中遗留多余代码。

通过在代码中增加debugger，并且用注入这样的命令，执行后会有交互界面能然你输入指令交互：


```
$ node inspect program.js
```

具体使用可以参考[the official web site](http://nodejs.org/api/debugger.html).

### 使用Node Inspector进行调试

内置的debugger虽然直接可用，但是缺少交互界面还是不方便，可以使用`node-inspector`这个工具

```
$ npm install -g node-inspector
$ node-inspector
$ node --debug hello-debug.js
```

### IDE调试

VS Code, Atom等诸多开发工具都提供了调试工具。

## 5.Node.js程序变化检测

Node.js程序是被存储在内存中的，如果我们修改了源代码，是需要重启线程，通常是手动kill掉进程然后重新启动程序。如果能自动进行重启会方便很多，有很多的工具可完成fs中的watch这样的功能：

- [node-dev](https://npmjs.org/package/node-dev): 用于重启server的开发工具
- [nodemon](https://npmjs.org/package/nodemon): 同上
- [supervisor](https://npmjs.org/package/supervisor):用在生成环境的用于重启的工具x
- [pm2-dev](http://npmjs.org/pm2): 同生成环境的重启工具
- [forever](http://npmjs.org/forever): 同pm2类似但出来更早