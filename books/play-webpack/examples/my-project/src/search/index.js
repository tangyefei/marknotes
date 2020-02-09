import React from 'react';
import ReactDOM from 'react-dom';
import './search.css';
import logo from './logo.jpg';
import common from '../../common/index';
import { a } from './tree-shaking'

class Search extends React.Component {
  render() {
    return <div> 
      Search Component?
      <img src={logo}/>
    </div>
  }
}

ReactDOM.render(
  <Search/>,
  document.getElementById('root')
)
