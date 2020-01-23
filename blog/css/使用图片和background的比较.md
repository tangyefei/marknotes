
## 使用img和background的比较

1. 有些场景既可以使用 `<img/>` 也可以使用 `background-image`，怎么选择？


[stackoverflow: when-to-use-img-vs-css-background-image](https://stackoverflow.com/questions/492809/when-to-use-img-vs-css-background-image)，提到了很多点。

关于使用 `<img/>` 比较重要的两点是：

- 如果你想在打印网页的时候包含图片（网页的打印有的浏览器默认是不包含 `<img/>` 的）
- 图片在网页中是有含义的部分（可以便利屏幕阅读者）时，比如公司logo、人物头像。

关于使用`background-image:` 

- 不是网页内容的一部分
- 想要在某些位置使用图片来替代一些文字展示

2. background-image的使用疑问

- 为什么 `background: url repeat width height / positionX positionY`的 positionX 和 positionY 在浏览器中无效？

暂为找到可重现的案例。

- `contain` 和 `cover` 有什么区别？

contain 图片内容完全被容纳在所在DOM内，如果比例不一致，会有留白无背景。
cover 图片覆盖的DOM所有位置，比例不一致的话，放大图片只用部分图片内容来达到全覆盖。

3. 使用background好 还是 展开式属性 ？

[CSS揭秘 第一章 CSS编码技巧](https://book.douban.com/subject/26745943/)

直接使用 background 可以避免自己漏写，并且可以清空所有其他相关属性，是一种良好的防卫性编码方式。如果在某些场景下，需要明确使用展开式属性去做覆盖并保留其他相关样式，就需要用到展开式属性。
