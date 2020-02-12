import React from 'react';
import ReactDOM from 'react-dom';
import './search.css';
import logo from './logo.jpg';
import common from '../../common/index';
import { a } from './tree-shaking'

class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      Text: null
    }
    this.loadComponent = this.loadComponent.bind(this);
  }
  loadComponent()  {
    import("./text.js").then(Text => {
      this.setState({
        Text: Text.default
      })
    })
  }
  render() {
    const {Text} = this.state;
    return <div> 
      Search Component?
      <img src={logo}/>
      <button onClick={this.loadComponent}>加载</button>
      {Text ? Text : null}
    </div>
  }
}

ReactDOM.render(
  <Search/>,
  document.getElementById('root')
)
