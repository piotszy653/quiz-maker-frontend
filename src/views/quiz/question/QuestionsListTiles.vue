<template>
<div>
    <v-list-tile class="list-tile-header" >
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
  <v-list-tile-content>
    <LinkButton
      small
      color="green"
      dark
      :url="'/question/' + question.type + '/' + question.uuid"
    >Edit</LinkButton>
  </v-list-tile-content>
  <v-spacer/>
  <v-list-tile-content>
    <v-btn
      small
      color="red"
      dark
      @click="handleRemoveQuestion(quizUuid, question.uuid)"
    >remove</v-btn>
  </v-list-tile-content>
  </v-flex>
</v-list-tile>
</div>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import { handleRemoveQuestion } from '@/api/Quiz'
export default {
  name: 'QuestionsListTiles',
  props: {
    questions: {
      type: Array
    },
    quizUuid: null
  },
  components: {
    LinkButton
  },
  methods: {
    handleRemoveQuestion
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
