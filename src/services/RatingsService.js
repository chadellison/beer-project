import Hosts from "../config/Hosts.js"

export default class RatingsService {
  sendBeerRating(rating, beer_id, token) {
    let host = new Hosts
    return(
      fetch(host.apiHost() + "/api/v1/ratings", {
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
