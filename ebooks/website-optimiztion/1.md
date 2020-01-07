# 1. 使用工具衡量性能


> You can't optimize what you can't measure

在开始进行优化之前，需要强调一点是：必须以真实统计的数据为依据，优化过程中必须看妨碍性能的关键指标是否发生了变化。

[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=zh-cn) 是由 Google 提供的一个检测网站性能的工具，输入网站地址后它会返回网站性能的得分，以及具体改善性能的建议，可以看到它提供了在 移动设备 和 桌面设备的不同评分，可以针对不同设备来做具体的优化。


![pagespeed-insights-leetcode.png](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/pagespeed-insights-leetcode.png)



上图可以看到性能的评分为40分，然后有 首次内容渲染、首次输入延迟 以及 实验室数据等多项统计数据，其中绿/橙/红分别代表了优/一般/差的表现。同时它还提供了优化建议和诊断结果，有助于用户改善网站性能。在随后的部分，我们会逐步解释各个指标、优化建议分别代表什么含义。



[Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)作为最重要的网页开发调试工具，几乎能查看到网页加载使用过程的一切信息，作为开发者有必要熟练运用开发者工具。


![chrome-devtools-leetcode.png](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/chrome-devtools-leetcode.png)


上图可以看到很多信息，包含了FPS/CPU/Networks/Frames/Interactions/Timing，我们先选中Main这一项，可以看到统计了5.67s内的监测数据，底部面板呈现了在Loading、Script、Renddering等阶段的耗时。将底部的Tab切换到Event Log，并且将Scripting和Rendering取消勾选，可以看到各个时间点发生的事件，下图截取了一部分：


![chrome-devtools-leetcode-summary-event-log.png](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/chrome-devtools-leetcode-summary-event-log.png)
![chrome-devtools-leetcode-summary-event-log-more.png](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/chrome-devtools-leetcode-summary-event-log-more.png)

最头部的Send Request和Receive Response成功请求获取到了HTML的内容，然后在parseHTML中，解析出了对更多资源的加载，于是又触发了更多新的请求，Finish Loading事件则标志着某个资源的加载的结束。

这里只是一个开头，后续就要开始介绍影响性能的两个途径，即：优化关键渲染路径、优化代码书写方式。借助于上述的工具，我们能够很好的衡量网站在具体指标上的表现。