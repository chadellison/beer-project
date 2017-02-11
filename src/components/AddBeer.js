import React, { Component } from "react"
import "../App.css"

export default class AddBeer extends Component {
  render() {
    return (
      <a href="#" onClick={this.props.handleNewBeer}>add beer</a>
    )
  }
}
