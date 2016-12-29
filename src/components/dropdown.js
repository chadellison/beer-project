import React, { Component } from 'react';
import '../App.css'

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleSelectedBeer = this.handleSelectedBeer.bind(this);
    this.state = {
      menuActive: false,
      type: "All Beers"
    };
  }

  toggleMenu() {
    let menuState = !this.state.menuActive;
    this.setState({
      menuActive: menuState
    });
  }

  handleSelectedBeer() {
    debugger;
    this.setState({
      type: this.refs.IPAs.textContent
    })
  }

  render() {
    let menu;
    if(this.state.menuActive) {
      let beers = ["All Beers", "IPAs", "Stouts", "Lagers", "Belgians"]
      let self = this
      menu = <div className="menu">
               <ul>
                 { beers.map(function (beer) {
                   return (<li key={beer} ref={beer} onClick = { self.handleSelectedBeer }>{beer}</li>)
                 })}
               </ul>
             </div>
    } else {
      menu = "";
    }
    return (
      <li onClick = { this.toggleMenu } >
        {this.state.type}
        {menu}
      </li>
    )
  }
}
