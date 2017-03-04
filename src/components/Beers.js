import React, { Component } from 'react'
import SingleBeer from './SingleBeer'

export default class Beers extends Component {
  render() {
    let opacity = ""
    if(this.props.loginFormActive || this.props.signUpFormActive) {
      opacity = " opaque"
    }

    let self = this
    return (
      <ul className={"beers" + opacity}>
        { this.props.beers.map(function(beer) {
          return (
            <li key={beer.id}>
              <SingleBeer
                image={beer.image}
                name={beer.name}
                rating={beer.average_rating}
                type={beer.beer_type}
                id={beer.id}
                loggedIn={self.props.loggedIn}
                token={self.props.token}
                fetchBeers={self.props.fetchBeers}
                updateMessageNotification={self.props.updateMessageNotification}
              />
            </li>
          )
        })}
      </ul>
    )
  }
}
