## 21 使用Jest, Enzyme等工具进行单元测试

React很方便进行单元测试的原因：

1. 很少需要访问浏览器API
2. 虚拟DOM尅在NodeJS环境中运行和测试
3. Redux隔离了状态管理，纯数据层的单元测试

单元测试涉及的工具：

1. Jest：Facebook官方提供的单元测试框架
2. JS DOM：模拟浏览器环境
3. Enzyme：airbnb提供
4. nock：模拟http请求
5. sinon：函数模拟和调用跟踪（确保界面操作调用到了对应的function）
6. istanbul：单元测试覆盖率分析