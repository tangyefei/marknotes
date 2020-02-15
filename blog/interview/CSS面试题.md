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



# 7.`CSS3`有哪些新特性？

新增各种`CSS`选择器，比如  `:not(.input)`<br/>
圆角           `border-radius:8px`<br/>
多列布局       `multi-column`<br/>
阴影和反射     `shadow\reflect`<br/>
文字特效       `text-shadow`<br/>
文字渲染       `text-decoration`<br/>
线性渐变       `gradient`<br/>
旋转          `transform`<br/>
缩放,定位,倾斜,动画,多背景<br/>

# 8.为什么要初始化`CSS`样式？
因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对`CSS`初始化往往会出现浏览器之间的页面显示差异。

当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。

# 9.盒子模型
盒子模型包括`content+padding+border+margin`<br/>
标准盒子模型：宽度=内容的宽度（`content`）即默认模型：`content-box`<br/>
低版本IE盒子模型：宽度=`content+border+padding`即`border-box`<br/>
一般都设置为`boxsizing:border-box;`<br/>

# 9.弹性盒模型`flex`

`CSS3`弹性盒（`Flexible Box` 或 `flexbox`），是一种当页面需要适应不同的屏幕大小以及设备类型时确保元素拥有恰当的行为的布局方式。设为 `Flex` 布局以后，子元素的`float、clear`和`vertical-align`属性将失效。<br/>
弹性盒子由弹性容器`Flex container`和弹性子元素`Flex item`组成。<br/>
弹性容器通过设置`display`属性的值为`flex`或`inline-flex`将其定义为弹性容器。<br/>

属性 | 描述 | 取值
-|-
`flex-direction` | 指定弹性容器中子元素排列方式 | `row`<br/>`row-reverse`<br/>`column`<br/>`column-reverse`
`flex-wrap` | 设置弹性盒子的子元素超出父容器时是否换行 | `nowrap`<br/>`wrap`<br/>`wrap-reverse`
`flex-flow` | `flex-direction`属性和`flex-wrap`属性的简写形式 | 默认为`row nowrap`
`justify-content` | 设置弹性盒子元素在主轴（横轴）方向上的对齐方式 | `flex-start`<br/>`flex-end`<br/>`center`<br/>`space-between`<br/>`space-around`
`align-items` | 设置弹性盒子元素在侧轴（纵轴）方向上的对齐方式 | `flex-start`<br/>`flex-end`<br/>`center`<br/>`baseline `<br/>`stretch`
`align-content` | 属性定义了多根轴线的对齐方式 | `flex-start`<br/>`flex-end`<br/>`center`<br/>`space-between`<br/>`space-around`<br/>`stretch`

设置在项目`item`上的属性

属性 | 描述 | 取值
-|-
`order` | 属性定义项目的排列顺序,数值越小，排列越靠前 | 默认为`0`
`flex-grow` | 定义项目的放大比例 | 默认为`0`<br/>(存在剩余空间，也不放大)
`flex-shrink` | 定义了项目的缩小比例 | 默认为`1`<br/>(如果空间不足，该项目将缩小)
`flex-basis` | 定义了在分配多余空间之前，项目占据的主轴空间 | 默认值是`auto`
`flex` | `flex-grow`、`flex-shrink`和`flex-basis`的简写 | 默认值`0 1 auto`<br/>后两个属性可选
`align-self` | 允许单个项目有与其他项目不一样的对齐方式,align-items | 默认值`auto`

# 10.`display:none`与`visibility:hidden`



`display: none`

- 隐藏后的元素不占据任何空间

`visibility: hidden`

- 隐藏后的元素空间依旧保留
- 子元素会继承这个属性，重新给子元素设置`visibility:visible`,则子元素又会显示出来

# 11. 清除浮动


什么要浮动，什么时候需要清除浮动，清除浮动都有哪些方法

使用浮动之后，父元素的高度会塌陷，变成0，导致布局有问题，这个时候需要清除浮动。

```css
.clear-fix:after {
  display:block;
  clear:both;
  content:"";
  visibility:hidden;
  height:0
}
.clear-fix:after {
  content: '';
  display: table;
  clear: both;
}
```

# 12.`css`三角形
```css

.triangle-up {
  width: 0;
  height: 0;
  border-bottom: 50px solid red;
  border-left: 50px solid #FFF;
  border-right: 50px solid #FFF;
  border-top: 50px solid #FFF;
} 
.triangle-down {
  width: 0;
  height: 0;
  border-bottom: 50px solid #FFF;
  border-left: 50px solid #FFF;
  border-right: 50px solid #FFF;
  border-top: 50px solid red;
} ```
# 13. `rgba`和`opacity`的透明有何不同？

### opacity

会影响到元素到background、color，并且被继承。下面例子中，背景色和字体（本来默认是黑色的），连同`.child`，都是灰色的。

