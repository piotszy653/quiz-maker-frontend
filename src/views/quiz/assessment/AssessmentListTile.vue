<template>
      <div v-if="this.assessment">
          <v-list-tile>
              {{questionType}}
          </v-list-tile>
          <v-list-tile class="list-tile">
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
              <LinkButton small dark color="green" :url=" '/assessment/' + assessment.uuid">edit</LinkButton>
            </v-list-tile-content>
            </v-flex>
          </v-list-tile>
      </div>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
export default {
  name: 'AssessmentsListTile',
  props: {
    assessment: null,
    questionType: null,
    quizUuid: null
  },
  components: {
    LinkButton
  },
  methods: {
    handleLogout () {
      this.$emit('logout')
    }
  }
}
</script>
<style>
.list-tile {
    margin: 8%
}
</style>
