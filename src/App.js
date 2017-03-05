import React, { Component } from "react"
import "./App.css"
import "./body.css"
import Header from "./components/Header.js"
import Intro from "./components/Intro.js"
import Beers from "./components/Beers.js"
import Nav from "./components/Nav.js"
import Footer from "./components/Footer.js"
import PreviousAndNext from "./components/PreviousAndNext.js"
import Hosts from "./config/Hosts.js"
import LoginService from "./services/LoginService.js"
import BeerService from "./services/BeerService.js"
import SignUpService from "./services/SignUpService.js"
import BeerTypesService from "./services/BeerTypesService.js"

class App extends Component {
  constructor(props) {
    super(props)
    this.fetchBeers                = this.fetchBeers.bind(this)
    this.fetchBeerTypes            = this.fetchBeerTypes.bind(this)
    this.handleAddedBeer           = this.handleAddedBeer.bind(this)
    this.handleInput               = this.handleInput.bind(this)
    this.handleLogin               = this.handleLogin.bind(this)
    this.handleLoginForm           = this.handleLoginForm.bind(this)
    this.handleLogout              = this.handleLogout.bind(this)
    this.handleSignUp              = this.handleSignUp.bind(this)
    this.handleSignUpForm          = this.handleSignUpForm.bind(this)
    this.handleCancel              = this.handleCancel.bind(this)
    this.closeNotification         = this.closeNotification.bind(this)
    this.handleCurrentBeers        = this.handleCurrentBeers.bind(this)
    this.submitNewBeer             = this.submitNewBeer.bind(this)
    this.toggleBeerTypeMenu        = this.toggleBeerTypeMenu.bind(this)
    this.toggleSortMenu            = this.toggleSortMenu.bind(this)
    this.toggleNewBeerMenu             = this.toggleNewBeerMenu.bind(this)
    this.updateMessageNotification = this.updateMessageNotification.bind(this)
    this.state = {
      beers: [],
      beerTypes: [],
      currentBeers: "all beers",
      type: "",
      text: "",
      sort: false,
      loginFormActive: false,
      signUpFormActive: false,
      messageNotification: "",
      loggedIn: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      token: "",
      beerFormName: "",
      beerFormType: "",
      beerFormAbv: "",
      beerFormRating: "",
      beerTypeMenuActive: false,
      newBeerMenuActive: false,
      sortMenuActive: false,
      page: 1
    }
  }

  handleParams() {
    if(window.location.search.substring(1) === "approved=true") {
      let intro = "Welcome to the beer project! You're all set to login and" +
        " start adding and browsing beers. Beers that you add will be available" +
        " only to you until they are approved for all to see."
      this.setState({
        messageNotification: intro
      })
    }
  }

  componentWillMount() {
    this.handleParams()
    this.fetchBeers()
    this.fetchBeerTypes()
  }

  toggleBeerTypeMenu() {
    this.setState({
      newBeerMenuActive: false,
      sortMenuActive: false,
      beerTypeMenuActive: !this.state.beerTypeMenuActive,
    });
  }

  toggleSortMenu() {
    this.setState({
      beerTypeMenuActive: false,
      newBeerMenuActive: false,
      sortMenuActive: !this.state.sortMenuActive
    });
  }

