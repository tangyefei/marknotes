## 20 使用Next.js创建React同构应用

### 同构应用的概念

即第一次请求的时候，服务器返回包含了CSS、JavaScript在内的内容的应用。

虽然React机制支持服务端渲染，但是自己进行Webpack配置会比较繁琐，Next.js能将你从中解放出来。

### Next.js的基本用法

使用Next.js创建应用有一些基本规则

1. 页面对应的是在pages目录下的组件
2. static目录用于映射静态文件
3. page具有特殊静态方法 getInitialProps

我们按照 [官网getting-started](https://nextjs.org/learn/basics/getting-started/setup)首先继续安装和目录准备：

```
cd Nextjs
npm init -y
npm install --save react react-dom next
mkdir pages
mkdir static
```

```
// package.json

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"dev": "next",
"build": "next build",
"start": "next start"
},
```


```
// pages/index.js
import Link from 'next/link';

export default () =>
  <div>
    <img src='/static/nextjs.png'></img>
    <nav>
      <Link href="/about" prefetch>About</Link>
    </nav>
    <p>Welcome to next.js</p>
  </div>
```

```
// pages/about.js
export default () => 
  <div>
    About
  </div>
```

启动 npm run dev就可以访问到服务端渲染出来的页面


注：作者举的例子其实完全不能体现同构应用/服务端渲染的价值所在。

另外作者还介绍了：

(1) 在components文件夹下新建普通的React组件，然后引入使用它。

(2) 使用next.js提供的dynamic语法引入一个组件，该组件只会在使用的时候加载。


 考虑到讲解的很粗略，没有太多记录的价值，存留印象有使用需要的时候再查阅[Next.js](https://nextjs.org/)即可。