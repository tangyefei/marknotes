

# Css Attributes Comparation

参考

- [does-opacity0-have-exactly-the-same-effect-as-visibilityhidden](https://stackoverflow.com/questions/272360/does-opacity0-have-exactly-the-same-effect-as-visibilityhidden)
- [css3_animations_vs_transitions](https://www.kirupa.com/html5/css3_animations_vs_transitions.htm)

> opacity visibility display 有什么差别
- opacity 和 visibility 会仍旧占据空间，display没有
- opacity 会有事件 和 taborder，visibility 和 display 没有


> transition和animation有什么区别
- 共同点
  - 对某些特性进行监听设置时间从某个值变化到另一个值
  - 有持续时间
  - 带来可视化的样式改变
  - 能够通过代码来监控进程
- 区别
  - transition可以通过用户行为触发animation则没有
  - transition一次性animation则可以循环
  - transition是点到点的状态变化animation则是可以定义多个frame
  - transition可以通过JS比较方便操控属性改变，animation则比较麻烦
