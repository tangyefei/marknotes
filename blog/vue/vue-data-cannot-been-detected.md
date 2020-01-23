## 1. Vue中数据变动侦听不到的问题

有一种情况可能略微复杂一点，假定我们有如下数据：

```
{
	list: [{value:1},{value:2},{value:3}],
	item: null,
}

```

进行某些操作以后，用`list `中的某个值给`item`进行赋值，我们可以看到`item.text`生效，界面展示 `TEXT_1`：

```
let item = list[0];
item.text = 'TEXT_' + item.value;
```

但是再想对 item.text 进行修改，是不会同步到界面中的，即如下代码不会让界面同步成 `TEXT_1+`：

```
item.text += '+'
```



详情分析参考我的 [简书](https://www.jianshu.com/p/adab9ca90956) 或 [博客](http://tangyefei.cn/detail.html?id=11)


