# 38 构建配置包设计

有四个方案可以用来进行项目的配置：

1. 多个多个配置文件来指定不同环境的构建，使用--config参数进行控制
2. 将构建配置设计成一个库，比如 hjs-webpack
3. 将构建抽成一个工具，比如 create-react-app
4. 将所有配置文件放在一个文件，通过--env参数进行选择

本章会主要围绕第1、2种方式进行介绍，第1种方式在前述内容其实已经在这么做了，配置文件被拆分成了如下四个文件 

```
webpack.base.config.json
webpack.dev.config.json
webpack.prod.config.json
webpack.ssr.config.json
```

通过require基础配置，然后使用webpack提供的merge函数，将多个配置进行合并。