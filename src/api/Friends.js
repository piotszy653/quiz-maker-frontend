import axios from 'axios'

var serverUrl = 'http://localhost:8080/api'
var usersUrl = serverUrl + '/users'
var invitationUrl = serverUrl + '/invitations'

export async function fetchFriends () {
  try {
    const response = await axios.get(usersUrl + '/friends')
    return response.data
  } catch (error) {
    errorHandling(error)
  }
}

export async function fetchUsers () {
  try {
    const response = await axios.get(usersUrl)
    return response.data
  } catch (error) {
    errorHandling(error)
  }
}

export async function fetchInvitingUsers () {
  try {
    const response = await axios.get(usersUrl + '/inviting-users')
    return response.data
  } catch (error) {
    errorHandling(error)
  }
}

export async function removeFriend (uuid) {
  alert(usersUrl + '/remove-friend/' + uuid)
  try {
    await axios.put(usersUrl + '/remove-friend/' + uuid)
  } catch (error) {
    errorHandling(error)
  }
}

export async function invite (uuid) {
  try {
    await axios.post(invitationUrl + '/' + uuid)
    alert('user invited')
  } catch (error) {
    errorHandling(error)
  }
}

export async function resolveInvitation (accepted, uuid) {
  try {
    if (accepted) {
      alert(invitationUrl + '/accept/' + uuid)
      await axios.put(invitationUrl + '/accept/' + uuid)
      alert('invitation accepted')
    } else {
      alert(invitationUrl + '/decline/' + uuid)
      await axios.delete(invitationUrl + '/decline/' + uuid)
      alert('invitaiton declined')
    }
  } catch (error) {
    errorHandling(error)
  }
}

function errorHandling (error) {
  if (error.response) {
    if (error.response.status === 401) {
      this.$emit('tokenExpired')
    } else {
      console.log(error)
      alert(error.response.data.code)
    }
  }
}
