

## 1. Vue中数据变动侦听不到的问题

有一种情况可能略微复杂一点，假定我们有如下数据：

```
{
	list: [{value:1},{value:2},{value:3}],
	item: null,
}

```

进行某些操作以后，用`list `中的某个值给`item`进行赋值，我们可以看到`item.text`生效，界面展示 `TEXT_1`：

```
let item = list[0];
item.text = 'TEXT_' + item.value;
```

但是再想对 item.text 进行修改，是不会同步到界面中的，即如下代码不会让界面同步成 `TEXT_1+`：

```
item.text += '+'
```



详情分析参考我的 [简书](https://www.jianshu.com/p/adab9ca90956) 或 [博客](http://tangyefei.cn/detail.html?id=11)




## 2. 网站登出后，浏览器回退Ajax请求仍旧为200

缓存分为 强缓存 和 协商缓存，详细介绍[参考这里](https://github.com/amandakelake/blog/issues/41)：

- 当 Cache-Control 和 Expires 符合条件，会使用强缓存，返回200，from dist cache 或 from memory cache

- 当 Last-Modified，If-Modified-Since 和 ETag、If-None-Match 符合条件，会出现304 Not Modified。

发现项目中的其他资源，比如图片、js都会符合上述的几种缓存情况，因为Web服务器，会帮我们应用缓存的各种策略。但是项目中的Ajax请求是调用的后端接口，响应头部并没有设置过跟缓存相关的头部，因此缓存基本属于浏览器的行为：

[prevent-chrome-from-caching-ajax-requests](https://stackoverflow.com/questions/11463637/prevent-chrome-from-caching-ajax-requests) 提到了两种解决办法：


（1） GET请求才进行浏览器缓存，可以考虑将请求改为POST

（2） 通过在请求地址上加上时间戳  `'?_=' + (new Date()).getTime()`


显然第一种方式需要后端配合略麻烦，直接其使用第二种方式，全局的axios拦截中给GET请求添加下即可。

## 3. 虚拟机上安装Windows10用于测试Edge浏览器

流行的虚拟机 有VirtualBox， VMWare Fusion，Parallels Desktop，想安装Edge浏览器用于调试页面，发现不论怎么试都不成功，本来下载速度就感人，各种下载试错。

最终发现是因为下载的 Windows 10的image有问题，正确的姿势应该是 [从官网下载纯净的 iso image](http://down1.xitongwanjia.com/Windows10_64_.2019.iso
)，这样才能被虚拟机正确识别。

## 4. Flutter的Hello World

在Mac上用模拟器来运行 Android 和 iOS 上的 HelloWorld，参考我的  [简书](https://www.jianshu.com/p/73339c1a1b62)  或 [个人博客](http://tangyefei.cn/detail.html?id=12)