```
.opacity {
	background: #000;
	opacity:0.5;
}
  
<div class="opacity">
	opacity parent
	<div class="child">child</div>
</div>
```  


### rgba

被用于设置背景颜色，它不会影响color，不会被子继承。下面的例子中，背景色灰色，字体黑色，`.chlid`全然不受影响，背景色是完完整整的红。


```
.rgba {
	background-color: rgba(0,0,0, .5);
}
.rgba .child{
	background: red;
}

<div class="rgba">
	rgba  parent
	<div class="child">
	  child
	</div>
</div>
```

![vs](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/blogs/rgba-vs-opacity.png)

注：图中opacity本是看不到的，能看见是因为用光标选中了文字区域。

# 13. 怎么让浏览器支持小于`12px`的文字

```css
tranform: scale()
```

# 14. 尽可能多的方法隐藏一个`html`元素

```css
opacity: 0;
display: none;
visibility: hidden;

width: 0;
height: 0;

<input type="hidden" name="看不见我">
```

# 15. `less`等预处理器好处

能够更快速的编写代码 结构清晰，便于维护

文件切分、模块化、选择符嵌套、变量、运算、函数、`Mixin` 工程化<br/>


# 16. 分析比较多种隐藏元素的优劣和适用场景


`display: none` (不占空间，不能点击)；场景，显示出原来这里不存在的结构<br>

`visibility: hidden`（占据空间，不能点击）；场景：显示不会导致页面结构发生变动，不会撑开）<br>

`opacity: 0`（占据空间，可以点击）；场景：可以跟`transition`搭配做过渡效果


# 17. 修改代码

已知如下代码，如何修改才能让图片宽度为 `300px` ？注意下面代码不可修改。

```html
<img src="1.jpg" style="width:480px!important;”>
```
```html
<img src="1.jpg" style="width:480px!important; max-width: 300px">
<img src="1.jpg" style="width:480px!important; transform: scale(0.625, 1);" >
<img src="1.jpg" style="width:480px!important; width:300px!important;">
```
# 18.`transform`、`animation`和`transiton`

**transform**<br>

**2D transform变换方法**<br>
`translate(x, y)`方法，根据左(`X`轴)和顶部(`Y`轴)位置给定的参数，从当前元素位置移动。`x`, `y`的值可以取正负，分别表示表示向不同的方向偏移。<br>
`rotate(angle)`方法， 表示旋转`angle`角度。`angle`为正时，按顺时针角度旋转，为负值时，元素逆时针旋转。<br>
`scale(x, y)`方法，表示元素在`x`轴和`y`轴上的缩放比例，参数大于`1`时，元素放大，小于`1`时，元素缩小。<br>
`skew(x-angle,y-angle)`方法，用来对元素进行扭曲变行，第一个参数是水平方向扭曲角度，第二个参数是垂直方向扭曲角度。其中第二个参数是可选参数，如果没有设置第二个参数，那么`Y`轴为`0deg`<br>
`matrix(n,n,n,n,n,n)`方法， 以一个含六值的变换矩阵的形式指定一个`2D`变换，此属性值使用涉及到数学中的矩阵<br>
**transform-origin 属性**<br>
`transform`的方法都是基于元素的中心来变换的，也就是元素变换的基点默认是元素的中心。<br>

**transition**
`transition`允许`css`的属性值在一定的时间区间内平滑地过渡。这种效果可以在鼠标单击、获得焦点、被点击或对元素任何改变中触发，并圆滑地以动画效果改变`CSS`的属性值。<br>
`transition`属性的值包括以下四个：<br>
`transition-property`: 指定对`HTML`元素的哪个`css`属性进行过渡渐变处理，这个属性可以是`color、width、height`等各种标准的`css`属性。<br>
`transition-duration`：指定属性过渡的持续时间<br>
`transition-timing-function`: 指定渐变的速度(`linear, ease, ease-out, ease-in, ease-in-out`)等<br>
`transition-delay`：指定延迟时间<br>

**animation**<br>
要使用`animation`动画，先要熟悉一下`keyframes`,`Keyframes`的语法规则:命名是由”`@keyframes`”开头，后面紧接着是这个“动画的名称”加上一对花括号“{}”，括号中就是一些不同时间段样式规则。不同关键帧是通过`from`（相当于`0%`）、to（相当于`100%`）或百分比来表示（为了得到最佳的浏览器支持，建议使用百分比）<br>
`animation-name`: 动画名称<br>
`animation-duration`: 一个动画周期花费的时间<br>
`animation-timing-function`: `linear, ease, ease-out, ease-in, ease-in-out`等<br>
`animation-delay`: 规定延时<br>
`animation-iteration-count`: 动画播放次数<br>
`animation-direction`: 是否在下一周期逆向播放 `normal, reverse, alternate`等<br>

