import React, { Component } from 'react'
import "../ratings.css"
export default class RateBeerMenu extends Component {
  constructor(props) {
    super(props)
    this.handleRating = this.handleRating.bind(this)
  }

  handleRating(e) {
    let rating = e.currentTarget.textContent
    this.props.toggleRateBeer()
    alert("you rated this beer " + rating)
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
