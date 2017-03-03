export default class Hosts {
  api_host() {
    if(window.location.hostname === "localhost") {
      return "http://localhost:3001"
    } else {
      return "https://http://beer-server0123.herokuapp.com"
    }
  }
}
