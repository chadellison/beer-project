import Hosts from "../config/Hosts.js"

export default class BeerTypesService {
  fetchBeerTypes(searchParams) {
    let host = new Hosts
    return(
      fetch(host.apiHost() + "/api/v1/beer_types?" + searchParams, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    )
  }
}
