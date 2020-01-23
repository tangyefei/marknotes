# Vue项目中通过v-model封装ElementUI组件

## 1. 问题

Vue的项目中有如下的代码，需要根据不同字典的数据去展示下拉组件：


```
<template>
  <el-select v-model="product.carId" placeholder="请选择车型 >
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: Utils.get('PRODUCT_TYPE')
      }
    }
  }
</script>

```


问题在于很多component中都需要用到这样的代码片段，而且很多都是重复的某个字典，书写麻烦，代码冗余。

## 2. 分析

[Vue的官方文档](https://cn.vuejs.org/v2/guide/components.html)提供了组件封装的一些介绍。下面是摘自官方文档的说明：



> 自定义事件也可以用于创建支持 v-model 的自定义输入组件。记住：

```
<input v-model="searchText">
```

> 等价于：

```
<input :value="searchText" @input="searchText = $event.target.value">
```

> 当用在组件上时，v-model 则会这样：


```
<custom-input :value="searchText" @input="searchText = $event"></custom-input>
```

**注意：`当用在组件上时，v-model 则会这样`  这个句话有一些隐含信息**


我们先假定要封装一个简单的 input 的组件，你觉得如下的代码能达到目的吗？


```
// 调用代码

<tsp-input v-model="name"></tsp-input>

//组件定义代码

<template>
    <input type="text" v-model="value">
</template>

<script>
export default {
  props: ['value']
}
</script>
```

不妨自己加些输出展示，可以看到，组件定义中的值改变了，并不会改变外部的值，也就是说并不管用。进一步分析：

`v-model` 等同于 `:value @input`，是区别对待的。先明确一个概念，`directive` 是 `vue` 所有用到 `v-` 属性的类型的统称，所有带 `v-` 类型的元素其实都是在跟`directive`打交道，`directive` 再跟底层的原生的元素打交道。

（1） 当`v-model`被使用在 `input`中的时候

`input`其实是`directiveInput`（自己随意取名），来自`原生input`的数据，会被隐式地将数据 通过 `$emit` 传递给 `directiveInput`，对此 `directiveInput` 的默认接收到数值的行为是：`searchText = $event.target.value`。

（2）当它被使用在自定义的组件中的时候

我们在 `tsp-input` 中使用 `v-model`，那么数据的流转是 `原生input` 到 `directiveInput` ，再到 `directiveTspInput`，`directiveInput` 和 `directiveTspInput`都有接收值的默认行为，但是不具备往外继续传递的行为。即 `tsp-input`虽然挂了`input`的事件，但是无法被触发。这点不同于 `vue` 介入  `原生input` 将值传递给了 `directiveInput` 。

继续往外面传值，必须显示的声明传值过程，如下：


```
// 调用代码

<tsp-input v-model="name"></tsp-input>

//组件定义代码

<template>
<input type="text" :value="value" @input="$emit('input', $event.target.value)">
</template>

<script>
export default {
  props: ['value']
}
```

## 3. 应用


假定我们需要基于 el-select 封装得到一个  tsp-select，代码大概是这样的，实用有效：

```
//实际调用
<tsp-select v-model="product.cardId" dictName="PRODUCT_TYPE"></tsp-select>

// tsp-select.vue 封装
<template>
  <el-select :value="product.carId" @input="$emit('input', $event)" 
    placeholder="请选择车型>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: Utils.get(this.dictName)
      }
    }
  }
</script>
```


## 4. 总结和完整代码

使用 `ElementUI` 的 `el-select` 能够成功使用 `v-model`，说明  `原生input`到 `directiveInput`再到`directiveElSelect`的数据流转是ok的（即在`el-select`代码内部是有封装 `$emit('input', $event)` 的），那么到了我们的 `tsp-select`中，想要也能被直接使用，也需要将值继续往外传递。如下是完整封装代码：

 tsp-select.vue

```
<template>
   <el-select :value="value" @input="$emit('input', $event)" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.code"
        :label="item.text"
        :value="item.code"
      ></el-option>
    </el-select>
</template>

<script>
export default {
  props: {
    value: [Number, String],
    dictName: String,
  },
  data() {
    return {
      options: G.D.get(this.dictName)
    }
  },
}
</script>
```

和代码调用

```
<el-form-item label="产品类型" prop="carId">
  <tsp-select v-model="product.cardId" dictName="PRODUCT_TYPE"></tsp-select>
</el-form-item>
```