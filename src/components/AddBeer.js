import React, { Component } from "react"

export default class AddBeer extends Component {
  render() {
    return (
      <a href="#" onClick={this.props.toggleNewBeerMenu}>add beer</a>
    )
  }
}
