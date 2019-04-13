# Webpack Using Guides

## Concepts

webpack是个JavaScript应用程序的模块打包工具，能将项目的依赖关系构建成图谱。

它的核心概念包括：

- Entry：定义打包的入口位置，即从哪个文件开始收集打包的引用关系。
- Output：打包好的文件的存放位置和命名。
- Loaders：允许对非JS/JSON的文件进行打包，需要配置test和use分别定义文件规则和loader
- Plugins：会用于执行更广泛的任务比如打包文件的优化等，需要require引入并且用new构造实例
- Mode：可以配置为development, production 或 none 来达成不同程度的优化


## Getting Started

