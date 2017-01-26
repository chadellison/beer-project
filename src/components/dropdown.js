import React, { Component } from 'react';
import '../App.css'

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleSelectedBeerType = this.handleSelectedBeerType.bind(this);
    this.state = {
      menuActive: false,
      beerType: "All Beers",
    };
  }

  toggleMenu() {
    this.setState({
      menuActive: !this.state.menuActive
    });
  }

  handleSelectedBeerType(e) {
    let value = e.currentTarget.textContent
    this.props.fetchBeers({type: value})
    this.setState({beerType: value})
  }

  render() {
    let menu;
    if(this.state.menuActive) {
      let self = this
      menu = <div className="menu">
               <ul>
                 { this.props.beerTypes.map(function (beer, index) {
                   return (
                     <li key={index} onClick={self.handleSelectedBeerType}>{beer}</li>
                   )
                 })}
               </ul>
             </div>
    } else {
      menu = "";
    }
    return (
      <li onClick={this.toggleMenu} >
        {this.state.beerType}
        {menu}
      </li>
    )
  }
}
