# 第4章 模块化React和Redux应用

## 3. 模块接口

简言之：

作者推荐的做法是，把一个功能模块的所有代码都组织到一个文件夹中，然后暴露一个对外的js（通常是该文件夹下的index.js），要引用这个模块的任何一个部分，都需要经过这个js。

好处就是，内部的命名不论再怎么变，都不会影响其他模块对该模块的引用，开发者只需要维护好对外的js 和 各个部分的映射关系即可，从而达成高内聚低耦合的目标。

## 4. 状态树的设计

状态树的设计需要遵循的几个原则：

- 一个模块修改某一块数据
- 避免冗余数据
- 树形结构扁平

## 5. Todo应用实例

参考作者的代码库第四章进行动手实践，自己实现了简单的版本：[https://github.com/tangyefei/react-redux-todos](git@github.com:tangyefei/react-redux-todos.git)

这里仅介绍一些值得注意的地方：

- 为了在React使用Redux，需要安装 redux 和 react-redux
- 为了在所有组件上都能拿到Store的数据，需要在组件的根的位置嵌套一层 `<Provider store={store}></Provider>`
- 关于Store，我们使用createStore来创建一个Store，其中第一个参数是使用combineReducers生成的结构，指明了 `key: value`的关系，key代表state中的数据，value代表了能获取到修改权的reducer
- 关于reducer，如果也学作者用switch来做action.type的不同处理，必须要有default的处理，否则会运行不正常
- 关于reducer，每一个reducer不会直接修改reducer，而是通过操作state得到新值然后return作为state的值
- 关于action，只需要把它当做views调用reducer时，用来传递的一组封装数据，里面会将view传递的数据变成更完整的对象结构
- 关于views中如何映射，`react-redux`组件提供了一个`connect(mapStateToProps, mapDispatchToProps)(component)`方法
  - mapStateToProps函数负责把store的数据映射到组件中，reducer直接拿到了Store中的对应数据（即mapStateToProps方法的state），state中即可取到值
  - mapDispatchToProps函数负责把本地的函数调用映射到具体的action的触发（dispatch），在这里需要自己引入需要dispatch的action类型
  - 使用connect的组件的定义方式需要修改，因为mapStateToProps, mapDispatchToProps提供的属性和方法，都会作为组件的函数的参数被传入，例：`const TodoList = ({todos, onRemoveTodo})`


## 6. 开发辅助工具

### 扩展包

React Devtools、Redux Devtools、React Perf（可以发现组件渲染的性能问题）

### redux immutable state invariant

可以检查一些私自修改state的行为并给出警告

### 具体应用

作者在该部分介绍了使用上述工具的一些具体配置，使用的时候可以查阅




