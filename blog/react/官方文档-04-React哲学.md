## React 哲学

本篇将会通过 React 构建一个可搜索的产品数据表格来更深刻地领会 React 哲学。


假设我们已经有了一个返回 JSON 的 API，以及设计师提供的组件设计稿。如下所示：

![设计稿](https://react.docschina.org/static/thinking-in-react-mock-1071fbcc9eed01fddc115b41e193ec11-4dd91.png)


```
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```


### 第一步：将设计好的 UI 划分为组件层级


但你如何确定应该将哪些部分划分到一个组件中呢？你可以将组件当作一种函数或者是对象来考虑，根据单一功能原则来判定组件的范围。也就是说，一个组件原则上只能负责一个功能。如果它需要负责更多的功能，这时候就应该考虑将它拆分成更小的组件。


![设计稿拆分](https://react.docschina.org/static/thinking-in-react-components-eb8bda25806a89ebdc838813bdfa3601-82965.png)

我们将把它们描述为更加清晰的层级：

```
- FilterableProductTable
	- SearchBar
	- ProductTable
		- ProductCategoryRow
		- ProductRow
```

### 第二步：用 React 创建一个静态版本

props 是父组件向子组件传递数据的方式。即使你已经熟悉了 state 的概念，也完全不应该使用 state 构建静态版本。

```
function SearchBar(){
  return <div>
    <input type="text" placeholder="Search..." />
    <p><input type="checkbox" />Only show products in stock</p>
  </div>
}
function ProductCategoryRow(props){
  const category = props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
}
function ProductRow(props){
  const product = props.product;
  const name = product.stocked ?
    product.name :
    <span style={{color: 'red'}}>
      {product.name}
    </span>;

   return  <tr>
    <td>{name}</td>
    <td>{product.price}</td>
  </tr>
}

function ProductTable(props){
  const rows = [];
  let lastCategory = null;
  
  props.products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });
  
  return <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  </div>
}
class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
  }

  render() {
    return <div>
      <SearchBar></SearchBar>
      <ProductTable products={this.props.products}></ProductTable>
    </div>
  }
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS}/>,
  document.getElementById('root')
);
```
### 第三步：确定 UI state 的最小（且完整）表示

想要使你的 UI 具备交互功能，需要有触发基础数据模型改变的能力。React 通过实现 state 来完成这个任务。

我们的示例应用拥有如下数据：

1. 包含所有产品的原始列表（props）。它是由父组件传递而来，用props。
2. 用户输入的搜索词（state)。随着时间会变化，而且不是由其他数据计算而来，用state。
3. 复选框是否选中的值（state)。同2
4. 经过搜索筛选的产品列表。可以由原始列表和搜索词、复选框计算出来，用props。

### 第四步：确定 state 放置的位置


哪个组件应该拥有某个 state 这件事，对初学者来说往往是最难理解的部分。

一个原则是，放在会被使用的最顶层的组件，搜索词和复选框的值，因为会被FilterableProductTable用于筛选数据，因此会被存放在 FilterableProductTable 组件中。


```
class FilterableProductTable extends React.Component {
  constructor(props) {
	 // ...
    this.state = {filterText: '', inStockOnly: false}
  	 // ...
  }
  // ...
}
```

### 第五步：添加反向数据流

最后一步，每当用户改变表单的值，我们需要改变 state 来反映用户的当前输入。


1. 在SearchBar的表单中，设定输入框和勾选框初始值，并且绑定处理函数
2. 在SearchBar的自己的函数中，通过props去调用FilterableProductTable传递的方法
3. FilterableProductTable将对应的数据通过setState更新
4. FilterableProductTable中增加输入和勾选的变量传递到SearchBar和ProductTable
5. ProductTable中基于传入的变量，来控制展示的的内容


完整的例子：

```
class SearchBar extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    return <div>
      <input type="text" placeholder="Search..." 
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      <p><input type="checkbox" 
        checked={this.props.inStockOnly}
        onChange={this.handleInStockChange}/>Only show products in stock</p>
    </div>
  }
}
function ProductCategoryRow(props){
  const category = props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
}
function ProductRow(props){
  const product = props.product;
  const name = product.stocked ?
    product.name :
    <span style={{color: 'red'}}>
      {product.name}
    </span>;

   return  <tr>
    <td>{name}</td>
    <td>{product.price}</td>
  </tr>
}

function ProductTable(props){
  const rows = [];
  let lastCategory = null;

  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;
  
  props.products.forEach((product) => {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });
  
  return <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  </div>
}
class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filterText: '', inStockOnly: false}

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }


  render() {
    return <div>
      <SearchBar 
        filterText={this.state.filterText}
        inStockOnly={this.state.inStockOnly}
        onFilterTextChange={this.handleFilterTextChange}
        onInStockChange={this.handleInStockChange}></SearchBar>

      <ProductTable 
        products={this.props.products}
        filterText={this.state.filterText}
        inStockOnly={this.state.inStockOnly}
        ></ProductTable>
    </div>
  }
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS}/>,
  document.getElementById('root')
);

```

