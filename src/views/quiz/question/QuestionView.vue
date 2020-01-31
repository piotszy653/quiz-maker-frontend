<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>
      <TitleContainer v-if="this.questionUuid" title="Update Question"/>
      <TitleContainer v-else title="Create Question"/>

      <v-form v-if="this.questionUuid" class="form">
          <OpenQuestion v-if="this.questions.openQuestion && this.questionType === 'OPEN'" v-bind:question="this.questions.openQuestion"/>
           <TrueFalseQuestion v-else-if="this.questions.trueFalseQuestion && this.questionType === 'TRUE_FALSE'" v-bind:question="this.questions.trueFalseQuestion"/>
           <TestQuestion v-else-if="this.questions.testQuestion && this.questionType === 'TEST'" v-bind:question="this.questions.testQuestion"/>
      </v-form>

      <v-form v-else class="form">
          <v-flex sm8 offset-sm2 md6 offset-md3>
          <v-select
            v-model="questionType"
            :items="questionTypes"
            solo
            label="Question type"
            ></v-select>
          </v-flex>

          <OpenQuestion v-if="questionType === 'open'"/>
          <TrueFalseQuestion v-else-if="questionType === 'true false'"/>
          <TestQuestion v-else-if="questionType === 'test'"/>
      </v-form>

    </v-card>
    </v-flex>
</template>

<script>
import TitleContainer from '@/components/TitleContainer'
import OpenQuestion from './OpenQuestionView'
import TrueFalseQuestion from './TrueFalseQuestionView'
import TestQuestion from './TestQuestionView'
import { fetchQuestion } from '@/api/Question'
export default {
  name: 'Question',
  data () {
    return {
      questions: {
        openQuestion: {
          uuid: '',
          question: '',
          tags: [''],
          answer: ''
        },
        trueFalseQuestion: {
          uuid: '',
          question: '',
          tags: [''],
          answer: null
        },
        testQuestion: {
          uuid: '',
          question: '',
          tags: [''],
          answers: [],
          multipleChoice: false
        }
      },
      questionType: null,
      questionTypes: [
        'open',
        'true false',
        'test'
      ]
    }
  },
  props: {
    questionUuid: {
      type: String
    }
  },
  components: {
    TitleContainer,
    OpenQuestion,
    TrueFalseQuestion,
    TestQuestion
  },
  methods: {
  },
  async created () {
    try {
      if (this.questionUuid) {
        const response = await fetchQuestion(this.questionUuid)
        this.questionType = response.type
        switch (this.questionType) {
          case 'OPEN':
            this.questions.openQuestion.uuid = response.uuid
            this.questions.openQuestion.question = response.question
            this.questions.openQuestion.tags = response.tags
            this.questions.openQuestion.answer = response.answer
            break
          case 'TRUE_FALSE':
            this.questions.trueFalseQuestion.uuid = response.uuid
            this.questions.trueFalseQuestion.question = response.question
            this.questions.trueFalseQuestion.tags = response.tags
            this.questions.trueFalseQuestion.answer = response.answer
            break
          case 'TEST':
            this.questions.testQuestion.uuid = response.uuid
            this.questions.testQuestion.question = response.question
            this.questions.testQuestion.tags = response.tags
            this.questions.testQuestion.answers = response.answers
            this.questions.testQuestion.multipleChoice = response.multipleChoice
            break
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.$emit('tokenExpired')
      } else {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.form {
  padding: 8%;
}
</style>
