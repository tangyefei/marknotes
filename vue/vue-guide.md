
深入了解组件

**组件注册**

将某个文件夹下的组件自动注册为全局组件很实用。

**Prop**

传递给组件postTitle属性需要在组件中书写 post-title="hello!"。因为HTML是大小写不敏感的，直接书写postTitle会把大写字符解释为小写字符。
亲测使用 postTitle和post-title是一样的都可以被识别）

传递Prop时候，如果prop类型声明为Boolean，在没有传递值的情况，意味着为true： `<blog-post is-published></blog-post>`。

组件的Prop中没有定义某一类特性，直接传递特性后，特性会自动添加到被传递组件的`$attrs`上。

`inheritAttrs: false` 和 `$attrs`的用途到底是什么仍旧不理解。

Prop的属性传递是单向的，父改变了值，会同步到子，而子修改Prop传递才值会报错，通常（1）使用Prop来初始自己的属性（2）利用Prop的值来生成computed属性。

至于子想要修改父的属性，则可以通过

`@update:title="title=$event"` + `$emit('update:title', '666')`的方式，该写法在引用端可以简化为 `:title.sync="title"`。
