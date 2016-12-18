import React, { Component } from 'react';
import logo from '../logo.svg';
import beer from '../beer.png';
import '../App.css';

export default class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <img src={beer} className="beer-profile" alt="beer" />
        <h2>The Beer Project</h2>
      </div>
    )
  }
}
