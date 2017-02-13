import React, { Component } from "react"
import "../App.css"

export default class NewBeerNotification extends Component {
  render() {
    return (
      <div className="notification">
        <h3>"Your submission is pending approval. Cheers!"</h3>
        <button onClick={this.props.closeNotification}>OK, Got it!</button>
      </div>
    )
  }
}
