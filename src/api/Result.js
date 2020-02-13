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
    let trueFalseAnswersPost = {}
    for (let answer of trueFalseAnswers) {
      trueFalseAnswersPost[answer[0]] = answer[1]
    }
    let testAnswersPost = {}
    for (let answer of testAnswers) {
      testAnswersPost[answer[0]] = answer[1]
    }

    const response = await axios.post(resultsUrl, {
      quizUuid,
      trueFalseAnswers: trueFalseAnswers === [] ? null : trueFalseAnswersPost,
      testAnswers: testAnswers === [] ? null : testAnswersPost
    })
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
