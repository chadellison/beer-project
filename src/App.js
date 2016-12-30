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
    this.fetchBeers = this.fetchBeers.bind(this)
  }

  fetchBeers() {
    // let params = e.currentTarget.value
    return(
      [
        ["url", "down town brown", 4, "Brown ale"],
        ["url", "chocolate delight", 3.7, "Porter"],
        ["url", "coffee stout", 4.2, "Stout"],
        ["url", "1620", 3.2, "Lager"],
        ["url", "Renegade Blues", 4.6, "IPA"],
        ["url", "Bomber", 2.2, "Lager"],
        ["url", "Three philosophers", 3.2, "Belgian"],
        ["url", "The Reverence", 4.8, "Belgian"],
        ["url", "The yolo", 4.8, "Belgian"],
        ["url", "The beer", 4.8, "Belgian"],
        ["url", "The thing", 4.8, "Belgian"],
        ["url", "That", 4.8, "Belgian"],
        ["url", "This beer", 4.8, "Belgian"],
        ["url", "Crunch", 4.8, "Belgian"],
        ["url", "Spicy", 4.8, "Belgian"],
      ]
    )
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <Intro />
        <Beers beers={this.fetchBeers()} />
        <Footer />
      </div>
    );
  }
}

export default App;
