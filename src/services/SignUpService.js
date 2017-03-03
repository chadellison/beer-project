export default class SignUpService {
  sendSignUpCredentials(firstName, lastName, email, password) {
    return(
      fetch("http://localhost:3001/api/v1/users", {
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
