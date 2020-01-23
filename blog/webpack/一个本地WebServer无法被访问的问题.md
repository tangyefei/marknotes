## 2. 本地web server无法被访问到

### a. 问题

webpack-dev-server启动的项目，无法被同一局域网的另一台电脑访问到（虚拟机上的浏览器）。

### b. 解决

能成功 ping 通对应的 ip 地址，并且用其他工具起来的 web server 是可以访问的，说明自己的 webpack 的配置有问题，参考 [stackoverflow：how-to-get-access-to-webpack-dev-server-from-devices-in-local-network](https://stackoverflow.com/questions/35412137/how-to-get-access-to-webpack-dev-server-from-devices-in-local-network) 知道启动的时候需要指定为 ` --host 0.0.0.0`，即在`pacakge.json`修改为如下命令即可：

```
"start": "cross-env NODE_ENV=dev webpack-dev-server --config webpack.dev.js --host 0.0.0.0 --open",
```