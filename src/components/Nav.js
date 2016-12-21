import React, { Component } from 'react';
import '../App.css';
import Dropdown from './dropdown.js';

export default class Nav extends Component {
  handleDropdown() {
    alert("this is the dropdown")
  }

  render() {
    return (
      <ul className="nav-bar">
        <li><a href="#"><Dropdown /></a></li>
        <li><a href="#" onClick={this.handleDropdown}>sort beers</a></li>
        <li><a href="#" onClick={this.handleDropdown}>add a beer</a></li>
        <input placeholder="search beers"></input>
      </ul>
    )
  }
}
