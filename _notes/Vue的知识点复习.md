# Vue的知识点复习


## 前端设计模式

### 1、说说你对 SPA 单页面的理解，它的优缺点分别是什么？

避免了不必要的跳转和重复渲染

页面切换需要自己建立堆栈管理；SEO 难度较大


### 20、什么是 MVVM？

Model–View–ViewModel （MVVM） 是一个软件架构设计模式。

MVVM 的核心是 ViewModel 层，它就像是一个中转站（value converter），负责转换 Model 中的数据对象来让数据变得更容易管理和使用，该层向上与视图层进行双向数据绑定，向下与 Model 层通过接口请求进行数据交互，起呈上启下作用。

作者：我是你的超级英雄
链接：https://juejin.im/post/5d59f2a451882549be53b170
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


### 27、Vue 中的 key 有什么作用？

## Vue的基础用法

### 2、v-show 与 v-if 有什么区别？

v-if

元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。

v-show 


元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。

v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。

### 3、Class 与 Style 如何动态绑定？

Class 对象和数组语法

```
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

Style

```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div v-bind:style="[styleColor, styleSize]"></div>
```

### 5、computed 和 watch 的区别和运用的场景？

computed

- 缓存特性，不需要每次获取值时，都重新计算
- 需要进行数值计算，并且依赖于其它数据时，应该使用 computed

watch

1. 使用 watch 选项允许我们执行异步操作 ( 访问一个 API )
2. 限制我们执行该操作的频率
3. 并在我们得到最终结果前，设置中间状态。

上述这些都是计算属性无法做到的，数据变化时执行异步或开销较大的操作时，应该使用 watch

### 6、直接给一个数组项赋值，Vue 能检测到变化吗？

当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue

要使用:

```
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

注：实测确实都能检测到，不会到是否Vue有更新过支持

### 12、谈谈你对 keep-alive 的了解？

keep-alive 是 Vue 内置的一个组件，一般结合路由和动态组件一起使用，用于缓存组件；提供 include 和 exclude 属性；对应两个钩子函数 activated 和 deactivated。

其实现原理是它将满足条件的组件的VNode在cache对象中缓存起来，在需要重新渲染的时候再将vnode节点从cache对象中取出并渲染。

应用实践：

通过 `router.$vnode.parent` 拿到keep-alive，再通过componentInstance.cache拿到cache对象

对象上保存了被缓存起来的组件的componentInstance，可以做自我销毁 

```
let cache = this.$refs.router.$vnode.parent.componentInstance.cache;
cache[key].componentInstance.$destroy();
delete cache[key];
```

### 16、你使用过 Vuex 吗？


- State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
- Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
- Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
- Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。


### 15、Vue 组件间通信有哪几种方式？

- 1）props / $emit 适用 父子组件通信
- 2）ref 与 $parent / $children 适用 父子组件通信
- 3）EventBus （$emit / $on） 适用于 父子、隔代、兄弟组件通信
- 4）$attrs/$listeners 适用于 隔代组件通信
- 5）provide / inject 适用于 隔代组件通信
- 6）Vuex 适用于 父子、隔代、兄弟组件通信

## 原理：虚拟DOM

### 26、虚拟 DOM 实现原理？

虚拟 DOM 的实现原理主要包括以下 3 部分：

- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
- diff 算法 — 比较两棵虚拟 DOM 树的差异；
- pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

### 25、虚拟 DOM 的优缺点？

优点：

- 保证性能下限：它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多
- 无需手动操作 DOM： 极大提高我们的开发效率
- 跨平台：虚拟 DOM 可以进行更方便地跨平台操作

缺点：

