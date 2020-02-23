# 11 你能写出正确网址吗?

本节介绍了URI的格式，包含基本组成：

```
[schema][://][host:port] [path] [?query]
```

需要注意的是 path 的内容是以 `/` 开始的；另外在浏览器端为了方便查看，会将字段做一些呈现上的美化，比如请求头的地址不包含host，因为再跟host中内容重复展示没必要；另外在处理query参数上也会做美化。

URI的完整格式是：

```
[schema][://][user:passwd@][host:port] [path] [?query][#fragment]
```

但现在已经不推荐使用`[user:passwd@]`部分额，因为敏感信息被明文暴露，存在安全应还；`[#fragment]`则用于表示锚点。

