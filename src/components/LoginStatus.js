import React, { Component } from "react"
import "../App.css"

export default class LoginStatus extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a href="#" onClick={this.props.handleLoginForm}>login</a>
    )
  }
}
