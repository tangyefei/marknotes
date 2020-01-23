## 层叠上下文和fixed的从父原则

### a. 问题

在项目中使用 element 提供的dialog组件，弹窗发现弹出的结果如下

![dialog-effect](18/dialog-effect.png);

### b. 分析

![dialog-effect-analysis](18/dialog-effect-analysis.png);

通过查看代码，可以知道阴影层是被放在 v-modal中，body结束前；modal的额内容规则嵌套组件内的 el-dialog__wrapper中。前者的z-index为2006，后者的z-index为2007，理论上是应该弹框内容正常显示才对，不应该是被阴影层遮盖。

[文章：层叠顺序与堆栈上下文知多少](http://www.cnblogs.com/coco1s/p/5899089.html)介绍了层叠上下文的概念，并且最后提到了上述问题的原因：

> 其子元素的 z-index 值只在父级层叠上下文中有意义。意思就是父元素的 z-index 低于父元素另一个同级元素，子元素 z-index再高也没用。

知道了原因后发现 app-main中的fixed设置不是必须的，去除以后就可以解决该问题。
