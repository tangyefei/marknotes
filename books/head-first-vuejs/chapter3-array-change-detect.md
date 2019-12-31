### 第3章 Array的变化侦测

修改对象属性会触发setter/getter，但是向Array中push一个元素是无法侦听到的，这也是为什么要单独处理Array的变化侦测。

#### 1. 如何追踪变化

ES6之前并没有方法能拦截原型的方法，因此通常使用拦截器来覆盖Array.prototype，即每次使用方法操作数组，其实是使用的拦截器的方法。

#### 2. 拦截器

如下我们基于`Array.prototype`构建了一个对象`arrayMethods`，对象上直接定义了`push`方法，它会触发原型上的方法调用，在调用之前我们可以进行封装。

```
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

;['push'].forEach(function(method) {
  const original = arrayProto[method];
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args){
      console.log('method:' + method + ' call')
      original.apply(this, args);
    }
  })
})
```

#### 3. 使用拦截器覆盖Array原型

在上一章中，我们会在Observer中，对对象调用walk方法，方法会对的对虾干所有属性进行遍历，进行defineReactive。

本节在Observer中，将上一节的arrayMethods，赋值给数组对象的 __proto__ 属性，从而直接覆盖对象的原型。

因此调用顺序最终就成了，defineReactive触发new Observer，new Observer则在根据结构决定
（1）调用 value.__proto__ = arrayMethods，从而侦听到数组的变化
（2）调用 this.walk 继续递归对属性值（对象）在进行defineReactive

```
export default class Observer {
  constructor(value) {
    this.value = value;
+    if(Array.isArray(value)) {
+      value.__proto__ = arrayMethods;      
+    } else {
      this.walk(value);
+    }
  }
  ...
}
```

#### 4. 将拦截器方法挂载到数组的属性上

在某些环境下无法获取到对象下的`__proto__`，这时可以遍历`arrayMethods`中的方法，然后复制到对象上。因为只属于兼容性的处理，不影响理解主流程，这里不再赘述，有需要可以参考对应的章节。

#### 5. 如何收集依赖

数组进行方法调用的时候，必须先拿到数组的引用，比如 object.list.push(1) 必然会先触发 object下list属性的getter，因此收集依赖的位置也是在defineReactive的getter中。


#### 6-10. 如何使用依赖

在Observer的构造函数中，增加如下行：

```
export default class Observer {
  constructor(value) {
    ...
+     this.dep = new Dep();
+     value.__ob__ = this;
    ...
  }
  walk(obj) {
    ...
    for (let key of keys) {
      defineReactive(obj, key, obj[key]) 
    }
  }
  ...
}

function defineReactive(data, key, val) {
  let childOb = observe(val);
  let dep = new Dep();

  Object.defineProperty(data, key, {
  	get: function() {
+  		if(childOb) {
+  			childOb.dep.depend();
+  		}
+  		return val;
  	}
  }
}


export function observe(value) {
  if(typeof value != 'object') return;

  let ob;
  if(value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}


;['push'].forEach(function(method) {
  const original = arrayProto[method];
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args){
+      const ob = this.__ob__;
+      ob.dep.notify();
      console.log('method:' + method + ' call')
      original.apply(this, args);
    }
  })
})

```

#### 10.　侦测数组中元素的变化

对于前9节的全面的内容可大概总结下：我们给Array类型的方法，增加了拦截，每当通过`push`改变数组结构的行为发生时候可以侦听到。

本节介绍的是数组中包含了子对象的时候，如何侦听子对象中属性的变化，即在Observer的构造函数中，针对isArray的情况增加一个处理

```
export default class Observer {
  constructor(value) {
    this.value = value;
    if(Array.isArray(value)) {
      value.__proto__ = arrayMethods;      
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  ...
  observeArray(items) {
	for (let i = 0; i < items.length; i++) {
      observe(items[i]);
    }
  }
}
```

#### 11.　侦测新增元素的变化

通过方法新增的元素，也要转换成响应式来侦测变化。


##### 获取新增元素

在arrayMethods的拦截中，通过`args`即可拿到新元素的数组


##### 使用Observer侦测新增元素

通过 `ob = this.__ob__`已经拿到挂载数组对象下的Observer，在通过`ob.reserveArray(args)`即可。

个人备注：此种情况只适合对新增对象进行响应式，对于普通的数据类型理论上是无法做到侦听的。

#### 12.关于Array的问题

因为我们是通过拦截数组原型上的方法来实现侦听，因此如下两种操作方式是无法实现到侦听的：

```
this.list.length = 0;
this.list[0] = 2;
```

#### 13. 总结

![图解](./chapter3-graphic.jpeg)


