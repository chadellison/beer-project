import React, { Component } from 'react';
import '../App.css';

export default class Beers extends Component {
  // <li>bee2222r 2</li>
  // <li>beeeeer 3</li>
  // <li>beeer 4</li>
  // <li>beeeeeer 5</li>
  // <li>beer 6</li>
  // <li>beeeeeeer 7</li>
  // <li>beer 8</li>
  // <li>beer 9</li>
  // <li>beer 10</li>
  // <li>beer 11</li>
  // <li>beer 12</li>
  // <li>beer 13</li>
  // <li>beer 14</li>
  // <li>bee3eeeer 15</li>
  // <li>b3333333r 16</li>
  // <li>beer 17</li>
  // <li>beer 18</li>
  // <li>beer 19</li>
  // <li>beer 20</li>
  // <li>beer 21</li>
  // <li>beer 22</li>
  // <li>superb beer 23</li>
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
        <button className="rate-beer" onClick={this.rateBeer}>{"Rate this beer"}</button>
      </div>
    )
  }

  render() {
    return (
      <ul className="beers">
        <li>{this.singleBeer("url", "down town brown", 4, "Brown ale")}</li>
        <li>{this.singleBeer("url", "chocolate delight", 3.7, "Porter")}</li>
        <li>{this.singleBeer("url", "coffee stout", 4.2, "Stout")}</li>
      </ul>
    )
  }
}
