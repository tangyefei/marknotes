
## 6. 修改hosts文件解决跨域调用

Mac环境下使用Chrome浏览器，想在本地调用钉钉的登陆接口，会出现 redirect_uri 不允许的问题。因为在钉钉内部注册的应用，只能配置一个允许redirect的地址，假定地址是 local-erp.tbsite.net，可以通过修改本地 /etc/hosts 配置文件解决该问题：


```
127.0.0.1       local-erp.tbsite.net
```

