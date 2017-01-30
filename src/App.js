import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './header.css';
import './nav.css';
import './footer.css';
import './body.css';
import Header from './components/Header.js';
import Intro from './components/Intro.js';
import Beers from './components/Beers.js';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.fetchBeers = this.fetchBeers.bind(this);
    this.beerTypes = this.beerTypes.bind(this);
    this.state = {
      beers: [],
      beerTypes: [],
      type: "All Beers",
      text: "",
      sort: false
    }
  }

  componentWillMount() {
    this.fetchBeers()
    this.beerTypes()
  }

  beerTypes() {
    // combine 'All Beers' with the return value of the api call into one array
    let types = ["All Beers", "IPA", "Stout", "Lager", "Belgian"]

    this.setState({
      beerTypes: types
    })
  }

  fetchBeers(params={}) {
    if (params.type === undefined) {
      params.type = this.state.type
    }

    if (params.text === undefined) {
      params.text = this.state.text
    }

    let searchParams = "type=" + params.type.toLowerCase() + "&" + "text=" + params.text.toLowerCase()

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
        beers: responseJson.beer
      })
    })
    .catch((error) => {
      alert(error);
    })

    this.setState({
      type: params.type,
      text: params.text,
      sort: this.state.sort
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Nav fetchBeers={this.fetchBeers} beerTypes={this.state.beerTypes} />
        <Intro />
        <Beers beers={this.state.beers} />
        <Footer />
      </div>
    );
  }
}

export default App;
