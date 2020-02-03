<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>
      <v-toolbar prominent class="toolbar">
        <v-toolbar-title v-if="quiz" class="toolbar-title">Quiz: {{quiz.name}}</v-toolbar-title>
        <v-toolbar-title v-else class="toolbar-title">New Quiz</v-toolbar-title>
        <v-spacer/>
         <v-toolbar-items>
          <LinkButton v-if="quizUuid" :url="`/assessments/` + quizUuid" color="green" flat>Add Assessment</LinkButton>
          <LinkButton v-if="quizUuid" :url="`/questions/` + quizUuid" color="green" flat>Add Questions</LinkButton>
          <LinkButton url="/quizzes" color="primary" flat>Quizzes</LinkButton>
          <LinkButton url="/dashboard" color="primary" flat>Main</LinkButton>
          <v-btn @click="handleLogout" color="red" flat>Log out</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-form class="form">
        <v-flex sm6 offset-sm3>
        <v-textarea
            autofocus
            filled
            label="Name"
            v-model="newQuiz.name"
        ></v-textarea>
        <v-select
            v-model="newQuiz.privacyPolicy"
            :items="privacyPolicies"
            solo
            label="Privacy Policy"
            ></v-select>
            <v-text-field label="Tags" hint="separated by ','" v-model="tags"></v-text-field>
        </v-flex>
        <v-card elevation="2">
          <v-list>
            <v-list-tile v-if="assessments.test || assessments.trueFalse">
              Assessments
            </v-list-tile>
            <AssessmentListTile
            v-if="assessments.test"
            v-bind:assessment="assessments.test"
            v-bind:questionType="'TEST'"
            v-bind:quizUuid="quizUuid"
            />
            <AssessmentListTile
            v-if="assessments.trueFalse"
            v-bind:assessment="assessments.trueFalse"
            v-bind:questionType="'TRUE FALSE'"
            v-bind:quizUuid="quizUuid"
            />
          </v-list>
        </v-card>
        <br>
        <v-card elevation="2">
          <v-list v-if="quiz">
            <v-list-tile v-if="quiz">
              Questions
            </v-list-tile>
              <QuestionsListTiles v-bind:questions="quiz.questions" v-bind:quizUuid="quiz.uuid"/>
          </v-list>
        </v-card>
        <v-flex sm6 offset-sm3>
        <v-btn
          v-if="this.quiz"
          @click="handleUpdateQuiz(newQuiz, tags)"
          block
          dark
          color="green"
        >Update</v-btn>
        <v-btn
          v-else
          @click="handleCreateQuiz(newQuiz, tags)"
          block
          dark
          color="primary"
        >Create</v-btn>
        </v-flex>
      </v-form>

    </v-card>
    </v-flex>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import QuestionsListTiles from './question/QuestionsListTiles'
import AssessmentListTile from '@/views/quiz/assessment/AssessmentListTile'
import { fetchQuiz, handleCreateQuiz, handleUpdateQuiz } from '@/api/Quiz.js'
export default {
  name: 'Quiz',
  data () {
    return {
      tags: '',
      assessments: {
        trueFalse: null,
        test: null
      },
      privacyPolicies: ['PRIVATE', 'FRIENDS', 'PUBLIC'],
      newQuiz: {
        name: '',
        privacyPolicy: '',
        tags: ['']
      },
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
    QuestionsListTiles,
    AssessmentListTile
  },
  methods: {
    handleLogout () {
      this.$emit('logout')
    },
    handleCreateQuiz,
    handleUpdateQuiz
  },
  async created () {
    try {
      if (this.quizUuid) {
        this.quiz = await fetchQuiz(this.quizUuid)
        this.newQuiz = this.quiz
        this.tags = this.quiz.tags.join(', ')
        if (this.quiz.assessments.TRUE_FALSE) {
          this.assessments.trueFalse = this.quiz.assessments.TRUE_FALSE
        }
        if (this.quiz.assessments.TEST) {
          this.assessments.test = this.quiz.assessments.TEST
        }
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status === 401) {
          this.$emit('tokenExpired')
        }
      }
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
.form {
  padding: 8%;
}
</style>
