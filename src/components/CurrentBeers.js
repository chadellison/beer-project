import React, { Component } from "react"
import "../App.css"

export default class CurrentBeers extends Component {
  constructor(props) {
    super(props)
  }

  displayText() {
    if(this.props.currentBeers === "all beers") {
      return "my beers"
    } else {
      return "all beers"
    }
  }

  render() {
    return (
      <a href="#" onClick={this.props.handleCurrentBeers}>{this.displayText()}</a>
    )
  }
}
