import React, { Component } from "react"
import "../App.css"

export default class Logout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a href="#" onClick={this.props.handleLogout}>logout </a>
    )
  }
}