<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>
      <v-toolbar prominent class="toolbar">
        <v-toolbar-title class="toolbar-title">Questions</v-toolbar-title>
        <v-spacer/>
         <v-toolbar-items>
          <LinkButton url="/question" color="green" flat>Add</LinkButton>
          <LinkButton url="/quizzes" color="primary" flat>Quizzes</LinkButton>
          <LinkButton url="/dashboard" color="primary" flat>Main</LinkButton>
          <v-btn @click="handleLogout" color="red" flat>Log out</v-btn>
        </v-toolbar-items>
      </v-toolbar>
            <v-list v-if="questions">
            <QuestionsListTiles v-bind:questions="questions"/>
        </v-list>

    </v-card>
    </v-flex>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import QuestionsListTiles from './QuestionsListTiles'
import { fetchQuestions } from '@/api/Question'
export default {
  name: 'Questions',
  data () {
    return {
      questions: []
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
      this.questions = await fetchQuestions()
      this.questions = this.questions.sort((a, b) => a.type > b.type ? 1 : -1)
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
