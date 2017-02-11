import React, { Component } from 'react'
import '../App.css'
import BeerTypes from "./BeerTypes.js"

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this)
    this.handleSelectedBeerType = this.handleSelectedBeerType.bind(this)
    this.state = {
      menuActive: false,
      beerType: "all beers",
    };
  }

  toggleMenu() {
    this.setState({
      menuActive: !this.state.menuActive
    });
  }

  handleSelectedBeerType(e) {
    let value = e.currentTarget.textContent
    this.props.fetchBeers({type: value})
    this.setState({beerType: value})
  }

  render() {
    let menu = ""
    if(this.state.menuActive) {
      let self = this
      menu = <BeerTypes
               beerTypes={this.props.beerTypes}
               handleSelectedBeerType={this.handleSelectedBeerType}
             />
    }

    return (
      <a href="#" onClick={this.toggleMenu}>
        {this.state.beerType}
        {menu}
      </a>
    )
  }
}
