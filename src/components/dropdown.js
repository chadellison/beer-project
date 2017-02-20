import React, { Component } from 'react'
import '../App.css'
import BeerTypes from "./BeerTypes.js"

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.handleSelectedBeerType = this.handleSelectedBeerType.bind(this)
    this.state = {
      beerType: "all beers"
    };
  }

  handleSelectedBeerType(e) {
    let value = e.currentTarget.textContent
    this.props.fetchBeers({type: value})
    this.setState({beerType: value})
  }

  render() {
    let menu = ""
    if(this.props.menuActive) {
      let self = this
      menu = <BeerTypes
        beerTypes={this.props.beerTypes}
        handleSelectedBeerType={this.handleSelectedBeerType}
      />
    }

    return (
      <a href="#" onClick={this.props.toggleMenu}>
        {this.state.beerType}
        {menu}
      </a>
    )
  }
}
