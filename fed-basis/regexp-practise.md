# 正则表达式练习


```
// 入参格式参考：
const sourceUrl = "https://www.taobao.com?a=1&b=2&c=3&d#name";
// 出参格式参考：
const params = {
  a: 1,
  b: 2,
  c: 3,
  d: null
};

```

```
"a=1&b=2&c=3&d".match(/\w+(=\d+)?/g)

// ["a=1", "b=2", "c=3", "d"]
```


第一步处理

```
var matched = sourceUrl.match(/(?<=\?)(.+)(?=#)/);
var matched = sourceUrl.match(/([^?]+)(?=#)/);

["a=1&b=2&c=3&d", "a=1&b=2&c=3&d", index: 23, input: "https://www.taobao.com?a=1&b=2&c=3&d#name", groups: undefined]
```

第二步处理

```
matched[1].match(/\w+(=\d+)?/g);
(4) ["a=1", "b=2", "c=3", "d"]
```
