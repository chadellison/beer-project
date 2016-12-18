import React, { Component } from 'react';
import '../App.css';

export default class Nav extends Component {
  handleDropdown() {
    alert("this is the dropdown")
  }

  render() {
    return (
      <div className="nav-bar">
        <a href="#" onClick={this.handleDropdown}>beer type</a>
        <a href="#" onClick={this.handleDropdown}>sort beers</a>
        <a href="#" onClick={this.handleDropdown}>add a beer</a>
        <input placeholder="search beers"></input>
      </div>
    )
  }
}
