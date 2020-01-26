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
            </v-flex>
          </v-list-tile>
      </v-list>
    </v-card>
    </v-flex>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import { fetchAssessments, handleDeleteAssessment } from '@/api/Assessments'
export default {
  name: 'Assessments',
  data () {
    return {
      assessments: []
    }
  },
  components: {
    LinkButton
  },
  methods: {
    handleLogout () {
      this.$emit('logout')
    },
    fetchAssessments,
    handleDeleteAssessment
  },
  async created () {
    try {
      this.assessments = await fetchAssessments()
      this.assessments = this.assessments.sort((a, b) => a.creationTime < b.creationTime ? -1 : 1)
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
