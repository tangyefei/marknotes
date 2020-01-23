
## 5. XMLHttpRequest的timeout

XMLHttpRequest对象提供了方法 abort 来取消请求，onabort 可以别用来监听请求的取消。它仅仅被用来取消客户端的请求，服务端已经收到请求了还是会继续自己的操作的。页面跳转的时候，ajax请求也会自动abort。

timeout的值是XMLHttpRequest中支持的设置，在达到设置的时间后，会abort掉发送的请求，

客户端的timeout设置要区分于服务器端的timeout设置，客户端timeout通常是自己的error会被抛出，而服务端的超时则会返回status 503。

关于封装的Ajax库如何实现timeout，自己想到的两个思路：
- 使用 timeout ontimeout的方式
- 手动 setTimeout，到时间的时候自己去做 abort
