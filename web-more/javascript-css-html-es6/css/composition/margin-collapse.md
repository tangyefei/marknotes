## margin collapse


[Mastering_margin_collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)

非常粗略的总结（文章又进行非常详细的说明）:
  
- 发生在margin-top和margin-top，margin-left和margin-right是不存在collapse的
- case1: 相邻的元素之间
- case2：父元素和它的第一个或者最后一个元素，之间没有 padding、border、 inline内容、没有形成`block formatting context`
- case3：空元素的没有case2中的内容隔开（自己尝试并没有发生collapse)

