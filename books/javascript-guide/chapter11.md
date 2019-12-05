# JavaScript权威指南-第6版

## 第11章 子集和扩展

本章讨论JavaScript的子集和超集。

定义子集的大部分是出于安全的考虑，因为使用安全的子集编写脚本可以让代码更安全。至于扩展很大程度上是尚且未称为标准，但很强大并且很有可能在未来成为标准。

### 1. JavaScript的子集

**The Good Part**

Douglas Crockford在《JavaScript: The Good Part》一书中倡导避免使用鸡肋的部分，仅使用建议使用的子集来编写程序，从而使编写更容易、更强壮。

后来ECMAScript的严格模式出现了，它对“The Good Part”提到的大多数鸡肋部分同样做了限制。

**子集的安全性**

这里讨论的子集可能比The Good Part的范围更大，它的目的是在容器或沙箱内更安全地运行不可信的第三方代码，为了让代码能够通过安全检查，必须移除掉一些特性，比如：

- 禁止使用使用eval和Function
- 禁止使用this关键字
- 禁止使用with语句
- 禁止使用某些全局变量比如window
- 禁止使用某些属性和语法比如arguments caller callee
- 防止使用.读取属性

因为检查器的检验规则较严格，所以一些沙箱系统定义了更松散的、范围更广的子集，比如ADSafe、dojox.safe、Caja、FBJS、Microsoft Web Sandbox。

### 2. 常量和局部变量


直接阅读ES6的const和let章节即可。

### 3. 解构赋值

直接阅读ES6的解构赋值章节即可。

### 4. 迭代

- for/each循环，用于添加在for/in循环前面，差别在意它遍历的是对象的值
- 迭代器（对应ES6的Iterator接口），本书介绍的实现了__iterator__的对象，for/in等语法会基于它做遍历。
- 生成器（对应ES6的Generator）
- 数组推导 `let array = [expression for (variable in object) if(condition) ]`
- 生成器表达式 `let object = (expression for (variable in object) if(condition))` 返回值是生成器对象，它好处是惰性求值

### 5. 函数简写

实际出来的标准应该是箭头函数，而非所介绍的写法 `let function(x)x+1;` 。

### 6. 多catch语句

```
try {
	throw error
} catch(e if e instanceof ReferenceError) {
	// 
} catch(e if e === 'quit') {
	// 
} catch(e){
	//
}
```

### 7. E4X

"ECMAScript for XML"是一个标准扩展，提供了处理XML文档的强大特性，有需要可以参考该章节的更多介绍。




