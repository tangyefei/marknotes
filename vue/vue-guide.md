
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

**动态组件**

使用 `<component v-bind:is="currentComponent"></component>` 来指定动态组件。

通过包裹 `<keep-alive></keep-alive>` 可以将切换过的组件缓存。

通过如下两种预发可以进行异步组件加载：

```
Vue.component(
  'async-webpack-example',
  // The `import` function returns a Promise.
  () => import('./my-async-component')
)
```

```
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

**处理边界**

可以使用 $root 获取到对根组件的引用；可以使用 $parent 获取到父组件的引用；可以通过 $refs.name 获取子组件的引用；可以通过 provide + inject的方式可以让任意子孙组件访问到祖先组件的提供的数据/方法。

可以使用 $on $off $once 来对组件的一些时间进行侦听。

循环引用，分为组件对自己的循环引用、组件之间的循环引用。

在模板中使用 inline-template 可以使用嵌套内容作为模板；x-template 可以使用script中定义的内容作为模板。

可以使用$forceUpdat来强制更新数据，可以使用v-once来提高静态模板的渲染效率。

