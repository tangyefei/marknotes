## inline-block的元素塌陷问题


### a. 问题

看效果图，然后有这样的疑问为什么`some remark`部分会错位（当然可以用vertical-align的方式解决，但这里尝试解答为什么会错位的问题）：

![downward](18/inline-block-downward.png)

CSS代码：

```
<style>
  .stage {
    display: inline-block;
    border: 1px solid red;
    border-radius: 5px;
  } 
  .stage.reason {
    height: 50px;
    background: #ccc;
  } 
</style>
```

HTML代码：

```
<div class="flow">
  <div class="stage">
    <div class="mark">First</div>
    <div class="desc">desc</div>
    <div class="date">2019-08-08</div>
  </div>
  <div class="stage">
    <div class="mark">Second</div>
    <div class="desc">desc</div>
    <div class="date">2019-08-08</div>
  </div>
  <div class="stage reason">
      some remark
    </div>
</div>
```

### b. 分析


[why-is-this-inline-block-element-pushed-downward](https://stackoverflow.com/questions/9273016/why-is-this-inline-block-element-pushed-downward) 是另外一个例子，但又非常通俗地介绍了 baseline、以及inline-block元素如何确定它的baseline，基本可以回答上述问题：

（1）baseline是文字对齐的基准，在div中的多个inline-block也会有一条通用的baseline，部分字母如'fgjpq`的的部分内容是下沉到baseline以下的。

（2）如果block的元素包含inline-block的元素，inline-block的overflow属性值为visible（默认就是），那么inline-block的baseline会成为block元素的baseline

（3）在例子中第三个div的baseline跟前两个是一样的，因此文字底部是对齐的，设置了高度后朝下撑开后形成了错位（至于为什么不是向上撑开是其他问题了）。可以尝试在第三个div中输入两行文字，可以看到文字第二行跟前面div的底部是对齐的。

（4）另外，之所以提到 overflow: visible，是因为其他情况下inline-block的底部如果有margin，margin会被加在baseline之上，跟相邻的inline-block还是会出现视觉上的错位。
