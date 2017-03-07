import Hosts from "../config/Hosts.js"

export default class BeerService {
  sendBeerData(params={}) {
    let host = new Hosts
    return(
      fetch(host.apiHost() + "/api/v1/beers", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          beer: {
            name: params.name,
            beer_type: params.type,
            abv: params.abv,
            brand: params.brand,
            rating: params.rating
          },
          token: params.token
        })
      })
    )
  }

  fetchBeers(searchParams) {
    let host = new Hosts
    return(
      fetch(host.apiHost() + "/api/v1/beers?" + searchParams, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    )
  }
}
