<template>
<div>
  <v-list-tile class="list-tile">
    <v-flex xs3>
      <v-text-field
      class="filter-field"
      placeholder="name"
      v-model="nameFilter"
      />
    </v-flex>
    <v-flex xs3>
      <v-text-field
      placeholder="author"
      v-model="authorFilter"
      />
    </v-flex>
  </v-list-tile>
  <v-list-tile class="list-tile" v-for="quiz in this.computedQuizzes" :key="quiz.uuid">
    <v-flex xs6 sm4>
    <v-list-tile-content>
        <b>{{quiz.name}}</b>
        {{quiz.ownerUsername}}
    </v-list-tile-content>
    </v-flex>
    <v-spacer/>
    <v-flex xs6 sm4>
    <v-list-tile-content>
        <b>Tags</b>
        {{quiz.tags.join(', ')}}
    </v-list-tile-content>
    </v-flex>
    <v-spacer/>
    <v-flex xs6 sm4>
    <v-list-tile-content>
        <b>Privacy</b>
        {{quiz.privacyPolicy}}
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
  data () {
    return {
      nameFilter: '',
      authorFilter: ''
    }
  },
  computed: {
    computedQuizzes: function () {
      return this.quizzes.filter((quiz) =>
        quiz.name.includes(this.nameFilter) &&
        quiz.ownerUsername.includes(this.authorFilter)
      )
    }
  },
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
.filter-field {
  margin-right: 5%
}
</style>
