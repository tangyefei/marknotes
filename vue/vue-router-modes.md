# Vue-Router中的两种模式比较


## Hash


浏览器的hash值（`#hash`）变化并不会导致页面刷新，通过 window.onhashchange 可以侦听到hash的变化，在处理函数中对视图进行更新即可。

## History

使用`history API`进行状态管理，同样不会导致页面进行刷新，只是操作`history`维护的数据。使用的方法有 `pushState`、`repalceState`、`back`、`forward`、 `go`等，其中一些方法的操作会触发popstate事件，利用事件来处理视图的更新即可。

该种方式配置的请求到后端会被当做404，因此需要在服务端进行配置，将符合某种规则的地址都直接导向到我们的SPA的入口文件。

## 特点

pushState可以在完全相同的url中保存多个state，而hash只能在hash变化的时候才生成一条
pushState可以为每个state关联复杂的数据，而hash值只有一个字符结构可用
pushState需要后台支持，hash则可以直接前端使用


## 参考资料

[https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations)

[https://developer.mozilla.org/zh-CN/docs/Web/API/History_API](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)