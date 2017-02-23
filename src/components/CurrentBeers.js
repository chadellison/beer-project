import React, { Component } from "react"
import "../App.css"

export default class CurrentBeers extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a href="#" onClick={this.props.handleCurrentBeers}>{this.props.currentBeers}</a>
    )
  }
}
