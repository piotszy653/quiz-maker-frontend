import axios from 'axios'

var serverUrl = 'http://localhost:8080/api'

export async function handleForgotPassword (username) {
  try {
    await axios.post(serverUrl + '/reset-password', { username })
    alert('E-mail sent. Please check your inbox.')
  } catch (error) {
    alert(error.response.data.code)
    console.log(error)
  }
}

export async function handleResetPassword (password, repeatedPassword, token) {
  try {
    await axios.put(serverUrl + '/reset-password', {
      password,
      repeatedPassword,
      uuid: token
    })
    alert('Password changed successfully')
    this.$emit('tokenExpired')
  } catch (error) {
    alert(error.response.data.code)
    console.log(error)
  }
}
