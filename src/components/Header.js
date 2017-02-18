import React, { Component } from 'react';
import logo from '../logo.svg';
import beer from '../beer.png';
import '../App.css';

export default class Header extends Component {
  render() {
    return (
      <div className="appHeader">
        <img src={beer} className="beerProfile" alt="beer" />
        <h2 className="title">The Beer Project</h2>
      </div>
    )
  }
}
