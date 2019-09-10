# 1. 字符集和编码的关系

字符集是字符的集合，编码则是字符集中的字符要如何存储的规则。


![image.png](https://upload-images.jianshu.io/upload_images/134602-75299af5c4277d53.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


当字符集和编码一一对应时，可能不用特意去区分；当字符集和编码一对多时，要指明编码方式就必须用准确的名称。

# 2. Unicode的码点

Unicode将全世界所有的符号都包含在其中。它的符号分区定义在不同的1个平面中，每个平面包含65536个（216）字符。

第一个平面称为基本平面，剩下的平面成为辅助平面。
![image.png](https://upload-images.jianshu.io/upload_images/134602-9969bd164507de41.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

对应的可以看到Unicode的码点用十六进制表示，长度在4-6位（少于4位实际有效前面会用0填充）之间。

# 3. Unicode的编码方式

Unicode的编码方式有多种：

- UTC-32用4个字节表示一个字符

- UTC-8用1-4个字节表示一个字符

- UTC-16用2或4个字节表示一个字符

# 4. JavaScript的编码UCS-2

Javascript使用的编码非上面的任何一种，而是用的UCS-2的编码，UCS-2编码采用两个字节存储一个字符。

UCS早期Unicode一样，都是为了建立一个涵盖所有字符的字符集。UCS-2是支持UCS的编码方式。

JavaScript语言采用了UCS-2作为自己的编码方式，而后又有了UCS、Unicode两家成员决定合并保留Unicode一个字符集，进一步发展出UTC-16的故事。

UTC-16明确宣布是UCS-2的超级，即基本平面跟UCS-2一样，辅助平面用于4个字节的表示。

# 5. 编码相关实用方法

## 字符串的字节数

因为Javascript使用UCS-2编码，一个字符用两个字节表示，因此字节数的数量的表达式为：字节数量 = 字符串长度 * 2。

比较特殊的，一个包含四个字节的字符，其长度为2，因此上述公式仍适用。

## 字符编码的查看

可以使用 `String.prototype.chartCodeAt(index)` 加 `toString(16)`来查看字符的十进制编码:

```

'a'.charCodeAt(0).toString(16) // 61

```

## 四字节字符的遍历

一个四个字节表示的字符，可以使用数组下标 或 `for...in` 循环遍历到两个4位十六进制，每一个只是字符的一部分，输出是无正常展示的；而ES6提供的 `for...of` 可以自动识别四字节的编码。

```

var s = '𝌆';

for(var i in s){

  console.log(s[i])

  //?

  //?

}

for(var i of s){

  console.log(s[i])

  //𝌆

}

```

## 码点表示法

如下的表达式是成立的，其中第三是ES6为了识别4字节字符所处的修复，加上`{}`才能正常识别

```

'\u0061' === 'a'

'\ud834\udf06' === '𝌆'

'\u{1d306}' === '𝌆'

```

## 其他方法

`'𝌆'.codePointAt(0)` 的输出即为 `1d306`

- String.fromCodePoint()：从Unicode码点返回对应字符，参数为十进制十六进制皆可

- String.prototype.codePointAt()：从字符返回对应的码点

- String.prototype.at()：返回字符串给定位置的字符，自己尝试似乎暂时不支持

## 正则表达

ES6提供了u修饰符，对正则表达式添加4字节码点的支持。

```

/^.$/u.test('𝌆') // true

/^.$/.test('𝌆') // false

```