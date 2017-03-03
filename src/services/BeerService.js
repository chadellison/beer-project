export default class BeerService {
  sendBeerData(name, beer_type, rating, token) {
    let host = window.location.hostname
    let api_host = ""

    if(host === 'localhost') {
      api_host = "http://localhost:3001"
    } else {
      api_host = "https://beer-server23.herokuapp.com/"
    }
    return(
      fetch(api_host + "/api/v1/beers", {
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
    return(
      fetch("http://localhost:3001/api/v1/beers?" + searchParams, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    )
  }
}
