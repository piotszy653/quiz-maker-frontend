<template>
<div>
    <v-list-tile class="list-tile-header" v-if="questions.length !== 0" >
  <v-flex xs6 sm3>
  <v-list-tile-content>
      <b>Type</b>
  </v-list-tile-content>
  </v-flex>
  <v-flex xs6 sm4>
  <v-list-tile-content>
      <b>Question</b>
  </v-list-tile-content>
  </v-flex>
  <v-flex xs6 sm3>
  <v-list-tile-content>
      <b>Tags</b>
  </v-list-tile-content>
  </v-flex>
</v-list-tile>
<v-list-tile class="list-tile" v-for="question in this.questions" :key="question.uuid">
  <v-flex xs6 sm3>
  <v-list-tile-content>
      {{question.type}}
  </v-list-tile-content>
  </v-flex>
  <v-spacer/>
  <v-flex xs6 sm4>
  <v-list-tile-content>
      {{question.question}}
  </v-list-tile-content>
  </v-flex><v-spacer/>
  <v-flex xs6 sm3>
  <v-list-tile-content>
      {{question.tags.join(', ')}}
  </v-list-tile-content>
  </v-flex>
  <v-spacer/>
  <v-flex xs2>
  <v-list-tile-content v-if="!addToQuiz">
    <LinkButton
      small
      color="green"
      dark
      :url="'/question/' + question.uuid"
    >Edit</LinkButton>
  </v-list-tile-content>
  <v-spacer/>
  <v-list-tile-content v-if="addToQuiz">
    <v-checkbox
      v-model="question.selected"
    ></v-checkbox>
  </v-list-tile-content>
  <v-list-tile-content v-else>
    <v-btn
      v-if="quizUuid"
      small
      color="red"
      dark
      @click="handleRemoveQuestion(quizUuid, question.uuid)"
    >remove</v-btn>
    <v-btn
      v-else
      small
      color="red"
      dark
      @click="handleDeleteQuestion(question.type, question.uuid)"
    >delete</v-btn>
  </v-list-tile-content>
  </v-flex>
</v-list-tile>
<v-btn
  v-if="addToQuiz"
  color="green"
  dark
  @click="handleAddQuestions()"
>Add selected to Quiz</v-btn>
</div>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import { handleRemoveQuestion, addQuestions } from '@/api/Quiz'
import { handleDeleteQuestion } from '@/api/Question'
export default {
  name: 'QuestionsListTiles',
  props: {
    questions: {
      type: Array
    },
    quizUuid: null,
    addToQuiz: null
  },
  components: {
    LinkButton
  },
  methods: {
    handleRemoveQuestion,
    handleDeleteQuestion,
    async handleAddQuestions () {
      try {
        await addQuestions(this.questions, this.quizUuid)
        this.$router.push('/quiz/' + this.quizUuid)
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            this.$emit('tokenExpired')
          }
        }
      }
    }
  }
}
</script>
<style>
.list-tile {
  margin-left: 8%;
  margin-right: 8%;
  margin-bottom: 16%;
}
.list-tile-header {
  margin-left: 8%;
  margin-right: 8%;
  margin-top: 8%
}
</style>
