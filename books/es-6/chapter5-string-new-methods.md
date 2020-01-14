# 字符串的新增方法

1. String.fromCodePoint()

ES6 提供了fromCodePoint()方法，可以识别大于0xFFFF的字符，弥补了String.fromCharCode()方法的不足。

```
String.fromCodePoint(0x20BB7)
// "𠮷"
```

2. String.raw()

该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。

```
String.raw`Hi\n${2+3}!`
// 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"
```

3. 实例方法：codePointAt() 

ES6 提供了codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。

```
let s = '𠮷a';

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271
```

4. 实例方法：normalize()

ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。

```
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
```

5. 实例方法：includes(), startsWith(), endsWith() 

- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。


这三个方法都支持第二个参数，表示开始搜索的位置，注意看endsWith的调用（5代表该位置是最后一个字符）：

```
let s = 'Hello world!';
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

6. 实例方法：repeat()

repeat方法返回一个新字符串，表示将原字符串重复n次

```
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

7. 实例方法：padStart()，padEnd()


ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。

```
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

8. 实例方法：trimStart()，trimEnd()


ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。

```
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```

9. 实例方法：matchAll() 

matchAll()方法返回一个正则表达式在当前字符串的所有匹配，结果是一个遍历器，可以通过next()语法访问匹配的结果。参数仍旧受到`g`标志符的控制。