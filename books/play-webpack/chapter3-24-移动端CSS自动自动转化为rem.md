## 23 24-移动端CSS自动自动转化为rem

关于rem，可以参考这篇[译文](https://www.jianshu.com/p/d110411510a1)


### px to rem
本篇介绍的做法是如何将代码中自己写的px替换成rem，首先安装px2rem

```
npm i px2rem-loader -D
```

然后修改配置，remUnit表示多少像素转化为一个rem

```

    {
      test: /\.css$/, use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        {
          loader: 'px2rem-loader',
          options: 
          {
            remUnit: 16,
            remPrecision: 8
          }
        }
      ]
    }, 
```

### html动态font-size

我们希望不同的设备上，html上有不同的font-size，可以使用媒体查询自己做，作者介绍了引入lib-flexible的方式。

关于为什么是直接html中插入源码，而不是在js中引用？


因为bunde.js文件会被插入到body结束前，时间太晚了，我们希望在CSS被解析、DOM被渲染前，就去修改html的font-size大小。而Webpack视频可到这里还没介绍怎么内联插入JavaScript，因此x用了先通过`npm i lib-flexible -S`安装，然后拷贝源码在head的script中粘贴的方式。

思考：课程评论区很多说法是，不推荐使用rem，更推荐用vw，你怎么看？
