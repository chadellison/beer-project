import React, { Component } from 'react'
import '../App.css'
import Dropdown from './Dropdown.js'
import BeerForm from "./BeerForm.js"
import AddBeer from "./AddBeer.js"
import Sort from "./Sort.js"
import Search from "./Search.js"

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.handleNewBeer = this.handleNewBeer.bind(this)
    this.submitNewBeer = this.submitNewBeer.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.closeNotification = this.closeNotification.bind(this)
    this.searchBeers = this.searchBeers.bind(this)
    this.sortByRank = this.sortByRank.bind(this)
    this.toggleBeerTypeMenu = this.toggleBeerTypeMenu.bind(this)
    this.state = {
      newBeerMenuActive: false,
      beerTypeMenuActive: false,
      submissionNotification: false
    }
  }

  handleNewBeer() {
    let newBeer = ""
    if(!this.state.newBeerMenuActive) {
      newBeer = true
    } else {
      newBeer = false
    }

    this.setState({
      newBeerMenuActive: newBeer,
      beerTypeMenuActive: false
    })
  }

  submitNewBeer() {
    this.setState({
      newBeerMenuActive: false,
      submissionNotification: true
    })
  }

  toggleBeerTypeMenu() {
    this.setState({
      beerTypeMenuActive: !this.state.beerTypeMenuActive,
      newBeerMenuActive: false
    });
  }

  handleCancel() {
    this.setState({
      newBeerMenuActive: false
    })
  }

  closeNotification() {
    this.setState({
      submissionNotification: false
    })
  }

  sortByRank() {
    if(this.props.sort === false) {
      this.props.fetchBeers({sort: true})
    }

    if(this.props.sort === true) {
      this.props.fetchBeers({sort: "ascending"})
    }

    if(this.props.sort === "ascending") {
      this.props.fetchBeers({sort: false})
    }
  }

  searchBeers(e) {
    let queryText = e.currentTarget.value
    this.props.fetchBeers({text: queryText})
  }

  render() {
    let beerSubmissionForm = ""
    let notification = ""
    if(this.state.newBeerMenuActive) {
      beerSubmissionForm = <BeerForm
                             submitNewBeer={this.submitNewBeer}
                             handleCancel={this.handleCancel}
                           />
    }

    if(this.state.submissionNotification) {
      notification = <div className="notification">
                       <h3>"Your submission is pending approval. Cheers!"</h3>
                       <button onClick={this.closeNotification}>OK, Got it!</button>
                     </div>
    }

    return (
      <ul className="nav-bar">
        <Dropdown
          fetchBeers={this.props.fetchBeers}
          beerTypes={this.props.beerTypes}
          toggleMenu={this.toggleBeerTypeMenu}
          menuActive={this.state.beerTypeMenuActive}
        />

        <AddBeer handleNewBeer={this.handleNewBeer} />
        <Sort sortByRank={this.sortByRank} />
        {beerSubmissionForm}
        <Search searchBeers={this.searchBeers} />
        {notification}
      </ul>
    )
  }
}
