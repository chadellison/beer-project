import React, { Component } from "react"
import "../App.css"

export default class BeerForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a href="#" onClick={this.props.sortByRank}>sort beers</a>
    )
  }
}
