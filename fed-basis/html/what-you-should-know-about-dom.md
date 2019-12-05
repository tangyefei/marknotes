# 关于DOM你需要知道的


## 1. 节点的类型、获取、判定

**常用的节点有三类，分别是：**

- element node
- text node
- attribute node

除此之外其他还可能包括 comment 等其他节点。

**如下示例可以将三类节点一一对应：**

```
<p title="a gentle reminder">Don't forget to buy this stuff</p>
```

**拿到节点的方法：**

- 通过 `dom.children` 拿到的是素有element类型的子节点
- 通过 `childNodes` 拿到的是所有类型的节点
- 通过 `dom.getAttribute()/getAttributeNode()/getAttributeNames()` 方法可以拿到属性节点的不同形式。



**获取节点的类型：**

`dom.nodeType` 和 `dom.nodeName` 可以获取到节点类型的信息，前者是整数值，后者是形如`#document`、`BODY`、`DIV`、`#text`、`#comment`的值。


