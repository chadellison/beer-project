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
  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <Intro />
        <Beers />
        <Footer />
      </div>
    );
  }
}

export default App;
