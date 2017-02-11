import React, { Component } from "react"
import "../App.css"

export default class BeerForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="menu">
        <h5>beers</h5>
        <input></input>
        <h5>name</h5>
        <input></input>
        <h5>type</h5>
        <input></input>
        <h5>rating</h5>
        <input></input>
        <button onClick={this.props.submitNewBeer}>Submit</button>
        <button onClick={this.props.handleCancel}>Cancel</button>
      </div>
    )
  }
}
