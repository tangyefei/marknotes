# 使用CSS实现三角形


## case1

下图图为项目中的一个设计，需要实现下拉框中有带边框的三角形。 

![design](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/blogs/css/css-triangle-design.png)

解决思路是，通过提供两个三角形，其中一个背景为边框颜色，另外一个为内容区域颜色，后者覆盖前者，从而产生三角边框的效果。

如下为代码 

```
<div class="popover">
  <div class="triangle bottom-triangle"></div>
  <div class="triangle top-triangle"></div>
  车辆管理
</div>
<style>
  body {
    background: #34425D;
  }
  .popover{
    padding: 10px 24px;
    color: #FFF;
    width: 200px;
    background: #11172D;
    border: 1px solid #3DFEEA;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    position: relative;
    /* width:300px; padding:30px 20px; border:5px solid #beceeb; position:relative; */
  }
  .triangle {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
  }
  .bottom-triangle {
    left: 40px;
    border-width: 6px;
    top: -12px;
    border-color: transparent transparent #3DFEEA transparent;
  }
  .top-triangle {
    left: 41px;
    border-width: 5px;
    top:-9px;
    border-color: transparent transparent #11172D transparent;
  }
</style>
```

可以通过 [https://codepen.io/Yefei/pen/gOYyeGO](https://codepen.io/Yefei/pen/gOYyeGO) 编辑和查看效果。



## case2

假定要实现只带border的三角形，用于指示箭头(形如`^`)，实现方式如下

```
.icon::before {
  content: ' ';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-left: 1px solid #00B4CF;
  border-top: 1px solid #00B4CF;
  transform: rotate(45deg);
  background: #FFF;
}
```