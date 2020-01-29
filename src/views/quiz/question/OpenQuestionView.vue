<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>

      <v-form class="form">
        <v-flex sm8 offset-sm2 md10 offset-md1>
        <v-textarea
            autofocus
            filled
            label="Question"
            v-model="newQuestion.question"
        ></v-textarea>
        <v-textarea
          filled
          label="Answer"
          v-model="newQuestion.answer"
        ></v-textarea>
        </v-flex>
        <v-flex sm8 offset-sm2 md6 offset-md3>
        <v-text-field label="Tags" hint="separated by ','" v-model="tags"></v-text-field>
        </v-flex>
        <v-flex sm8 offset-sm2 md6 offset-md3>
        <v-btn v-if="this.question" @click="handleUpdateQuestion(newQuestion, 'open', tags)" block dark color="green">Update</v-btn>
        <v-btn v-else @click="handleCreateQuestion(newQuestion, 'open', tags)" block dark color="primary">Create</v-btn>
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
    question: null
  },
  components: {
  },
  methods: {
    handleCreateQuestion,
    handleUpdateQuestion
  },
  async created () {
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