**区别：**<br>
`Transform`：对元素进行变形；<br>
`Transition`：对元素某个属性或多个属性的变化，进行控制（时间等），类似flash的补间动画。但只有两个关键贞。开始，结束。<br>
`Animation`：对元素某个属性或多个属性的变化，进行控制（时间等），类似`flash`的补间动画。可以设置多个关键贞。<br>
 
`Transition`与`Animation`:<br>
`transition`需要触发一个事件 ,而`animation`在不需要触发任何事件的情况下也可以显式的随着时间变化来改变元 素`css`的属性值，从而达到一种动画的效果。<br>
# 19. 相邻的两个`inline-block`节点出现间隔

它的原因以及解决方法


元素被当成行内元素排版的时候，原来`HTML`代码中的回车换行被转成一个空白符，在字体不为`0`的情况下，空白符占据一定宽度，所以`inline-block`的元素之间就出现了空隙。<br>
解决方法：<br>
1、给父级元素设置`font-size： 0`；子元素设置相应的`font-size`<br>
2、改变书写方式，元素间留白间距出现的原因就是标签段之间的空格，因此，去掉`HTML`中的空格，自然间距就消失了<br>
3、`margin`负值<br>
4、设置父元素，`display:table`和`word-spacing`<br>

# 20.`viewport`

`viewport`指视口，浏览器上(或一个`app`中的`webview`)显示网页的区域。`PC`端的视口是浏览器窗口区域，而移动端的则存在三个不同的视口：<br>
`layout viewport`：布局视口<br>
`visual viewport`：视觉视口<br>
`ideal viewport`：理想视口<br>

`layout viewport` 布局视口:在`PC`端的网页的`layout viewport`即浏览器页面显示的整个区域，也可以理解成网页的绘制区域。而在移动端由于其屏幕较小，无法全部显示PC端页面的全部内容，所以默认情况下(不用`<meta name="viewport">`去控制)，移动端会指定一个大于其浏览器显示区域`layout viewport`，一般是`980px`;<br>

 `visual viewport` 视觉视口: `visual viewport`，顾名思义指浏览器可视区域，即我们在移动端设备上看到的区域

 `ideal viewport` 理想视口: 理想视口，即页面绘制区域可以完美适配设备宽度的视口大小，不需要出现滚动条即可正常查看网站的所有内容，且文字图片清晰，如所有`iphone`的理想视口宽度都为`320px`，安卓设备的理想视口有`320px、360px`等等。
```html
 <meta name="viewport" content="width=width-device,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">	
```
` width`: `width`用来设置`layout viewport`的宽度，即页面具体绘制区域的宽度，在不使用`<meta>`进行控制视口时，以`iphone`为例，其会设置视口宽度为`980px`。<br>
另外`width`可设置为`width-device`字符串，表示设置视口宽度为设备的`ideal viewport`，如在`iphone`上为`320px`。

`initial-scale`: 指页面初始的缩放值，其值可以通过如下公式进行计算<br>
```js
initial-scale = ideal viewport / visual viewport
```
# 21. 实现效果

`A`元素垂直居中,`A`元素距离屏幕左右各边各`10px`,`A`元素里的文字`font—size:20px`,水平垂直居中,`A`元素的高度始终是`A`元素宽度的`50%`

```html
<div class="box">
  <div class="Abox">我是居中元素</div>
</div>
```
```css
* {
  margin: 0;
  padding: 0;
}
html, body {
  width: 100%;
  height: 100%;
}
.box {
  position: relative;
  background: red;
  width: 100%;
  height: 100%;
}
.Abox {
  position: absolute;
  margin-left: 10px;
  width: calc(100vw - 20px);
  height: calc(50vw - 10px);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: yellow;
}

```
# 22. 层？重绘？回流和重布局？图层重组？
首先要了解`CSS`的图层的概念（`Chrome`浏览器）<br>
浏览器在渲染一个页面时，会将页面分为很多个图层，图层有大有小，每个图层上有一个或多个节点。在渲染`DOM`的时候，浏览器所做的工作实际上是：<br>
1、计算需要被加载到节点上的样式结果（`Recalculate style`--样式重计算）<br>
2、为每个节点生成图形和位置（`Layout`--回流和重布局）<br>
3、将每个节点填充到图层中（`Paint Setup`和`Paint`--重绘）<br>
4、组合图层到页面上（`Composite Layers`--图层重组）<br>
**触发重布局的属性**<br>
盒子模型相关属性会触发重布局：<br>
* width
* height
* padding
* margin
* display
* border-width
* border
* min-height

定位属性及浮动也会触发重布局：
* top
* bottom
* left
* right
* position
* float
* clear

