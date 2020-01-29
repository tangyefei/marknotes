## 15 如何组织Action和Reducer

### 标准形式有什么问题


标准形式即actions放在一起，有这样的问题：

1. 所有的Action存放在一个文件，会无限扩展
2. Action和Reducer是分开的，需要来回切换
3. 系统中有哪些Action不够直观，必须打开文件去看内容


### 新的方式

新的方式的做法是：单模块action和reducer放在同一个文件中。

并且存在一个总的文件，将action和reducer汇集起来，这样就会很直观，还具有下面的优点：

1. 易于开发，不用在action和reducer之间切换
2. 易于维护，文件很小
3. 易于测试，每个业务关联一个测试文件
4. 易于理解，文件名就是action名，文件列表就是action列表


### 例子

```
import {COUNTER_PLUS_ONE} from './constants';
export function counterPlusOne() {
	reurn {
		COUNTER_PLUS_ONE
	}
}
export function reducer(state, action) {
	switch(action.type) {
		case COUNTER_PLUS_ONE: 
			return {...state, count: state.count + 1}
		default:
			return state;
	}
}
```