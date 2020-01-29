import axios from 'axios'

var questionsUrl = 'http://localhost:8080/api/questions'

export async function fetchQuestions () {
  try {
    const response = await axios.get(questionsUrl)
    return response.data
  } catch (error) {
    errorHandling(error)
  }
}

export async function fetchQuestion (uuid) {
  try {
    const response = await axios.get(questionsUrl + '/' + uuid)
    return response.data
  } catch (error) {
    errorHandling(error)
  }
}

export async function handleCreateQuestion (question, questionType, tags) {
  try {
    await axios.post(questionsUrl + '/' + questionType, {
      question: question.question,
      tags: tags.split(','),
      answer: question.answer
    })
    this.$router.push('/questions')
  } catch (error) {
    errorHandling(error)
  }
}

export async function handleUpdateQuestion (question, questionType, tags) {
  try {
    await axios.put(questionsUrl + '/' + questionType + '/' + question.uuid, {
      question: question.question,
      tags: tags.split(','),
      answer: question.answer
    })
    this.$router.push('/questions')
  } catch (error) {
    errorHandling(error)
  }
}

export async function handleDeleteQuestion (questionType, questionUuid) {
  try {
    await axios.delete(questionsUrl + '/' + questionType.toLowerCase() + '/' + questionUuid)
    alert('Question deleted')
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
      alert(error.response.status + ': ' + error.response.data.code)
    }
  }
}
