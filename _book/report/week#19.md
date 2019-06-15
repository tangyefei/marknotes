# 第19周技术周报


尝试每周总结遇到的技术问题，分享一些有用的知识点，贵在持续累积：

- 2018全美大公司最佳CEO袁征的访谈
- HTTP: 为什么后端每个请求都会先发送OPTIONS
- Web通信技术概览
- 灵机一动：开发浏览器插件增加对网页标注和历史功能
- XMLHttpRequest的timeout
- JavaScript内存泄漏

## 1. 2018全美大公司最佳CEO袁征的访谈

2018年，GlassDoor发布了全美大公司最佳CEO榜单，袁征（Eric S.Yuan）战胜了所有知名的CEO，成为员工心目中的最佳老板。这是一篇袁征的访谈：[tips-from-the-top-one-on-one-with-eric-yuan-founder-ceo-of-zoom](https://thriveglobal.com/stories/tips-from-the-top-one-on-one-with-eric-yuan-founder-ceo-of-zoom/)，一些个人觉得有最有启发的点：

- 卓有成效的领导者很重要的一点是能在团队中传递快乐
- 选择人才最重要的是自我驱动，愿意学习新技术、新东西，这胜过于你工作技巧和经验
- 找到愿意投资你的人，而不只是投资你的生意的人，他们不会因为生意变化而离开，而是一直支持你

作为重度阅读者，袁征推荐了 [《信任的速度》](https://book.douban.com/subject/3175541/)


## 2. HTTP: 后端每个接口每次调用都会先发送OPTIONS


### a. 问题

项目中前后端在不同的服务器上，调用接口时候每个请求都会先发送OPTIONS，然后再发送正常的请求。调试接口的时候在同名接口中找到有数据交互的时候不免有点麻烦。

### b. 分析

原因是非简单请求触发了 CORS preflight，在方法不变的前提下 OPTIONS 不是可避免，每个请求都会发送，但每次发送可以通过配置 `Access-Control-Max-Age` 来解决。

可以打开正在查看的一个知乎页，发现调用两个请求 /A /B，他们都发送了OPTIONS请求，其中前者的 `access-control-max-age` 为 `3600`，后者没有设置。刷新当前网页，/A 没有再发送 OPTIONS请求，而 /B 仍旧会发送 OPTIONS 请求。

因此让后端接口进行配置即可解决该问题。


### 3. Web通信技术概览

[面试官：前端跨页面通信，你知道哪些方法？](https://segmentfault.com/a/1190000018731597) @segmentfault.com


对于同源页面，常见的方式包括：

- 广播模式：Broadcast Channe / Service Worker / LocalStorage + StorageEvent
- 共享存储模式：Shared Worker / IndexedDB / cookie
- 口口相传模式：window.open + window.opener
- 基于服务端：Websocket / Comet / SSE 等

而对于非同源页面，则可以通过嵌入同源 iframe 作为“桥”，将非同源页面通信转换为同源页面通信。



### 4. 灵机一动的点子

#### 4.1 开发浏览器插件增加对网页标注和历史功能

对于网页上阅读到的一些比较好的文章/问答，会有一些重点段落或关键字句，可以帮你达成理解。假定你日后再想翻到这篇文章，可能还是需要从头阅读。

开发一个浏览器插件，可以直接用高亮、插入的标注来对网页进行标记。下次再次打开该页面的时候，仍旧可以看到自己做过的标记。


[https://segmentfault.com/a/1190000018981813](https://segmentfault.com/a/1190000018981813)提到了一些做高亮的技术点。


## 5. XMLHttpRequest的timeout

XMLHttpRequest对象提供了方法 abort 来取消请求，onabort 可以别用来监听请求的取消。它仅仅被用来取消客户端的请求，服务端已经收到请求了还是会继续自己的操作的。页面跳转的时候，ajax请求也会自动abort。

timeout的值是XMLHttpRequest中支持的设置，在达到设置的时间后，会abort掉发送的请求，

客户端的timeout设置要区分于服务器端的timeout设置，客户端timeout通常是自己的error会被抛出，而服务端的超时则会返回status 503。

关于封装的Ajax库如何实现timeout，自己想到的两个思路：
- 使用 timeout ontimeout的方式
- 手动 setTimeout，到时间的时候自己去做 abort

## 6. JavaScript内存泄漏

[英文：JavaScript中4种常见的内存泄漏和解决办法](https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/)，可读性还挺不错的一篇文章，。


