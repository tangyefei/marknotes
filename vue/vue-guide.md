<<<<<<< HEAD
[Vue官网教程](https://cn.vuejs.org/v2/guide/)

# 基础
Vue 实例一些有用的实例属性与方法，它们都有前缀 `$`。

```
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

vm.$watch('a', function (newValue, oldValue) {})
```

要在选项属性或回调上使用箭头函数，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致错误。


为了输出真正的 HTML，你需要使用 v-html 指令。


HTML 特性上，遇到这种情况应该使用 v-bind 指令：`<div v-bind:id="dynamicId"></div>`。

对于布尔特性 (它们只要存在就意味着值为 true)，v-bind 工作起来略有不同，在这个例子中：

```
<button v-bind:disabled="isButtonDisabled">Button</button>
```

如果 isButtonDisabled 的值是 null、undefined 或 false，则 disabled 特性甚至不会被包含在渲染出来的 `<button>` 元素中。


指令 (Directives) 是带有 v- 前缀的特殊特性，比如 v-if ，一些指令能够接收一个“参数”：

v-bind 指令可以用于响应式地更新 HTML 特性：`<a v-bind:href="url">...</a>`

v-on 指令，它用于监听 DOM 事件：`<a v-on:click="doSomething">...</a>`


从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```
<a v-bind:[attributeName]="url"> ... </a>
<a v-on:[eventName]="doSomething"> ... </a>
```

我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。


计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：

```
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

在本节示例中，使用 watch 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率（通过使用`_.debounce`），并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。


v-bind:style 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```
data: {
  activeColor: 'red',
  fontSize: 30
}
```


在组件上使用 v-model，自定义事件也可以用于创建支持 v-model 的自定义输入组件。记住：

<input v-model="searchText">

等价于：

<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value">

当用在组件上时，v-model 则会这样：

<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>

为了让它正常工作，这个组件内的 <input> 必须：

- 将其 value 特性绑定到一个名叫 value 的 prop 上
- 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出

写成代码之后是这样的：

Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})


用 key 管理可复用的元素，原理是怎样的？

解析 DOM 模板时的注意事项，是属于HTML的限制还是Vue的？不是很明白。


# 深入了解组件

## 自定义事件

**自定义事件的命名**

依据文档说明 因为HTML的属性没有大小写区分，myEvent会当成myevent，推荐使用 小写+中划线 的方式来定义事件名称。

亲测：myEvent和myevent会提示duplicate，但是 $emit('myEvent'）能被 @myEvent收到，$emit('myevent')能被@myevent收到。

**自定义组件中使用v-model**

v-model默认会把值传递到子组件的value属性中，子组件$emit('input')后值会被同步到v-model制定的变变量上。

也可以通过修改不使用 value + input 的方式，而是在子组件中增加 {model: {prop, event}}。

**$listeners**

我们期望在组件上通过.native的修饰符使用原生的事件，但是子组件可能是一个被包裹的组件，我们期望子组件的某个元素上发生这些实践，才触发它。因此就可以通过把 $listeners 对象制定给该质元素来实现，例如： v-on="inputListeners"。

**.sync修饰符**

```
text-document :title.sync="doc.titlle"
```

写法等同于

```
<text-document v-bind:title="doc.titlle" v-on:update:title="doc.title=$event">
</text-document>

<text-document :title="doc.titlle" @update:title="doc.title=$event">
</text-document>
```

而下属写法相当于把doc所有的属性都按照上述语法传递给了子组件

```
<text-document v-bind.sync="doc"></text-document>
```

## 插槽

**slot使用方式**

```
<navigation-link url="/profile">
  Your Profile
</navigation-link>
```

然后你在 <navigation-link> 的模板中可能会写为：

```
<a
  v-bind:href="url"
  class="nav-link"
>
  <slot></slot>
</a>
```

另外需要注意的，插槽内容引用到的是父组件的作用域，因为它是在父组件中被编译的；另外再<slot>中可以指定内容，用于当父组件并没有传入内容时候的默认内容。

**具名插槽**

```
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

```
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

**作用域插槽**

调用子组价并传入插槽内容，插槽内容的作用域是父组件，也可以在子组件中指定，在父组件用特定语法获取到子组件中的值。

围绕插槽还有一些更多变的用法，比如动态插槽名、具名插槽如何缩写等，此处略过。




# 过渡 & 动画
# 可复用性 & 组合
# 工具
# 规模化
# 内在
# 迁移
# 更多
=======

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

>>>>>>> 3f14923175debb286deda5a9eec8af708ff8df74
