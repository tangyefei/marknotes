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


理论上`?=\?`应该会匹配问号但不会消费，但是这里还是被消费了：

```
var matched = sourceUrl.match(/(?=\?)(.+)(?=#).?/);
(2) ["?a=1&b=2&c=3&d#", "?a=1&b=2&c=3&d", index: 22, input: "https://www.taobao.com?a=1&b=2&c=3&d#name", groups: undefined]
```

一种变通做法是：

```
var matched = sourceUrl.match(/([^?]+)(?=#).?/);
(2) ["a=1&b=2&c=3&d#", "a=1&b=2&c=3&d", index: 23, input: "https://www.taobao.com?a=1&b=2&c=3&d#name", groups: 
matched[1].match(/\w+(=\d+)?/g);
(4) ["a=1", "b=2", "c=3", "d"]
```


