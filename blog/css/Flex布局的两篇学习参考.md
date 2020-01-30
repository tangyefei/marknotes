

## Flex布局的两篇学习参考

阮一峰的两篇文章基本讲透了Flex的用法，看完后能熟练地将第二篇中的练习手动实现，理解的就差不多了。

- [阮一峰 Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [阮一峰 Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

### 2020年1月30日复习后更新

如果陌生了，只需要把第一篇box和item的6个属性含义简单记忆一下，然后自己写一些第二篇的实际应用即可。也可以在marknotes/blog/_sample/css-flex-pratise.html中查看自己写过的代码。


个自己理解有误的地方：

#### 1. 下面例子中使用justify-content而非flex-wrap

![混用了flex-wrap和juastify-content](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071315.png)

#### 2. flex-wrap:wrap导致换行后flex:1无效，要使用flex-basis

![flex-wrap导致换行后flex:1无效要使用flex-basis](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071319.png)

#### 3. 网页布局的例子，设置order值可以将元素不按dom位置排布

![网页布局的例子，order值得可以将元素的排布位置进行调整](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071323.png)

#### 4. 面试被考察到的一个问题：如何让footer始终固定在底部哪怕内容区很矮

![面试被考察到的一个问题：如何让footer始终固定在底部哪怕内容区很矮](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071326.png)

具体用法即容器高度 min-height:100vh，内容区域 flex:1，剩下的就是footer的高度占据在容器底部了。