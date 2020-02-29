# Set和Map数据结构

> 1. Set
2. WeakSet
3. Map
4. WeakMap

## 1. Set

### 基本用法

- 使用 `add` 方法添加，使用`size `获取长度，使用`for...of`遍历
- 数组或者具有 iterable 接口的数据都可以作为`Set `的参数
- 检验重复的算法和 === 类似，唯一不同是它会认为NaN是相等的

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

#### 数组去重

Array.from方法可以将 Set 结构转为数组，下面的例子还提供了去重的逻辑。

```
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]
```


## 2. WeakSet


### 语法

WeakSet无法通过`size `访问到容量，也无法通过`forEach `进行遍历，只有如下几个方法

- WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
- WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

个人对WeakSet在内存管理上的理解：

> 普通的数据结构，只要引用数量为0，内存就会释放，比如存在对象a，存在数组arr=[a]，对a的引用是2，通过设置`a=null`，a的引用被干掉了以后，对a的引用是1，不影响arr中访问数据a

> 在WeakSet，只要外部引用的数量为0，内存就会释放，比如存在对象a，存在set=new WeakSet([a])，对a的引用为2，a的引用被干掉了以后，对a的引用是1，因为它来自于set，所以会被释放

对如下最后一行代码中，仍旧有值在set中表示不解：

```
var set = new WeakSet() // WeakSet {}
var o = {value:1};
set.add(o); // WeakSet {{}}
o = null;
set // WeakSet {{}}
```

## 3. Map

### 含义和基本用法

Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应。

不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。

同一个键多次赋值，后面的值将覆盖前面的值。


```
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
```

只有对同一个对象的引用，Map 结构才将其视为同一个键。

```
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
```

Map 的键是一个简单类型的值的情况，使用的是`===`的算法（例外是NaN是不能通过===的，但get可以）

```
let map = new Map();

map.set(-0, 123);
map.get(+0) // 123

map.set(true, 1);
map.set('true', 2);
map.get(true) // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3
map.get(null) // 4

map.set(NaN, 123);
map.get(NaN) // 123
```

### 实例属性和操作方法

- size，返回成员的总数
- Map.prototype.set(key, value)，根据键名设置键值
- Map.prototype.get(key)，根据键名获取键值
- Map.prototype.has(key)，判定某个键是否在Map对象中
- Map.prototype.delete(key)，删除某个键，成功返回true
- Map.prototype.clear()，清除所有成员

### 遍历方法

- Map.prototype.keys()：返回键名的遍历器。
- Map.prototype.values()：返回键值的遍历器。
- Map.prototype.entries()：返回所有成员的遍历器。
- Map.prototype.forEach()：遍历 Map 的所有成员，Map 的遍历顺序就是插入顺序。


```
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```

forEach方法还可以接受第二个参数，用来绑定this。

```
const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};

map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);
```

### 与其他数据结构的互转


#### Map转为数组

```
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```
#### 数组转为Map

```
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
```
#### Map 转为对象

```
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

#### 对象转为 Map

```
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```

#### Map 转为 JSON

```
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```

Map 的键名有非字符串，这时可以选择转为数组 JSON。

```
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```
#### JSON 转为 Map

```
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```

整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。

```
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```

## WeakMap

### 语法差别

WeakMap的差别体现在
-（1）只能使用对象作为键名
-（2）WeakMap的**键名**所指向的对象，不计入垃圾回收机制。

操作上，一是没有遍历操作（即没有`keys()`、`values()`和`entries()`方法），也没有`size `属性。二是无法清空，即不支持`clear `方法。

### 示例

WeakMap中，对键名的外部引用被删除后，内存会被释放掉，但是我们因为无法再访问到这个键名，所以无法验证。一个方法是在nodejs中通过工具方法，来查看内存使用量，手动删除外部引用并执行垃圾回收以后，再看内存引用：

对于为什么要手动垃圾回收，其实不很理解，回收时机难道不是很频繁地么？

```
$ node --expose-gc
```

```
// 手动执行一次垃圾回收，保证获取的内存使用状态准确
> global.gc();
undefined

// 查看内存占用的初始状态，heapUsed 为 4M 左右
> process.memoryUsage();
{ rss: 21106688,
  heapTotal: 7376896,
  heapUsed: 4153936,
  external: 9059 }

> let wm = new WeakMap();
undefined

// 新建一个变量 key，指向一个 5*1024*1024 的数组
> let key = new Array(5 * 1024 * 1024);
undefined

// 设置 WeakMap 实例的键名，也指向 key 数组
// 这时，key 数组实际被引用了两次，
// 变量 key 引用一次，WeakMap 的键名引用了第二次
// 但是，WeakMap 是弱引用，对于引擎来说，引用计数还是1
> wm.set(key, 1);
WeakMap {}

> global.gc();
undefined

// 这时内存占用 heapUsed 增加到 45M 了
> process.memoryUsage();
{ rss: 67538944,
  heapTotal: 7376896,
  heapUsed: 45782816,
  external: 8945 }

// 清除变量 key 对数组的引用，
// 但没有手动清除 WeakMap 实例的键名对数组的引用
> key = null;
null

// 再次执行垃圾回收
> global.gc();
undefined

// 内存占用 heapUsed 变回 4M 左右，
// 可以看到 WeakMap 的键名引用没有阻止 gc 对内存的回收
> process.memoryUsage();
{ rss: 20639744,
  heapTotal: 8425472,
  heapUsed: 3979792,
  external: 8956 }
```


### 用途


#### DOM 节点作为键名的例子

```
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
}, false);
```

#### 部署私有属性

````
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE
```
