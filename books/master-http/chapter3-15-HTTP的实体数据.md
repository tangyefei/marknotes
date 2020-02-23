# 15 HTTP的实体数据


## 数据类型与编码

HTTP是在应用层的协议，数据达到后必须知道是什么数据才行。

早在HTTP单身恶搞之处就有了名叫多 用户互联网邮件的扩展，它可以让有间中发送ASCII码以外的任意数据，它的缩写是MIMEE（Internet Mail Extentions）。

HTTP选取了MIME的一部分用来标记实体的数据类型，这就是我们平时所说的`MIME type`。它把数据分为了八大类，大类下面再自焚出小类，形式是 type/subtype。

在HTTP中经常遇到的类别：

- text：文本格式的可读取数据 ，最熟悉的是text/html，还有text/plain、text/css等
- image：图像文件，包括 image/png、image/jpg、 image/gif等
- audio video：音频和视频数据，例如 audio/mpeg、vedio/mp4等
- application：数据格式不固定，可能是文本也可能是二进制，需由上层应用解释，比如 application/json，application/javascript，application/pdf。如果实在不知道是什么类型，就会使用application/octet-stream，即不透明的二进制数据。


HTTP传输过程中，为了节省宽带，还会压缩数据，为了让浏览器知道是什么编码格式，还需要Encoding type，它通常只有三种：

- gzip：GNU zip压缩格式，互联网上最流行的压缩格式
- deflate：zlib压缩格式，流行程度仅此于gzip
- br：一本专门为HTTP优化的新压缩算法


## 数据类型使用的头字段

为了进行客户端和服务器的内容协商，HTTP协议定义了

- 两个Accept字段（Accept和Accept-Encoding）用于告诉服务器期望接收什么数据
- 定义了两个Content字段（Content-Type和Content-Encoding），用于高速客户端实际发送了什么数据

![报文Accept和Encoding示意图](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/master-http/accept-and-encoding-sample.jpeg)


其中Accept-Encoding和Content-Encoding是可以省略的，请求报文没有Accept-Encoding，表示客户端不支持压缩数据；响应报文里没有Content-Encoding，就表示响应没有被压缩。

注：Content-Type是一个实体字段，在请求和响应都可以的头部都可以携带。另，头字段分为请求头、响应头、通用头、实体头字段。

## 语言类型和编码

Mime type和Encoding type解决了计算机之间理解实体数据点问题，但是不同国家地区的人使用不同的语言，为了让浏览器显示出可以理解的语言文字，HTTP引入了：语言类型 和 字符集的概念。

语言类型就是自然语言，它用 type-subtype 来表示，比如 en-US 表示美式英语，en-GB表示英式英语，zh-CN表示汉语。

字符则是文字的编码方式，有ASCII、GBK等各种类型，后来出现了Unicode字符集和UTF-8编码，它把所有语言的字符都容纳在内。遵循UTF-8字符编码方式的Unicode字符集成为了互联网上的标准字符集。


## 语言类型中使用的头字段

请求头字段Accept-Language标记了客户端可理解的自然语言，可以用`,`分割，值的顺序代表了优先选项：

```
// 请求头
Accept-Language: zh-cn, zh, en
```

响应头字段Content-Language告诉客户端数据实体会用到实际数据类型

```
// 响应头
// 服务器通常不会发送Content-Language，因为使用的语言可以由字符集腿短
Content-Language: zh-CN
```

请求头字段Accept-Charset标记了客户端接受的字符集。

响应头却没有Content-Charset，而是在Content-Type的数据类型后面用 `charset=xxx`来表示。

```
//请求头
//浏览器都支持多种字符集，通常不会发送该字段
Accept-Charset: gbk, utf-8

//响应头
Content-Type: text/html; charset=utf-8
```

下述是完整的发送字段：

![报文Language和Charset示意图](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/master-http/language-and-charset-sample.jpeg)


关于语言和字符集的总结：

> 客户端只会发送 Content-Language给服务器，不发Accept-Charset，因为你给什么chartset我都能支持。

> 服务端通过 Content-Type中告知charset的信息(没有Content-Charset的字段)，并基于此推断出Language，从而服务单也不发送Content-Language了。


## 内容协商和质量值

在使用上述字段进行内容协商的时候，可以给每个头字段设置权重，例如：

```
Accept: text/html, application/xml;q=0.9,*/*;q=0.8
```

注意：不同于编程语言中`;`断句强于`,`（上面是`,`更强），`text/html`的权重是1，application/xml的权重是0.9，其他类型的权重是0.8。

## 内容协商的结果

每个Web服务器使用的算法是不同的，有时候会返回一个Vary字段，表示服务器在内容协商时候参考的请求头字段有哪些：

```
Vary: Accept-Language, User-Agent, Accept
```

## 动手实践

可以在浏览器中访问下属地址，然后通过查看请求头将上述知识点关联起来。

```
http://www.chrono.com/15-1?name=a.json
http://www.chrono.com/15-1?name=a.xml
```

下面为 `a.json`的浏览器有关的请求头  和 响应头：

```
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7
```

```
Content-Type: application/json
```

最后附一张本篇介绍的字段关系：

![内容协商字段](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/master-http/content-negociate-relationship.jpeg)


