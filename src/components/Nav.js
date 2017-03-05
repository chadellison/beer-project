import React, { Component } from "react"
import "../nav.css"
import Dropdown from "./Dropdown.js"
import BeerForm from "./BeerForm.js"
import AddBeer from "./AddBeer.js"
import Sort from "./Sort.js"
import Search from "./Search.js"
import CustomNotification from "./CustomNotification.js"
import Logout from "./Logout.js"
import CurrentBeers from "./CurrentBeers.js"
import LoginForm from "./LoginForm.js"
import SignUpForm from "./SignUpForm.js"
import SignUpStatus from "./SignUpStatus.js"
import LoginStatus from "./LoginStatus.js"

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.searchBeers = this.searchBeers.bind(this)
    this.sortBy  = this.sortBy.bind(this)
  }

  sortBy(e) {
    let sort = ""
    let value = e.currentTarget.textContent

    if(value === "By Name") {
      sort = "name"
    }

    if(value === "By Rating") {
      sort = "rating"
    }

    if(value === "By ABV") {
      sort = "abv"
    }

    this.props.fetchBeers({sort: sort,
                           token: this.props.token,
                           current_beers: this.props.current_beers})
  }

  searchBeers(e) {
    let queryText = e.currentTarget.value
    this.props.fetchBeers({text: queryText, token: this.props.token})
  }

  render() {
    let beerSubmissionForm = ""
    let customNotification = ""
    let addBeer = ""
    let sortMenu = ""
    let signUpStatus = <SignUpStatus handleSignUpForm={this.props.handleSignUpForm} />
    let signUpForm = ""
    let currentBeers = ""
    let loginStatus = <LoginStatus handleLoginForm={this.props.handleLoginForm} />
    let loginForm = ""
    let opacity = ""

    if(this.props.loggedIn) {
      addBeer = <AddBeer toggleNewBeerMenu={this.props.toggleNewBeerMenu} />
      loginStatus = <Logout handleLogout={this.props.handleLogout} />

      currentBeers = <CurrentBeers
        handleCurrentBeers={this.props.handleCurrentBeers}
        currentBeers={this.props.currentBeers}
      />
      signUpStatus = ""
    }

    if(this.props.loginFormActive) {
      loginForm = <LoginForm
        handleEmail={this.props.handleInput}
        handlePassword={this.props.handleInput}
        handleLogin={this.props.handleLogin}
        handleSignUpForm={this.props.handleSignUpForm}
        handleLoginCancel={this.props.handleCancel}
      />
      loginStatus = ""
      signUpStatus = ""
      opacity = " opaque"
    }

    if(this.props.signUpFormActive) {
      signUpForm = <SignUpForm
        handleFirstName={this.props.handleInput}
        handleLastName={this.props.handleInput}
        handleEmail={this.props.handleInput}
        handlePassword={this.props.handleInput}
        handleSignUp={this.props.handleSignUp}
        handleCancel={this.props.handleCancel}
      />
      loginStatus = ""
      signUpStatus = ""
      opacity = " opaque"
    }

    if(this.props.newBeerMenuActive && this.props.loggedIn) {
      beerSubmissionForm = <BeerForm
        submitNewBeer={this.props.submitNewBeer}
        handleCancel={this.props.handleCancel}
        handleName={this.props.handleInput}
        handleType={this.props.handleInput}
        handleAbv={this.props.handleInput}
        handleRating={this.props.handleInput}
      />
    }

    if(this.props.messageNotification !== "") {
      customNotification = <CustomNotification
        closeNotification={this.props.closeNotification}
        messageNotification={this.props.messageNotification}
      />
    }

    return (
      <div>
        <ul className={"navBar" + opacity}>
          <Dropdown
            fetchBeers={this.props.fetchBeers}
            beerTypes={this.props.beerTypes}
            toggleMenu={this.props.toggleBeerTypeMenu}
            menuActive={this.props.beerTypeMenuActive}
            token={this.props.token}
          />

          {addBeer}
          <Sort toggleSortMenu={this.props.toggleSortMenu}
            sortMenuActive={this.props.sortMenuActive}
            sortBy={this.sortBy}
          />
          {beerSubmissionForm}
          {currentBeers}
          <Search searchBeers={this.searchBeers} />
          {loginStatus}
          {signUpStatus}
        </ul>
        {customNotification}
        {loginForm}
        {signUpForm}
      </div>
    )
  }
}
