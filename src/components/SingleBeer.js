import React, { Component } from 'react'
import '../App.css'
import RateBeerMenu from "./RateBeerMenu.js"

export default class SingleBeer extends Component {
  constructor(props) {
    super(props)
    this.toggleRateBeer = this.toggleRateBeer.bind(this)
    this.state = {
      rateBeerMenu: false
    }
  }

  toggleRateBeer() {
    this.setState({
      rateBeerMenu: !this.state.rateBeerMenu
    })
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
      />
    }

    return (
      <div className="beer">
        <img className="beerImage" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTLgFs_rSTVl48wtFvqrloD_Ci1mLQRz_B9WExrrUnPCdjbD81Lhg"></img>
        <div className="beerName"><strong>Name:</strong> {this.props.name}</div>
        <div className="beerType"><strong>Type:</strong> {this.props.type}</div>
        <div className="beerRating"><strong>Rating:</strong> {this.props.rating}</div>
        <button className="rateBeer other" onClick={this.toggleRateBeer}>Rate Beer</button>
        {rateBeer}
      </div>
    )
  }
}
