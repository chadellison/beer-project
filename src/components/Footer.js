import React, { Component } from "react"
import "../footer.css"
import facebook from "../../public/facebook.png"
import twitter from "../../public/twitter.png"
import instagram from "../../public/instagram.png"

export default class Header extends Component {
  render() {
    return (
      <div className="appFooter">
        <div className="socialMediaLinks">
          <img src={facebook} className="facebook" alt="facebook icon" />
          <img src={twitter} className="twitter" alt="twitter icon" />
          <img src={instagram} className="instagram" alt="instagram icon" />
        </div>
        <div className="contact">
          Contact
        </div>
      </div>
    )
  }
}
