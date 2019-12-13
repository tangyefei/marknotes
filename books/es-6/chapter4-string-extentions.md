# 字符串扩展

> 1. 字符的 Unicode 表示法
2. 字符串的遍历器接口
3. 直接输入 U+2028 和 U+2029
4. JSON.stringify() 的改造
5. 模板字符串
6. 实例：模板编译
7. 标签模板
8. 模板字符串的限制


## 1. 字符的 Unicode 表示法

在JavaScript中，码点不在\u0000~\uFFFF之间字符需要使用两个双字节的形式表示：

```
"\uD842\uDFB7" // "𠮷"
```

ES6扩展了编码的表示方式，可以直接使用码点来表示一个四字节的字符：

```
'\u{1F680}' === '\uD83D\uDE80'
// true
```

至此一个字符的表示方法有6中：

```
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```

## 2. 字符串的遍历接口

ES6为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历。这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。

```
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
```

## 3. 直接输入 U+2028 和 U+2029 

JavaScript中规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。举例来说，字符串里面不能直接包含反斜杠，一定要转义写成‘\\’或者‘\u005c’。

- U+005C：反斜杠（reverse solidus)
- U+000D：回车（carriage return）
- U+2028：行分隔符（line separator）
- U+2029：段分隔符（paragraph separator）
- U+000A：换行符（line feed）

规定本身没有问题，麻烦在于 JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。这样一来，服务器输出的 JSON 被JSON.parse解析，就有可能直接报错。

JSON 格式已经冻结（RFC 7159），没法修改了。为了消除这个报错，ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。

另外，正则表达式依然不允许直接输入这两个字符，这是没有问题的，因为 JSON 本来就不允许直接包含正则表达式。

## 4. JSON.stringify() 的改造 

根据标准，JSON 数据必须是 UTF-8 编码。但是，现在的JSON.stringify()方法有可能返回不符合 UTF-8 标准的字符串。

为了确保返回的是合法的 UTF-8 字符，ES2019 改变了JSON.stringify()的行为。如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。


```
JSON.stringify('\u{0061}') // "a"
JSON.stringify('\u{D834}') // ""\\uD834""
```

## 5. 模板字符串


### 基本用法


```
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

// 多行字符串，所有的空格和缩进都会被保留在输出之中
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`);
```
### 高级用法

```
// 模板字符串甚至还能嵌套
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;

const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));
```


## 6. 实例：模板编译

举例如何通过模板字符串，生成正式模板的实例。

```
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;

function compile(template){
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  let script =
  `(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return script;
}

let parse = eval(compile(template));
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });

//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul>

```



## 7. 标签模板

标签模板函数调用的一种特殊形式，它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。


```
alert`123`
// 等同于
alert(123)
```

### 模板字符里面有变量

```
function tag(stringArr, ... values){}

let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;

// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```

第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分，为什么第一个参数最后一个变量是`''`，因为`${ a * b }` 被夹在了 `'world'`和`''`之间。


如下是一个更复杂的例子，一次遍历第一个参数和后续参数，组装成想要的输出结果

```
let total = 30;
let msg = passthru`The total is ${total} (${total*1.05} with tax)`;  // "The total is 30 (31.5 with tax)"

function passthru(literals, ...values) {
  let output = "";
  let index;
  for (index = 0; index < values.length; index++) {
    output += literals[index] + values[index];
  }

  output += literals[index]
  return output;
}
```

围绕模板编译，可以找到一些使用的场景，比如过滤HTML字符串、多语言处理，甚至可以实现更复杂的循环和条件判断，更甚者可以基于实现的函数来模拟执行其他语言的代码，具体不赘述可以有兴趣再看。

## 8. 模板字符串的限制


ES2018 放松了对标签模板里面的字符串转义的限制。如果遇到不合法的字符串转义，就返回undefined，而不是报错，并且从raw属性上面可以得到原始字符串。



























