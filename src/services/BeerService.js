import Hosts from "../config/Hosts.js"

export default class BeerService {
  sendBeerData(name, beer_type, rating, token) {
    let host = new Hosts
    return(
      fetch(host.api_host() + "/api/v1/beers", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          beer: {
            name: name,
            beer_type: beer_type,
            rating: rating
          },
          token: token
        })
      })
    )
  }

  fetchBeers(searchParams) {
    let host = new Hosts
    return(
      fetch(host.api_host() + "/api/v1/beers?" + searchParams, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    )
  }
}
