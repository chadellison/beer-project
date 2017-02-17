import React, { Component } from 'react'
import '../App.css'
import Dropdown from './Dropdown.js'
import BeerForm from "./BeerForm.js"
import AddBeer from "./AddBeer.js"
import Sort from "./Sort.js"
import Search from "./Search.js"
import NewBeerNotification from "./NewBeerNotification.js"
import Login from "./Login.js"
import Logout from "./Logout.js"
import SignUp from "./SignUp.js"
import MyBeers from "./MyBeers.js"
import Contact from "./Contact.js"
import About from "./About.js"

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
    this.handleName = this.handleName.bind(this)
    this.handleType = this.handleType.bind(this)
    this.handleRating = this.handleRating.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.state = {
      newBeerMenuActive: false,
      beerTypeMenuActive: false,
      submissionNotification: false,
      loggedIn: false,
      beerFormName: "",
      beerFromType: "",
      beerFormRating: "",
      token: ""
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

  handleName(e) {
    let name = e.currentTarget.value
    this.setState({
      beerFormName: name
    })
  }

  handleType(e) {
    let type = e.currentTarget.value
    this.setState({
      beerFormType: type
    })
  }

  handleRating(e) {
    let rating = e.currentTarget.value
    this.setState({
      beerFormRating: rating
    })
  }

  handleLogin() {
    fetch("http://localhost:3001/api/v1/authentication", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        credentials: {
          email: "jones@gmail.com",
          password: "password"
        }
      })
    })
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
        loggedIn: true
      })
    })
    .catch((error) => {
      alert(error);
    })
  }

  handleLogout() {
    alert("logout")
  }

  handleSignUp() {
    alert("signup")
  }

  render() {
    let beerSubmissionForm = ""
    let notification = ""
    let addBeer = ""
    let logInfo = ""
    let signUp = ""
    let myBeers = ""
    if(this.state.newBeerMenuActive) {
      beerSubmissionForm = <BeerForm
                             submitNewBeer={this.submitNewBeer}
                             handleCancel={this.handleCancel}
                             handleName={this.handleName}
                             handleType={this.handleType}
                             handleRating={this.handleRating}
                           />
    }

    if(this.state.submissionNotification) {
      notification = <NewBeerNotification
                       closeNotification={this.closeNotification}
                     />
    }

    if(this.state.loggedIn) {
      addBeer = <AddBeer handleNewBeer={this.handleNewBeer} />
      logInfo = <Logout handleLogout={this.handleLogout} />
      myBeers = <MyBeers />
    } else {
      logInfo = <Login handleLogin={this.handleLogin}/>
      signUp = <SignUp handleSignUp={this.handleSignUp} />
    }

    return (
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
        {logInfo}
        {signUp}
      </ul>
    )
  }
}
