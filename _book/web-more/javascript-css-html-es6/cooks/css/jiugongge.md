> 题目：要求用CSS实现一个九宫格，边框颜色为5px gray，悬浮在其中一个九宫格的时候边框颜色变红色


- 知识：float的用法，margin的小技巧

- 提示：使用marin可以为负数来解决相邻的element的border为10px的问题

- 源码：

```
<!-- css -->
.container {
  width: 300px;
  height: 300px;
}
.box {
  display: flex;
  flex-wrap: wrap;
}
.unit {
  width: 100px;
  height: 100px;
  border: 5px solid gray;
  box-sizing: border-box;
  margin: -5px 0 0 -5px;
}
.unit:hover {
  border-color: red;
  z-index: 2;
}
```

```
<!-- html -->
<div class="container">
  <div class="box">
    <div class="unit"></div>
    <div class="unit"></div>
    <div class="unit"></div>
    <div class="unit"></div>
    <div class="unit"></div>
    <div class="unit"></div>
    <div class="unit"></div>
    <div class="unit"></div>
    <div class="unit"></div>
  </div>
</div>
```