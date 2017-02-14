import React, { Component } from "react"
import "../App.css"

export default class Login extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a href="#" onClick={this.props.handleLogin}>login </a>
    )
  }
}
