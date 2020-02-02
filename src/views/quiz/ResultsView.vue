<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>
      <v-toolbar prominent class="toolbar">
        <v-toolbar-title class="toolbar-title">Results</v-toolbar-title>
        <v-spacer/>
         <v-toolbar-items>
          <LinkButton url="/dashboard" color="primary" flat>Main</LinkButton>
          <v-btn @click="handleLogout" color="red" flat>Log out</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-list>
          <v-list-tile class="list-tile" v-for="result in this.results" :key="result.uuid">
            <v-flex xs6 sm4>
            <v-list-tile-content>
                <b>{{result.quiz.name}}</b>
                {{result.quiz.ownerUsername}}
            </v-list-tile-content>
            </v-flex>
            <v-spacer/>
            <v-flex xs6 sm4>
            <v-list-tile-content>
                <b>Tags</b>
                {{result.quiz.tags.join(', ')}}
            </v-list-tile-content>
            </v-flex>
            <v-spacer/>
            <v-flex xs6 sm4>
            <v-list-tile-content>
                <b>Points</b>
                {{result.points}}
            </v-list-tile-content>
            </v-flex>
            <v-spacer/>
            <v-flex xs6 sm4>
            <v-list-tile-content>
              <LinkButton
              :url="'/result/'+ result.uuid"
                small
                color="green"
                dark
              >Details</LinkButton>
            </v-list-tile-content>
            <v-list-tile-content>
              <LinkButton
                small
                color="primary"
                dark
                :url="'/solve-quiz/' + result.quiz.uuid"
              >Try again</LinkButton>
            </v-list-tile-content>
            </v-flex>
          </v-list-tile>
      </v-list>

    </v-card>
    </v-flex>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import { fetchResults } from '@/api/Result'
export default {
  name: 'Results',
  data () {
    return {
      results: null
    }
  },
  components: {
    LinkButton
  },
  methods: {
    handleLogout () {
      this.$emit('logout')
    },
    fetchResults
  },
  async created () {
    try {
      this.results = await fetchResults()
      this.results = this.results.sort((a, b) => a.creationTime > b.creationTime ? -1 : 1)
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
