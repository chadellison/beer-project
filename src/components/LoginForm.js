import React, { Component } from "react"
import "../App.css"

export default class LoginForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="loginForm">
        <h4 className="label">Email</h4>
        <input className="loginEmail" onChange={this.props.handleEmail}></input>
        <h4 className="label">Password</h4>
        <input className="loginPassword" type="password" onChange={this.props.handlePassword}></input>
        <button className="submit" onClick={this.props.handleLogin}>Login</button>
        <button className="cancelLoginMenu" onClick={this.props.handleLoginCancel}>Cancel</button>
        <button className="">Sign Up</button>
      </div>
    )
  }
}
