import React, { Component } from "react"
import "../App.css"

export default class SignUp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a href="#" onClick={this.props.handleSignUp}>sign up</a>
    )
  }
}
