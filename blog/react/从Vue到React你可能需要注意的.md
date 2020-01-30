## 从Vue到React你可能需要注意的

### 1. JSX中的class和style的写法

写JSX就像是在写普通对象，class表示为className，style仍保留改名字，但是传入是对象结构。

```
<div className="title" 
	style={{"width": "100%","borderRadius": "15px"}}>
</div>
```

### 2. webpack-dev-server本地调试


因为调用真实后台，Host需要符合一定规则的域名，所以通过switchhost把本地ip指向到了的域名。

比如下属配置，后台能通过了，但是webpack认的前端代码地址是127.0.0.1，因此会返回`Invalid Host header`：

```
127.0.0.1   st-tsp.maxima-cars.com
```


解决办法：通过在devServer增加配置项 `disableHostCheck:true`即可。