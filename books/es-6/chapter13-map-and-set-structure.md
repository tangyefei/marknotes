# Set和Map数据结构

> 1. Set
2. WeakSet
3. Map
4. WeakMap

## 1. Set

### 基本用法

- 使用 add 方法添加，使用size获取长度，使用for...of遍历
- 数组或者具有 iterable 接口的数据都可以作为Set的参数
- 检验重复的算法和 === 类似，唯一不同是它会认为NaN是同一个，

```
const s = new Set();
[2, 3, 2].forEach(x => s.add(x));

items.size // 2

for (let i of s) {
  console.log(i); // 2 3 5 4
}

const set = new Set(document.querySelectorAll('div'));
set.size // 56

[...new Set('ababbc')].join('')
// "abc"

let set = new Set();
set.add(NaN).add(NaN); // Set {NaN}
set.add({}).add({}); // Set {NaN,{...},{...}}
```

### 属性和方法

- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set实例的成员总数。
- Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
- Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
- Set.prototype.clear()：清除所有成员，没有返回值。

Array.from方法可以将 Set 结构转为数组，下面的例子还提供了去重的逻辑。

```
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]
```