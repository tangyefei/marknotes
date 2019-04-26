# 关于事件处理的一些总结

假定我们有如下的dom结构

```
<div class="container">
  <div class="article-list>
    <div class="article">
      <h3 class="title">召开了大会</h3> 
      <p class="desc">会议主要介绍了若干事项</p> 
    </div>
    <div class="article">
      <h3 class="title">召开了大会</h3> 
      <p class="desc">会议主要介绍了若干事项</p> 
    </div>
  </div>
</div>
```

article 列表是动态渲染出来的，我们希望在点击 article 的时候，进行跳转处理，自己用代码实现delegate：

```
$ = function(dom) {
  this.dom = dom;
}
$.prototype.delegate(event, selector, handler) {
  this.dom.addEventListener(event, function(evt){
    var nodelist = document.querySelectorAll(selector);
    var node = Array.prototype.find.call(nodelist, function(e){
      return e == evt.target;
    });
    if(node) {
      handler(evt);
    }
  })
  return this;
}
```

实际调用代码如下会发现点击在 title 上的时候不会触发函数

```
$(document.querySelector('container')).delegate('click', '.article', function(){
  //
});
```

分析得出结论是，从 title 上触发的时间，一直冒泡到 .container 才被捕获，捕获以后判定的是 
  `event.target is selectorNode`
实际上，判定应该做的是  
  `event.target is selectorNode or child of selectorNode`

这样，当我们点击的是 .title 得到的 event.target 是 dom.title，点击的 .article 的时候得到的dom是 dom.article，并且都能执行处理。

但是要注意，event.target 的不同指向，处理上会有所不同。