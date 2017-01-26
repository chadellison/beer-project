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
      type: "",
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
    let types = ["All Beers", "IPAs", "Stouts", "Lagers", "Belgians"]

    this.setState({
      beerTypes: types
    })
  }

  fetchBeers(params={}) {
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
    if (params.type !== undefined) {
      beers = [{image: "url", name: "this", rating: 9, type: "IPA"}]
      this.setState({type: params.type})
    }

    if (params.text !== undefined) {
      beers = [{image: "url", name: "abc", rating: 4, type: "stout"}]
      this.setState({text: params.text})
    }

    if (params.sort !== undefined) {
      beers = [{image: "url", name: "first beer", rating: 5, type: "lager"}]
      this.setState({sort: params.sort})
    }

    this.setState({
      beers: beers,
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
