

# 强缓存和协商缓存

关联的请求头属性：Expires、Cache-Control、Last-Modified、Etag。

![流程说明](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/browser-cache-flow.png)

首先通过Expires、Cache-Control判定是否可以使用浏览器本地缓存，如果可以请求转台为 200（from cache)，代表使用了强缓存。

否则发送请求到服务器，响应中已经存储了Last-Modified、Etag，这时候会在请求中携带它们的值给If-Modified-Since、If-None-Match，服务器检测如果命中则返回304，代表使用了协商缓存。具体规则为：

- 当If-None-Mactch的值跟ETag的值不一致时，可处理该请求。
- 如果资源在If-Modified-Since值之后进行了更新，则返回新资源，否则返回304响应

缓存的优先级为 Cache-Control > Expires > Etag > Last-Modified。



