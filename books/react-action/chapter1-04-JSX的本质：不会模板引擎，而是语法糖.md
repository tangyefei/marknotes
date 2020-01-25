## 04 JSX的本质：不会模板引擎，而是语法糖

### 创建组件的两种方式

```
const name  ='yefei'
const element = <h3>Hello, {name}</h3>;
```

等价于

```
const name  ='yefei'
const element = React.createElement(
	"h3",
	null
	"hello",
	name
)
```

同样，可以基于comment-box的例子，看到两种书写组件的方式都是可以的：

![方式定义组件1](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/react-action/1st-way-to-write-component.jpeg)
![方式定义组件2](https://blog-1258030304.cos.ap-guangzhou.myqcloud.com/books/react-action/2nd-way-to-write-component.jpeg)

### 在JSX中的用法

React提供了接近JS原生的方式来书写界面。唯一特殊的是需要使用一个大括号，其他的都跟普通的JS没有区别。下面列举了一些常见用法：

**JSX本身也是表达式**

```
const element = <h1>Hello, world!</h1>
```
**在属性中使用表达式**

```
<MyComponent foo={1+2+3+4}/>
```
**延展属性**

```
const props = {firstName: "yefei", lastName: "tang"}
const greeting = <Greeting {...props} />
```
**表达式作为子元素**

```
const element = <li>{props.message}</li>
```

### JSX优点

1. 声明式创建界面的直观
2. 代码动态创建界面的灵活
3. 无需学v新的模板语言

### 约定：自定组件以大写字母开头

1. React认为小写的tag是原生DOM节点如div
2. 大写字母开头为自定义组件
3. JSX标记可以直接使用属性语法，例如`<menu.Iitem />`
