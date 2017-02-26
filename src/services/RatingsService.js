export default class RatingsService {
  sendBeerRating(rating, beer_id, token) {
    return(
      fetch("http://localhost:3001/api/v1/ratings", {
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
