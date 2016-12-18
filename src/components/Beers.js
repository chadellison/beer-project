import React, { Component } from 'react';
import '../App.css';

export default class Beers extends Component {
  rateBeer() {
    alert("yo")
  }

  render() {
    return (
      <ul className="beers">
        <li onClick={this.rateBeer}>beeeeeeer 1</li>
        <li>bee2222r 2</li>
        <li>beeeeer 3</li>
        <li>beeer 4</li>
        <li>beeeeeer 5</li>
        <li>beer 6</li>
        <li>beeeeeeer 7</li>
        <li>beer 8</li>
        <li>beer 9</li>
        <li>beer 10</li>
        <li>beer 11</li>
        <li>beer 12</li>
        <li>beer 13</li>
        <li>beer 14</li>
        <li>bee3eeeer 15</li>
        <li>b3333333r 16</li>
        <li>beer 17</li>
        <li>beer 18</li>
        <li>beer 19</li>
        <li>beer 20</li>
        <li>beer 21</li>
        <li>beer 22</li>
        <li>superb beer 23</li>
      </ul>
    )
  }
}
