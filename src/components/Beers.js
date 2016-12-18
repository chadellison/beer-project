import React, { Component } from 'react';
import '../App.css';

export default class Beers extends Component {
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
    return (
      <ul className="beers">
        <li>{this.singleBeer("url", "down town brown", 4, "Brown ale")}</li>
        <li>{this.singleBeer("url", "chocolate delight", 3.7, "Porter")}</li>
        <li>{this.singleBeer("url", "coffee stout", 4.2, "Stout")}</li>
        <li>{this.singleBeer("url", "1620", 3.2, "Lager")}</li>
        <li>{this.singleBeer("url", "Renegade Blues", 4.6, "IPA")}</li>
        <li>{this.singleBeer("url", "Bomber", 2.2, "Lager")}</li>
        <li>{this.singleBeer("url", "Three philosophers", 3.2, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
        <li>{this.singleBeer("url", "The Reverence", 4.8, "Belgian")}</li>
      </ul>
    )
  }
}
