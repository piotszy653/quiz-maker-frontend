import axios from 'axios'

var quizzesUrl = 'http://localhost:8080/api/quizzes'

export async function fetchOwnQuizzes () {
  try {
    const response = await axios.get(quizzesUrl)
    return response.data
  } catch (error) {
    errorHandling(error)
  }
}

export async function fetchQuiz (uuid) {
  try {
    const response = await axios.get(quizzesUrl + '/' + uuid)
    return response.data
  } catch (error) {
    errorHandling(error)
  }
}

export async function fetchAvailableQuizzes () {
  try {
    const response = await axios.get(quizzesUrl + '/available')
    return response.data
  } catch (error) {
    errorHandling(error)
  }
}

export async function handleRemoveQuestion (quizUuid, questionUuid) {
  try {
    await axios.put(quizzesUrl + '/' + quizUuid, {
      removedQuestionsUuids: [questionUuid]
    })
    alert('Question removed')
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
