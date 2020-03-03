# Node.js的安全和授权

We can makes our apps and communications secure by using various approaches, such as token-based authentication and/or OAuth ([http://oauth.net](http://oauth.net)). 

We can leverage numerous third-party services (e.g., Google, Twitter, GitHub) or become service providers ourselves (e.g., provide a public API).

**注：authorization 授权 authentication 认证**

I dedicate the whole chapter to matters of authorization, authentication, OAuth, and best practices.

## Authorization with Express.js middleware

Express.js middleware allows us to apply certain rules seamlessly to all routes, groups of routes (namespacing), or individual routes.

- All routes: `app.get('*', auth)`
- Groups of routes: `app.get('/api/*', auth)`
- Individual routes: `app.get('/admin/users', auth)`

auth() is a function with three parameters: req, res, and next. In this middleware, you can 

- call the OAuth service or 
- query a database to get the user profile to authorize it (check for permissions) or 
- to check for JWT (JSON Web Tokens) or 
- web session to authenticate the user (check who it is).

Or, most likely, do both!

```
const auth = (req, res, next) => {
  // ...
  // Assuming you get user profile and user.auth is true or false
  if (user.auth) return next()
  else next(new Error('Not authorized')) // or res.send(401)
}
```


If next() is invoked without anything, then the normal execution of the server will proceed.Otherwise Express will jump straight to the first error handler.

## Token-based authentication: OAuth2.0

The most common authentication is a cookie&session–based authentication, and the next section deals with this topic. However, in some cases, more REST-fulness is required, or cookies/sessions are not supported well (e.g., mobile). In this case, it’s beneficial to authenticate each request with a token (probably using the OAuth2.0 ([http://tools.ietf.org/html/rfc6749](http://tools.ietf.org/html/rfc6749)) scheme).

The token can be passed in a query string or in HTTP request headers. Alternatively, we can send some other authentication combination of information, such as email/username and password, or API key, or API password, instead of a token.

n our example，and if we have the correct value stored somewhere in our app (database, or in this example just a constant SECRET_TOKEN), we can check the incoming token against it.

```
const auth = (req, res, next) => {
  if (req.query.token && token === SECRET_TOKEN) {
    // client is fine, proceed to the next route
    return next()
  } else {
    return  next(new Error('Not authorized'))
      // or res.send(401)
  }
}
```

In a more realistic example, we use API keys and secrets to generate HMAC-SHA1 (hash-based message authentication code—secure hash algorithm strings), and then compare them with the value in req.query.token.

补充：OAuth更进一步可以参考阮一峰老师的文章 [理解OAuth 2.0](https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)，[OAuth 2.0 的四种方式](https://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html)，简述过程就是：

- （A）用户打开客户端以后，客户端要求用户给予授权。
- （B）用户同意给予客户端授权。
- （C）客户端使用上一步获得的授权，向认证服务器申请令牌。
- （D）认证服务器对客户端进行认证以后，确认无误，同意发放令牌。
- （E）客户端使用令牌，向资源服务器申请获取资源。
- （F）资源服务器确认令牌无误，同意向客户端开放资源。

## JSON Web Token (JWT) Authentication

待有需要再补充。

## Session-Based Authentication

The session-based method is the recommended way for basic web apps, because browsers already know what to do with session headers. In addition, in most platforms and frameworks, the session mechanism is built into the core.

Session-based authentication is done via the session object in the request object req. A web session in general is a secure way to store information about a client so that subsequent requests from that same client can be identified.

In the main Express.js file, we'll need to import `cookie-parser` and `express-session` to enable sessions

- `express.cookieParser()`: Allows for parsing of the client/request cookies
- `express.session()`: Exposes the res.session object in each request handler, and stores data in the app memory or some other persistent store like MongoDB or Redis

```
npm i cookie-parser express-session -SE
```


```
const cookieParser = require('cookie-parser')
const session = require('express-session')
...
app.use(cookieParser())
app.use(session())
```

By store auth as `true` in `/login`, we can use it in any others routes to verify the flag.

```
app.post('/login', (req, res, next) => {
  if (checkForCredentials(req)) {  
  // checkForCredentials checks for credentials passed in the request's payload
    req.session.auth = true
    res.redirect('/dashboard') // Private resource
  } else {
    res.status(401).send() // Not authorized
  }
})
```

By default, Express.js uses in-memory session storage. This means that every time an app is restarted or crashes, the sessions are wiped out. To make sessions persistent and available across multiple servers, we can use a database such as Redis or MongoDB as a session store that will save the data on restarts and crashes of the servers.



## Project: Adding E-mail and Password Login to Blog

### Session Middleware


Let’s add the automatic cookie parsing and support for session middleware in these two lines by putting them in the middle of configurations in app.js:

```
const cookieParser = require('cookie-parser')
const session = require('express-session')

// Other middleware

app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'))
app.use(session({secret: '2C44774A-D649-4D44-9535-46E296EF984F'}))

// Routes
```

### Authorization in Blog

We define a function that checks for req.session.admin to be true, and proceeds if it is. Otherwise, the 401 Not Authorized error is thrown, and the response is ended.

```
// Authorization
const authorize = (req, res, next) => {
  if (req.session && req.session.admin)
    return next()
  else
    return res.send(401)
}
```

Now we can add this middleware to certain protected endpoints (another name for routes). Specifically, we will protect the endpoints to see the admin page (GET /admin), to create a new article (POST /post), and to see the create new article page (GET /post):

```
app.get('/admin', authorize, routes.article.admin)
app.get('/post', authorize, routes.article.post)
app.post('/post', authorize, routes.article.postArticle)
```

### Authentication in Blog

The last step in session-based authorization is to allow users and clients to turn the req.session.admin switch on and off. We do this by having a login form and processing the POST request from that form.

we defined in the `app.js`—a line that has this statement:

```
app.post('/login', routes.user.authenticate)
```

Provide authenticate and logout in `user.js`: 

```
exports.authenticate = (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return res.render('login', {
      error: 'Please enter your email and password.'
    })
    
    req.collections.users.findOne({
    	email: req.body.email,
	    password: req.body.password
   	 }, (error, user) => {
		if (error) return next(error)
		if (!user) return res.render('login', {error: 'Incorrect email&password combination.'})
		req.session.user = user
		req.session.admin = user.admin
		res.redirect('/admin')
  })
}
	 
exports.logout = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return console.log(error)
    res.redirect('/')
  })
}
```
expose the method to the importer, i.e., the file that imports this user.js module:


## The oauth Module

待有需要再补充。

## Project: Adding Twitter OAuth 1.0 Sign-in to Blog

待有需要再补充。




