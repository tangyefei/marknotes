1. wx.login(res => res.code) 获取code作为用户标识

2. @getphonenumber="getPhoneNumber" 中可以获取到 iv 和 encryptedData

 code: res.code,
              iv: e.mp.detail.iv,
              encryptedData: e.mp.detail.encryptedData,

3. 将code、iv 和 encryptedData交给后端，后端结合小程序的session_key 以及 app_id可以后去到具体的用户信息，如下为实际返回的结构（后端组装）:

	```
custId : 532982
custName : "测试"
mobile : "18521512434"
openId : "oy3_N4r7NhcugX--G_fQOZ98AQTY"
token : "67c885f943c7ad39ace05323a61854a3"
```

4. onShow, onHide, onLoad, mounted

执行顺序是，onLoad，onShow, mounted

通过返回的并不会触发一个面板的onHide？那什么时候会触发？

5. 页面的跳转放阿飞6

通过插件看到的视图栈最多有10层，关联的操作方法有：

reLaunch：关闭所有页面，打开到应用内的某个页面
redirectTo：关闭当前页面，跳转到应用内的某个页面。
navigateTo：保留当前页面，跳转到应用内的某个页面
navigateBack：关闭当前页面，返回上一页面或多级页面



6. 可以考虑到没有登录权限的时候，也不做跳转，直接吞掉即可?
