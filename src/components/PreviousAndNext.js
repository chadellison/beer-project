import React, { Component } from "react"
import "../previousAndNext.css"

export default class PreviousAndNext extends Component {
  constructor(props) {
    super(props)
    this.handlePreviousBeers = this.handlePreviousBeers.bind(this)
    this.handleNextBeers     = this.handleNextBeers.bind(this)
  }

  handlePreviousBeers() {
    if(this.props.page > 1) {
      let page = this.props.page - 1
      this.props.fetchBeers({page: page})
    }
  }

  handleNextBeers() {
    if(this.props.beerCount === 24) {
      let page = this.props.page + 1
      this.props.fetchBeers({page: page})
    }
  }

  render() {
    let opacity = ""
    if(this.props.loginFormActive || this.props.signUpFormActive) {
      opacity = " opaque"
    }

    return(
      <div className={"previousAndNext" + opacity}>
        <div className="previousImageDiv" onClick={this.handlePreviousBeers}>
          <img src="/left_arrow.png" className="previousImage"></img>
        </div>
        <div className="previous" onClick={this.handlePreviousBeers}>
          previous
        </div>
        <div className="next" onClick={this.handleNextBeers}>
          next
        </div>
        <div className="nextImageDiv" onClick={this.handleNextBeers}>
          <img src="/right_arrow.png" className="nextImage"></img>
        </div>
      </div>
    )
  }
}
