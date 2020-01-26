import axios from 'axios'

var assessmentsUrl = 'http://localhost:8080/api/assessments'

export async function fetchAssessments () {
  try {
    const response = await axios.get(assessmentsUrl)
    return response.data
  } catch (error) {
    errorHandling(error)
  }
}

export async function fetchAssessment (assessmentUuid) {
  try {
    const response = await axios.get(assessmentsUrl + '/' + assessmentUuid)
    return response.data
  } catch (error) {
    errorHandling(error)
  }
}

export async function handleUpdate (assessment, assessmentUuid) {
  try {
    await axios.put(assessmentsUrl + '/' + assessmentUuid, {
      name: assessment.name,
      correctRate: assessment.correctRate,
      incorrectRate: assessment.incorrectRate,
      minPoints: assessment.minPoints,
      maxPoints: assessment.maxPoints
    })
    this.$router.push('/assessments')
  } catch (error) {
    errorHandling(error)
  }
}

export async function handleCreate (assessment) {
  try {
    await axios.post(assessmentsUrl, {
      name: assessment.name,
      correctRate: assessment.correctRate,
      incorrectRate: assessment.incorrectRate,
      minPoints: assessment.minPoints,
      maxPoints: assessment.maxPoints
    })
    this.$router.push('/assessments')
  } catch (error) {
    errorHandling(error)
  }
}

export async function handleDeleteAssessment (uuid) {
  try {
    await axios.delete(assessmentsUrl + '/' + uuid)
    this.$router.go()
  } catch (error) {
    if (error.response && error.response.status === 401) {
      this.$emit('tokenExpired')
    } else {
      throw error
    }
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
