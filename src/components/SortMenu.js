import React, { Component } from "react"
import "../sortMenu.css"

export default class SortMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let sortOptions = ["By Name", "By Rating", "By ABV"]
    let self = this
    return(
      <div className="sortMenu">
        { sortOptions.map(function(option) {
          return(
            <a href="#" onClick={self.props.sortByRank} className="sortOption">
              {option}
            </a>
          )
        })}
      </div>
    )
  }
}
