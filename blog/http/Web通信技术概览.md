

## Web通信技术概览

[面试官：前端跨页面通信，你知道哪些方法？](https://segmentfault.com/a/1190000018731597) @segmentfault.com


对于同源页面，常见的方式包括：

- 广播模式：Broadcast Channe / Service Worker / LocalStorage + StorageEvent
- 共享存储模式：Shared Worker / IndexedDB / cookie
- 口口相传模式：window.open + window.opener
- 基于服务端：Websocket / Comet / SSE 等

而对于非同源页面，则可以通过嵌入同源 iframe 作为“桥”，将非同源页面通信转换为同源页面通信。

