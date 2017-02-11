import React, { Component } from 'react'
import '../App.css'

export default class BeerTypes extends Component {
  render() {
    let self = this
    return (
      <ul className="menu">
        { this.props.beerTypes.map(function (beer, index) {
          return (
            <li key={index} onClick={self.props.handleSelectedBeerType}>{beer}</li>
          )
        })}
      </ul>
    )
  }
}
