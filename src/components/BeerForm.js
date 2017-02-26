import React, { Component } from "react"
import "../App.css"
import "../addBeerRatings.css"

export default class BeerForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let self = this
    return(
      <div className="submitBeerMenu">
        <h4>Submit Beer</h4>
        <h5 className="label">name</h5>
        <input className="beerName" onChange={this.props.handleName}></input>
        <h5 className="label">type</h5>
        <input className="beerType" onChange={this.props.handleType}></input>
        <h5 className="label">rating</h5>
        <div className="addBeerRatings">
          { [1, 2, 3, 4, 5].map(function(rating) {
            return (
              <button key={rating} className="addBeerRating"
                onClick={self.props.handleRating}>{rating}
              </button>
            )
          })}
        </div>
        <button className="submit" onClick={this.props.submitNewBeer}>Submit</button>
        <button className="cancelBeerMenu" onClick={this.props.handleCancel}>Cancel</button>
      </div>
    )
  }
}
