import React, { Component } from "react"
import "../App.css"

export default class SignUpForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a href="#" onClick={this.props.handleSignUpForm}>sign up</a>
    )
  }
}
