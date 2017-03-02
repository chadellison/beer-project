import React, { Component } from 'react';
import logo from '../logo.svg';
import beer from '../beer.png';
import "../header.css"
import '../App.css';

export default class Header extends Component {
  render() {
    let opacity = ""
    if(this.props.loginFormActive || this.props.signUpFormActive) {
      opacity = " opaque"
    }
    return (
      <div className={"appHeader" + opacity}>
        <img src={beer} className="beerProfile" alt="beer" />
        <h2 className="title">The Beer Project</h2>
      </div>
    )
  }
}
