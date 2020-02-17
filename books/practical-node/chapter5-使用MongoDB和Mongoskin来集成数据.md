# 使用MongoDB和Mongoskin来集成数据


NoSQL databases (DBs), also called non-relational databases, are more horizontally scalable, and better suited for distributed systems than traditional SQL ones (a.k.a., RDMBS). 

The key distinction in implementation of apps with NoSQL DBs comes from the fact that NoSQL DBs are schema-less. There's no table, just a simple store indexed by IDs. 

Another good reason to use NoSQL databases is that, because they are schema-less. I can quickly prototype prototyping and iterate (more git pushes!). 

In addition to efficiency, scalability, and lightning speed, MongoDB has a JavaScript interface! This alone is magical, because now there's no need to switch context between the front end (browser JavaScript), back end (Node.js), and database (MongoDB). This is my favorite feature because in 90% of my projects I don't handle that my data or traffic, but I used the JavaScript interface all the time.


## Easy and proper installation of MongoDB

The following steps are better suited for macOS/Linux–based systems.

The HomeBrew installation is recommended and is the easiest path (assuming macOS users have brew installed already, which was covered in Chapter 1):

```
$ brew install mongodb
$ brew tap mongodb/brew
$ brew install mongodb-community@4.2
```

To run MongoDB (i.e. the mongod process) as a macOS service, issue the following:
```
$ brew services start mongodb-community@4.2
```

、
## How to run the Mongo server

To run the Mongo server there's the mongod command.

```
$ mongod
```


To run MongoDB manually as a background process, issue the following:
```
$ mongod --config /usr/local/etc/mongod.conf --fork
```

To verify that MongoDB is running, search for mongod in your running processes:

```
$ ps aux | grep -v grep | grep mongod
```

## Data manipulation from the Mongo console

```
$ mongo
> db.test.save( { a: 1 } )
> db.test.find()
```
## MongoDB shell in detail

Let's take a look at the most useful MongoDB console (shell) commands, which I listed here:

- > `help`: prints a list of available commands
- > `show dbs`: prints the names of the databases on the database server to which the console is connected (by default, localhost:27017; but, if we pass params to mongo, we can connect to any remote instance)
- > `use db_name`: switches to db_name
- > `show collections`: prints a list of collections in the selected database
- > `db.collection_name.find(query)`: finds all items matching query
- > `db.collection_name.findOne(query)`: finds one item that matches query
- > `db.collection_name.insert(document)`: adds a document to the collection_name collection
- > `db.collection_name.save(document)`: saves a document in the collection_name collection—a shorthand of upsert (no _id) or insert (with _id)
- > `db.collection_name.update(query,{$set: data})`: updates items that match query in the collection_name collection with data object values
- > `db.collection_name.remove(query)`; removes all items from collection_name that match query criteria
- > `printjson(document)`: prints the variable document

For the purpose of saving time, the API listed here is the bare minimum to get by with MongoDB in this book and its projects. 


It's possible to use good old JavaScript:

```
> var a = db.messages.findOne()
> printjson(a)
> a.text = "hi"
> printjson(a)
> db.messages.save(a)
```

If you have `_id`, then the document will be updated. When there's no `_id` will insert a new document, save() works like an upsert (update or insert).


### MongoUI

