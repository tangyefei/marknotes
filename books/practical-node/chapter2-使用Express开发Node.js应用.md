## 第2章 使用Express开发Node.js应用


关于Express的更深入的书籍，作者推荐了：

[《Pro Express.js: Master Express.js: The Node.js Framework For Your Web Development》](https://www.amazon.com/Pro-Express-js-Node-js-Framework-Development/dp/1484200381/ref=as_li_ss_tl?ie=UTF8&linkCode=sl1&tag=rpjs-20&linkId=5401161f4199d1135a85c005d9220333)

### 1. Express.js是什么


Express.js是一个构建在Node.js核心和Connect组件的Web框架，组件也被称作middleware。

它优势在于将构建一个Web应用的诸多任务抽象出来，作者列举这些任务并以实际例子说明了直接使用Node.js自己构建一个Web服务的的繁杂。

Express.js提供的是一个`类MVC`的架构，将应用拆分成：views, routes,mdoels，其中M我们可以使用Mongoose或则Sequelize库。

它是最成熟和流行的框架，但同时不断有新的框架被推出，作者给出了一些选择框架的建议。

## 2. Express.js是如何工作的

Express.js通常有一个入口文件，通过node命令来执行它。

Express.js的应用运行的时候，我们会侦听请求，处理请求就是围绕请求从上至下。

因为我们可能有多个middleware，他们可能会被用于处理下述的任务：

1. 转化请求中的cookie信息
2. 转化请求URL中的参数信息
3. 根据请求参数查询数据库信息
4. 对用户或请求进行授权
5. 将数据处理当做response返回

## 3. 安装Express.js

创建一个Express.js应用有两种方法

1. 基于 express-generator，它提供了命令行用于快速创建，适用于快速和服务端渲染
2. 直接使用 express 包，适合需要用过import/require方式导入它的项目

直接通过如下命令就好，后续会基于它来演示

```
$ npm i -g express-generator@latest
```
更多的安装方式该章节有具体介绍。


## 4. Express.js脚手架搭建

通过如下命令就可以创建一个可以在localhost:3000访问的应用

```
$ express -c styl express-styl
$ cd express-styl && npm install
$ DEBUG=my-application ./bin/www
```

### 路由配置

例子通过如下方式定义了路由文件的引用：

```
//app.js
const index = require('./routes/index');
const users = require('./routes/users');
...
app.use('/', routes);
app.use('/users', users);

//routes/index.js
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;

// rotues/users.js
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
```

next是一个所有都处理完毕后的回调，通常被用在middleware中。

当然你也可以直接使用send(), end(), render()等方法，或者传递一个error给next。


### 使用middleware

```
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const stylus = require('stylus');
//...
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
```

middleware可以执行各式各样的任务，上述是一些常用的例子。

### 配置app

下述是上面生成代码的配置语法

```
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
```

## 5. 一个博客项目的概览

![png](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/practical-node/blog-outlook.png?q-sign-algorithm=sha1&q-ak=AKID1widSAHJfw6RfgwJva4RQEuDMJ7jEUWO&q-sign-time=1581826027;1581833227&q-key-time=1581826027;1581833227&q-header-list=&q-url-param-list=&q-signature=966e1efb6e7f72422470aeb34ba0512ee0492f66)

包含的功能有：

- A home page with a list of articles (Figure 2-6)
- An individual article page with the full-text article
- An admin page for publishing and removing content
- A login page for accessing the aforementioned admin page
- A post article page for adding new content

在后续的章节中会逐渐完善这样的功能。


## 6. Express.js的Hello World

该节介绍了如何基于安装的epress包来初始一个Hello World项目。

```
$ mkdir hello-advanced
$ cd hello-advanced/
$ mkdir {public,public/css,public/img,public/js,db,views,views/includes,routes}
$ npm install express pug --save
$ node app.js
```

```
// app.js

const express = require('express');
const http = require('http');
const path = require('path');

let app = express();
app.set('appName', 'hello-advanced');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.all('*', (req, res) => {
  res.render('index', {msg: 'Welcome to Practical Node.js!'})
})

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`)
})
```

```
// views/index.pug

h1 hello
p Welcome to the Practical Node.js!
```

