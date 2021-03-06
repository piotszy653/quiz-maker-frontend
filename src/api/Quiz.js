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

export async function handleCreateQuiz (quiz, tags) {
  try {
    await axios.post(quizzesUrl, {
      name: quiz.name,
      privacyPolicy: quiz.privacyPolicy,
      tags: tags.split(',')
    })
    this.$router.push('/quizzes')
  } catch (error) {
    errorHandling(error)
  }
}

export async function handleUpdateQuiz (quiz, tags) {
  try {
    await axios.put(quizzesUrl + '/' + quiz.uuid, {
      name: quiz.name,
      privacyPolicy: quiz.privacyPolicy,
      tags: tags.split(',')
    })
    this.$router.push('/quizzes')
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

export async function addQuestions (questions, quizUuid) {
  try {
    await axios.put(quizzesUrl + '/' + quizUuid, {
      addedQuestionsUuids: questions.filter(question => question.selected).map(question => question.uuid)
    })
  } catch (error) {
    errorHandling(error)
  }
}

export async function addAssessment (quizUuid, assessments, questionType) {
  try {
    assessments = assessments.filter(assessments => assessments.selected)
    if (assessments.length > 0) {
      if (questionType === 'TRUE_FALSE') {
        await axios.put(quizzesUrl + '/' + quizUuid, {
          replacedAssessmentsUuids: { 'TRUE_FALSE': assessments[0].uuid }
        })
      }
      if (questionType === 'TEST') {
        await axios.put(quizzesUrl + '/' + quizUuid, {
          replacedAssessmentsUuids: { 'TEST': assessments[0].uuid }
        })
      }
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
