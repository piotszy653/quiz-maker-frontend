import axios from 'axios'

var serverUrl = 'http://localhost:8080/api'

export async function forgotPassword (username) {
  try {
    alert('sending forgot password request: ' + username)
    await axios.post(serverUrl + '/reset-password', { username })
    alert('E-mail sent. Please check your inbox.')
  } catch (error) {
    alert(error.response.data.code)
    console.log(error)
  }
}
