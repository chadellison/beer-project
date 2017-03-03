export default class SignUpService {
  sendSignUpCredentials(firstName, lastName, email, password) {
    let host = window.location.hostname
    let api_host = ""

    if(host === 'localhost') {
      api_host = "http://localhost:3001"
    } else {
      api_host = "https://beer-server23.herokuapp.com/"
    }

    return(
      fetch(api_host + "/api/v1/users", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
          }
        })
      })
    )
  }
}
