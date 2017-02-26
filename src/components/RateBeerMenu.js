import React, { Component } from 'react'
import "../ratings.css"
import RatingsService from "../services/RatingsService.js"

export default class RateBeerMenu extends Component {
  constructor(props) {
    super(props)
    this.handleRating = this.handleRating.bind(this)
  }

  handleRating(e) {
    let rating = e.currentTarget.textContent
    this.props.toggleRateBeer()

    if(this.props.loggedIn) {
      let ratingsService = new RatingsService

      ratingsService.sendBeerRating(rating, this.props.id, this.props.token)
      .then((response) => {
        if (response.status === 201) {
          return response.json()
        } else {
          throw "We were unable to process your request"
        }
      })
      .then((responseJson) => {
        this.props.fetchBeers()
        alert("You rated " + responseJson.name + " " + rating)
      })
      .catch((error) => {
        alert(error);
      })
    } else {
      alert("Please login or create an account to rate this beer")
    }
  }

  render() {
    let self = this
    return (
      <div className="ratings">
        { [1, 2, 3, 4, 5].map(function(rating) {
          return (
            <button key={rating} className="rating"
              onClick={self.handleRating}>{rating}
            </button>
          )
        })}
      </div>
    )
  }
}
