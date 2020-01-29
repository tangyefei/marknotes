# 第20章 客户端存储

## 2. cookie


**思考：如何保证cookie的安全呢？**


### 局限性


cookie最早是设计给服务器端使用的。因为cookie不会采用任何加密机制，因此它们是不安全的。

但是通过https传输cookie是安全的，不过这和cookie本身无关，而和`https:`协议相关。

设计初衷是给服务器脚本用来存储少量数据的，浏览器不允许保存超过300个cookie，为单个服务器保存到cookie不能超过20个，而且每个cookie保存的数据不能超过4KB（名和值的总量不能超过4KB）。尽管现代浏览器将300个的总数限制去除了，但是4KB大小大小限制仍旧存在。

操作cookie的API很早就定义和实现了，但是根本没有提供诸如查询、设置、删除cookie的方法，所有这些操作都通过以特殊格式的字符串读写Document对象的cookie属性来完成。

本节介绍如何使用Document对象的cookie属性实现对cookie的操作。

### 检测cookie是否使用

在JavaScript代码中使用cookie前，需要确保cookie是启用的。

`navigator.cookieEnabled`这个属性如果为true则是启用的，反之则是禁用的。

在不支持该属性的浏览器上，还是要用具体的技术去读、写、删除cookie来看浏览支持是否支持cookie。


### 有效期

cookie默认的有效期很短，一旦用户关闭浏览器，cookie保存的数据就丢失了，要注意的是：cookie的作用域和整个浏览器进程有关，而不是单个浏览器窗口有关。

想要cookie延长有效期，可以通过设置max-age属性（单位 是秒），一旦设置了有效期，浏览器就会将cookie存储在一个文件中，并直到过了有效期才会删除该文件。

### 作用域

cookie的作用域是通过文档源和文档路径来确定的，该作用域通过cookie的path和domain属性也是可以配置的，默认cookie和创建它的页面有关，并对该页面同目录和子目录的其他页面可见。

比如 https://a.com/b/page1.html 页面创建了一个cookie，那么对 https://a.com/b/page2.html 和 https://a.com/b/c/page1.html 也是可见的，但是对https://a.com/不可见。

通常默认的可见性就能满足需求，不过有的时候你想要整个网站都能使用cookie，而不管是按个页面创建的。

这样一来，来自同一个Web服务器的Web页面，只要其URL是制定的前缀开始的，都可以共享cookie。

同样上例中 https://a.com/b/c/page.html 页面创建的cookie，并且将cookie的路径设置为 /b，对于https://a.com/b/page.html页面也是可见的。

或者，把路径设置为/，那么该cookie对任何https://www.example.com这台Web服务器上的页面都是可见的。大型网站想要在子域名之间共享cookie通常就将将path设置为/，将domain设置为 .b.com（假定子网站分别为 a.b.com 和 c.b.com）

如果没有设置属性domain属性默认值设置为当前服务器的主机名。要注意的是：地址，只能设置为当前服务器，后面例子会介绍。

思考：关于无法使用cookie的path来做访问控制，因为可以iframe得到对应文档的cookie的逻辑没太明白。

### 属性secure

cookie还有一个属性是布尔类型的secure，一旦被标记诶true，那就只能当浏览器和服务器使用HTTPS或其他安全协议连接的时候才能传递它。


### 读取cookie

document.cookie读取的是一个字符串，由名值对组成的字符串，不同命值对通过分号和空格隔开，内容包含了所有**作用在当前文档下**的cookie。

