# 第4章 模块化React和Redux应用

## 模块化应用的要点

- 代码文件的组织结构
- 确定模块的边界
- Store的状态树设计

后续将围绕一个Todos的应用来介绍各个要点

## 代码文件的组织方式

### 按角色组织

典型的是 controler/view/model 在各自文件中，在redux应用中则变成了reducer/action/component/container。

### 按功能组织

比如Todos的应用，结构被划分为如下：

```
todoList/ 
  actions.js 
  actionTypes. js 
  index. js 
  reducer. js 
  views/ 
    component. js 
    container. js 
filter/ 
  actions. js 
  actionTypes. js 
  index. js 
  reducer. js 
  views/ 
    component. js 
    container. js
```

它的好处是，要修改某个功能的时候，只需要关注某个文件夹下的目录即可。

## 模块接口




传统MVC框架的问题在于View和Model之间的通信会扰乱数据流转，从而变的难以为胡。而Flux的做法是：

- 状态数据存储于Store中
- Store中通过继承EventEmitter实现了 add/removeListener,trigger
- View的操作会触发Action
- Action通过Dispatcher来执行动作
- Dispatcher的定义中，则包括操作Store的数据 和 通过Store去trigger
- 在View中，把Store中获取到的数据设置到state中，Store的addListener的处理回调中使用View中的onChange方法，就可以监听数据变化了，一旦变化，再获取State数据，设置到自己的State中


## Redux

可以把Redux看成是Flux的最流行的一种实现方式。

另外从Flux到Redux的过程，增加了只声明和使用一个Store的原则，并且废弃掉了Dispatcher，改为使用Reduer，从结构上来说，Reducer跟Store结合得更紧密一些。

对比Vuex来说一些不同之处：

- Vuex在view中可以通过getters拿到数据，数据变化以后可以自动同步到；Redux的数据通过store.getState()获取到数据，通过store.subscribe(onChange)来触发组件的改变，onChange为view的方法，内部感的是将数据从store中同步到view自己的state的工作。

- Vuex在view中通过actions来触发mutations，然后修改store中的数据；Redux在view中通过store.dispatch，触发Reducer中的修改store的操作，Reducer的实例在Store中作参数传递给Store中的构造函数。


## 容器组件和傻瓜组件

通过将跟Store打交道的部分抽象到父容器中，子组件之进行渲染操作，是React中常用的一种模式。

## 组件Context

为了在全局的组件中都能访问到Store，需要在顶层按照规约一个组件，所有的子组件才能够通过构造函数获取到对应的context，context进一步获取到store。

## React-Redux

将 “容器组件和傻瓜组件”  和 “组件Context” 的功能都包含是实现了。

