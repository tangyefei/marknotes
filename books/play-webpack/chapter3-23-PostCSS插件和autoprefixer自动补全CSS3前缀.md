## 23 PostCSS插件和autoprefixer自动补全CSS3前缀


### CSS3的属性为什么要加前缀


CSS3属性没有完全成为标准之前，各家产商要用这个属性，但又不能把名字给占了，于是会加一个前缀表示这是自家实现。

等到通用标准支持了，把带前缀的支持干掉，就会自然应用不带前缀的版本了。

```
.box {
	-moz-border-radius
	-webkit-border-radius
	-o-border-radius
	border-radius: 10px;
}
```


### PostCSS插件

注：视频中的用法已经过时，本篇实时查询更新了用法：[参考](https://github.com/andyjansson/postcss-conditionals)。


跟Sass和Less不同，它们是预处理器；PostCSS是后置处理器。

思考：在下面的用法中为什么却是postcss-loader出现在最右边的。

```
npm i postcss-loader autoprefixer -D
```

在示例的CSS文件中加一个 `display: sticky`的属性.

新建文件 postcss.config.js用于指定postcss使用的配置

```
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

在webpack.prod.js中增加postcss-loader即可

```

    {
      test: /\.css$/, use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
      ]
    }, 
```

`npm run build` 可以看到打包出来的css包含了各种前缀。



