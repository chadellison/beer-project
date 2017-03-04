import React, { Component } from "react"
import "../loginStatus.css"

export default class LoginStatus extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a href="#" onClick={this.props.handleLoginForm} className="loginStatus">login</a>
    )
  }
}
