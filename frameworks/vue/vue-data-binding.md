
![data-binding](./23/data-binding.png)

有这样一个需求，左侧菜单点击展开右侧菜单，右侧菜单点击又可以垂直展开第三级菜单，为了展开第三级，第二级的菜单中设计了添加一个变量用于控制展开和收起的状态，无样式的代码如下：

```

<body>
  <div id="app">
      <nav>
        <ul class="first-menu">
          <li v-for="(item,index) in menus" :key="item.name" @click="setSecondMenu(item)"> {{item.text}} </li>
        </ul>
        <ul class="second-menu">
          <li v-for="right in secondMenus" :key="right.name" @click="toggleThirdMenu(right)">
            {{right.text}}：{{right.expand}}
          </li>
        </ul>
      </nav>
      
  </div>
  
  <script>
    var app = new Vue({
      el: '#app',
      data() {
        let menus = [{
          text: "产品",
          name: "product",
          children: [{
            name: "product_manage",
            text: "产品方案管理"
          }, {
            name: "activity_manage",
            text: "市场活动管理"
          }],
          
        }, {
          name: "sales",
          text: "销售",
          children: [{
            name: "customer_manage",
            text: "客户管理"
          }],
        }];
        return {
          menus,
          secondMenus: [],
        }
      },
      methods: {
        setSecondMenu(menu) {
          menu.children.forEach(d => d.expand = false)
          this.secondMenus.splice(0);
          this.secondMenus.push(...menu.children);
        },
        toggleThirdMenu(menu) {
          menu.expand = !menu.expand;
        }
      }
    })
</script>
</body>
```

在点击了第一级的菜单后，我们给第二级的菜单进行赋值，在赋值前给菜单设置了 `expand: false` 的初始值。再点击第二级菜单的时候，期望修改 expand 的值，来达到伸缩第三级的目的，但实际发现 expand 在界面上根本没有生效，菜单上始终展示的是false。

最后调试的结果基本可以确定：在 menus 中已经对数据进行了侦听，再将其中对象的children设置`expand:false` 并且赋值给secondMenus，Vue不会对新增加的expand的字段进行侦听。因为menus中的侦听，已经包含了对该子结构的侦听


解决办法有多种：

（1）在menus中定义所有的需要使用expand的结构中，增加`expand:false`，从而一开始就会侦听


```
let menus = [{
  text: "产品",
  name: "product",
  children: [{
    name: "product_manage",
    expand: false,
    text: "产品方案管理"
  }, {
    name: "activity_manage",
    expand: false,
    text: "市场活动管理"
  }],
  
}, {
  name: "sales",
  text: "销售",
  children: [{
    name: "customer_manage",
    expand: false,
    text: "客户管理"
  }],
}];
    
```
（2）在设置secondMenus的时候，不要直接使用menus中的数据，而是进行复制后再给secondMenus，从而让Vue进行新的侦听：

```
setSecondMenu(menu) {
  let menus = menu.children.map(d => Object.assign({expand: false}, d));
  this.secondMenus.splice(0);
  this.secondMenus.push(...menus);
},
```

（3）是否可以通过 $set方式来给 secondMenus 中需要出发改变的对象来赋值呢？答案是可以的：

```
toggleThirdMenu(menu) {
	this.$set(menu, 'expand', !menu.expand);
}
```

最后发现一个比较有意思的地方，第三个解决方案中我们将如下代码进行修改，会发现更改不再生效：

```
toggleThirdMenu(menu) {
  menu.expand = !menu.expand;
  console.log('menu.expand = ' + menu.expand)
  this.$set(menu, 'expand', menu.expand);
}
```

尽管随机进行的console发现是改变后的值，但是在$set的设置无效。可能需要对原理有更深的理解才能解释。