下面例子是从 [https://www.youtube.com/](https://www.youtube.com/) 上读取的cookie的字符串

```
"APISID=3XUtmYyD961qrqBf/Ap2WcgWMR6kCKpoHg; SAPISID=YBfm9MoOVWULtDJy/AMP_auRb3eZw2ZgO8; SID=ZgeGiFr3jvW7aunFOZEKeCO2A2_HrPMiQVNYxB8fALaj2wYQ4Aiu3uZ7p8cCZDoK-IPMvQ.; __Secure-3PAPISID=YBfm9MoOVWULtDJy/AMP_auRb3eZw2ZgO8; PREF=al=en&f1=50000000; SIDCC=AN0-TYt-Epuw4yc_1_HjkzR6z7VclkY8JO99HgRy2bn3lgwhpQgbi94XHHi2VRol3yYI6p9Oe6M"
```

通常使用split方法将名值对分离出来，下面提供了一个例子：


```
function getCookie (){
	var splits = document.cookie.split(";")
	var result = {};
	splits.forEach((e)=>{
	  let index = e.indexOf('=');
	  let k = e.substring(0,index);
	  let v = e.substring(index+1);
	  result[k] = decodeURIComponent(v);
	})

}
console.log(getCookie());

// 输出：
{
	APISID: "=3XUtmYyD961qrqBf/Ap2WcgWMR6kCKpoHg",
	SAPISID: "=YBfm9MoOVWULtDJy/AMP_auRb3eZw2ZgO8",
	SID: "=ZgeGiFr3jvW7aunFOZEKeCO2A2_HrPMiQVNYxB8fALaj2wYQ4Aiu3uZ7p8cCZDoK-IPMvQ.",
	__Secure-3PAPISID: "=YBfm9MoOVWULtDJy/AMP_auRb3eZw2ZgO8",
	PREF: "=al=en&f1=50000000",
	SIDCC: "=AN0-TYtHEr3dIzcwlUvt9dv01sn3AxVykyz2S9cv6edcrA0ZzeHk43LJ1EOZdhm-3aYUdpIhmks",
}
```


### 保存cookie

只需要将cookie属性设置为一个字符串形式的值：

```
document.cookie = "version=1.0.1";
```

由于名/直中不允许出现分号、逗号和空白符，因此一般可以采用encodeURIComponent函数对齐进行编码，读取的时候需要使用decodeURLComponent对齐进行解码

```
name=value;max-age=${seconds}
```

同样要设置cookie的path、domain和secure，需要在后面追加如下字符串

```
path=${path};domain=${domain};recure
```

要使用相同名字、路径和域，需要整个重新设置，不能之传递一个`name=${value}`来修改。

要删除一个cookie，使用相同的名字、路径和域，然后制定一个非空的值，并且将max-age设定为0即可。


### 实例运用

关于设置domain这里需要举些例子用于澄清容易误解的地方，首先打开 [http://tech.tangyefei.cn/](http://tech.tangyefei.cn/)


#### 基本使用

```
document.cookie = 'a=1';
```

执行上述语句后，发下多了一条记录 name=a value=1 domain=tech.tangyefei.cn path=/ exipres=Session

#### 增加domain

```
document.cookie = 'a=2;domain=tangyefei.cn';
```

继续执行语句，发现多了一条记录  name=a value=2 domain=.tangyefei.cn path=/ exipres=Session

两个name=value被种在了不同的domain下面

#### 增加path

```
document.cookie = 'a=1;path=/algorithm';

```

继续执行语句，发现多了一条记录  name=a value=2 domain=.tangyefei.cn path=/algorithm exipres=Session

即domain+path被唯一确定一个name能不能被设置。

#### 和浏览器tab无关

新开一个浏览器tab打开其他网页，发现值都还在，可见他们是跟单个浏览器tab无关。

#### 和整个浏览器有关

关闭浏览器重新打开改地址（必须加上path否则清除的不是同一条），发现cookie被清除了，可见是整个浏览器进程有关系的。


#### 删除cookie

```
document.cookie= 'a=1;path=/algorithm;max-age=0';
```

执行上述语句后发现生成的cookie被删除掉了

```
document.cookie = 'a=1';
document.cookie= 'a=1;max-age=10';
```

执行上述语句后可以在浏览器观测到，10秒后被清除掉了。

#### 多个cookie值设置

```
document.cookie= 'b=2;c=3';
```

执行语句后，发现值出现了name为2，value为3的值。

荣丰一误解的是，cookie一次只能设置一个name/value对，多个值需要多次设置。

但是上面例子我们可以看到，通过document.cookie拿到的缺失符合整个规则的多个name=value的字符组合，中间被用;隔开。

### 存储方法实现

cookie相关的存储方法实现（注：预定义了maxage和path）：

```
/ 基于cookie的存储API
function CookieStorage(maxage, path) {
    // 获取一个存储全部cookie的对象
    var cookies = (function() {
        var cookies = {};
        var all = document.cookie;
        if (all === "") {
            return cookies;
        }
        // 分离出名/值对
        var list = all.split("; ");
        // 遍历每个cookie
        for (var i = 0; i < list.length; i++) {
            var cookie = list[i];
            var p = cookie.indexOf("=");
            // 获取cookie的名字
            var name = cookie.substring(0, p);
            // 获取cookie对应的值
            var value = cookie.substring(p + 1);
            // 解码
            value = decodeURIComponent(value);
            cookies[name] = value;
        }
        return cookies;
    }());


    // 将所有的cookie存储到一个数组中
    var keys = [];
    for (var key in cookies) {
        keys.push(key);
    }

    // 定义存储API的公共方法和属性

    // 存储cookie 的个数
    this.length = keys.length;

    // 返回第N个cookie的名字, N越界返回null
    this.key = function(n) {
        if (n < 0 || n >= keys.length) {
            return null;
        }
        return keys[n];
    };

    // 返回指定cookie的名字,如果不存在返回NULL
    this.getItem = function(name) {
        return cookies[name] || null;
    };

    // 存储cookie
    this.setItem = function(key, value) {
        // 如果要存储的cookie还不存在
        if (!(key in cookies)) {
            // 加入数组
            keys.push(key);
            // 长度加一
            this.length++;
        }

        // 将名/值存储到cookies对象中
        cookies[key] = value;

        // 设置cookie
        var cookie = key + "=" + encodeURIComponent(value);
        // 添加 maxage
        if (maxage) {
            cookie += "; max-age=" + maxage;
        }
        // 添加path
        if (path) {
            cookie += "; path=" + path;
        }

        // 设置document.cookie
        document.cookie = cookie;
    };

    // 删除指定的cookie
    this.removeItem = function(key) {
        if (!(key in cookies)) {
            return;
        }

        // 删除内部cookies的指定cookie
        delete cookies[key];

        // 从数组中删除
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === key) {
                keys.splice(i, 1);
                break;
            }
        }
        this.length--;
        // 通过设置有效期为0来删除cookie
        document.cookie = key + "=; max-age=0";
    };

    // 删除所有cookie
    this.clear = function() {
        for (var i = 0; i < keys.length; i++) {
            document.cookie = keys[i] + "=; max-age=0";
        }
        cookies = {};
        keys = [];
        this.length = 0;
    };
}
```



