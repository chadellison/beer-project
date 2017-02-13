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
    this.state = {
      menuActive: false,
      submissionNotification: false
    }
  }

  handleNewBeer() {
    if(!this.state.menuActive) {
      this.setState({
        menuActive: true
      })
    } else {
      this.setState({
        menuActive: false
      })
    }
  }

  submitNewBeer() {
    this.setState({
      menuActive: false,
      submissionNotification: true
    })
  }

  handleCancel() {
    this.setState({
      menuActive: false
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
    if(this.state.menuActive) {
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
        <Dropdown fetchBeers={this.props.fetchBeers} beerTypes={this.props.beerTypes} />
        <AddBeer handleNewBeer={this.handleNewBeer} />
        <Sort sortByRank={this.sortByRank} />
        {beerSubmissionForm}
        <Search searchBeers={this.searchBeers} />
        {notification}
      </ul>
    )
  }
}
