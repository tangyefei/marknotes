# 9 HTT报文什么是样子的？

## 报文结构

![报文结构示意图](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/master-http/message-structor.jpeg)

![报文实例示例图](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/master-http/message-sample.jpeg)

## 请求报文的起始行：请求行

![报文请求行](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/master-http/message-overview.jpeg)

```
GET / HTTP/1.1
```

## 响应报文的起始行：状态行 


```
HTTP/1.1 200 OK
HTTP/1.1 404 Not Found
```

## 头部字段

key-value形式存在，用`:`分割，最后用CRLF换行表示结束。

HTTP头字段非常灵活，不仅可以使用标准的头，也可以添加任意自定义头。

字段名部分大消息，不允许出现空格，可以使用`-`但不允许出现`_`，字段名后必须紧接着`:`，字段值前可以有多个空格，字段顺序无意义，原则上字段不重复除非字段本身语意允许。


头部字段又分为 通用字段、请求字段、响应字段、实体字段，对HTTP报文的解析和处理其实就是对头字段的处理。一些比较重要的字段有：

- Host，请求头字段，HTTP/1.1里唯一要求的必须出现的字段，告诉服务器请求应该由哪个主机来处理
- User-Agent，请求头字段，描述发起请求的客户端
- Date，通用字段，表示HTTP报文的创建时间
- Server，响应头字段，告诉客户端当前正在提供Webe服务的软件名和版本号
- Content-Length：实体字段，报文里body的长度

## 本地通过telnet调试

```
brew install telnet
telnet
open www.chrono.com 80
```

注：并不知道怎么进入编辑模式。

进入编辑模式输入会查可以看到（正确和错误的请求的结果），后者而故意在Host后面增加了一个空格：

```
GET /09-1 HTTP/1.1
Host: www.chrono.com
```

```
GET /09-1 HTTP/1.1
Host : www.chrono.com
```

