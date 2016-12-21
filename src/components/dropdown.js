import React, { Component } from 'react';
import '../App.css'

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      menuActive: false
    };
  }

  toggleMenu() {
    let menuState = !this.state.menuActive;
    this.setState({
      menuActive: menuState
    });
  }

  render() {
    let menu;
    if(this.state.menuActive) {
      menu = <div className="menu">
               <ul>
                 <li>IPAs</li>
                 <li>Stouts</li>
                 <li>Lagers</li>
                 <li>Belgiansssssssss</li>
               </ul>
             </div>
    } else {
      menu = "";
    }
    return (
      <li onClick = { this.toggleMenu } >
        beer type
        {menu}
      </li>
    )
  }
}
