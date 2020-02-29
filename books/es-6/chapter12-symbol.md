# Symbol

## 1. 概述

字符串作为属性名，容易造成冲突， ES6 引入Symbol作为第七种数据类型的原因正是为了表示独一无二的值。

### 生成

Symbol 值通过Symbol函数生成（函数前不能使用new命令），哪怕传递参数一样的，也可以保证不会与其他属性名产生冲突，如果参数是一个对象，就会调用该对象的toString方法，将其转为字符串。

```
let s = Symbol();

typeof s
// "symbol"

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false

const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)

```

### 运算


Symbol 值不能与其他类型的值进行运算

```
let sym = Symbol('My symbol');

"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string
```

但是可以显式转为字符串

```
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
```

Symbol 值也可以转为布尔值，但是不能转为数值

```
let sym = Symbol();
Boolean(sym) // true
!sym  // false

if (sym) {
  // ...
}

Number(sym) // TypeError
sym + 2 // TypeError
```

