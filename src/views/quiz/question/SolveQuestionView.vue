<template>
    <v-flex md10 offset-md1>
    <v-card>
      <v-form v-if="this.question" class="form">
          <OpenQuestion
          v-if="this.question.type === 'OPEN'"
          :question="this.question"
          :disabled="this.result"
          :solve="true"
          @solved="handleSolvedQuestion"
          :lastQuestion="lastQuestion"
          />
           <TrueFalseQuestion
           v-else-if="this.question.type === 'TRUE_FALSE'"
           :question="question"
           :disabled="this.result"
           :solve="true"
           :answer="this.answer"
           @solved="handleSolvedQuestion"
           :lastQuestion="lastQuestion"
           />
           <TestQuestion
           v-else-if="this.question.type === 'TEST'"
           :question="this.question"
           :disabled="this.result"
           :solve="true"
           :userAnswers="this.answer"
           @solved="handleSolvedQuestion"
           :lastQuestion="lastQuestion"
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
    lastQuestion: {
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
    handleSolvedQuestion (response) {
      this.$emit('solved', response)
    }
  }
}
</script>

<style>
.form {
  padding: 8%;
}
</style>
