## 16-解析CSS、Less和Sass

### 解析CSS

需要被依赖的两个loader，分别是 css-loader，style-loader

css-loader 用于夹杂.css文件，转化成commonjs对象

style-loader 将样式通过`<style>`标签插入到head中

安装它们后，在配置文件中增加对css文件的rule

```
npm i css-loader style-loader -D
```

```
{
  test: /\.css$/, use: ['style-loader','css-loader']
}
```

注：loader的解析顺序是从右到做，即先使用css-loader读取css文件，在用style-loader插入。

### 解析Less、Sass

解析less，需要安装后在loader的use中中增加一个less-loader即可

```
npm i less less-loader -D
```

```
{
  test: /\.less$/, use: ['style-loader','css-loader', 'less-loader']
}
```

解析scss也是同理，安装后在loader的use中增加sass-loader的处理即可


```
npm i sass-loader node-sass -D
```

```
{
  test: /\.sass$/, use: ['style-loader','css-loader', 'sass-loader']
}
```

扩展：[https://nordschool.com/css-in-react/](https://nordschool.com/css-in-react/) 总结了在React中使用CSS的若干中方式。