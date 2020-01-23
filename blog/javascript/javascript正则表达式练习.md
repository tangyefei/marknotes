# 正则表达式练习题收集

1.字符中包含了形如`{exp}`的表达式，请用对象中的变量替换所有的表达式?

```
var mailContent = 

`
Dear {receiverName}:

Happy new year for {year}.

Your sincerly {senderName}
{date}
`;

var obj = {receiverName: 'Maggie', year: 2020, senderName: 'Yefei', date: '2020-01-12'};

function format(template, data) {
	// 实现:
	return template.replace(/\{(\w+)\}/g, function(word) {
		return data[word.substring(1,word.length-1)];
	})
}

console.log(format(mailContent, obj));
```

2.按照如下要求解析url地址中的参数

```
const input = "https://www.taobao.com?a=1&b=2&c=3&d#name";

// 期望解析结果：{ a: 1, b: 2, c: 3, d: null }

function parseUrl(url) {
	// 实现:
	const match = url.match(/\?(.+)\#/);
	const param = match[1];
	const splits = param.match(/(\w(=\w)?)/g);
	const result = {};
	for(var i = 0; i < splits.length; i++) {
		var [k,v] = splits[i].split('=');
		result[k] = v || null;
	}
	return result;
}

console.log(parseUrl(input))
```

更细致的介绍：

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
