import React from 'react';
import ReactDOM from 'react-dom';
import './search.css';
import logo from './logo.jpg';

class Search extends React.Component {
  render() {
    return <div> 
      Search Component? 23biubiubiu, it ?
      <img src={logo}/>
      <span>chunhash</span>
      </div>
  }
}

ReactDOM.render(
  <Search/>,
  document.getElementById('root')
)