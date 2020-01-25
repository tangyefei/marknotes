## 04 JSX的本质：不会模板引擎，而是语法糖

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
)
```
