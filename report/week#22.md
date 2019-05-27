
## 1. for...of VS for...in的用法

for...of是用于遍历实现了Iterator接口的元素

for...in访问的是对象属性，如果是数组（特殊的对象）则是访问的数组下标

## 2. postman vs chrome直接访问的区别

**问题**

想通过GET请求一个通用的json当做字典，请求域名会不同，在Chrome下报错：

`No 'Access-Control-Allow-Origin' header is present on the requested resource.`

**分析**

接口方法和头部字段都符合简单请求的要求，因此不会通过OPTIONS询问后端。

但在postman下是可以请求到的，因此怀疑是否自己的参数不对，最后通过实验可以得出结论：

想在浏览器端访问，后端必须配置 Access-Control的若干头部字段，在postman中可以请求到，而在Chrome中报错是因为：数据已经到达了浏览器，但是被浏览器给block了。

