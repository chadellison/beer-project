export default class BeerTypesService {
  fetchBeerTypes(searchParams) {
    return(
      fetch("http://localhost:3001/api/v1/beer_types?" + searchParams, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    )
  }
}
