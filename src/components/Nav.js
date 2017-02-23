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
    this.handleLoginForm       = this.handleLoginForm.bind(this)
    this.handleSignUpForm      = this.handleSignUpForm.bind(this)
    this.sendLoginCredentials  = this.sendLoginCredentials.bind(this)
    this.sendSignUpCredentials = this.sendSignUpCredentials.bind(this)
    this.sendBeerData          = this.sendBeerData.bind(this)
    this.handleCurrentBeers    = this.handleCurrentBeers.bind(this)
    this.state = {
      newBeerMenuActive: false,
      beerTypeMenuActive: false,
      signUpFormActive: false,
      submissionNotification: false,
      signUpNotification: false,
      loggedIn: false,
      loginFormActive: false,
      beerFormName: "",
      beerFromType: "",
      beerFormRating: "",
      token: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      currentBeers: "all beers"
    }
  }

  handleCurrentBeers() {
    this.props.fetchBeers({currentBeers: this.state.currentBeers, token: this.state.token})

    if(this.state.currentBeers === "my beers") {
      this.setState({
        currentBeers: "all beers"
      })
    } else {
      this.setState({
        currentBeers: "my beers"
      })
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
          token: this.state.token
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
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password
          }
        })
      })
    )
  }

  handleSignUp() {
    this.sendSignUpCredentials()
    .then((response) => {
      if (response.status === 201) {
        return response.json()
      } else {
        throw "Invalid Entry"
      }
    })
    .then((responseJson) => {
      this.setState({
        signUpFormActive: false,
        signUpNotification: true
      })
    })
    .catch((error) => {
      alert(error);
    })
  }

  handleLogin() {
    this.sendLoginCredentials()
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw "Invalid Credentials"
      }
    })
    .then((responseJson) => {
      this.setState({
        token: responseJson.password_digest,
        loggedIn: true,
        loginFormActive: false,
        currentBeers: "my beers"
      })
    })
    .catch((error) => {
      alert(error);
    })
  }

  submitNewBeer() {
    this.sendBeerData()
    .then((response) => {
      if (response.status === 201) {
        return response.json()
      } else {
        throw "We were unable to process your request"
      }
    })
    .then((responseJson) => {
      if(this.state.currentBeers === "all beers") {
        this.props.handleAddedBeer(responseJson)
      }

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

  handleLoginForm() {
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
      submissionNotification: false,
      signUpNotification: false
    })
  }

  sortByRank() {
    if(this.props.sort === false) {
      this.props.fetchBeers({sort: true, token: this.state.token})
    }

    if(this.props.sort === true) {
      this.props.fetchBeers({sort: "ascending", token: this.state.token})
    }

    if(this.props.sort === "ascending") {
      this.props.fetchBeers({sort: false, token: this.state.token})
    }
  }

  searchBeers(e) {
    let queryText = e.currentTarget.value
    this.props.fetchBeers({text: queryText, token: this.state.token})
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

    if(field === "credentialFirstName") {
      this.setState({
        firstName: value
      })
    }

    if(field === "credentialLastName") {
      this.setState({
        lastName: value
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

  render() {
    let beerSubmissionForm = ""
    let beerSubmissionNotification = ""
    let signUpNotification = ""
    let addBeer = ""
    let signUpStatus = <SignUpStatus handleSignUpForm={this.handleSignUpForm} />
    let signUpForm = ""
    let currentBeers = ""
    let loginStatus = <LoginStatus handleLoginForm={this.handleLoginForm} />
    let loginForm = ""

    if(this.state.loggedIn) {
      addBeer = <AddBeer handleNewBeer={this.handleNewBeer} />
      loginStatus = <Logout handleLogout={this.handleLogout} />

      currentBeers = <CurrentBeers
        handleCurrentBeers={this.handleCurrentBeers}
        currentBeers={this.state.currentBeers}
      />
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
        handleFirstName={this.handleInput}
        handleLastName={this.handleInput}
        handleEmail={this.handleInput}
        handlePassword={this.handleInput}
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
      beerSubmissionNotification = <CustomNotification
        closeNotification={this.closeNotification}
        notificationText="Your submission is pending approval. Cheers!"
      />
    }

    if(this.state.signUpNotification) {
      signUpNotification = <CustomNotification
        closeNotification={this.closeNotification}
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
            token={this.state.token}
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
