# Class的基本用法

## 1. 简介

可以把Class看做是使用Function定义类的另一种语法糖，使得语法更像面向对象编程而已。

### 基本使用

```
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

和Function等价的用法如下

```
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

注意:

- 定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。
- 另外，方法之间不需要逗号分隔，加了会报错。


### 和Fucntion方式的相同点

针对Class的写法，有如下判断：

```
typeof Point // "function"
Point === Point.prototype.constructor // true
```

类的所有方法都定义在类的prototype属性上面。

```
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

在类的实例上面调用方法，其实就是调用原型上的方法。

```
class B {}
let b = new B();

b.constructor === B.prototype.constructor // true
```


### 和Fucntion方式的不同点


类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

```
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```


采用 ES5 的写法，toString方法就是可枚举的。

```
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function() {
  // ...
};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```