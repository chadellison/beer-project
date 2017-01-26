import React, { Component } from 'react'
import '../App.css'
import SingleBeer from './SingleBeer'

export default class Beers extends Component {
  render() {
    let self = this
    return (
      <ul className="beers">
        { this.props.beers.map(function (beer, index) {
          return (
            <li key={index}><SingleBeer image={beer.image} name={beer.name} rating={beer.rating} type={beer.type} /></li>
          )
        })}
      </ul>
    )
  }
}
