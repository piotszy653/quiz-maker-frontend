<template>
  <v-flex md10 offset-md1>
    <v-card class="toolbar-card">
      <v-form class="form">
        <v-flex sm8 offset-sm2 md10 offset-md1>
          <v-textarea
            auto-grow
            :clearable="!this.solve"
            filled
            label="Question"
            v-model="newQuestion.question"
            :disabled="this.solve"
          ></v-textarea>
          <v-textarea
            filled
            auto-grow
            :clearable="!this.solve"
            label="Answer"
            v-model="newQuestion.answer"
            :disabled="this.solve"
          ></v-textarea>
        </v-flex>
        <v-flex sm8 offset-sm2 md6 offset-md3>
          <v-text-field v-if="!this.solve" label="Tags" hint="separated by ','" v-model="tags"></v-text-field>
        </v-flex>
        <v-flex sm8 offset-sm2 md6 offset-md3>
          <div v-if="!this.solve">
            <v-btn
              v-if="this.question"
              @click="handleUpdateQuestion(newQuestion, 'open', tags)"
              block
              dark
              color="green"
            >Update</v-btn>
            <v-btn
              v-else
              @click="handleCreateQuestion(newQuestion, 'open', tags)"
              block
              dark
              color="primary"
            >Create</v-btn>
          </div>
        </v-flex>
        <v-flex sm8 offset-sm2 md6 offset-md3 v-if="solve && !disabled">
          <v-btn
            v-if="!this.lastQuestion"
            @click="handleSolvedQuestion"
            block
            dark
            color="green"
          >Next Question</v-btn>
          <v-btn v-else @click="handleSolvedQuestion" block dark color="red">Submit</v-btn>
        </v-flex>
      </v-form>
    </v-card>
  </v-flex>
</template>

<script>
import { handleCreateQuestion, handleUpdateQuestion } from '@/api/Question'
export default {
  name: 'OpenQuestion',
  data () {
    return {
      tags: '',
      newQuestion: {
        uuid: '',
        question: '',
        answer: ''
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
    }
  },
  computed: {
    uuid () {
      return this.question.uuid
    }
  },
  watch: {
    uuid: function () {
      if (this.question) {
        this.newQuestion = this.question
        this.tags = this.question.tags.join(',')
      }
    }
  },
  methods: {
    handleCreateQuestion,
    handleUpdateQuestion,
    handleSolvedQuestion () {
      this.$emit('solved')
    }
  },
  async mounted () {
    if (this.question) {
      this.newQuestion = this.question
      this.tags = this.question.tags.join(',')
    }
  },
  async updated () {
    if (this.question) {
      this.newQuestion = this.question
      this.tags = this.question.tags.join(',')
    }
  }
}
</script>

<style>
.form {
  padding: 8%;
}
</style>
