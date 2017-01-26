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
      beerTypes: []
    }
  }

  // look into context
  // contextTypes {
  //   beerType:
  // }

  componentWillMount() {
    this.fetchBeers()
    this.beerTypes()
  }

  beerTypes() {
    // api call
    let types = ["All Beers", "IPAs", "Stouts", "Lagers", "Belgians"]

    this.setState({
      beerTypes: types
    })
  }

  fetchBeers(type) {
    // let params = e.currentTarget.value
    let beers = [
      {image: "url", name: "downtownbrown", rating: 4, type: "Brown ale"},
      {image: "url", name: "downtownbrown", rating: 3, type: "Brown ale"},
      {image: "url", name: "downtownbrown", rating: 5, type: "Brown ale"},
      {image: "url", name: "downtownbrown", rating: 4, type: "Brown ale"},
      {image: "url", name: "downtownbrown", rating: 4, type: "Brown ale"},
      {image: "url", name: "downtownbrown", rating: 4, type: "Brown ale"},
      {image: "url", name: "downtownbrown", rating: 4, type: "Brown ale"},
      {image: "url", name: "downtownbrown", rating: 4, type: "Brown ale"},
      {image: "url", name: "downtownbrown", rating: 4, type: "Brown ale"},
      {image: "url", name: "downtownbrown", rating: 4, type: "Brown ale"},
      {image: "url", name: "downtownbrown", rating: 4, type: "Brown ale"},
      {image: "url", name: "downtownbrown", rating: 4, type: "Brown ale"}
    ]
    if (type === "IPAs") {
      beers = [{image: "url", name: "this", rating: 9, type: "IPA"}]
    }

    this.setState({
      beers: beers
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
