import React, { Component } from "react"
import "../App.css"

export default class CustomNotification extends Component {
  render() {
    return (
      <div className="notification">
        <h3>{this.props.notificationText}</h3>
        <button className="notificationButton" onClick={this.props.closeNotification}>OK, Got it!</button>
      </div>
    )
  }
}
