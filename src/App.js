import React, { Component } from "react"
import "./App.css"
import "./body.css"
import Header from "./components/Header.js"
import Intro from "./components/Intro.js"
import Beers from "./components/Beers.js"
import Nav from "./components/Nav.js"
import Footer from "./components/Footer.js"
import PreviousAndNext from "./components/PreviousAndNext.js"
import LoginService from "./services/LoginService.js"
import BeerService from "./services/BeerService.js"
import SignUpService from "./services/SignUpService.js"
import BeerTypesService from "./services/BeerTypesService.js"

class App extends Component {
  constructor(props) {
    super(props)
    this.fetchBeers            = this.fetchBeers.bind(this)
    this.fetchBeerTypes        = this.fetchBeerTypes.bind(this)
    this.handleAddedBeer       = this.handleAddedBeer.bind(this)
    this.handleInput           = this.handleInput.bind(this)
    this.handleLogin           = this.handleLogin.bind(this)
    this.handleLoginForm       = this.handleLoginForm.bind(this)
    this.handleLogout          = this.handleLogout.bind(this)
    this.handleSignUp          = this.handleSignUp.bind(this)
    this.handleSignUpForm      = this.handleSignUpForm.bind(this)
    this.handleCancel          = this.handleCancel.bind(this)
    this.closeNotification     = this.closeNotification.bind(this)
    this.handleCurrentBeers    = this.handleCurrentBeers.bind(this)
    this.submitNewBeer         = this.submitNewBeer.bind(this)
    this.toggleBeerTypeMenu    = this.toggleBeerTypeMenu.bind(this)
    this.handleNewBeer         = this.handleNewBeer.bind(this)
    this.state = {
      beers: [],
      beerTypes: [],
      currentBeers: "all beers",
      type: "",
      text: "",
      sort: false,
      loginFormActive: false,
      signUpFormActive: false,
      signUpNotification: false,
      submissionNotification: false,
      loggedIn: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      token: "",
      beerFormName: "",
      beerFromType: "",
      beerFormRating: "",
      beerTypeMenuActive: false,
      newBeerMenuActive: false,
      page: 1
    }
  }

  componentWillMount() {
    this.fetchBeers()
    this.fetchBeerTypes()
  }

