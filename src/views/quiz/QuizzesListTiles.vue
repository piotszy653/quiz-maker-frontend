<template>
<div>
<v-list-tile class="list-tile" v-for="quiz in this.quizzes" :key="quiz.uuid">
  <v-flex xs6 sm4>
  <v-list-tile-content>
      <b>{{quiz.name}}</b>
      Author: {{quiz.ownerUsername.split('@')[0]}}
  </v-list-tile-content>
  </v-flex>
  <v-spacer/>
  <v-flex xs6 sm4>
  <v-list-tile-content>
    <LinkButton v-if="myQuizzes"
    :url="'/quiz/'+ quiz.uuid"
      small
      color="green"
      dark
    >Edit</LinkButton>
  </v-list-tile-content>
  </v-flex>
  <v-spacer/>
  <v-flex xs6 sm4>
  <v-list-tile-content>
    <LinkButton
      small
      color="primary"
      dark
      :url="'/solve-quiz/' + quiz.uuid"
    >Solve</LinkButton>
  </v-list-tile-content>
  </v-flex>
</v-list-tile>
</div>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
export default {
  name: 'QuizzesListTiles',
  props: {
    quizzes: {
      type: Array
    },
    myQuizzes: {
      type: Boolean
    }
  },
  components: {
    LinkButton
  },
  methods: {
  }
}
</script>
<style>
.list-tile {
  margin: 8%
}
</style>
