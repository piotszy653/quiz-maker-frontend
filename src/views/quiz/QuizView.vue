<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>
      <v-toolbar prominent class="toolbar">
        <v-toolbar-title v-if="quiz" class="toolbar-title">Quiz: {{quiz.name}}</v-toolbar-title>
        <v-toolbar-title v-else class="toolbar-title">New Quiz</v-toolbar-title>
        <v-spacer/>
         <v-toolbar-items>
          <LinkButton v-if="quizUuid" url="/question" color="green" flat>Add Question</LinkButton>
          <LinkButton url="/dashboard" color="primary" flat>Main</LinkButton>
          <v-btn @click="handleLogout" color="red" flat>Log out</v-btn>
        </v-toolbar-items>
      </v-toolbar>

        <v-list v-if="quiz">
            <QuestionsListTiles v-bind:questions="quiz.questions" v-bind:quizUuid="quiz.uuid"/>
        </v-list>

    </v-card>
    </v-flex>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import QuestionsListTiles from './question/QuestionsListTiles'
import { fetchQuiz } from '@/api/Quiz.js'
export default {
  name: 'Quiz',
  data () {
    return {
      quiz: null
    }
  },
  props: {
    quizUuid: {
      type: String
    }
  },
  components: {
    LinkButton,
    QuestionsListTiles
  },
  methods: {
    handleLogout () {
      this.$emit('logout')
    }
  },
  async created () {
    try {
      if (this.quizUuid) { this.quiz = await fetchQuiz(this.quizUuid) }
    } catch (error) {
      console.log(error)
      this.$emit('tokenExpired')
    }
  }
}
</script>
<style>
.gradient {
    background-image: linear-gradient(-50deg, #070849c4, #070849);
}
.list-tile {
    margin: 8%
}
</style>
