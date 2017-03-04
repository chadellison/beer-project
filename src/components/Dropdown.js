import React, { Component } from "react"
import BeerTypes from "./BeerTypes.js"
import "../currentBeerType.css"

export default class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.handleSelectedBeerType = this.handleSelectedBeerType.bind(this)
    this.state = {
      beerType: "all types"
    }
  }

  handleSelectedBeerType(e) {
    let value = e.currentTarget.textContent
    this.props.fetchBeers({type: value, token: this.props.token})
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
      <a href="#" onClick={this.props.toggleMenu} className="currentBeerType">
        {this.state.beerType}
        {menu}
      </a>
    )
  }
}
