# Proxy

> 1. 概述
2. Proxy 实例的方法
3. Proxy.revocable()
4. this 问题
5. 实例：Web 服务的客户端


## 1. 概述


### 概念

Proxy在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截。

这个访问，不只是获取属性，所有对象上的方法的调用，也都属于对象的访问，后续会介绍13种访问。

```
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
```


```
obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
```

Proxy 实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。等同于在语言层面做出修改，所以属于一种“元编程”（meta programming）

### ES6的Proxy

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。

要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，下例handler没有设置任何拦截。

```
var target = {name: 'yefei'}
var proxy = new Proxy(target, {
get(target,propName) {
	console.log('get:' + propName);
	return target[propName];
}
})

proxy.name; 
// get: name
// "yefei"

target.name
//yefei
```

### 拦截多个操作

```
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true
```

具体可以拦截的类型多达13种，第2小节会对各个类型进行具体介绍：

- get(target, propKey, receiver)：

	拦截对象属性的读取，比如proxy.foo和proxy['foo']。


- set(target, propKey, value, receiver)

	拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
	
- has(target, propKey)

	拦截propKey in proxy的操作，返回一个布尔值。
	
- deleteProperty(target, propKey)

	拦截delete proxy[propKey]的操作，返回一个布尔值。
	
- ownKeys(target)

	拦截Object.getOwnPropertyNames(proxy)、- Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
	
- getOwnPropertyDescriptor(target, propKey)

	拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
	
- defineProperty(target, propKey, propDesc)

	拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
	
- preventExtensions(target)

	拦截Object.preventExtensions(proxy)，返回一个布尔值。
	
- getPrototypeOf(target)

	拦截Object.getPrototypeOf(proxy)，返回一个对象。
	
- isExtensible(target)

	拦截Object.isExtensible(proxy)，返回一个布尔值。
	
- setPrototypeOf(target, proto)

	拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
	
- apply(target, object, args)

	拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、- proxy.call(object, ...args)、proxy.apply(...)。
	
- construct(target, args)

	拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。



## 2. Proxy的实例方法


### 2.1 get()

注：略过了两个比较绕的例子。


get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身，其中最后一个参数可选。

#### 拦截对象、数组

```
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误
```


```
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return target[propKey];
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c
```

#### get可以继承

```
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(proto);
obj.foo // "GET foo"
```

#### 使用get实现DOM节点的通用函数

```
const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  }
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

document.body.appendChild(el);
```

#### defineProperties的冲突


如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。

```
const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});

const handler = {
  get(target, propKey) {
    return 'abc';
  }
};

const proxy = new Proxy(target, handler);

proxy.foo
// TypeError: Invariant check failed
```


### 2.2 set()


set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。


#### 基础的例子

```
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```

#### 禁止读写内部属性

```
const handler = {
  get (target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set (target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}
const target = {};
const proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property
```

### 和defineProperty的冲突


注意，如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用。

```
const obj = {};
Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false,
});

const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = 'baz';
  }
};

const proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
proxy.foo // "bar"
```

### 2.5 construct()

construct方法用于拦截new命令，construct方法可以接受三个参数。


#### 例子

注：construct方法返回的必须是一个对象，否则会报错。

```
var p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});

(new p(1)).value
// "called: 1"
// 10
```

### 2.7 defineProperty()

#### 例子

defineProperty方法拦截了Object.defineProperty操作。

```
var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 因为返回为false，设置属性不会生效
```

#### 和对象属性的冲突

注意，如果目标对象不可扩展（non-extensible），则defineProperty不能增加目标对象上不存在的属性，否则会报错。

另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty方法不得改变这两个设置。
