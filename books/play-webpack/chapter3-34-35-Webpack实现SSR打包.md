# Webpack实现SSR打包

其主要过程是，修改组件（React）的代码使用CommonJS的方式进行导入导出，打包成js，然后通过加载html模板，然后把组件代码基于 react/server的renderHTML生成字符插入到html中。

存在的问题在于一些window/document变量可能无法识别（通过给global标记window/document空对象），以及如何加载CSS和初始化的数据（视频的做法是加载到内容，模板字符串的方式嵌入到文档中）。

注：因为工作中应用场景用不到，暂不细致记录。