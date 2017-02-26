import React, { Component } from 'react'
import "../ratings.css"
export default class RateBeerMenu extends Component {
  constructor(props) {
    super(props)
    this.handleRating = this.handleRating.bind(this)
  }

  sendRating() {

  }

  handleRating(e) {
    let rating = e.currentTarget.textContent
    this.props.toggleRateBeer()
    if(this.props.loggedIn) {
      // api request
      // this.sendRating()
    } else {
      alert("Please login or create an account to rate this beer")
    }
    alert("you rated this beer " + rating + " with beer id " + this.props.id + " with loggin status " + this.props.loggedIn + " and token " + this.props.token)
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
