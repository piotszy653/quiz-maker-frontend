import axios from 'axios'

var resultsUrl = 'http://localhost:8080/api/results'

export async function fetchResults () {
  try {
    const response = await axios.get(resultsUrl)
    return response.data
  } catch (error) {
    errorHandling(error)
  }
}

export async function fetchResult (uuid) {
  try {
    const response = await axios.get(resultsUrl + '/' + uuid)
    return response.data
  } catch (error) {
    errorHandling(error)
  }
}

export async function createResult (quizUuid, trueFalseAnswers, testAnswers) {
  try {
    console.log(trueFalseAnswers)
    console.log(testAnswers)
    const response = await axios.post(resultsUrl, {
      quizUuid,
      trueFalseAnswers: trueFalseAnswers === [] ? null : trueFalseAnswers,
      testAnswers: testAnswers === [] ? null : testAnswers
    })
    alert(response.data.uuid)
    return response.data
  } catch (error) {
    console.log(error)
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
