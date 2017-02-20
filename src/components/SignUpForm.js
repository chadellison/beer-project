import React, { Component } from "react"
import "../App.css"

export default class SignUpForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="credentialForm">
        <h4 className="label">Email</h4>
        <input className="credentialEmail" onChange={this.props.handleEmail}></input>
        <h4 className="label">Password</h4>
        <input className="credentialPassword" type="password" onChange={this.props.handlePassword}></input>
        <button className="signUpSubmit" onClick={this.props.handleSignUp}>Sign Up</button>
        <button className="cancelSignUpMenu" onClick={this.props.handleCancel}>Cancel</button>
      </div>
    )
  }
}