  toggleBeerTypeMenu() {
    this.setState({
      beerTypeMenuActive: !this.state.beerTypeMenuActive,
      newBeerMenuActive: false
    });
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

  handleAddedBeer(beer) {
    let beers = this.state.beers
    beers.unshift(beer)
    this.setState({
      beers: beers
    })
  }

  handleSignUpForm() {
    this.setState({
      signUpFormActive: !this.state.signUpFormActive,
      loginFormActive: false
    })
  }

  submitNewBeer() {
    let beerService = new BeerService
    beerService.sendBeerData(this.state.beerFormName,
                             this.state.beerFormType,
                             this.state.beerFormRating,
                             this.state.token)
    .then((response) => {
      if (response.status === 201) {
        return response.json()
      } else {
        throw "We were unable to process your request"
      }
    })
    .then((responseJson) => {
      if(this.state.currentBeers === "my beers") {
        this.handleAddedBeer(responseJson)
      }

      this.setState({
        submissionNotification: true,
        newBeerMenuActive: false
      })
    })
    .catch((error) => {
      alert(error);
    })
  }

  handleSignUp() {
    let signUpService = new SignUpService
    signUpService.sendSignUpCredentials(this.state.firstName,
                                        this.state.lastName,
                                        this.state.email,
                                        this.state.password)
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

  handleLoginForm() {
    this.setState({
      loginFormActive: !this.state.loginFormActive
    })
  }

  handleLogin() {
    let loginService = new LoginService
    loginService.sendLoginCredentials(this.state.email, this.state.password)
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
        loginFormActive: false
      })
    })
    .catch((error) => {
      alert(error);
    })
  }

  handleLogout() {
    this.fetchBeers({currentBeers: "all beers"})
    this.fetchBeerTypes({currentBeers: "all beers"})
    this.setState({
      loggedIn: false,
      email: "",
      password: "",
      token: "",
      currentBeers: "all beers"
    })
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
    if(field.includes("addBeerRating")) {
      this.setState({
        beerFormRating: e.currentTarget.textContent
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

  handleCancel(e) {
    let field = e.currentTarget.className
    if(field === "cancelLoginMenu" || field === "cancelSignUpMenu") {
      this.setState({
        loginFormActive: false,
        signUpFormActive: false,
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      })
    }

    if(field === "cancelBeerMenu") {
      this.setState({
        newBeerMenuActive: false,
        beerFormName: "",
        beerFormRating: "",
        beerFormType: ""
      })
    }
  }

  closeNotification() {
    this.setState({
      submissionNotification: false,
      signUpNotification: false
    })
  }

  handleCurrentBeers() {
    let changeCurrentBeers = ""

    if(this.state.currentBeers === "my beers") {
      changeCurrentBeers = "all beers"
    } else {
      changeCurrentBeers = "my beers"
    }

    this.fetchBeers({currentBeers: changeCurrentBeers, token: this.state.token})
    this.fetchBeerTypes({currentBeers: changeCurrentBeers, token: this.state.token})

    this.setState({
      currentBeers: changeCurrentBeers
    })
  }

  fetchBeerTypes(params={}) {
    if(params.currentBeers === undefined) {
      params.currentBeers = this.state.currentBeers
    }
    if(params.token === undefined) {
      params.token = this.state.token
    }

    let searchParams = "current_beers=" + params.currentBeers +
                       "&" + "token=" + params.token

    let beerTypesService = new BeerTypesService
    beerTypesService.fetchBeerTypes(searchParams)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        beerTypes: responseJson.types
      })
    })
    .catch((error) => {
      alert(error);
    })
  }

  fetchBeers(params={}) {
    if(params.type === undefined) {
      params.type = this.state.type
    }

    if(params.text === undefined) {
      params.text = this.state.text
    }

    if(params.sort === undefined) {
      params.sort = this.state.sort
    }

    if(params.currentBeers === undefined) {
      params.currentBeers = this.state.currentBeers
    }

    if(params.token === undefined) {
      params.token = this.state.token
    }

    if(params.page === undefined) {
      params.page = this.state.page
    }

    let searchParams = "type=" +
                       params.type.toLowerCase() +
                       "&" + "text=" + params.text.toLowerCase() +
                       "&" + "sort=" + params.sort +
                       "&" + "current_beers=" + params.currentBeers +
                       "&" + "token=" + params.token +
                       "&" + "page=" + params.page

    let beerService = new BeerService
    beerService.fetchBeers(searchParams)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        beers: responseJson.beers
      })
    })
    .catch((error) => {
      alert(error);
    })

    this.setState({
      type: params.type,
      text: params.text,
      sort: params.sort,
      currentBeers: params.currentBeers,
      page: params.page
    })
  }

  render() {
    return (
      <div className="App">
        <Header
          loginFormActive={this.state.loginFormActive}
          signUpFormActive={this.state.signUpFormActive}
        />
        <Nav
          fetchBeers={this.fetchBeers}
          beerTypes={this.state.beerTypes}
          sort={this.state.sort}
          token={this.state.token}
          handleCurrentBeers={this.handleCurrentBeers}
          currentBeers={this.state.currentBeers}
          fetchBeerTypes={this.fetchBeerTypes}
          handleInput={this.handleInput}
          currentBeers={this.state.currentBeers}
          handleLoginForm={this.handleLoginForm}
          handleLogin={this.handleLogin}
          loginFormActive={this.state.loginFormActive}
          signUpFormActive={this.state.signUpFormActive}
          handleSignUpForm={this.handleSignUpForm}
          handleSignUp={this.handleSignUp}
          handleCancel={this.handleCancel}
          signUpNotification={this.state.signUpNotification}
          submissionNotification={this.state.submissionNotification}
          closeNotification={this.closeNotification}
          submitNewBeer={this.submitNewBeer}
          handleLogout={this.handleLogout}
          loggedIn={this.state.loggedIn}
          toggleBeerTypeMenu={this.toggleBeerTypeMenu}
          beerTypeMenuActive={this.state.beerTypeMenuActive}
          handleNewBeer={this.handleNewBeer}
          newBeerMenuActive={this.state.newBeerMenuActive}
        />
        <Intro
          loginFormActive={this.state.loginFormActive}
          signUpFormActive={this.state.signUpFormActive}
        />
        <PreviousAndNext
          beerCount={this.state.beers.length}
          page={this.state.page}
          fetchBeers={this.fetchBeers}
          loginFormActive={this.state.loginFormActive}
          signUpFormActive={this.state.signUpFormActive}
        />
        <Beers
          beers={this.state.beers}
          loggedIn={this.state.loggedIn}
          token={this.state.token}
          fetchBeers={this.fetchBeers}
          loginFormActive={this.state.loginFormActive}
          signUpFormActive={this.state.signUpFormActive}
        />
        <PreviousAndNext
          beerCount={this.state.beers.length}
          page={this.state.page}
          fetchBeers={this.fetchBeers}
          loginFormActive={this.state.loginFormActive}
          signUpFormActive={this.state.signUpFormActive}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