[知乎上关于虚拟DOM性能的讨论：Evan You的回答](https://www.zhihu.com/question/31809713)

性能比较要看场合，初始渲染、小量数据更新、大量数据，结合不同的框架的的更新策略（Vue是依赖手机、Angular脏检查、React是虚拟DOM比较）表现不同。其中在小量数据更新，无优化的虚拟DOM，性能表现是最差的。


## 原理: 数据流、数据绑定

### 4、怎样理解 Vue 的单向数据流？

子组件想修改时，只能通过 `$emit` 派发一个自定义事件，父组件接收到后，由父组件修改。

所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定。


### 14、v-model 的原理？

我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

```
- text 和 textarea 元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

<input v-model='something'>
    
相当于

<input v-bind:value="something" v-on:input="something = $event.target.value">
```

### 21、Vue 是如何实现数据双向绑定的？

Vue 数据双向绑定主要是指：数据变化更新视图，视图变化更新数据。

View 变化更新 Data 

可以通过事件监听的方式来实现。

Data 变化更新 View

- 实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。

- 实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

- 实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。

- 实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。



### 22、Vue 框架怎么实现对象和数组的监听？

Object.defineProperty() 对对属性进行数据劫持。

Vue 框架是通过遍历数组 和递归遍历对象，从而达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听。

注：更好的回答是，通过包装Array.prototype对数组操作的方法进行劫持，从而实现数组操作监听。


### 23、Proxy 与 Object.defineProperty 优劣对比


### 24、Vue 怎么用 `vm.$set()` 解决对象新增属性不能响应的问题？

`vm.$set` 的实现原理是：

- 如果目标是数组，直接使用数组的 splice 方法触发相应式；
- 如果目标是对象，如果要对属性进行响应式处理，则是通过调用defineReactive 方法进行响应式处理。

## 生命周期、周期内的函数

### 7、谈谈你对 Vue 生命周期的理解？

开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

beforeCreate
组件实例被创建之初，组件的属性生效之前


created
组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用


beforeMount
在挂载开始之前被调用：相关的 render 函数首次被调用


mounted
el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子


beforeUpdate
组件数据更新之前调用，发生在虚拟 DOM 打补丁之前


update
组件数据更新之后


activited
keep-alive 专属，组件被激活时调用


deactivated
keep-alive 专属，组件被销毁时调用


beforeDestory
组件销毁前调用


destoryed
组件销毁后调用


### 8、Vue 的父组件和子组件生命周期钩子函数执行顺序？

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

1. 加载渲染过程

父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

2. 子组件更新过程

父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

3. 父组件更新过程

父 beforeUpdate -> 父 updated

4. 销毁过程

父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

### 9、在哪个生命周期内调用异步请求？为什么?

可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。

推荐在 created 钩子函数中，因为;

- 能更快获取到服务端数据，减少页面 loading 时间；
- ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性


### 10、在什么阶段才能访问操作DOM？

在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM。

### 13、组件中 data 为什么是一个函数？

为什么组件中的 data 必须是一个函数，然后 return 一个对象。

而 new Vue 实例里，data 可以直接是一个对象。

如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。



### 11、父组件可以监听到子组件的生命周期吗？

方式1

```
// Parent.vue
<Child @mounted="doSomething"/>
    
// Child.vue
mounted() {
  this.$emit("mounted");
}
```


方式2

```
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
    
//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},    
    
// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...  
```



## 原理：路由组件


### 18、vue-router 路由模式有几种？

- hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
- history : 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；
- abstract : 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式；

### 19、能说下 vue-router 中常用的 hash 和 history 路由模式实现原理吗？

hash 模式的实现原理

- URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
- hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
- 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
- 我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

history 模式的实现原理
- pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
- 我们可以使用 popstate  事件来监听 url 的变化，从而对页面进行跳转（渲染）；
- history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。

## 原理：服务端渲染

### 17、使用过 Vue SSR 吗？说说 SSR？

vue在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的html 片段直接返回给客户端这个过程就叫做服务端渲染。

优点：

- 更好的 SEO
- 更快的内容到达时间（首屏加载更快）

缺点：

- 更多的开发条件限制：例如只支持 beforCreate 和 created 两个钩子函数；服务端需要处于 Node.js server 运行环境
- 更多的服务器负载：更多的服务器负载


## 实践和学习

### 28、你有对 Vue 项目进行哪些优化？

代码层面的优化

- v-if 和 v-show 区分使用场景
- computed 和 watch  区分使用场景
- v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
- 长列表性能优化
- 事件的销毁
- 图片资源懒加载
- 路由懒加载
- 第三方插件的按需引入
- 优化无限列表性能
- 服务端渲染 SSR or 预渲染


Webpack 层面的优化

- Webpack 对图片进行压缩
- 减少 ES6 转为 ES5 的冗余代码
- 提取公共代码
- 模板预编译
- 提取组件的 CSS
- 优化 SourceMap
- 构建结果输出分析
- Vue 项目的编译优化

基础的 Web 技术的优化

- 开启 gzip 压缩
- 浏览器缓存
- CDN 的使用
- 使用 Chrome Performance 查找性能瓶颈

### 30、说说你使用 Vue 框架踩过最大的坑是什么？怎么解决的？

### 29、对于即将到来的 vue3.0 特性你有什么了解的吗？

- 监测机制的改变，基于代理 Proxy 的 observer 实现
- Composition API
- Global mounting/configuration API change
- Suspense
- Multiple v-models
- Fragments
- Portals
- New custom directives API