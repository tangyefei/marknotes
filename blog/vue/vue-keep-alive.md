
## 3. vue keep-alive的应用


![keep-alive](./22/keep-alive.png)

项目中自己手动实现了多页签，每次切换页签的时候通过 `$router.push` 来更改 `router-view` 渲染的component。

问题在于，每次切换tab都会导致component重新渲染，查询文档知道`keep-alive`可以将打开过的component缓存起来，并制定最多可以缓存的组件个数，只需要像如下方式进行包裹即可：

```
<keep-alive>
	<router-view :key="$route.fullPath" class="view-page"></router-view>
</keep-alive>
```

原理大概是在内存中缓存了，另外再实际使用中又遇到了一些问题：

（1）组件的表单中提交成功过后，仍旧替我们缓存了填写过的数据。应对是手动清楚数据。
（2）在一些交互性的输入框中，也缓存了我们输入过的数据。能想到的在组件提供个钩子中数据重置。

实际使用中，会遇到一些问题，比如：

（1）我们希望缓存的组件个数有所限制，keep-alive提供了max属性可以用于控制
（2）我们能自主决定删掉某个组件的缓存，在自己模拟实现了多页签的时候尤其有用，发现可以拿到缓存的对象，然后进行手动删除，详见下面的 `手动清除keep-alive缓存`
参考：

- 官方文档：[https://cn.vuejs.org/v2/guide/components-dynamic-async.html](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)

- 使用介绍：[http://blog.myweb.kim/vue/keep-alive/?utm-source=segmentfault](http://blog.myweb.kim/vue/keep-alive/?utm-source=segmentfault)

- 原理分析：[https://juejin.im/post/5cce49036fb9a031eb58a8f9](https://juejin.im/post/5cce49036fb9a031eb58a8f9)

- 手动清除keep-alive缓存：[https://wanyaxing.com/blog/20180723114341.html](https://wanyaxing.com/blog/20180723114341.html)
