# 第20周技术周报


### 1. Vue-Router对同一个路由不同参数刷新无效的问题


```
{
	name: 'product_manage_view', path: '/product/:id', component: ViewProduct
}

```

假定有如上路由，当我们在 /product/1 页面想跳转到 /product/2单页面的时，发现页面并没有刷新。

通过添加 :key 可以解决

```
<router-view :key="$route.fullPath" class="view-page"></router-view>
```

### 2. 基于v-model封装 ElementUI 的 el-select组件

详情参考 [我的简书](https://www.jianshu.com/p/cba1f210d8a8) 或 [我的博客](http://tangyefei.cn/detail.html?id=7)

### 3. 对事件模型的基本原理做了些整理

详情参考 [我的简书](https://www.jianshu.com/p/4095e3c10bd5) 或 [我的博客](http://tangyefei.cn/detail.html?id=8)











































