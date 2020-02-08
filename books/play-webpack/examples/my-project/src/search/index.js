import React from 'react';
import ReactDOM from 'react-dom';
import './search.css';
import logo from './logo.jpg';
import common from '../../common/index';

class Search extends React.Component {
  render() {
    return <div> 
      Search Component? 23biubiubiu, it ?
      {common()}
      <img src={logo}/>
      <span>chunhash</span>
      </div>
  }
}

ReactDOM.render(
  <Search/>,
  document.getElementById('root')
)
