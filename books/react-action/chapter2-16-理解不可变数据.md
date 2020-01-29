## 16 理解不可变数据

### 什么是不可变数据

不可变数据是React运行的基础，它的含义是，你要修改对象的值，不能直接修改它，而是要基于它去复制出来，然后在需要修改的位置用新的对象/值替换。


### 为什么需要不可变数据

1. 性能优化：只要state不再是同一个对象，说明发生了变化，不用递归去查找
2. 易于调试和跟踪：前后状态能对比
3. 易于推测：能知道什么导致了数据变化


### 产生新对象的方法

1. ES6原生语法{...}、Ojbject.assign，性能最高，使用最频繁的用法
2. immutability-helper类库，使用与修改的结构很深的时候
3. immer的produce方法

举例第1种用法：

```
newState = {...state, todos: [...state.todos, 'learn redux']}
```

举例第2种用法：

```
import update from 'immutability-helper';
const newState = update(state, {todos: {'$push': ['learn redux']}}
```