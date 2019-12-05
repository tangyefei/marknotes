# 网站优化实践

## 个人博客

https://tangyefei.cn/

https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Ftangyefei.cn

72分

存在的问题

- 没有应用compress和minimize，js文件太大，加载index.bundle.js的时长达到3s以上
- 没有使用缓存，任何时候再次打开网站的时候，index.bundle.js资源仍旧会重新请求
- 没有用用请求压缩，时间的资源大小和发送的资源大小一致


应用webpack的production后，得分上升到93分， 加载index.bundle.js时间1.25秒。


## 公司项目


