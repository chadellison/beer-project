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
    this.setState({
      menuActive: !this.state.menuActive
    });
  }

  handleSelectedBeer(e) {
    let value = e.currentTarget.textContent
    this.setState({
      type: value
    })
  }

  render() {
    let menu;
    let beers = ["All Beers", "IPAs", "Stouts", "Lagers", "Belgians"]
    if(this.state.menuActive) {
      let self = this
      menu = <div className="menu">
               <ul>
                 { beers.map(function (beer) {
                   return (
                     <li key={beer} onClick = { self.handleSelectedBeer }>{beer}</li>
                   )
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
