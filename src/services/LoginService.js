export default class LoginService {
  sendLoginCredentials(email, password) {
    return(
      fetch("http://localhost:3001/api/v1/authentication", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          credentials: {
            email: email,
            password: password
          }
        })
      })
    )
  }
}
