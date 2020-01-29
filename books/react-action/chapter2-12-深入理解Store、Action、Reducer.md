## 12 深入理解Store、Action、Reducer

本篇跟课程内容不同，先从例子开始，看懂了再逐个解释概念。

### 实例应用

[c11/pure-reducer](https://codesandbox.io/s/6n20nrzlxz) 大概需要用3-5分钟简单理解下。

下面开始分区段介绍该例子：

**STORE**是存储状态的地方，可以通过createStore来创建**

```
import {  createStore } from 'redux';

const store = createStore(counter)
```

这个counter定义了保存了什么值、怎么修改它。概念上就叫**REDUCER**，它是一个纯函数：

```
const counter = (state ={count:1}, action) => {
	switch (action.type) {
	  case "PLUS_ONE":
	    return { count: state.count + 1 };
	  case "MINUS_ONE":
	    return { count: state.count - 1 };
	  case "CUSTOM_COUNT":
	    return {
	      count: state.count + action.payload.count
	    };
	  default:
	    break;
	}
	return state;
};
```

既然定义了数据和修改规则，那下一步就是怎么触发它的状态变化，和怎么感知它的状态变化。

**STORE.SUBSCRIBE**函数会在状态发生变化的时候被通知掉，后续的输出会被调用。

```
store.subscribe(() => console.log(store.getState()));
```

**STORE.DISPATCH**可以主动触发数据变化，传入值是一个**ACTION**对象，它是一个普通对象：

```
store.dispatch(plusOne());
store.dispatch(minusOne());
store.dispatch(customCount(5));
```

至此一个redux例子的基本要素都已经有了，为了方便我们管理多种状态，counter中的数据，可能还有别的数据，那么我们可以把相似的结构通过 **combineReducers** 方法包裹。

```
const store = createStore(
combineReducers({
  todos,
  counter
})
);
```

同样，每次都调用 store.dispatch 来触发一个action方法的执行结果，也可以简化：用**bindActionCreators** 直接包装下该方法，然后可以直接调用。

```
plusOne = bindActionCreators(plusOne, store.dispatch);
```


### 理解Store


```
const store = createStore(reducer);
```

1. getState
2. dispatch(action)
3. subscribe(listener)

下图其实可以看到Store是一个虚拟概念，数据在state中，reducer对数据进行修改，dispatcher是用于dispatch action的一个结构。

![redux store](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/react-action/redux-workflow.png)

### 理解action


可以理解为描述一个行为的的描述

```
{
	type: "ADD_TODO", //常量字符串
	text: "learn redux today"
}
```

### 了解Reducer

reducer是一个存储state的结构，并且定义了针对不同的action，会产生什么样一个新的state。

```
function todoApp(state = initialState, action) {
	switch(action.type) {
		case 'ADD_TODO': {
 			//do someting
		}
	}
}
```

因为reducer是能收到所有的action的通知的，因此需要根据类型来判断执行哪一个。



### 扩展语法combineReducer和bindActionCreators

combineReducer让多个reducer可以当做传入参数给createStore。

思考：使用了combineReducers，有一个action被dispatch后是否每个reducer都会执行switch？

bindActionCreators可以直接使用函数作为参数生成新的函数，新的函数直接调用即可出发dispatch。