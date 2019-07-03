# CSS揭秘


## 前言

衡量一个人是否精通CSS的标准是什么呢，作者给出了自己的标准：在保证DRY（dont repeat yourself)的前提下，可维护性、灵活性、轻量级并且极可能符合标准的前提下，把手中这些CSS特性转化为网页中的各种创意。

本书不是按照字母顺序记载CSS特性的书，而死帮你补充知识断档，了解全新的方法的书。其核心目的是如何用CSS解决难题，并且会将每个技巧背后的思考讲出来。

## 本书是怎样炼成的

O'Reilly专门为出版图书搭建了一个叫做 Atlas（http://atlas.oreillly.com)的系统用于写书，并且对公众开放。

作者使用的是 Espresso（http://macrabbit.com.espresso)这款文本编辑器写就的全书。

## 关于本书

本书47篇攻略放在7章中彼此独立，可以按照任意顺序进行阅读。

每篇攻略会附上一个在线示例，链接大概是  play.csssecrets.io/polka

## 第1章 引言

### Web标准，是敌还是友

#### 标准的制定过程

随着内容的增多CSS被打散到了不同的规范中，每个模块可以独立更新版本，比如语法、层叠与继承、颜色、选择符等等，具体可以参考该部分。

#### 浏览器前缀

开发者没有动力去使用在生产环境中还不支持的特性，如果支持了一旦标准右边网站又会变得不可用，浏览器前缀一种饱受诟病的应对策略，通过浏览器厂商实现带前缀的写法来来促进对新特性的使用，而无前缀的标准会考虑各个厂商的实现效果来补充无前缀的实现，等到支持以后就可以将前缀去除。常见的有 Firefox的 -o-，Safari和Chrome的-webkit-，IE的-ms-。

为什么将不带前缀的实现放在最后一行呢，个人认为浏览器自己的实现绝效果对是最合适的 ，优先使用自己标准的，直到统一标准出来再关闭自己的前缀写法的支持即可过度。



### CSS编码技巧

#### 尽量减少代码的重复
- 某些值相互依赖时，应该用相互关系用代码表示出来，比如字体和行高的关系
- 需要知道什么东西是真正相关的，比如padding, border-radius, box-shadow, text-shadow,  line-height等这些单位都可以通过使用非固定数值的单位（% em rem）在 font-size 发生变化时候触发更少的代码修改。

TODO line-height % em rem的使用学习


#### 合理使用简写
#### 我应该使用预处理器吗




