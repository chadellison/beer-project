import React, { Component } from 'react'
import '../App.css'

export default class SingleBeer extends Component {
  render() {
    return (
      <div className="beer">
        <img className="beer-image" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTLgFs_rSTVl48wtFvqrloD_Ci1mLQRz_B9WExrrUnPCdjbD81Lhg"></img>
        <div className="beer-name"><strong>Name:</strong> {this.props.name}</div>
        <div className="beer-type"><strong>Type:</strong> {this.props.type}</div>
        <div className="beer-rating"><strong>Rating:</strong> {this.props.rating}</div>
        <button className="rate-beer" onClick={this.rateBeer}>{"Rate"}</button>
      </div>
    )
  }
}
