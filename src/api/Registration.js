import axios from 'axios'
export async function handleSignUp (username, password, name) {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/registration', {
      username,
      password,
      name,
      regulationsAccepted: true
    })
    this.$emit('login', {
      username: response.data.user.username,
      token: response.data.token
    })
  } catch (error) {
    alert(error.response.data.code)
    console.log(error)
  }
}
