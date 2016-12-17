import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

export default class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to the Beer Project</h2>
      </div>
    )
  }
}
