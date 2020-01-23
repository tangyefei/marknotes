
## Webpack使用dev-server和watch的异同

1. 使用 `webpack-dev-server --open` 和 `webpack --watch`开发的差异


使用`webpack --watch`则相当于是将相关内容打包到了dist目录，代码发生变化的时候也可以对资源进行动态刷新，但是页面还是需要自己刷新的。

使用`webpack-dev-server`意味着在nodejs的一个server，它会将entry打包然后插入到output的html中，对于引用的任何资源的变化，它能监听你代码的改动并做到实时刷新，方便在开发阶段。`注：在dist目录下是看不到js、css、image文件的，可以假定它是在某个它自己的目录下host了一份并且会及时刷新？`

在官方文档中，这两种方式都是为了避免手动刷新的办法，