I created MongoUI, which is a web-based database admin interface. It allows you to view, edit, search, remove MongoDB documents without typing commands. Check out MongoUI at [https://github.com/azat-co/mongoui](https://github.com/azat-co/mongoui). You can install MongoUI with npm by executing nmp i -g mongoui and then start it with mongoui. It'll open the app in your default browser and connect to your local DB instance (if there's one).

### Compass

For an even better desktop tool than my own MongoUI, download Compass at [https://www.mongodb.com/products/compass](https://www.mongodb.com/products/compass). It's built in Node using Electron and React.

### mongoimport

One more useful MongoDB command (script) is mongoimport. Use mongoimport. Here's an example of how to inject a data from a JSON file with an array of object:

```
mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray
```

ou don't need to do anything extra to install mongoimport. It's already part of the MongoDB installation and lives in the same folder as mongodb or mongo.



## Minimalistic native MongoDB driver for Node.js example

### example to insert a new item

```
const mongo = require('mongodb')
const dbHost = '127.0.0.1'
const dbPort = 27017

const {Db, Server} = mongo
const db = new Db('local',
  new Server(dbHost, dbPort),
  {safe: true}
)
// local is the db name

db.open((error, dbConnection) => {
  if (error) {
    console.error(error)
    return process.exit(1)
  }
  console.log('db state: ', db._state)
  const item = {
    name: 'Azat'
  }
	dbConnection
	  .collection('messages')
	  .insert(item, (error, document) => {
      if (error) {
        console.error(error)
        return process.exit(1)
      }
      console.info('created/inserted: ', document)
      db.close()
      process.exit(0)
	  }
	)
})
```

### example to update an item

```
const mongo = require('mongodb')
const dbHost = '127.0.0.1'
const dbPort = 27017
const {Db, Server} = mongo
const db = new Db('local', new Server(dbHost, dbPort), {safe: true})

db.open((error, dbConnection) => {
  if (error) {
    console.error(error)
    process.exit(1)
  }
  console.log('db state: ', db._state)
  
  dbConnection.collection('messages').findOne({}, (error, item) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
    console.info('findOne: ', item)

    item.text = 'hi'
    var id = item._id.toString() // we can store ID in a string
    console.info('before saving: ', item)
    dbConnection
      .collection('messages')
      .save(item, (error, document) => {
        if (error) {
          console.error(error)
          return process.exit(1)
        }
        console.info('save: ', document)
        dbConnection.collection('messages')
          .find({_id: new mongo.ObjectID(id)})
          .toArray((error, documents) => {
            if (error) {
              console.error(error)
              return process.exit(1)
            }
            console.info('find: ', documents)
            db.close()
            process.exit(0)
          }
        )
    })
  })
});
```

Callback's first argument is always an error object even when it's null. 

To convert a string into the ObjectId type, use mongo.ObjectID() method. 

## Main Mongoskin methods


Mongoskin provides a better API than the native MongoDB driver.

Compare the following Mongoskin implementation with the example in prior section.

```
const mongoskin = require('mongoskin')
const { toObjectID } = mongoskin.helper
const dbHost = '127.0.0.1'
const dbPort = 27017
const db = mongoskin.db(`mongodb://${dbHost}:${dbPort}/local`)

db.bind('messages').bind({
  findOneAndAddText: function (text, fn) { // no fat arrow fn because we need to let bind pass the collection to use this on the next line... this can be replaced with db.messages too
    this.findOne({}, (error, document) => {
      if (error) {
        console.error(error)
        return process.exit(1)
      }
      console.info('findOne: ', document)
      document.text = text
      var id = document._id.toString() // We can store ID in a string
      console.info('before saving: ', document)
      this.save(document, (error, count) => {
        if (error) {
          console.error(error)
          return process.exit(1)
        }
        console.info('save: ', count)
        return fn(count, id)
      })
    })
  }
})

db.messages.findOneAndAddText('hi', (count, id) => {
  db.messages.find({
    _id: toObjectID(id)
  }).toArray((error, documents) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    }
    console.info('find: ', documents)
    db.close()
    process.exit(0)
  })
})
```

Mongoskin is a subset of the native Node.js MongoDB driver, so most of the methods, as you have observed from the latter are available in the former. 

But there are more methods. Here is the list of the main Mongoskin–only methods:


- findItems(..., callback): Finds elements and returns an array instead of a cursor
- findEach(..., callback): Iterates through each found element
- findById(id, ..., callback): Finds by _id in a string format
- updateById(_id, ..., callback): Updates an element with a matching _id
- removeById(_id, ..., callback): Removes an element with a matching _id

Of course, there are alternatives to Mongoskin and the native MongoDB driver, including but not limited to: `mongoose`, `mongolia`, `monk`.

For data validation at the Express level, these modules are often used: `node-validator`, `express-validator`.

## Project: Storing Blog data in MongoDB with Mongoskin

It provide source code here [https://github.com/azat-co/practicalnode](https://github.com/azat-co/practicalnode), folder `code/ch5/blog-expreses`.

### Project: Adding MongoDB Seed Data

```
mongoimport --jsonArray --db blog --collection users --file ./db/users.json
mongoimport --jsonArray --db blog --collection articles --file ./db/articles.json 
```

