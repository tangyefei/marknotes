# 38 WebSocket:沙盒里的TCP

我们可以使用`TCP Socket`这种功能接口，在传输层收发数据。

WebSocket是运行在HTTP上的Socket通信规范，提供与`TCP Socket`类似的功能。

准确地说，它是基于TCP的轻量网络通信协议，在地位上和HTTP平级。

## 为什么要有WebSocket

HTTP的“请求-应答”模式，没有Websocket之前，即时消息、网络游戏等需要“实时通信”的领域，必须依靠“轮训”这种耗费带宽、CPU方式来实时通信。它原本是HTML5的一部分，后来成了一个单独的标准。

因为它运行在浏览器上，为了便于推广，起名的时候就故意使用 Web 来向HTTP靠拢，从而得名 WebSocket。

我们会使用浏览器里的API来调用WebSocket，但是它不是“调用接口的集合”，而是一个通信些而已：`TCP over Web`更恰当。

它的特点是：

- 全双工通信
- 二进制帧结构，语法、语义和HTTP不兼容
- 沿用HTTP的格式，之在协议上做了区分 ws和wss，端口对应80、443

因为互联网防火墙屏蔽了绝大多数端口，只对80、443放行，所以它伪装成HTTP协议

## 帧结构

略，前几节内容没认真看，这块有点难理解。后续补充。

## Websocket的握手

它的握手搭上了HTTP的便车，利用“协议升级”，伪装成HTTP，通常会通过如下字段：

- Connection: Upgrade
- Upgrade: websocket

当然还会携带一些字段用于防止普通HTTP消息被识别为WebSocket。

服务器接收到上述 报文，就会返回 101 Switching Protocols，通知客户端接下来就是用Websocket协议通信。

握手完成后传输的数据就不再是HTTP报文，而是WebSocket格式的二进制帧。

## 评论区

一个不错的总结：

- HTTP是通过TCP进行连接、收发消息的

- Websocket基于HTTP协议建立连接，在收到服务器的101响应后，后续的消息收、发会使用WebSocket的协议进行






































