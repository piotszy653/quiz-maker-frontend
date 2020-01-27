<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>
      <v-toolbar prominent class="toolbar">
        <v-toolbar-title class="toolbar-title">Quiz Maker</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <LinkButton url="/quizzes" color="primary" flat>Quizzes</LinkButton>
          <LinkButton url="/friends" color="primary" flat>Friends</LinkButton>
          <v-btn @click="handleLogout" color="red" flat>Log out</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list v-if="quizzes">
                <QuizzesListTiles v-bind:quizzes="quizzes" v-bind:myQuizzes="false"/>
            </v-list>
    </v-card>
    </v-flex>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import QuizzesListTiles from '@/views/quiz/QuizzesListTiles'
import { fetchAvailableQuizzes } from '@/api/Quiz'
export default {
  name: 'Dashboard',
  data () {
    return {
      quizzes: []
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
      this.quizzes = await fetchAvailableQuizzes()
      this.quizzes = this.quizzes.sort((a, b) => a.creationTime > b.creationTime ? -1 : 1)
    } catch (error) {
      console.log(error)
      this.$emit('tokenExpired')
    }
  }
}
</script>
<style>
.toolbar {
  background-image: linear-gradient(-50deg, #070849c4, #070849);
}
.toolbar-title {
  font-family: "Roboto", sans-serif;
    letter-spacing: 1px;
    color: rgb(233, 230, 230);
    font-size: 34px;
    line-height: 65px;
}
.choice-buttons {
  padding: 10%;
  height: 100vh;
}
</style>
