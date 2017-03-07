import React, { Component } from "react"
import RateBeerMenu from "./RateBeerMenu.js"
import "../singleBeer.css"
import amber from "../../public/amber.jpg"
import barley_wine from "../../public/barley_wine.jpg"
import barrel from "../../public/barrel.jpg"
import belgian from "../../public/belgian.jpg"
import brown from "../../public/brown.jpg"
import lager from "../../public/lager.jpg"
import pilsner from "../../public/pilsner.png"
import porter from "../../public/porter.jpg"
import red from "../../public/red.png"
import saison from "../../public/saison.jpg"
import scotch from "../../public/scotch.jpg"
import sour from "../../public/sour.png"
import wheat from "../../public/wheat.jpg"
import stout from "../../public/stout.jpg"
import ipa from "../../public/ipa.jpg"


export default class SingleBeer extends Component {
  constructor(props) {
    super(props)
    this.toggleRateBeer = this.toggleRateBeer.bind(this)
    this.displayRating  = this.displayRating.bind(this)
    this.displayAbv     = this.displayAbv.bind(this)
    this.displayText    = this.displayText.bind(this)
    this.displayBrand   = this.displayBrand.bind(this)
    this.findImage      = this.findImage.bind(this)
    this.state = {
      rateBeerMenu: false
    }
  }

  findImage(type) {
    let image = ""
    if(type.includes("amber")) {
      image = amber
    }
    if(type.includes("barley") && type.includes("wine")) {
      image = barley_wine
    }
    if(type.includes("barrel") && type.includes("age")) {
      image = barrel
    }
    if(type.includes("belgian")) {
      image = belgian
    }
    if(type.includes("brown")) {
      image = brown
    }
    if(type.includes("lager")) {
      image = lager
    }
    if(type.includes("pilsner")) {
      image = pilsner
    }
    if(type.includes("porter")) {
      image = porter
    }
    if(type.includes("red" && "ale")) {
      image = red
    }
    if(type.includes("saison")) {
      image = saison
    }
    if(type.includes("scotch")) {
      image = scotch
    }
    if(type.includes("sour")) {
      image = sour
    }
    if(type.includes("wheat")) {
      image = wheat
    }
    if(type.includes("stout")) {
      image = stout
    }

    if(type.includes("ipa") || image === "") {
      image = ipa
    }
    return image
  }

  toggleRateBeer() {
    this.setState({
      rateBeerMenu: !this.state.rateBeerMenu
    })
  }

  displayText(field) {
    return field.charAt(0).toUpperCase() + field.slice(1)
  }

  displayBrand(field) {
    if(field) {
      return this.displayText(field)
    }
  }

  displayRating() {
    if(this.props.rating === "0.0") {
      return "not yet rated"
    } else {
      return this.props.rating
    }
  }

  displayAbv() {
    if(this.props.abv) {
      return this.props.abv + "%"
    }
  }

  render() {
    let rateBeer = ""
    if(this.state.rateBeerMenu) {
      rateBeer = <RateBeerMenu
        toggleRateBeer={this.toggleRateBeer}
        id={this.props.id}
        loggedIn={this.props.loggedIn}
        token={this.props.token}
        fetchBeers={this.props.fetchBeers}
        updateMessageNotification={this.props.updateMessageNotification}
      />
    }

    return (
      <div className="beer">
        <img className="beerImage" src={this.findImage(this.props.type)}></img>
        <div className="beerName"><strong>Name:</strong> {this.displayText(this.props.name)}</div>
        <div className="beerType"><strong>Type:</strong> {this.displayText(this.props.type)}</div>
        <div className="beerAbv"><strong>ABV:</strong> {this.displayAbv()}</div>
        <div className="beerBrand"><strong>Brand:</strong> {this.displayBrand(this.props.brand)}</div>
        <div className="beerRating"><strong>Rating:</strong> {this.displayRating()}</div>
        <button className="rateBeer other" onClick={this.toggleRateBeer}>Rate Beer</button>
        {rateBeer}
      </div>
    )
  }
}
