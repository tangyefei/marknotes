# 1. BFC

文档流分为定位流、浮动流、普通流三种，普通流其实就是FC（formating context）。

常见的FC有：BFC（块级格式化上下文）、IFC（行级格式化上下文），还有GFC（网格布局格式化上下文）和 FFC（自适应格式化上下文）。

BFC可以理解为，满足某些特点的元素，对内部和外部元素会表现出一些特性。就像是拥有了某个开发者不能修改的CSS属性。


满足下列条件之一就可触发BFC

1. 根元素，即HTML元素
2. float的值不为none
3. overflow的值不为visible
4. display的值为inline-block、table-cell、table-caption
5. position的值为absolute或fixed	


BFC布局规则：

1. 内部的Box会在垂直方向，一个接一个地放置。
2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算

BFC的具体应用：

1. 上述规则第四条，float+BFC，可以实现两栏布局
2. 上述规则第六条，BFC(float+float)，父容器能完全包含子元素
3. 上述规则第二条，BFC+BFC不会发生margin重叠
4. 上面的三个应用，其实都体现了上述规则第五条


# 2. link和@import的区别

两者都是外部引用 CSS 的方式，但是存在一定的区别：

1. link是XHTML标签，除了能够加载CSS外的其他类型；而@import只可以加载CSS。
2. link引用CSS时，在页面载入时同时加载；@import需要页面完全载入以后再加载。
3. link是XHTML标签，无兼容问题；@import则是在CSS2.1提出的，低版本的浏览器不支持。
4. link支持使用Javascript控制DOM改变样式；而@import不支持。

# 3. CSS选择符有哪些？哪些属性可以继承？


1. id选择器（ #myid）
2. 类选择器（.myclassname）
3. 标签选择器（div, h1, p）
4. 相邻选择器（h1 + p）
5. 子选择器（ul > li）
6. 后代选择器（li a）
7. 通配符选择器（ * ）
8. 属性选择器（a[rel = "external"]）
9. 伪类选择器（a:hover, li:nth-child）


可继承的样式： font-size font-family color, UL LI DL DD DT;

不可继承的样式：border padding margin width height ;


# 4. CSS优先级算法如何计算？

不同权重的比较规则：

- `!important >  id > class > tag`

同权重的情况下

- 定义最近优先级更高：`style=""` > `<style>` > `link`
- 其中link方式载入的样式，最后载入的为准

 
# 5. CSS3新增伪类有那些？

```
p:first-of-type /*选择属于其父元素的首个 <p> 元素的每个 <p> 元素。*/
p:last-of-type  /*选择属于其父元素的最后 <p> 元素的每个 <p> 元素。*/
p:only-of-type  /*选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。*/
p:only-child    /*选择属于其父元素的唯一子元素的每个 <p> 元素。*/
p:nth-child(2)  /*选择属于其父元素的第二个子元素的每个 <p> 元素。*/

:after          /*在元素之前添加内容,也可以用来做清除浮动。*/
:before         /*在元素之后添加内容*/
:enabled        
:disabled       /*控制表单控件的禁用状态。*/
:checked        /*单选框或复选框被选中。*/
```

# 6. 如何居中div?

1. 水平居中：给div设置一个宽度，然后添加margin:0 auto属性

```
div{
  width:200px;
  margin:0 auto;
 }
```

2. 水平+垂直居中(1)：通过margin-left、margin-top设置为-half width/half height

```
div {
  position: relative;     /* 相对定位或绝对定位均可 */
  width:500px; 
  height:300px;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -250px;      /* 外边距为自身宽高的一半 */
  background-color: pink;     /* 方便看效果 */
 }
 ```
 

 3. 水平+垂直居中(2)：未知容器宽高，使用transform: translate

 ```
 div {
  position: absolute;     /* 相对定位或绝对定位均可 */
  width:500px; 
  height:300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: pink;     /* 方便看效果 */
}
```

3. 水平+垂直居中(3)：flex

```
.container {
  display: flex; 
  align-items: center;        /* 垂直居中 */
  justify-content: center;    /* 水平居中 */
}
.container div {
  width: 100px;
  height: 100px;
  background-color: pink;
}  
```

# Flex布局


[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)


