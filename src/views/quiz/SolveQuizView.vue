<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>
      <v-toolbar prominent class="toolbar">
        <v-toolbar-title v-if="quiz" class="toolbar-title">Quiz: {{quiz.name}}</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-title v-if="quiz" class="toolbar-title">Question {{questionId + 1}} of {{quiz.questions.length}}</v-toolbar-title>
        <v-spacer/>
         <v-toolbar-items>
           <LinkButton url="/results" color="primary" flat>Results</LinkButton>
          <LinkButton url="/dashboard" color="primary" flat>Main</LinkButton>
          <v-btn @click="handleLogout" color="red" flat>Log out</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container v-if="question">
          <v-card flat>
            <SolveQuestion
            v-if="question.type === 'OPEN'"
            :result="false"
            :question="question"
            @solved="handleSolvedOpenQuestion"
            :lastQuestion="lastQuestion"
            />
            <SolveQuestion
            v-else-if="question.type === 'TEST'"
            :result="false"
            :question="question"
            @solved="handleSolvedTestQuestion"
            :lastQuestion="lastQuestion"
            />
            <SolveQuestion
            v-else-if="question.type === 'TRUE_FALSE'"
            :result="false"
            :question="question"
            @solved="handleSolvedTrueFalseQuestion"
            :lastQuestion="lastQuestion"
            />
          </v-card>
      </v-container>
    </v-card>
    </v-flex>
</template>

<script>
import SolveQuestion from '@/views/quiz/question/SolveQuestionView'
import LinkButton from '@/components/LinkButton.vue'
import { fetchQuiz } from '@/api/Quiz'
import { createResult } from '@/api/Result'
export default {
  name: 'SolveQuiz',
  data () {
    return {
      testAnswers: [],
      trueFalseAnswers: [],
      questionId: 0,
      quiz: null
    }
  },
  computed: {
    question: function () {
      return this.quiz ? this.quiz.questions[this.questionId] : null
    },
    lastQuestion: function () {
      return this.questionId + 1 >= this.quiz.questions.length
    }
  },
  props: {
    quizUuid: null
  },
  components: {
    SolveQuestion,
    LinkButton
  },
  methods: {
    nextQuestion () {
      if (this.questionId + 1 < this.quiz.questions.length) {
        this.questionId++
      } else {
        this.sendAnswers()
      }
    },
    async sendAnswers () {
      const result = await createResult(this.quizUuid, this.trueFalseAnswers, this.testAnswers)
      this.$router.push('/result/' + result.uuid)
    },
    handleLogout () {
      this.$emit('logout')
    },
    handleSolvedTestQuestion (response) {
      this.testAnswers.push([this.question.uuid, response.answers])
      this.nextQuestion()
    },
    handleSolvedTrueFalseQuestion (response) {
      this.trueFalseAnswers.push([this.question.uuid, response.answer])
      this.nextQuestion()
    },
    handleSolvedOpenQuestion () {
      this.nextQuestion()
    }
  },
  async created () {
    if (this.quizUuid) {
      this.quiz = await fetchQuiz(this.quizUuid)
    }
  }
}
</script>

<style>
.form {
  padding: 8%;
}
</style>
