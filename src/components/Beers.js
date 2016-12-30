import React, { Component } from 'react';
import '../App.css';

export default class Beers extends Component {
  constructor(props) {
    super(props)
    this.singleBeer = this.singleBeer.bind(this)
    this.state = {
      beers: props.beers
    }
  }

  rateBeer() {
    alert("rate this beer")
  }

  singleBeer(image, name, rating, type) {
    return (
      <div className="beer">
        <img className="beer-image" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTLgFs_rSTVl48wtFvqrloD_Ci1mLQRz_B9WExrrUnPCdjbD81Lhg"></img>
        <div className="beer-name"><strong>Name:</strong> {name}</div>
        <div className="beer-type"><strong>Type:</strong> {type}</div>
        <div className="beer-rating"><strong>Rating:</strong> {rating}</div>
        <button className="rate-beer" onClick={this.rateBeer}>{"Rate"}</button>
      </div>
    )
  }

  render() {
    let self = this
    return (
      <ul className="beers">
        { this.state.beers.map(function (beer) {
          return (
            <li key={beer}>{self.singleBeer(beer[0], beer[1], beer[2], beer[3])}</li>
          )
        })}
      </ul>
    )
  }
}
