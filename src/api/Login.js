import axios from 'axios'
export async function handleSignIn () {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      username: this.username,
      password: this.password
    })
    this.$emit('login', {
      username: response.data.user.username,
      token: response.data.token
    })
  } catch (error) {
    if (
      error.response &&
        (error.response.status === 401 || error.response.status === 400)
    ) {
      alert('Wrong username or password')
    } else {
      alert(error.response.data.code)
      console.log(error)
    }
  }
}
