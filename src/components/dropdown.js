import React, { Component } from 'react';
import '../App.css'

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.selectIpa = this.selectIpa.bind(this);
    this.selectStout = this.selectStout.bind(this);
    this.selectLager = this.selectLager.bind(this);
    this.selectBelgian = this.selectBelgian.bind(this);
    this.state = {
      menuActive: false,
      beerType: "All Beers"
    };
  }

  toggleMenu() {
    let menuState = !this.state.menuActive;
    this.setState({
      menuActive: menuState
    });
  }

  selectIpa() {
    this.setState({
      beerType: "IPAs"
    })
  }

  selectStout() {
    this.setState({
      beerType: "Stouts"
    })
  }

  selectLager() {
    this.setState({
      beerType: "Lagers"
    })
  }

  selectBelgian() {
    this.setState({
      beerType: "Belgians"
    })
  }

  render() {
    let menu;
    if(this.state.menuActive) {
      menu = <div className="menu">
               <ul>
                 <li onClick = { this.selectIpa }>IPAs</li>
                 <li onClick = { this.selectStout }>Stouts</li>
                 <li onClick = { this.selectLager }>Lagers</li>
                 <li onClick = { this.selectBelgian }>Belgiansssssssss</li>
               </ul>
             </div>
    } else {
      menu = "";
    }
    return (
      <li onClick = { this.toggleMenu } >
        {this.state.beerType}
        {menu}
      </li>
    )
  }
}
