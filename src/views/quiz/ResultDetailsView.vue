<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>
      <v-toolbar prominent class="toolbar">
        <v-toolbar-title v-if="result" class="toolbar-title">Result: {{result.quiz.name}}</v-toolbar-title>
        <v-spacer/>
         <v-toolbar-items>
           <LinkButton url="/results" color="primary" flat>Results</LinkButton>
          <LinkButton url="/dashboard" color="primary" flat>Main</LinkButton>
          <v-btn @click="handleLogout" color="red" flat>Log out</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container v-if="result">
        Points: {{result.points}}
          <v-card v-for="question in result.quiz.questions" :key="question.uuid">
            <SolveQuestion
            v-if="question.type === 'OPEN'"
            :result="true"
            :question="question"
            />
            <SolveQuestion
            v-else-if="question.type === 'TEST'"
            :result="true"
            :question="question"
            :answer="result.testAnswers[question.uuid]"
            />
            <SolveQuestion
            v-else-if="question.type === 'TRUE_FALSE'"
            :result="true"
            :question="question"
            :answer="result.trueFalseAnswers[question.uuid]"
            />
          </v-card>
      </v-container>
    </v-card>
    </v-flex>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import SolveQuestion from '@/views/quiz/question/SolveQuestionView'
import { fetchResult } from '@/api/Result'
export default {
  name: 'ResultDetails',
  data () {
    return {
      result: null
    }
  },
  props: {
    resultUuid: null
  },
  components: {
    LinkButton,
    SolveQuestion
  },
  methods: {
    handleLogout () {
      this.$emit('logout')
    },
    fetchResult
  },
  async created () {
    try {
      if (this.resultUuid) {
        this.result = await fetchResult(this.resultUuid)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          this.$emit('tokenExpired')
        } else {
          console.log(error)
        }
      } else {
        console.log(error)
      }
    }
  }
}
</script>
<style>
.gradient {
    background-image: linear-gradient(-50deg, #070849c4, #070849);
}
</style>
