import React, { Component } from 'react'
import '../App.css'

export default class SingleBeer extends Component {
  rateBeer() {
    alert("rate this beer")
  }

  render() {
    return (
      <div className="beer">
        <img className="beerImage" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTLgFs_rSTVl48wtFvqrloD_Ci1mLQRz_B9WExrrUnPCdjbD81Lhg"></img>
        <div className="beerName"><strong>Name:</strong> {this.props.name}</div>
        <div className="beerType"><strong>Type:</strong> {this.props.type}</div>
        <div className="beerRating"><strong>Rating:</strong> {this.props.rating}</div>
        <button className="rateBeer" onClick={this.rateBeer}>{"Rate"}</button>
      </div>
    )
  }
}
