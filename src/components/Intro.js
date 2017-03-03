import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    let opacity = ""
    if(this.props.loginFormActive || this.props.signUpFormActive) {
      opacity = " opaque"
    }

    return (
      <p className={"appIntro" + opacity}>
        <strong>Choose your beer wisely</strong>
      </p>
    )
  }
}
