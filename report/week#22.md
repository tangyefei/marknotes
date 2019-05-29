
## 1. for...of VS for...in的用法

for...of是用于遍历实现了Iterator接口的元素

for...in访问的是对象属性，如果是数组（特殊的对象）则是访问的数组下标

## 2. postman vs chrome直接访问的区别

**问题**

想通过GET请求一个通用的json当做字典，请求域名会不同，在Chrome下报错：

`No 'Access-Control-Allow-Origin' header is present on the requested resource.`

**分析**

接口方法和头部字段都符合简单请求的要求，因此不会通过OPTIONS询问后端。

但在postman下是可以请求到的，因此怀疑是否自己的参数不对，最后通过实验可以得出结论：

想在浏览器端访问，后端必须配置 Access-Control的若干头部字段，在postman中可以请求到，而在Chrome中报错是因为：数据已经到达了浏览器，但是被浏览器给block了。

## 3. vue keep-alive的应用


![keep-alive](./22/keep-alive.png)

项目中自己手动实现了多页签，每次切换页签的时候通过 `$router.push` 来更改 `router-view` 渲染的component。

问题在于，每次切换tab都会导致component重新渲染，查询文档知道`keep-alive`可以将打开过的component缓存起来，并制定最多可以缓存的组件个数，只需要像如下方式进行包裹即可：

```
<keep-alive>
	<router-view :key="$route.fullPath" class="view-page"></router-view>
</keep-alive>
```

原理大概是在内存中缓存了

参考：

- 官方文档：[https://cn.vuejs.org/v2/guide/components-dynamic-async.html](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)

- 使用介绍：[http://blog.myweb.kim/vue/keep-alive/?utm-source=segmentfault](http://blog.myweb.kim/vue/keep-alive/?utm-source=segmentfault)

- 原理分析：[https://juejin.im/post/5cce49036fb9a031eb58a8f9](https://juejin.im/post/5cce49036fb9a031eb58a8f9)