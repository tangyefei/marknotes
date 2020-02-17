# 使用Express和Hapi构建REST API

因为它所具备的有点，轻量的后端、变得更重的前端，成为了一种趋势。考虑到为每个应用搭建一个后台成本较高了，才有了按时租赁的后台服务，比如WS Lambda, MongoLab, Firebase, Parse.com。

本章介绍的是如何实现自己的REST服务，它相对于租用的服务，可定制型可以更强。


## RESTful API Basics

略。

## Project Dependencies

```
{
  "name": "rest-express",
  "version": "0.2.1",
  "description": "REST API application with Express, Mongoskin, MongoDB, Mocha and Superagent",
  "main": "index.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "start": "node index.js",
    "test": "PORT=3007 ./node_modules/.bin/mocha test -R spec"
  },
  "author": "Azat Mardan (http://azat.co/)",
  "license": "MIT",
  "dependencies": {
    "body-parser": "1.18.2",
    "express": "4.16.2",
    "mongodb": "2.2.33",
    "mongoskin": "2.1.0",
    "morgan": "1.9.0"
  }
}
```

## Test Coverage with Mocha and Superagent

略。

## REST API Server Implementation with Express and Mongoskin

下面这套代码基本可以满足一个博客系统的增删改查，效率简直了。

```
const express = require('express')
const mongoskin = require('mongoskin')
const bodyParser = require('body-parser')
const logger = require('morgan')
const http = require('http')

const app = express()
app.use(bodyParser.json())
app.use(logger())
app.set('port', process.env.PORT || 3000)

const db = mongoskin.db('mongodb://@localhost:27017/blog');
const id = mongoskin.helper.toObjectID;

app.param('collectionName', (req, res, next, collectionName) => {
  req.collection = db.collection(collectionName)
  return next()
})

app.get('/', (req, res, next) => {
  res.send('/collections/messages')
})

app.get('/collections/:collectionName', (req, res, next) => {
  req.collection.find({}, {limit: 10, sort: [['_id', -1]]})
    .toArray((e, results) => {
      if (e) return next(e)
      res.send(results)
    }
  )
})

app.post('/collections/:collectionName', (req, res, next) => {
  // TODO: Validate req.body
  req.collection.insert(req.body, {}, (e, results) => {
    if (e) return next(e)
    res.send(results.ops)
  })
})

app.get('/collections/:collectionName/:id', (req, res, next) => {
  req.collection.findOne({_id: id(req.params.id)}, (e, result) => {
    if (e) return next(e)
    res.send(result)
  })
})

app.put('/collections/:collectionName/:id', (req, res, next) => {
  req.collection.update({_id: id(req.params.id)},
    {$set: req.body},
    {safe: true, multi: false}, (e, result) => {
      if (e) return next(e)
      res.send((result.result.n === 1) ? {msg: 'success'} : {msg: 'error'})
    })
})

app.delete('/collections/:collectionName/:id', (req, res, next) => {
  req.collection.remove({_id: id(req.params.id)}, (e, result) => {
    if (e) return next(e)
    res.send((result.result.n === 1) ? {msg: 'success'} : {msg: 'error'})
  })
})

const server = http.createServer(app)
const boot = () => {
  server.listen(app.get('port'), () => {
    console.info(`Express server listening 
      on port ${app.get('port')}`)
  })
}

const shutdown = () => {
  server.close(process.exit)
}

if (require.main === module) {
  boot()
} else {
  console.info('Running app as a module')
  exports.boot = boot
  exports.shutdown = shutdown
  exports.port = app.get('port')
}
```



## Refactoring: Hapi REST API Server

待补充。