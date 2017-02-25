import React, { Component } from 'react'
import '../App.css'
import "../search.css"
import "../loginForm.css"
import "../signUpForm.css"
import "../notification.css"
import Dropdown from './Dropdown.js'
import BeerForm from "./BeerForm.js"
import AddBeer from "./AddBeer.js"
import Sort from "./Sort.js"
import Search from "./Search.js"
import CustomNotification from "./CustomNotification.js"
import Logout from "./Logout.js"
import CurrentBeers from "./CurrentBeers.js"
import Contact from "./Contact.js"
import About from "./About.js"
import LoginForm from "./LoginForm.js"
import SignUpForm from "./SignUpForm.js"
import SignUpStatus from "./SignUpStatus.js"
import LoginStatus from "./LoginStatus.js"

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.handleNewBeer         = this.handleNewBeer.bind(this)
    this.handleBeerCancel      = this.handleBeerCancel.bind(this)
    this.searchBeers           = this.searchBeers.bind(this)
    this.sortByRank            = this.sortByRank.bind(this)
    this.toggleBeerTypeMenu    = this.toggleBeerTypeMenu.bind(this)
    this.handleBeerInput       = this.handleBeerInput.bind(this)
    this.sendSignUpCredentials = this.sendSignUpCredentials.bind(this)
    this.sendBeerData          = this.sendBeerData.bind(this)
    this.state = {
      newBeerMenuActive: false,
      beerTypeMenuActive: false,
      beerFormName: "",
      beerFromType: "",
      beerFormRating: "",
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

  sendBeerData() {
    return(
      fetch("http://localhost:3001/api/v1/beers", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          beer: {
            name: this.state.beerFormName,
            beer_type: this.state.beerFormType,
            rating: this.state.beerFormRating
          },
          token: this.props.token
        })
      })
    )
  }

  sendSignUpCredentials() {
    return(
      fetch("http://localhost:3001/api/v1/users", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            first_name: this.props.firstName,
            last_name: this.props.lastName,
            email: this.props.email,
            password: this.props.password
          }
        })
      })
    )
  }

  toggleBeerTypeMenu() {
    this.setState({
      beerTypeMenuActive: !this.state.beerTypeMenuActive,
      newBeerMenuActive: false
    });
  }

  handleBeerCancel() {
    this.setState({
      newBeerMenuActive: false
    })
  }

  sortByRank() {
    let sort = ""
    if(this.props.sort === false) {
      sort = true
    }

    if(this.props.sort === true) {
      sort = "ascending"
    }

    if(this.props.sort === "ascending") {
      sort = false
    }

    this.props.fetchBeers({sort: sort,
                           token: this.props.token,
                           current_beers: this.props.current_beers})
  }

  searchBeers(e) {
    let queryText = e.currentTarget.value
    this.props.fetchBeers({text: queryText, token: this.props.token})
  }

  handleBeerInput(e) {
    let value = e.currentTarget.value
    let field = e.currentTarget.className

    if(field === "beerName") {
      this.setState({
        beerFormName: value
      })
    }

    if(field === "beerType") {
      this.setState({
        beerFormType: value
      })
    }

    if(field === "beerRating") {
      this.setState({
        beerFormRating: value
      })
    }
  }

  render() {
    let beerSubmissionForm = ""
    let beerSubmissionNotification = ""
    let signUpNotification = ""
    let addBeer = ""
    let signUpStatus = <SignUpStatus handleSignUpForm={this.props.handleSignUpForm} />
    let signUpForm = ""
    let currentBeers = ""
    let loginStatus = <LoginStatus handleLoginForm={this.props.handleLoginForm} />
    let loginForm = ""

    if(this.props.loggedIn) {
      addBeer = <AddBeer handleNewBeer={this.handleNewBeer} />
      loginStatus = <Logout handleLogout={this.props.handleLogout} />

      currentBeers = <CurrentBeers
        handleCurrentBeers={this.props.handleCurrentBeers}
        currentBeers={this.props.currentBeers}
      />
      signUpStatus = ""
    }

    if(this.props.loginFormActive) {
      loginForm = <LoginForm
        handleEmail={this.props.handleCredentialInput}
        handlePassword={this.props.handleCredentialInput}
        handleLogin={this.props.handleLogin}
        handleSignUpForm={this.props.handleSignUpForm}
        handleLoginCancel={this.props.handleCancel}
      />
      loginStatus = ""
      signUpStatus = ""
    }

    if(this.props.signUpFormActive) {
      signUpForm = <SignUpForm
        handleFirstName={this.props.handleCredentialInput}
        handleLastName={this.props.handleCredentialInput}
        handleEmail={this.props.handleCredentialInput}
        handlePassword={this.props.handleCredentialInput}
        handleSignUp={this.props.handleSignUp}
        handleCancel={this.props.handleCancel}
      />
      loginStatus = ""
      signUpStatus = ""
    }

    if(this.state.newBeerMenuActive) {
      beerSubmissionForm = <BeerForm
        submitNewBeer={this.props.submitNewBeer}
        handleCancel={this.handleBeerCancel}
        handleName={this.handleBeerInput}
        handleType={this.handleBeerInput}
        handleRating={this.handleBeerInput}
      />
    }

    if(this.props.submissionNotification) {
      beerSubmissionNotification = <CustomNotification
        closeNotification={this.props.closeNotification}
        notificationText="Your submission is pending approval. Cheers!"
      />
    }

    if(this.props.signUpNotification) {
      signUpNotification = <CustomNotification
        closeNotification={this.props.closeNotification}
        notificationText="An email to confirm your account has been sent"
      />
    }

    return (
      <div>
        <ul className="navBar">
          <Dropdown
            fetchBeers={this.props.fetchBeers}
            beerTypes={this.props.beerTypes}
            toggleMenu={this.toggleBeerTypeMenu}
            menuActive={this.state.beerTypeMenuActive}
            token={this.props.token}
          />

          {addBeer}
          <Sort sortByRank={this.sortByRank} />
          {beerSubmissionForm}
          {currentBeers}
          <Search searchBeers={this.searchBeers} />
          {loginStatus}
          {signUpStatus}
        </ul>
        {beerSubmissionNotification}
        {signUpNotification}
        {loginForm}
        {signUpForm}
      </div>
    )
  }
}
