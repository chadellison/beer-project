import React, { Component } from 'react';
import '../App.css';

export default class Nav extends Component {
  render() {
    return (
      <ul className="nav-bar">
        <li><a href="#">beer type</a></li>
        <li><a href="#">sort beers</a></li>
        <li><a href="#">add a beer</a></li>
        <li><input placeholder="search beers"></input></li>
      </ul>
    )
  }
}
