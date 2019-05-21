# 第20周技术周报

## 1. 在Vue中渲染大量数据的性能问题

### a. 问题

项目中使用ElementUI的 el-cascader 组件渲染数据，数据总共分三层，总计2400多个节点，发现在某些页面切换的过程中会CPU占用高达100%，最后用 Chrome Devtools 的 Performance 定位到基本在数据量太大导致。

### b. 解决

#### 方法1：使用动态加载子级别选项

参考[ISSUE](https://github.com/ElemeFE/element/issues?utf8=%E2%9C%93&q=cascader)中有不少人提起。

原理即渲染一颗主干树，没被展开的枝丫不在其中，随着操作动态去增减枝丫。

