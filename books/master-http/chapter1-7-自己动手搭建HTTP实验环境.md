# 7 自己动手搭建HTTP实验环境

**注：所有笔记是在Mac环境下的结果**

本节会用应用软件搭建一个最小化的HTTP实验环境，翻遍后续的学习。

会用到的应用软件介绍如下

- Wireshark 著名的网络抓包工具
- Chrome 浏览器（和wireshark相比是事后诸葛亮）
- Telnet 经典的虚拟终端，可以模拟浏览器的行为，可以将浏览器干扰排除从而从最原始的层面研究HTTP
- OpenResty 基于Nginx的强化包，除了Nginx还有很多有用的功能模块，还集成了Lua简化Nginx的二次开发

## 安装OpenResty

```
brew install openresty/brew/openresty
```

## 下载学习仓库

```
git clone https://github.com/chronolaw/http_study
```

## 下载wireshark

[https://www.wireshark.org/#download](https://www.wireshark.org/#download)

## 运行OpenResty和在Wireshark中查看

### 启动OpenResty

进入到  http_study/www  目录，执行如下命令

```
sh run.sh start
```

打开浏览器 http://localhost/ 即可看到欢迎页面。


### 权限配置

如果访问出现了403，可以通过如下命令查看nginx的执行用户

```
ps aux | grep nginx

nobody        49847   0.0  0.0  4305284    940   ??  S    10:18AM   0:00.01 nginx: cache manager process    
nobody        49846   0.0  0.0  4305648   1272   ??  S    10:18AM   0:00.01 nginx: worker process    
root             49845   0.0  0.0  4305440    668   ??  Ss   10:18AM   0:00.00 nginx: master process /usr/local/bin/openresty -c conf/nginx.conf -p 
```


同样通过在 www/index 目录位置执行 ls -l

```
-rwxr-xr-x  1 yefeitang  staff  362 Feb 23 08:43 50x.html
-rwxr-xr-x  1 yefeitang  staff  334 Feb 23 08:43 index.html
```

结论是拥有访问html资源的权限的用户和组分别是 yefeitang staff，而执行nginx的用户是nobody。

解决办法是在 conf/nginx.conf 文件中头部增加如下行

```
user yefeitang staff;
```

重新启动OpenResty，再次访问即可。


### 抓包配置

为了在Wireshark中抓包，参考下图
**
1. 将using this filter选中图示的选项
2. 在下方的列表选项中，选中Lookback： 1o0

![配置2](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/master-http/wiershark-config.png)

点击左上方的鲨鱼图标，再去浏览器刷新网页，再打开粉色停止图标，就可以看到被抓取的数据了。

![配置2](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/master-http/wireshark-filter.png)

## 本地hosts配置

该配置是为了后续内容准备的。

```
127.0.0.1 www.chronom.com
127.0.0.1 www.metroid.net
127.0.0.1 origin.io
```


