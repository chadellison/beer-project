export default class RatingsService {
  sendBeerRating(rating, beer_id, token) {
    let host = window.location.hostname
    let api_host = ""

    if(host === 'localhost') {
      api_host = "http://localhost:3001"
    } else {
      api_host = "https://beer-server23.herokuapp.com/"
    }

    return(
      fetch(api_host + "/api/v1/ratings", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating: rating,
          beer_id: beer_id,
          token: token
        })
      })
    )
  }
}
