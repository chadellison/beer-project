import React, { Component } from 'react';
import '../App.css';
import Dropdown from './Dropdown.js';

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.handleNewBeer = this.handleNewBeer.bind(this);
    this.submitNewBeer = this.submitNewBeer.bind(this);
    this.cancel = this.cancel.bind(this);
    this.newBeerForm = this.newBeerForm.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
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
    }
  }

  submitNewBeer() {
    this.setState({
      menuActive: false
    }),
    this.setState({
      submissionNotification: true
    })
    // if all required fields
      // post request
      // change state of "validBeerSubmission"
    // else
      // alert("Please fill in all required fields")
  }

  cancel() {
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
    alert("Sorting your beers")
  }

  newBeerForm() {
    return(
      <div className="menu">
        <p>beers</p>
        <input></input>
        <input></input>
        <input></input>
        <input></input>
        <button onClick={this.submitNewBeer}>Submit</button>
        <button onClick={this.cancel}>Cancel</button>
      </div>
    )
  }

  render() {
    let beerSubmissionForm;
    let notification;
    if(this.state.menuActive) {
      beerSubmissionForm = this.newBeerForm()
    } else {
      beerSubmissionForm = "";
    }

    if(this.state.submissionNotification) {
      notification = <div className="notification">
                       <h3>"Your submission is pending approval. Cheers!"</h3>
                       <button onClick={this.closeNotification}>OK, Got it!</button>
                     </div>
    } else {
      notification = ""
    }
    return (
      <ul className="nav-bar">
        <li><a href="#"><Dropdown /></a></li>
        <li><a href="#" onClick={this.handleNewBeer}>add a beer</a></li>
        <li><a href="#" onClick={this.sortByRank}>sort beers</a></li>
        {beerSubmissionForm}
        <input placeholder="search beers"></input>
        {notification}
      </ul>
    )
  }
}
