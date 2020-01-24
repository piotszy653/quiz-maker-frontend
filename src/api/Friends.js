import axios from 'axios'
export async function fetchFriends () {
  try {
    const response = await axios.get('http://localhost:8080/api/users/friends')
    return response.data
  } catch (error) {
    if (
      error.response &&
        (error.response.status === 401)
    ) {
      this.$emit('tokenExpired')
    } else {
      alert(error.response.data.code)
      console.log(error)
    }
  }
}
