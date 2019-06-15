
bysoftchina tips


1.对图片导航中的dots点击列表,可以应用如下样式。故事是这样的：

`text-align:center;`使居中。 

`bottom: 20px;position: absolute;`使位置居于底部，但也导致了ol从block到inline的变化。

`left: 0;right: 0;`重新让元素变成100%的宽度，从而达到满意的效果。


```
ol {
	text-align:center;
	bottom: 20px;
	position: absolute;
	left: 0;
   	right: 0;
}
	
ol li {
	display: inline-block;
	width: 10px;
	height: 10px;
}
```