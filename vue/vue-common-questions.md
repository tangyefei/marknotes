# Vue常用的知识点

## 组件传值

### 1. props方式传值

如果在子组件对传递的属性进行了赋值

- 将会导致Vue警告抛出；
- 子组件中的引用修改不会同步到父组件(修改引用对象中的属性会同步到父组件)

### 2. [sync语法](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier)

在Vue2.0鼓励使用事件来同步父子组件的内容改动

```
// parent component

data(){
  return {
    title: "222"
  }
}
<h3>{{title}}</h3>
<ChildComponent @update:title="title=$event"></ChildComponent>
```



```'
// child component

<h3>{{title}}</h3>
<button @click="$emit('update:title', '666')"></button>
```



初始状态，parent/child component展示都是222，点击按钮，子组件同步了’666‘的值给父组件，父子组件都变成了666。

注意：并没有直接在子组件中修改title，而是触发update，然后再由父组件自上而下地同步。


其中父组件的写法等价于下面的sync写法（注：跟Vue1.0中的`sync`完全不同）：

```
<ChildComponent :title.sync="title"></ChildComponent>
```

当组件之间同步的是对象的时候，也可以用同样的语法，那么所有的对象中的属性都会被同步。

## Vue-Router的hash/history模式原理

## 项目中的Vuex是如何使用的并简述原理


