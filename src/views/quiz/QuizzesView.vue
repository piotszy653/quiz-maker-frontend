<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>
      <v-toolbar prominent class="toolbar">
        <v-toolbar-title class="toolbar-title">Quizzes</v-toolbar-title>
        <v-spacer/>
         <v-toolbar-items>
          <LinkButton url="/quiz" color="green" flat>Create</LinkButton>
          <LinkButton url="/results" color="primary" flat>Results</LinkButton>
          <LinkButton url="/assessments" color="primary" flat>Assessments</LinkButton>
          <LinkButton url="/questions" color="primary" flat>Questions</LinkButton>
          <LinkButton url="/dashboard" color="primary" flat>Main</LinkButton>
          <v-btn @click="handleLogout" color="red" flat>Log out</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-tabs dark centered hide-slider grow>
          <v-tab class="gradient">My quizzes</v-tab>
          <v-tab class="gradient">Available quizzes</v-tab>

          <v-tab-item>
            <v-list v-if="myQuizzes">
              <QuizzesListTiles v-bind:quizzes="myQuizzes" v-bind:myQuizzes="true"/>
            </v-list>
          </v-tab-item>
          <v-tab-item>
              <v-list v-if="availableQuizzes">
                <QuizzesListTiles v-bind:quizzes="availableQuizzes" v-bind:myQuizzes="false"/>
            </v-list>
          </v-tab-item>
        </v-tabs>

    </v-card>
    </v-flex>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import QuizzesListTiles from './QuizzesListTiles'
import { fetchOwnQuizzes, fetchAvailableQuizzes } from '@/api/Quiz.js'
export default {
  name: 'Quizzes',
  data () {
    return {
      myQuizzes: [],
      availableQuizzes: []
    }
  },
  components: {
    LinkButton,
    QuizzesListTiles
  },
  methods: {
    handleLogout () {
      this.$emit('logout')
    }
  },
  async created () {
    try {
      this.myQuizzes = await fetchOwnQuizzes()
      this.myQuizzes = this.myQuizzes.sort((a, b) => a.creationTime > b.creationTime ? -1 : 1)
      this.availableQuizzes = await fetchAvailableQuizzes()
      this.availableQuizzes = this.availableQuizzes.sort((a, b) => a.creationTime > b.creationTime ? -1 : 1)
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
