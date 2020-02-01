<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>
      <v-toolbar prominent class="toolbar">
        <v-toolbar-title class="toolbar-title">Assessments</v-toolbar-title>
        <v-spacer/>
         <v-toolbar-items>
          <LinkButton url="/assessment" color="green" flat>Add</LinkButton>
          <LinkButton url="/dashboard" color="primary" flat>Main</LinkButton>
          <v-btn @click="handleLogout" color="red" flat>Log out</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-list v-if="assessments">
        <v-flex sm8 offset-sm2 md6 offset-md3>
          <v-select
              v-if="quizUuid"
              v-model="questionType"
              :items="questionTypes"
              solo
              label="Question type"
            ></v-select>
        </v-flex>
          <v-list-tile class="list-tile" v-for="assessment in this.assessments" :key="assessment.uuid">
            <v-flex xs3>
            <v-list-tile-content>
                <b>{{assessment.name}}</b>
            </v-list-tile-content>
            </v-flex>
            <v-spacer/>
            <v-flex xs2>
            <v-list-tile-content>
              correct rate: {{assessment.correctRate}}
              <br>
              incorrect rate: {{assessment.incorrectRate}}
            </v-list-tile-content>
            </v-flex>
            <v-spacer/>
            <v-flex xs2>
            <v-list-tile-content>
              min points: {{assessment.minPoints}}
              <br>
              max points: {{assessment.maxPoints}}
            </v-list-tile-content>
            </v-flex>
            <v-spacer/>
            <v-flex xs2>
              <v-list-tile-content v-if="quizUuid">
                <v-checkbox
                  v-model="assessment.selected"
                ></v-checkbox>
              </v-list-tile-content>
            <div v-else>
              <v-list-tile-content>
                <LinkButton small dark color="green" :url=" '/assessment/' + assessment.uuid">update</LinkButton>
              </v-list-tile-content>
              <v-list-tile-content>
                  <v-btn
                  small
                  color="red"
                  dark
                  @click="handleDeleteAssessment(assessment.uuid)" v-bind="$attrs"
                >Remove</v-btn>
              </v-list-tile-content>
            </div>
            </v-flex>
          </v-list-tile>
          <v-btn
            v-if="quizUuid"
            color="green"
            dark
            @click="handleAddAssessment()"
          >Add selected to Quiz</v-btn>
      </v-list>
    </v-card>
    </v-flex>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import { fetchAssessments, handleDeleteAssessment } from '@/api/Assessments'
import { addAssessment } from '@/api/Quiz'
export default {
  name: 'Assessments',
  data () {
    return {
      questionTypes: ['TEST', 'TRUE_FALSE'],
      questionType: null,
      assessments: []
    }
  },
  props: {
    quizUuid: null
  },
  components: {
    LinkButton
  },
  methods: {
    handleLogout () {
      this.$emit('logout')
    },
    fetchAssessments,
    handleDeleteAssessment,
    async handleAddAssessment () {
      try {
        if (this.questionType) {
          await addAssessment(this.quizUuid, this.assessments, this.questionType)
          this.$router.push('/quiz/' + this.quizUuid)
        } else {
          alert('Pick question type')
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            this.$emit('tokenExpired')
          }
        }
        console.log(error)
      }
    }
  },
  async created () {
    try {
      this.assessments = await fetchAssessments()
      this.assessments = this.assessments.sort((a, b) => a.name < b.name ? -1 : 1)
    } catch (error) {
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
