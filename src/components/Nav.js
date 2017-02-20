import React, { Component } from 'react'
import '../App.css'
import "../search.css"
import "../loginForm.css"
import Dropdown from './Dropdown.js'
import BeerForm from "./BeerForm.js"
import AddBeer from "./AddBeer.js"
import Sort from "./Sort.js"
import Search from "./Search.js"
import NewBeerNotification from "./NewBeerNotification.js"
import Logout from "./Logout.js"
import MyBeers from "./MyBeers.js"
import Contact from "./Contact.js"
import About from "./About.js"
import LoginForm from "./LoginForm.js"
import SignUpForm from "./SignUpForm.js"
import SignUpStatus from "./SignUpStatus.js"

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.handleNewBeer         = this.handleNewBeer.bind(this)
    this.submitNewBeer         = this.submitNewBeer.bind(this)
    this.handleCancel          = this.handleCancel.bind(this)
    this.closeNotification     = this.closeNotification.bind(this)
    this.searchBeers           = this.searchBeers.bind(this)
    this.sortByRank            = this.sortByRank.bind(this)
    this.toggleBeerTypeMenu    = this.toggleBeerTypeMenu.bind(this)
    this.handleInput           = this.handleInput.bind(this)
    this.handleLogout          = this.handleLogout.bind(this)
    this.handleSignUp          = this.handleSignUp.bind(this)
    this.handleLogin           = this.handleLogin.bind(this)
    this.handleLoginFormActive = this.handleLoginFormActive.bind(this)
    this.handleSignUpForm      = this.handleSignUpForm.bind(this)
    this.sendLoginCredentials  = this.sendLoginCredentials.bind(this)
    this.sendBeerData          = this.sendBeerData.bind(this)
    this.state = {
      newBeerMenuActive: false,
      beerTypeMenuActive: false,
      signUpFormActive: false,
      submissionNotification: false,
      loggedIn: false,
      loginFormActive: false,
      beerFormName: "",
      beerFromType: "",
      beerFormRating: "",
      token: "",
      email: "",
      password: ""
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
          }
        })
      })
    )
  }

  sendLoginCredentials() {
    return(
      fetch("http://localhost:3001/api/v1/authentication", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          credentials: {
            email: this.state.email,
            password: this.state.password
          }
        })
      })
    )
  }

  handleLogin() {
    this.sendLoginCredentials()
    .then((response) => {
      if (response.status === 200) {
        return response.json
      } else {
        throw "Invalid Credentials"
      }
    })
    .then((responseJson) => {
      this.setState({
        token: responseJson.password_digest,
        loggedIn: true,
        loginFormActive: false
      })
    })
    .catch((error) => {
      alert(error);
    })
  }

  submitNewBeer() {
    this.sendBeerData()
    .then((response) => {
      if (response.status === 200) {
        return response.json
      } else {
        throw "We were unable to process your request"
      }
    })
    .then((responseJson) => {
      this.setState({
        newBeerMenuActive: false,
        submissionNotification: true
      })
    })
    .catch((error) => {
      alert(error);
    })
  }

  toggleBeerTypeMenu() {
    this.setState({
      beerTypeMenuActive: !this.state.beerTypeMenuActive,
      newBeerMenuActive: false
    });
  }

  handleLoginFormActive() {
    this.setState({
      loginFormActive: !this.state.loginFormActive
    })
  }

  handleSignUpForm() {
    this.setState({
      signUpFormActive: !this.state.signUpFormActive,
      loginFormActive: false
    })
  }

  handleCancel(e) {
    let field = e.currentTarget.className
    if(field === "cancelBeerMenu")
    this.setState({
      newBeerMenuActive: false
    })

    if(field === "cancelLoginMenu") {
      this.setState({
        loginFormActive: false
      })
    }

    if(field === "cancelSignUpMenu") {
      this.setState({
        signUpFormActive: false
      })
    }
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

  handleInput(e) {
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

    if(field === "credentialEmail") {
      this.setState({
        email: value
      })
    }

    if(field === "credentialPassword") {
      this.setState({
        password: value
      })
    }
  }

  handleLogout() {
    this.setState({
      loggedIn: false,
      email: "",
      password: "",
      token: ""
    })
  }

  handleSignUp() {
    alert("signup")
    // send api request
  }

  render() {
    let beerSubmissionForm = ""
    let notification = ""
    let addBeer = ""
    let signUpStatus = <SignUpStatus handleSignUpForm={this.handleSignUpForm} />
    let signUpForm = ""
    let myBeers = ""
    let loginStatus = <a href="#" onClick={this.handleLoginFormActive}>login</a>
    let loginForm = ""

    if(this.state.loggedIn) {
      addBeer = <AddBeer handleNewBeer={this.handleNewBeer} />
      loginStatus = <Logout handleLogout={this.handleLogout} />
      myBeers = <MyBeers />
      signUpStatus = ""
    }

    if(this.state.loginFormActive) {
      loginForm = <LoginForm
        handleEmail={this.handleInput}
        handlePassword={this.handleInput}
        handleLogin={this.handleLogin}
        handleSignUpForm={this.handleSignUpForm}
        handleLoginCancel={this.handleCancel}
      />
      loginStatus = ""
      signUpStatus = ""
    }

    if(this.state.signUpFormActive) {
      signUpForm = <SignUpForm
        handleSignUp={this.handleSignUp}
        handleCancel={this.handleCancel}
      />
      loginStatus = ""
      signUpStatus = ""
    }

    if(this.state.newBeerMenuActive) {
      beerSubmissionForm = <BeerForm
        submitNewBeer={this.submitNewBeer}
        handleCancel={this.handleCancel}
        handleName={this.handleInput}
        handleType={this.handleInput}
        handleRating={this.handleInput}
      />
    }

    if(this.state.submissionNotification) {
      notification = <NewBeerNotification
        closeNotification={this.closeNotification}
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
          />

          {addBeer}
          <Sort sortByRank={this.sortByRank} />
          {beerSubmissionForm}
          {myBeers}
          <Search searchBeers={this.searchBeers} />
          {notification}
          <Contact />
          <About />
          {loginStatus}
          {signUpStatus}
        </ul>
        {loginForm}
        {signUpForm}
      </div>
    )
  }
}
