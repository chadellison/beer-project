import React, { Component } from 'react'
import '../App.css'
import SingleBeer from './SingleBeer'

export default class Beers extends Component {
  render() {
    let self = this
    return (
      <ul className="beers">
        { this.props.beers.map(function (beer) {
          return (
            <li key={beer.id}><SingleBeer
                              image={beer.image}
                              name={beer.name}
                              rating={beer.average_rating}
                              type={beer.beer_type} />
            </li>
          )
        })}
      </ul>
    )
  }
}
