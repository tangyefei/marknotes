## 29 Tree Shaking的使用和原理分析



### tree shaking

中文名为摇树优化，即把一个树中没用的叶子摇掉，对应代码就是把一个模块中没有用到的方法给擦除掉。

tree shaking 必须是ES6的语法，因为要依赖静态分析，CommonJS的语法不支持。


它应用的优化策略叫DCE（Dead code elimination），符合下述条件的代码会被擦除：

1. 代码不可到达，因此不会被执行，比如 if(false) 中的代码
2. 代码的执行结果不会被用到，被引用的模块方法没有被使用
3. 代码只会影响死变量，即该变量只读不写

tree shaking的原理是利用了ES6模块的静态分析：

1. import只能作为模块顶层出现
2. import的模块名只能是字符串常量
3. import的bingding immutable（绑定关系不可更改）

通常在打包阶段，会给没用到的代码在主时钟做一些标记，在uglify阶段会删除无用的代码。

### 实际应用


#### 未开启时

在项目文件夹下新建一个 tree-shaking.js，简单导出两个方法

```
// tree-shaking.js

export function a(){
	return 'module func a';
}
export function b(){
	return 'module func b';
}
```

设置webpack.prod.js中的mode为'none'，因为使用'production'是默认打开tree shaking的。

在我们的js中引用tree-shaking.js

```
import { a } from './tree-shaking'
```

执行打包命令后，去打包好的js中，根据输出的字符串可以搜索到两个方法。

#### 开启符合DCE时

开启mode为'production'，再执行打包命令，发现两个方法都搜索不到了。


在render函数中书写如下代码：

```
if(false) {
	console.log(a())
}
```

打包后仍旧看不到a代码的内容，因为满足了DCE的第一个条件。

#### 不符合DCE时候

我们尝试在search/inex.js的render总修改JSX：

```
// search/index.js

render() {
	return <div> 
	  {a()} Search Component?
	  <img src={logo}/>
	</div>
}
```

这时候再执行打包，可以在打包后的js中看到函数a，而看不到函数b。

### 关于tree shaking

tree shaking的代码，必须是无副作用的，即除了导出一个或多个变量外，不会做其他的事。

上例中我们通过开启 mode: 'production'就开启了tree-shaking功能，在具体配置中往往涉及到两个概念：sideEffects和usedExports（所熟知的tree shaking）。

感兴趣可以查阅[Webpack的文档:tree-shaking](https://webpack.js.org/guides/tree-shaking/)