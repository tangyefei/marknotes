## 5分钟快速使用Analytics

Google Analytics提供了统计应用访问的能力，如下介绍快速使用它来统计网页访问。

### 1. 登陆到Analytics

如果你还没有Google Account，需要先注册，然后就可以sign in到 [google.com/analytics](https://marketingplatform.google.com/about/analytics/) 了。

### 2. 配置Analytics账号

一个账号会对应一个应用配置，你可以配置多个账号，更具体的步骤：

#### 2.1 输入账号名字

![step1-analytics-name](./analytics/1.png)

#### 2.2 输入要统计的应用

![step2-choose-application](./analytics/2.png)

#### 2.3 输入站点的信息：站名、地址、行业

![step3-set-up-props](./analytics/3.png)

#### 2.4 同意服务协议

![step4-agreement](./analytics/4.png)

### 3. 拷贝侦测代码

![copy-script](./analytics/5.png)


下面的代码是配置后生成的，'UA-150902898-1'是根据配置生成的唯一标识。将下卖弄的代码拷贝到网站的`HTML`中的`<head>`标签里，然后发布网站。

```
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-150902898-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-150902898-1');
</script>
```


### 4. 查看统计数据

在设备上访问网站后，在打开Analytics Home就可以看到统计数据了。

![homepage](./analytics/6.png)