  toggleNewBeerMenu() {
    this.setState({
      beerTypeMenuActive: false,
      sortMenuActive: false,
      beerFormName: "",
      beerFormType: "",
      beerFormRating: "",
      beerFormAbv: "",
      newBeerMenuActive: !this.state.newBeerMenuActive,
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

  updateMessageNotification(message) {
    this.setState({
      messageNotification: message
    })
  }

  submitNewBeer() {
    let beerService = new BeerService
    beerService.sendBeerData({name: this.state.beerFormName,
                              type: this.state.beerFormType,
                              abv: this.state.beerFormAbv,
                              rating: this.state.beerFormRating,
                              token: this.state.token})
    .then((response) => {
      if (response.status[0] !== 5) {
        return response.json()
      } else {
        throw "The server responded with an error"
      }
    })
    .then((responseJson) => {
      if(responseJson.errors) {
        let errors = responseJson.errors
        let message = ""
        if(errors.name) {
          message += "Name " + errors.name + " "
        }
        if(errors.beer_type) {
          message += "Beer type " + errors.beer_type
        }
        this.setState({
          messageNotification: message,
          newBeerMenuActive: false
        })
      } else {
        if(this.state.currentBeers === "my beers") {
          this.handleAddedBeer(responseJson)
        }

        this.setState({
          newBeerMenuActive: false,
          messageNotification: "Your submission is pending approval. Cheers!",
          beerFormName: "",
          beerFormType: "",
          beerFormAbv: "",
          beerFormRating: ""
        })
        this.fetchBeers()
      }
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
      if (response.status[0] !== 5) {
        return response.json()
      } else {
        throw "Invalid Entry"
      }
    })
    .then((responseJson) => {
      if(responseJson.errors) {
        let errors = responseJson.errors
        let message = ""
        if(errors.password) {
          message += "Password " + errors.password + " "
        }
        if(errors.email) {
          message += "Email " + errors.email + " "
        }
        if(errors.first_name) {
          message += "First name " + errors.first_name + " "
        }
        if(errors.last_name) {
          message += "Last name " + errors.last_name
        }

        this.setState({
          messageNotification: message
        })
      } else {
        this.setState({
          signUpFormActive: false,
          messageNotification: "An email to confirm your account has been sent"
        })
      }
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
      if (response.status[0] !== 5) {
        return response.json()
      } else {
        throw "Something went wrong. The server responded with a 500"
      }
    })
    .then((responseJson) => {
      if(responseJson.errors) {
        this.setState({
          messageNotification: responseJson.errors
        })
      } else {
        this.setState({
          token: responseJson.password_digest,
          loggedIn: true,
          loginFormActive: false,
          messageNotification: ""
        })
      }
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

    if(field === "abv") {
      this.setState({
        beerFormAbv: value
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
        beerFormAbv: "",
        beerFormType: "",
      })
    }
  }

  closeNotification() {
    this.setState({
      messageNotification: ""
    })
  }

  handleCurrentBeers() {
    let changeCurrentBeers = ""

    if(this.state.currentBeers === "my beers") {
      changeCurrentBeers = "all beers"
    } else {
      changeCurrentBeers = "my beers"
    }

    this.fetchBeers({currentBeers: changeCurrentBeers, token: this.state.token, page: 1})
    this.fetchBeerTypes({currentBeers: changeCurrentBeers, token: this.state.token})

    this.setState({
      currentBeers: changeCurrentBeers,
      page: 1
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
    let footerPreviousAndNext = ""
    if(this.state.beers.length > 8) {
      footerPreviousAndNext = <PreviousAndNext
        beerCount={this.state.beers.length}
        page={this.state.page}
        fetchBeers={this.fetchBeers}
        loginFormActive={this.state.loginFormActive}
        signUpFormActive={this.state.signUpFormActive}
      />
    }
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
          messageNotification={this.state.messageNotification}
          closeNotification={this.closeNotification}
          submitNewBeer={this.submitNewBeer}
          handleLogout={this.handleLogout}
          loggedIn={this.state.loggedIn}
          toggleBeerTypeMenu={this.toggleBeerTypeMenu}
          beerTypeMenuActive={this.state.beerTypeMenuActive}
          toggleNewBeerMenu={this.toggleNewBeerMenu}
          newBeerMenuActive={this.state.newBeerMenuActive}
          sortMenuActive={this.state.sortMenuActive}
          toggleSortMenu={this.toggleSortMenu}
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
          updateMessageNotification={this.updateMessageNotification}
          beers={this.state.beers}
          loggedIn={this.state.loggedIn}
          token={this.state.token}
          fetchBeers={this.fetchBeers}
          loginFormActive={this.state.loginFormActive}
          signUpFormActive={this.state.signUpFormActive}
        />
        {footerPreviousAndNext}
        <Footer />
      </div>
    );
  }
}

export default App;
