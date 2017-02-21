import React, { Component } from "react"
import "../App.css"

export default class SignUpNotification extends Component {
  render() {
    return (
      <div className="notification">
        <h3>"An email to confirm your account has been sent"</h3>
        <button onClick={this.props.closeNotification}>OK, Got it!</button>
      </div>
    )
  }
}
