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
      sort: false,
      searchParams: {}
    }
  }

  componentWillMount() {
    this.fetchBeers()
    this.beerTypes()
  }

  beerTypes() {
    // combine 'All Beers' with the return value of the api call into one array
    let types = ["All Beers", "IPAs", "Stouts", "Lagers", "Belgians"]

    this.setState({
      beerTypes: types
    })
  }

  fetchBeers(params={}) {
    fetch("http://localhost:3001/api/v1/beers", {
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

    if (params.type !== undefined) {
      this.setState({type: params.type})
    }

    if (params.text !== undefined) {
      this.setState({text: params.text})
    }

    if (params.sort !== undefined) {
      this.setState({sort: params.sort})
    }

    this.setState({
      searchParams: {type: this.state.type, text: this.state.text, sort: this.state.sort}
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
