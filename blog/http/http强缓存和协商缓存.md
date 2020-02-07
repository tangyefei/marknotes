

# 强缓存和协商缓存

## 缓存的种类

![cache-image](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/blogs/http/cache.png)

## 强缓存和协商缓存详细介绍

[强缓存和协商缓存的一篇不错的博客](https://github.com/amandakelake/blog/issues/41)：

关联的请求头属性：Expires、Cache-Control、Last-Modified/If-Modified-Since、Etag/ETag、If-None-Match。

- 当Cache-Control和Expires 符合条件，会使用强缓存，返回200，from dist cache 或 from memory cache
- 当Last-Modified，If-Modified-Since 和 ETag、If-None-Match 符合条件，会出现304 Not Modified。

![流程说明](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/blogs/http/browser-cache-flow.png)

缓存的优先级为 Cache-Control > Expires > Etag > Last-Modified。



