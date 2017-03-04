import React, { Component } from "react"

export default class BeerForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a href="#" onClick={this.props.sortByRank} className="sort">sort beers</a>
    )
  }
}
