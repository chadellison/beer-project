import React, { Component } from "react"
import "../App.css"

export default class BeerForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="submitBeerMenu">
        <h4>Submit Beer</h4>
        <h5 className="label">name</h5>
        <input onChange={this.props.handleName}></input>
        <h5 className="label">type</h5>
        <input onChange={this.props.handleType}></input>
        <h5 className="label">rating</h5>
        <input onChange={this.props.handleRating}></input>
        <button className="submit" onClick={this.props.submitNewBeer}>Submit</button>
        <button className="cancel" onClick={this.props.handleCancel}>Cancel</button>
      </div>
    )
  }
}
