import React, { Component } from 'react'
import RateBeerMenu from "./RateBeerMenu.js"

export default class SingleBeer extends Component {
  constructor(props) {
    super(props)
    this.toggleRateBeer = this.toggleRateBeer.bind(this)
    this.displayRating  = this.displayRating.bind(this)
    this.displayAbv     = this.displayAbv.bind(this)
    this.displayText    = this.displayText.bind(this)
    this.state = {
      rateBeerMenu: false
    }
  }

  toggleRateBeer() {
    this.setState({
      rateBeerMenu: !this.state.rateBeerMenu
    })
  }

  displayText(field) {
    return field.charAt(0).toUpperCase() + field.slice(1)
  }

  displayRating() {
    if(this.props.rating === "0.0") {
      return "not yet rated"
    } else {
      return this.props.rating
    }
  }

  displayAbv() {
    if(this.props.abv) {
      this.props.abv + " %"
    }
  }

  render() {
    let rateBeer = ""
    if(this.state.rateBeerMenu) {
      rateBeer = <RateBeerMenu
        toggleRateBeer={this.toggleRateBeer}
        id={this.props.id}
        loggedIn={this.props.loggedIn}
        token={this.props.token}
        fetchBeers={this.props.fetchBeers}
        updateMessageNotification={this.props.updateMessageNotification}
      />
    }

    return (
      <div className="beer">
        <img className="beerImage" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTLgFs_rSTVl48wtFvqrloD_Ci1mLQRz_B9WExrrUnPCdjbD81Lhg"></img>
        <div className="beerName"><strong>Name:</strong> {this.displayText(this.props.name)}</div>
        <div className="beerType"><strong>Type:</strong> {this.displayText(this.props.type)}</div>
        <div className="abv"><strong>ABV:</strong> {this.displayAbv}</div>
        <div className="beerRating"><strong>Rating:</strong> {this.displayRating()}</div>
        <button className="rateBeer other" onClick={this.toggleRateBeer}>Rate Beer</button>
        {rateBeer}
      </div>
    )
  }
}
