# 4 HTTP时间全览：与HTTP相关的各种协议

![协议概览](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/master-http/http-protocols-graphic.jpeg)

围绕重要的协议进行了介绍（部分涵盖了上图）。


## TCP/IP

TCP/IP是网络世界中“事实上”的标准通信协议，它实际上是一系列网络通信协议的统称。

其中最核心的是TCP 和 IP，其他还有UDP、ICMP、ARP等，共同构成额了一个复杂但有层次的协议栈。

协议栈有四层，从上到下分别是：

1. 应用层
2. 传输层（TCP在该层）
3. 网际层（IP在该层)
4. 链接层


### IP协议

是Internet Protocol的上所写，主要解决寻址和路由的问题，以及如何在两点传送数据包。

### TCP协议

是Transmission Control Protocol，它位于IP协议之上，基于IP协议提供**可靠的，字节流**形式的通信。

可靠意味着数据不丢失，字节流是指数据保持完整，以为着在TCP协议两端可以像读取文件一那样反问传输的数据。

HTTP是一个传输协议，但它不关心寻址、路由、数据完整性等细节，因此这些工作都需要由下层来处理。互联网最流行的是TCP/IP协议，它刚好能满足HTTP的需求，所以HTTP协议就运行在了TCP/IP上面，HTTP跟个准确被称为“**HTTP over TCP/IP**”。

## DNS

Domain Name System

IP地址来标志计算机对于记忆很难，于是DNS出现了，它用有意义的名字作为IP地址的等价替代。

使用TCP/IP协议通信仍需要使用IP地址，因此把域名映射到真实IP的过程就叫“域名解析”。

域名解析的实际操作会复杂很多，他有13续根DNS，下面在有许多顶级DNS，权威DNS，和更小的本地DNS，逐层递归的实现域名查询。

HTTP没有明确要求要使用DNS，但实际上为了方便访问互联网的服务器，通常都会使用DNS来定位组几名，间接地把DNS和HTTP帮在了一起。

## URI/URL

URI(Uniform Resource Identifier)，使用它能唯一地标记互联网上的资源。

URL(Uniform Resource Locator)，俗称网址，是URI的一个子集，几乎是相同，通常不会做严格的区分。


URI由 协议名 + 主机名 + 路径 组成，比如例子:

```
http://nginx.org/en/download.html
```
协议名是http，主机名是nginx.org，路径是/en/download.html。

## HTTPS

HTTPS的全程是“HTTP over SSL/TLS”。

SSL/TLS是一个负责额加密通信安全协议，建立在TCP/IP之上，可以被用作HTTP的下层。

因此HTTPS相当于 HTTP + SSL/TLS + TCP/IP。

SSL全称是 Secure Socket Layer，由网景公司发明，到3.0时候被标准化，称为TLS(Transport Layer Security)，历史原因还别称为SSL/TLS，或者直接称为SSL。

SSL使用了密码学的最新研究成果，能够在不安全的环境为通信双方创建出一个秘密、安全的传输通道。

## 代理

Proxy协议的请求方和应答方的一个中间环节，代理有很多种

1. 匿名代理，完全匿名被代理的机器
2. 透明代理：即外界既知道代理，也知道客户端
3. 正向代理：靠近客户端，代表客户端向服务器发请求
4. 反向代理：靠近服务器，代表服务器响应客户端请求

CDN就是一种代理，扮演着透明代理 和 反向代理的角色。

由于这个中间层的出现，可以有很多有意思的事情发生：

- 负载均衡：把请求分散到多台机器
- 内容缓存：咱群上下行的数据
- 安全防护：隐匿IP，使用WAF等工具
- 数据处理：压缩、加密

关于HTTP代理，还有一个特殊的代理代理协议，由知名代理软件HAProxy制定，但并不是RFC标准，后面专门介绍。

## 补充

IP协议层有v1 v2 v3不够完善而没有发布，v5用于实验室内部研究。

2011年2月 IPV4 地址被用尽。

使用Unix操作系统，HTTP可以运行在Unix Domain Socket上，也能满足HTTP对下层可靠传输的要求，所以就成了 HTTP oveer Unix Domain Socket。




