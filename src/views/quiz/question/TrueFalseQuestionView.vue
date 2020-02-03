<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>

      <v-form class="form">
        <v-flex sm8 offset-sm2 md10 offset-md1>
        <v-textarea
            :clearable="!this.disabled"
            auto-grow
            filled
            label="Question"
            v-model="newQuestion.question"
            :disabled="this.disabled"
        ></v-textarea>
        <v-flex xs2 v-if="!solve || solve && disabled">
          Answer
        <v-switch
          color="primary"
          v-model="newQuestion.answer"
          :label="newQuestion.answer.toString()"
          :disabled="this.disabled"
        ></v-switch>
        </v-flex>
        <v-flex xs2 v-if="this.solve && this.newAnswer !== undefined && this.newAnswer !== null">
          Your answer
        <v-switch
          color="primary"
          v-model="newAnswer"
          :label="newAnswer.toString()"
          :disabled="this.disabled"
        ></v-switch>
        </v-flex>
        </v-flex>
        <v-flex sm8 offset-sm2 md6 offset-md3>
        <v-text-field v-if="!this.solve" label="Tags" hint="separated by ','" v-model="tags"></v-text-field>
        </v-flex>
        <v-flex sm8 offset-sm2 md6 offset-md3>
          <div v-if="!this.solve">
            <v-btn v-if="this.question" @click="handleUpdateQuestion(newQuestion, 'true-false', tags)" block dark color="green">Update</v-btn>
            <v-btn v-else @click="handleCreateQuestion(newQuestion, 'true-false', tags)" block dark color="primary">Create</v-btn>
          </div>
        </v-flex>
        <v-flex sm8 offset-sm2 md6 offset-md3 v-if="solve && !disabled">
          <v-btn v-if="!this.lastQuestion" @click="handleSolvedQuestion" block dark color="green">Next Question</v-btn>
          <v-btn v-else @click="handleSolvedQuestion" block dark color="red">Submit</v-btn>
        </v-flex>
      </v-form>

    </v-card>
    </v-flex>
</template>

<script>
import { handleCreateQuestion, handleUpdateQuestion } from '@/api/Question'
export default {
  name: 'TrueFalseQuestion',
  data () {
    return {
      newAnswer: false,
      tags: '',
      newQuestion: {
        uuid: '',
        question: '',
        answer: false
      }
    }
  },
  props: {
    question: null,
    disabled: {
      type: Boolean,
      default: false
    },
    solve: {
      type: Boolean,
      default: false
    },
    lastQuestion: {
      type: Boolean,
      default: false
    },
    answer: null
  },
  components: {
  },
  methods: {
    handleCreateQuestion,
    handleUpdateQuestion,
    handleSolvedQuestion () {
      this.$emit('solved', {
        answer: this.newAnswer
      })
    }
  },
  async created () {
    if (this.question) {
      this.newQuestion = this.question
      this.tags = this.question.tags.join(',')
    }
    if (this.question && this.disabled) {
      this.newAnswer = this.answer
    }
  }
}
</script>

<style>
.form {
  padding: 8%;
}
</style>
