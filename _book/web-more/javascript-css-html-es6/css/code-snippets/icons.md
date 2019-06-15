
## CSS实现朝左的尖角符号

```
.icon-back::before {
	content: "";
	display: inline-block;
	width: 10px;
	height: 10px;
	vertical-align: middle;
	border-left: 2px solid #fff;
	border-bottom: 2px solid #fff;
	-webkit-transform: rotate(45deg);
	transform: rotate(45deg);
	box-sizing: border-box;
}
```


- 扩展：为什么符号的宽高是14.14px？
	- 答：(12-2)*1.414=11.14px (其中1.414是根号2的值，因为翻转了45度角）

- 扩展：为什么-webkit-transform在Chrome下是有中划线显示不可用的？
	- 答：浏览器中已经摈弃了实验期的写法，支持transform了。


## CSS实现实心朝下的尖角符号

```
.icon-solid-down {
	z-index: 1;
	position: absolute;
	top: 36px;
	left: 30px;
	width: 9px;
	height: 9px;
	-webkit-transform: rotate(45deg);
	transform: rotate(45deg);
}
```