# 20. Class的基本语法

## 1. 简介

ES6 的class可以看作只是一个语法糖，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。ES6 的类，完全可以看作构造函数的另一种写法。

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

typeof Point // "function"
Point === Point.prototype.constructor // true
```

注意（1）定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了 （2） 另外，方法之间不需要逗号分隔，加了会报错。

