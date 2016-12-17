import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // grab ajax of all the beers upon page load
  fetchBeers() {
    return [
      <li>beeeeeeer 1</li>,
      <li>bee2222r 2</li>,
      <li>beeeeer 3</li>,
      <li>beeer 4</li>,
      <li>beeeeeer 5</li>,
      <li>beer 6</li>,
      <li>beeeeeeer 7</li>,
      <li>beer 8</li>,
      <li>beer 9</li>,
      <li>beer 10</li>,
      <li>beer 11</li>,
      <li>beer 12</li>,
      <li>beer 13</li>,
      <li>beer 14</li>,
      <li>bee3eeeer 15</li>,
      <li>b3333333r 16</li>,
      <li>beer 17</li>,
      <li>beer 18</li>,
      <li>beer 19</li>,
      <li>beer 20</li>,
      <li>beer 21</li>,
      <li>beer 22</li>,
      <li>superb beer 23</li>
    ]
  }

  navItems() {
    return [
      <li><a href>beer type</a></li>,
      <li><a href>sort beers</a></li>,
      <li><a href>add a beer</a></li>,
      <li><input placeholder="search beers"></input></li>
    ]
  }
  render() {
    // assign to const
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the Beer Project</h2>
        </div>

        <ul className="nav-bar">
          {this.navItems()}
        </ul>

        <p className="App-intro">
          <strong>Make wise beer selections</strong>
        </p>
        <ul className="beers">
          {this.fetchBeers()}
        </ul>
        <div className="App-footer">
        </div>
      </div>
    );
  }
}

export default App;
