# Google Developer - Measure Performance with the RAIL Model

[Measure Performance with the RAIL Model](https://developers.google.com/web/fundamentals/performance/rail)


- Response: process events in under 50ms
- Animation: produce a frame in 10ms
- Idle: maximize idle time
- Load: deliver content and become interactive in under 5 seconds

Idle这一条中要求尽可能利用Idle的时间去处理一些任务，让实际的任务发生的时候拥有更高的响应速度。
Load这一条要求优化[Critical Rendering Path]()来提高渲染过程的阻塞

文档对Mobile端的体验要求会很高，尤其是一些网络情况并不好的用户。

可用的衡量RAIL的工具

- Chrome DevTools
- Lighthouse
- WebPageTest
