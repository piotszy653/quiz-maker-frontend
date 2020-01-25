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

export async function fetchInvitedUsers () {
  try {
    const response = await axios.get(usersUrl + '/invited-users')
    return response.data
  } catch (error) {
    errorHandling(error)
  }
}

export async function removeFriend (uuid) {
  try {
    await axios.put(usersUrl + '/remove-friend/' + uuid)
    alert('friend removed')
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

export async function removeInvitation (uuid) {
  try {
    await axios.delete(invitationUrl + '/' + uuid)
    alert('invitation deleted')
  } catch (error) {
    errorHandling(error)
  }
}

export async function resolveInvitation (accepted, uuid) {
  try {
    if (accepted) {
      await axios.put(invitationUrl + '/accept/' + uuid)
      alert('invitation accepted')
    } else {
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
      throw error
    } else {
      console.log(error)
      alert(error.response.data.code)
    }
  }
}