改变节点内部文字结构也会触发重布局：
* text-align
* overflow-y
* font-weight
* overflow
* font-family
* line-height
* vertival-align
* white-space
* font-size

这么多常用属性都会触发重布局，可以看到，他们的特点就是可能修改整个节点的大小或位置，所以会触发重布局

**触发重绘的属性**<br>
修改时只触发重绘的属性有：<br>
* color
* border-style
* border-radius
* visibility
* text-decoration
* background
* background-image
* background-position
* background-repeat
* background-size
* outline-color
* outline
* outline-style
* outline-width
* box-shadow

`opacity`不会触发重绘。`translate`这个不会触发重布局。
# 23. `space-between`和`space-around`的区别？
这个是`flex`布局的内容，其实就是一个边距的区别，按水平布局来说，`space-between`在左右两侧没有边距，而`space-around`在左右两侧会留下边距，垂直布局同理。

# 24. 三栏布局
三栏布局是很常见的一种页面布局方式。左右固定，中间自适应。实现方式有很多种方法。<br>
**第一种：flex**<br>
```html
<div class="container">
    <div class="left">left</div>
    <div class="main">main</div>
    <div class="right">right</div>
</div>
```
```css
.container{
    display: flex;
}
.left{
    flex-basis:200px;
    background: green;
}
.main{
    flex: 1;
    background: red;
}
.right{
    flex-basis:200px;
    background: green;
}
```
**第二种：position + margin**
```html
<div class="container">
    <div class="left">left</div>
    <div class="right">right</div>
    <div class="main">main</div>
</div>
```
```css
body,html{
    padding: 0;
    margin: 0;
}
.left,.right{
    position: absolute;
    top: 0;
    background: red;
}
.left{
    left: 0;
    width: 200px;
}
.right{
    right: 0;
    width: 200px;
}
.main{
    margin: 0 200px ;
    background: green;
}
```
**第三种：float + margin**
```html
<div class="container">
    <div class="left">left</div>
    <div class="right">right</div>
    <div class="main">main</div>
</div>
```
```css
body,html{
    padding:0;
    margin: 0;
}
.left{
    float:left;
    width:200px;
    background:red;
}
.main{
    margin:0 200px;
    background: green;
}
.right{
    float:right;
    width:200px;
    background:red;
}
```
# 25.如何实现一个自适应的正方形
```css
.square {
    width: 10vw;
    height: 10vw;
    background: red;
}
```
# 26.用 `css` 或 `js` 实现多行文本溢出省略效果

注：需要考虑兼容性

```css
/* 单行： */
.cls {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
/* 多行： */
.cls {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
/* 兼容： */
p{position: relative; line-height: 20px; max-height: 40px;overflow: hidden;}
p::after{content: "..."; position: absolute; bottom: 0; right: 0; padding-left: 40px;
background: -webkit-linear-gradient(left, transparent, #fff 55%);
background: -o-linear-gradient(right, transparent, #fff 55%);
background: -moz-linear-gradient(right, transparent, #fff 55%);
background: linear-gradient(to right, transparent, #fff 55%);
```

# 27.兄弟元素怎么让它们以高的那个元素为标准等高
```html
<div class="box">
  <div class="left">asdfads</div>
  <div class="right">asdfasd<br>asdfad<br>adfasdfa<br>asfdas</div>
</div>
```
```css
/* flex布局默认的align-items属性的值为stretch，所以默认是撑开的 */
.box {
  display: flex;
}
.left,.right {
  margin: 0 20px;
  background: red;
}
/* table table-cell */
.box {
  display: flex;
  border-spacing: 20px;
}
.left,.right {
  display: table-cell;
  background: red;
}
```
# 28.如何实现一个最大的正方形
```css
 section {
  width:100%;
  padding-bottom: 100%;
  background: #333;
}
```
# 29.`css`的解析顺序
`css` 选择器匹配元素是逆向解析<br>

- 因为所有样式规则可能数量很大，而且绝大多数不会匹配到当前的 `DOM` 元素（因为数量很大所以一般会建立规则索引树），所以有一个快速的方法来判断「这个 `selector` 不匹配当前元素」就是极其重要的。<br>

- 如果正向解析，例如「`div div p em」`，我们首先就要检查当前元素到 `html` 的整条路径，找到最上层的 `div`，再往下找，如果遇到不匹配就必须回到最上层那个 `div`，往下再去匹配选择器中的第一个 `div`，回溯若干次才能确定匹配与否，效率很低。<br>

- 逆向匹配则不同，如果当前的 `DOM` 元素是 `div`，而不是 `selector` 最后的 `em`，那只要一步就能排除。只有在匹配时，才会不断向上找父节点进行验证。

# 30. 如何解决移动端 `Retina` 屏 `1px` 像素问题

```css
viewport + rem
background-image
scale
border-image
box-shadow
```













