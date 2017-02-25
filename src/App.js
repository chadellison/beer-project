import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import './header.css'
import './nav.css'
import './footer.css'
import './body.css'
import './BeerForm.css'
import Header from './components/Header.js'
import Intro from './components/Intro.js'
import Beers from './components/Beers.js'
import Nav from './components/Nav.js'
import Footer from './components/Footer.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.fetchBeers            = this.fetchBeers.bind(this)
    this.fetchBeerTypes        = this.fetchBeerTypes.bind(this)
    this.handleAddedBeer       = this.handleAddedBeer.bind(this)
    this.handleCredentialInput = this.handleCredentialInput.bind(this)
    this.handleLogin           = this.handleLogin.bind(this)
    this.sendLoginCredentials  = this.sendLoginCredentials.bind(this)
    this.handleLoginForm       = this.handleLoginForm.bind(this)
    this.handleLogout          = this.handleLogout.bind(this)
    this.handleSignUp          = this.handleSignUp.bind(this)
    this.handleSignUpForm      = this.handleSignUpForm.bind(this)
    this.handleCancel          = this.handleCancel.bind(this)
    this.closeNotification     = this.closeNotification.bind(this)
    this.handleCurrentBeers    = this.handleCurrentBeers.bind(this)
    this.submitNewBeer         = this.submitNewBeer.bind(this)
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
      token: ""
    }
  }

  componentWillMount() {
    this.fetchBeers()
    this.fetchBeerTypes()
  }

  handleAddedBeer(beer) {
    let beers = this.state.beers
    beers.push(beer)
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
        this.handleAddedBeer(responseJson)
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

  handleLoginForm() {
    this.setState({
      loginFormActive: !this.state.loginFormActive
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

  handleCredentialInput(e) {
    let value = e.currentTarget.value
    let field = e.currentTarget.className

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

  handleCurrentBeers() {
    this.fetchBeers({currentBeers: this.state.currentBeers, token: this.state.token})
    this.fetchBeerTypes({currentBeers: this.state.currentBeers, token: this.state.token})

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

  fetchBeerTypes(params={}) {
    let searchParams = "current_beers=" + params.currentBeers +
                       "&" + "token=" + params.token

    fetch("http://localhost:3001/api/v1/beer_types?" + searchParams, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
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
    if (params.type === undefined) {
      params.type = this.state.type
    }

    if (params.text === undefined) {
      params.text = this.state.text
    }

    if (params.sort === undefined) {
      params.sort = this.state.sort
    }

    if (params.currentBeers === undefined) {
      params.currentBeers = this.state.currentBeers
    }

    let searchParams = "type=" +
                       params.type.toLowerCase() +
                       "&" + "text=" + params.text.toLowerCase() +
                       "&" + "sort=" + params.sort +
                       "&" + "current_beers=" + params.currentBeers +
                       "&" + "token=" + params.token

    fetch("http://localhost:3001/api/v1/beers?" + searchParams, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
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
      currentBeers: params.currentBeers
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Nav fetchBeers={this.fetchBeers}
          beerTypes={this.state.beerTypes}
          sort={this.state.sort}
          token={this.state.token}
          handleCurrentBeers={this.handleCurrentBeers}
          currentBeers={this.state.currentBeers}
          handleAddedBeer={this.handleAddedBeer}
          fetchBeerTypes={this.fetchBeerTypes}
          handleCredentialInput={this.handleCredentialInput}
          currentBeers={this.state.currentBeers}
          handleLoginForm={this.handleLoginForm}
          handleLogin={this.handleLogin}
          loginFormActive={this.state.loginFormActive}
          handleSignUp={this.handleSignUp}
          signUpFormActive={this.state.signUpFormActive}
          handleSignUpForm={this.handleSignUpForm}
          handleCancel={this.handleCancel}
          signUpNotification={this.state.signUpNotification}
          submissionNotification={this.state.submissionNotification}
          closeNotification={this.closeNotification}
          submitNewBeer={this.props.submitNewBeer}
          handleLogout={this.handleLogout}
          loggedIn={this.state.loggedIn}
        />
        <Intro />
        <Beers beers={this.state.beers} />
        <Footer />
      </div>
    );
  }
}

export default App;
