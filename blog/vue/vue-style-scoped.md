
## 4. vue style scoped

在项目中经常遇到引用某个第三方组件，想要覆写它的样式，如果自己的style中加了scoped，是没法生效的。实际看dom长这样 `<div data-v-7ba5bd90="" id="app">`，同样样式代码也被编译成了 `#app[data-v-7ba5bd90]{}`，这样防止了对其他的同样选择器的dom的污染。

scoped不会处理子组件中的dom，因此如果想让子组件能够样式被覆写，需要去掉scoped，在父级别加上合适的父级class防止污染到其他地方即可。
