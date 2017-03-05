import React, { Component } from "react"
import "../footer.css"
import facebook from "../../public/facebook.png"
import twitter from "../../public/twitter.png"
import instagram from "../../public/instagram.png"

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.handleContact = this.handleContact.bind(this)
  }

  handleContact() {
    window.location.href = "mailto:beer.project0123@gmail.com" +
    "?subject=Contact&body=message%20goes%20here"
  }

  render() {
    return (
      <div className="appFooter">
        <div className="socialMediaLinks">
          <img src={facebook} className="facebook" alt="facebook icon" />
          <img src={twitter} className="twitter" alt="twitter icon" />
          <img src={instagram} className="instagram" alt="instagram icon" />
        </div>
        <div className="contact" onClick={this.handleContact}>
          Contact
        </div>
      </div>
    )
  }
}
