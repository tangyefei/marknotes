## 17-解析图片和字体文件

### 解析图片

```
npm install file-loader -D
```

```
{
  test: /\.(png|jpe?g|gif)$/i, loader: 'file-loader'
}
```

拷贝图片logo.jpg到src文件夹下，然后在 search.js中引入使用


```
// 省略了无关代码

import logo from './logo.jpg';

class Search extends React.Component {
  render() {
    return <div>
      <img src={logo} />
      Search Component
      </div>
  }
}
```

### 解析字体

仍旧使用file-loader来解析字体，先在自己项目文件夹下面寻找到一个字体文件 fontawesome-webfont.woff 拷贝到src目录下，然后修改css引用该字体文件：



```
@font-face {
  font-family: 'awesome';
  src: url("./fontawesome-webfont.woff");
}

div {
  font-size: 20px;
  color: red;
  font-family: 'awesome';
}
```

然后在配置文件中增加对字体文件格式的解析：

```
{
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: ['file-loader']
}
```

注：随便拷贝的图标字体未必会有效果，因为必须出现对应字符才能到效果。

### 使用url-loader

url-loader内部也是使用的file-loader，可以处理图片和字体，可以正对较小资源自动base64

同样是加载图片，我们尝试用url-loader加载，并将大小比10Kb小的图片都加载为base64

```
{
  test: /\.(png|jpe?g|gif)$/i,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 10240
    }
  }]
}
```

执行打包命令，可以发现没有打包出来图片文件，而是js文件大小变大了。
