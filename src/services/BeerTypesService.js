export default class BeerTypesService {
  fetchBeerTypes(searchParams) {
    let host = window.location.hostname
    let api_host = ""

    if(host === 'localhost') {
      api_host = "http://localhost:3001"
    } else {
      api_host = "https://beer-server23.herokuapp.com/"
    }
    return(
      fetch(api_host + "/api/v1/beer_types?" + searchParams, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    )
  }
}
