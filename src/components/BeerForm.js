import React, { Component } from "react"
import "../App.css"
import "../addBeerRatings.css"
import "../BeerForm.css"

export default class BeerForm extends Component {
  constructor(props) {
    super(props)
    this.handleRatingHover = this.handleRatingHover.bind(this)
    this.checkActive = this.checkActive.bind(this)
    this.handleRatingClick = this.handleRatingClick.bind(this)
    this.state = {
      r1Active: false,
      r2Active: false,
      r3Active: false,
      r4Active: false,
      r5Active: false,
      r1Click: false,
      r2Click: false,
      r3Click: false,
      r4Click: false,
      r5Click: false
    }
  }

  checkActive(rating) {
    let result = "addBeerRating"
    if(rating === 1) {
      if(this.state.r1Active) {
        result += " highlight"
      }
      if(this.state.r1Click) {
        result += " clicked"
      }
    }

    if(rating === 2) {
      if(this.state.r2Active) {
        result += " highlight"
      }
      if(this.state.r2Click) {
        result += " clicked"
      }
    }

    if(rating === 3) {
      if(this.state.r3Active) {
        result += " highlight"
      }
      if(this.state.r3Click) {
        result += " clicked"
      }
    }

    if(rating === 4) {
      if(this.state.r4Active) {
        result += " highlight"
      }
      if(this.state.r4Click) {
        result += " clicked"
      }
    }

    if(rating === 5) {
      if(this.state.r5Active) {
        result += " highlight"
      }
      if(this.state.r5Click) {
        result += " clicked"
      }
    }

    return result
  }

  handleRatingClick(e) {
    this.props.handleRating(e)

    let value = e.currentTarget.textContent

    if(value === "5") {
      this.setState({
        r1Click: true,
        r2Click: true,
        r3Click: true,
        r4Click: true,
        r5Click: true
      })
    }

    if(value === "4") {
      this.setState({
        r1Click: true,
        r2Click: true,
        r3Click: true,
        r4Click: true,
        r5Click: false
      })
    }

    if(value === "3") {
      this.setState({
        r1Click: true,
        r2Click: true,
        r3Click: true,
        r4Click: false,
        r5Click: false
      })
    }

    if(value === "2") {
      this.setState({
        r1Click: true,
        r2Click: true,
        r3Click: false,
        r4Click: false,
        r5Click: false
      })
    }

    if(value === "1") {
      this.setState({
        r1Click: true,
        r2Click: false,
        r3Click: false,
        r4Click: false,
        r5Click: false
      })
    }
  }

  handleRatingHover(e) {
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
        <div className="addBeerRatings" onMouseLeave={this.handleRatingHover}>
          { [1, 2, 3, 4, 5].map(function(rating) {
            return(
              <button key={rating} className={self.checkActive(rating)}
                onMouseEnter={self.handleRatingHover}
                onMouseLeave={self.handleRatingHover}
                onClick={self.handleRatingClick}>
                {rating}
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
