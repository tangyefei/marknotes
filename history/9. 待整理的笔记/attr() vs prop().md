不巧面试被问到了attr()和prop()的区别，稍加学习记录如下：

### 1. attribute和property

#### attribute

一个网页就是一棵DOM树，DOM树由节点构成，节点分为三种：元素节点、文本节点、属性节点。所有的属性节点构成了一个属性的数组，我们以如下HTML代码为例：


```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>attr() vs prop()</title>
</head>
<body>
     <input type="text" value="Name:">
     <input type="checkbox" checked="false">
     <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
</body>
</html>
```

我们在浏览器窗口的console中输出：

```
var inputs = document.getElementsByTagName('input')
var input = inputs[0];
input.attributes
```

得到的结果是：

```
NamedNodeMap {0: type, 1: value, length: 2, getNamedItem: function, setNamedItem: function, removeNamedItem: function, item: function…}
```

可以看到，这个节点对象里面有很多的属性，我们只设置了两个，其他的是继承自原型链上的。


####  property

所有节点都是对象，对象上的属性叫做property，我们可以简单通过遍历这个对象来查看他的properties，如下为在浏览器中执行的例子： 

```
var input = inputs[0];
for(var key in input) {console.log(key);}
```

如下为输出的结果：

```
VM445:2 webkitEntries
VM445:2 incremental
VM445:2 webkitdirectory
VM445:2 selectionDirection
VM445:2 selectionEnd
VM445:2 selectionStart
VM445:2 labels
VM445:2 validationMessage
...
```

因为property输出太多了所以没有再次全部列出，但自己执行后仔细查找会发现，type和value两个属性也存在于properties中。

### 2. property和attribute有什么区别？

我们可以通过property方式像这样`input.value` 或者 attribute方式像这样   `input.getAttribute( "value" )` 来获得值，并且得到的结果都是 "Name:"。

当我们在页面中编辑input的值，在获取的时候发现`input.value`的值是更新后的值，而input.getAttribute的值仍旧是旧的。

因此差别就是： **property记录的值会按照用户操作实时更新，而attribute记录的都是初始值**。

### 3. prop()和attr()的区别？

根据 [W3C forms specification](http://www.w3.org/TR/html401/interact/forms.html#h-17.4),  checked 属性是一个 [boolean attribute](http://www.w3.org/TR/html4/intro/sgmltut.html#h-3.3.4.2), 因此checked property只能是true或者false，当勾选为true，未勾选或者未设置为false。

- **elem.checked  // true (Boolean) 会随着勾选状态而改变**

prop的方法是和直接取property一样 ，因此

- **$( elem ).prop( "checked” )  //true (Boolean) 会随着勾选状态而改变**

而拿attribute拿到的只是初始的值：

- **elem.getAttribute( "checked" )
// "checked" (String) 记录初始状态, 值为"checked"或者任意你设置的值，不会随着勾选状态而改变**

jQuery的attr()方法获的的结果也跟getAttribute是一致的：

- **$(‘input[type=“checkbox”’).attr( ‘checked’ )  // 同上一条**


至于说jQuery的历史版本中，attr()有过一些跟getAttribute不一致的行为，比如返回结果是会随着勾选变化的字符串，或者返回结果是Boolean类型值，知道即可~

----

参考 [JavaScriptDom编程艺术](http://book.douban.com/subject/6038371/),
[stackoverflow](http://stackoverflow.com/questions/6003819/properties-and-attributes-in-html),
[jQuery API](http://api.jquery.com/prop/)

