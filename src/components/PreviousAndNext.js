import React, { Component } from "react"
import "../previousAndNext.css"

export default class PreviousAndNext extends Component {
  render() {
    let opacity = ""
    if(this.props.loginFormActive || this.props.signUpFormActive) {
      opacity = " opaque"
    }

    return(
      <div className={"previousAndNext" + opacity}>
        <div className="previousImageDiv"><img src="/left_arrow.png" className="previousImage"></img></div>
        <div className="previous">
          previous
        </div>
        <div className="next">
          next
        </div>
        <div className="nextImageDiv"><img src="/right_arrow.png" className="nextImage"></img></div>
      </div>
    )
  }
}
