import React, { Component } from "react"
import SortMenu from "./SortMenu.js"

export default class BeerForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let menu = ""
    if(this.props.sortMenuActive) {
      menu = <SortMenu sortByRank={this.props.sortByRank} />
    }

    return (
      <a href="#" onClick={this.props.toggleSortMenu} className="sort">sort beers
        {menu}
      </a>
    )
  }
}
