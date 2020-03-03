# 26 TLS1.2连接过程解析

本篇讲的更细致，下面只摘录了粗略的流程图。

## HTTPS建立连接

HTTPS的连接过程，跟HTTP连接

**相同的部分**是通过地址基于DNS解析得到IP，然后通过TCP三次握手建立连接，然后开始收发HTTP报文

**不同的部分**是，它还需要另外一个”握手“过程，在TCP上建立安全连接，之后才开始收发HTTP报文

## TLS协议的组成

记录协议（Record Protocol）

警报协议（Alarm Protocol）

握手协议（Handshake Protocol）

变更密码规范协议（Change Ciphere Spec Protocol）


![TLS的握手过程](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/master-http/https-shakehand.jpeg)


## 抓包的准备工作

略过，直接参考作者给出的抓好的包的数据即可。

## ECDHE握手过程

![ECDHE抓包过程](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/master-http/ECDHE-handshake.jpeg)

## RSA握手过程

使用RSA而非ECDHE握手会有两点不同：

- RSA方式不会发出 Server Key Exchange
- RSA方式需要等到Finished才可以发送报文，而ECDHE可以抢跑
