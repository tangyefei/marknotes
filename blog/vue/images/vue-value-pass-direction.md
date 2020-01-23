

## Vue中父子组件传值的方向

**单向修改**

子组件修改父组件中的值，典型的一个经过包装的输入组件

父组件中的v-model将值注入到value属性中，并且接受update事件中的值的更新

// parent 

```
<child v-model="name"

data(){
	return {
		name: 'yefei',	
	}
}
```

// child component

```
<input v-model="value" @input="$emit('update', $event)"

props: ['value'],

```

**双向传值**

父、子组件会影响彼此的值，比如父组件是一个查询页面，子组件是查询页面中的查询组件，可以有多个选项可以点击

子组件的点击，可以将值得同步到父组件，用于查询；父组件可以通过点击重置按钮，将子组件的参数重置

// parent 

```
<child v-model="types"

data(){
	return {
		types: []
	}
}
```

// child

```
props: ['value'],
data() {
	return {
		checkList: [],
	}
},
watch: {
	value() {
		this.checkList = this.value.slice(0);
	}
}
methods: {
	pickOption() {
		// here is logic update checkList
		this.$emit('update', this.checkList')
	}
}
<option-group v-model="checkList">
	<option @change="pickOption" v-for></option>
</option-group>
```
