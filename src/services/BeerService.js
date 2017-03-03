export default class BeerService {
  sendBeerData(name, beer_type, rating, token) {
    return(
      fetch("http://localhost:3001/api/v1/beers", {
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
