import React, { Component } from "react"
import "../App.css"

export default class MyBeers extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a href="#" onClick={this.props.handleMyBeers}>my beers</a>
    )
  }
}
