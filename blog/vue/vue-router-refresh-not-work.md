
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
