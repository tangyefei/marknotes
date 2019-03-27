
## 1. common phenomenon

### 1.1 margin collapse

桂林也为例，.summary {margin: 3px 16px;} .summary p {margin: 1em; font-size: 14px;} 

父子margin重合了在视觉上是之有父容器的margin，但是实际的空间却是子的margin的，并且是吞没关系

TODO 进一步研究margin的应用场景



## 2. page layout

### 1.1 horizontal center same margin besieds

#### a. effect

![align-center-white-filled-besides](./referred-images/align-center-white-filled-besides.png)

#### b. snippet

```
margin: 0-auto; 
max-width: 640px; 
min-width:320px;
```

## 3. attributes

### 3.1 display

`inline` vs `inline-block` vs `block` vs `-webkit-box`

通过设置position: absolute可以让inline类型的DOM的width height可以设置了?


line-height仅对block和inline-block适用，同理会有哪些属性同样适用于同样的规则

怎么理解如下这段代码：

```

 .guilin-page .pnl_userInfo .user_info {
	float: left;
	-webkit-box-sizing: border-box;
	display: -webkit-box;
	-webkit-box-align: center;
	-webkit-box-pack: start;
  	box-sizing: border-box;
}  
```

### 3.2 line-height


`line-height: 1;` 代表跟字体大小同等的高度


### 3.3 float

### 3.4 font-size

`em` vs `%` vs `rem`, relatinship with `line-height`


### 3.5 box-size

width height 默认是包含padding，box-size: border-box是连同border在内，box-size: content-box是只包含内容区域不包含padding

