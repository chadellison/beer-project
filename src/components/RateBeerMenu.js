import React, { Component } from 'react'
import "../ratings.css"
import RatingsService from "../services/RatingsService.js"

export default class RateBeerMenu extends Component {
  constructor(props) {
    super(props)
    this.handleRating = this.handleRating.bind(this)
    this.handleHover  = this.handleHover.bind(this)
    this.checkActive  = this.checkActive.bind(this)
    this.state = {
      r1Active: false,
      r2Active: false,
      r3Active: false,
      r4Active: false,
      r5Active: false
    }
  }

  handleHover(e) {
    let value = e.currentTarget.textContent

    if(value === "5") {
      this.setState({
        r1Active: true,
        r2Active: true,
        r3Active: true,
        r4Active: true,
        r5Active: true
      })
    }

    if(value === "4") {
      this.setState({
        r1Active: true,
        r2Active: true,
        r3Active: true,
        r4Active: true,
        r5Active: false
      })
    }

    if(value === "3") {
      this.setState({
        r1Active: true,
        r2Active: true,
        r3Active: true,
        r4Active: false,
        r5Active: false
      })
    }

    if(value === "2") {
      this.setState({
        r1Active: true,
        r2Active: true,
        r3Active: false,
        r4Active: false,
        r5Active: false
      })
    }

    if(value === "1") {
      this.setState({
        r1Active: true,
        r2Active: false,
        r3Active: false,
        r4Active: false,
        r5Active: false
      })
    }
    if(!["1", "2", "3", "4", "5"].includes(value)) {
      this.setState({
        r1Active: false,
        r2Active: false,
        r3Active: false,
        r4Active: false,
        r5Active: false
      })
    }
  }

  handleRating(e) {
    let rating = e.currentTarget.textContent
    let message = ""
    this.props.toggleRateBeer()

    if(this.props.loggedIn) {
      let ratingsService = new RatingsService

      ratingsService.sendBeerRating(rating, this.props.id, this.props.token)
      .then((response) => {
        if (response.status[0] !== 5) {
          return response.json()
        } else {
          throw "The server responded with an error"
        }
      })
      .then((responseJson) => {
        if(responseJson.errors) {
          this.props.updateMessageNotification(responseJson.errors)
        } else {
          message = "You rated " + responseJson.name + " " + rating
          this.props.fetchBeers()
          this.props.updateMessageNotification(message)
        }
      })
      .catch((error) => {
        alert(error);
      })
    } else {
      message = "Please login or create an account to rate this beer"
      this.props.updateMessageNotification(message)
    }
  }

  checkActive(rating) {
    let result = "rating "
    if(rating === 1 && this.state.r1Active) {
      result += "one"
    }

    if(rating === 2 && this.state.r2Active) {
      result += "two"
    }

    if(rating === 3 && this.state.r3Active) {
      result += "three"
    }

    if(rating === 4 && this.state.r4Active) {
      result += "four"
    }

    if(rating === 5 && this.state.r5Active) {
      result += "five"
    }

    return result
  }

  render() {
    let self = this

    return (
      <div className="ratings" onMouseLeave={self.handleHover}>
        { [1, 2, 3, 4, 5].map(function(rating) {
          return(
            <button key={rating} className={self.checkActive(rating)}
              onMouseEnter={self.handleHover}
              onMouseLeave={self.handleHover}
              onClick={self.handleRating}>{rating}
            </button>
          )
        })}
      </div>
    )
  }
}
