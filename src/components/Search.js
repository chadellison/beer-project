import React, { Component } from "react"
import "../App.css"

export default class Search extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <input placeholder="search beers" onChange={this.props.searchBeers}></input>
    )
  }
}
