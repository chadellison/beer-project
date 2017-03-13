import React, { Component } from "react";
import "../intro.css"

export default class Header extends Component {
  render() {
    let opacity = ""
    if(this.props.loginFormActive || this.props.signUpFormActive) {
      opacity = " opaque"
    }

    return (
      <p className={"appIntro" + opacity}>
        <strong>Search and rate awesome beers</strong>
      </p>
    )
  }
}
