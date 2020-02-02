<template>
    <v-flex md10 offset-md1>
    <v-card>
      <v-form v-if="this.question" class="form">
          <OpenQuestion
          v-if="this.question.type === 'OPEN'"
          v-bind:question="this.question"
          :disabled="this.result"
          :solve="true"
          />
           <TrueFalseQuestion
           v-else-if="this.question.type === 'TRUE_FALSE'"
           v-bind:question="this.question"
           :disabled="this.result"
           :solve="true"
           :answer="this.answer"
           />
           <TestQuestion
           v-else-if="this.question.type === 'TEST'"
           v-bind:question="this.question"
           :disabled="this.result"
           :solve="true"
           :userAnswers="this.answer"
           />
      </v-form>
    </v-card>
    </v-flex>

</template>

<script>
import OpenQuestion from './OpenQuestionView'
import TrueFalseQuestion from './TrueFalseQuestionView'
import TestQuestion from './TestQuestionView'
export default {
  name: 'SolveQuestion',
  data () {
    return {

    }
  },
  props: {
    result: {
      type: Boolean,
      default: false
    },
    question: null,
    answer: null
  },
  components: {
    OpenQuestion,
    TrueFalseQuestion,
    TestQuestion
  },
  methods: {
  }
}
</script>

<style>
.form {
  padding: 8%;
}
</style>
