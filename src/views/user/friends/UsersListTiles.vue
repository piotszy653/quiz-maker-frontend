<template>
<div>
  <v-list-tile>
    <v-flex xs3>
      <v-text-field
      class="filter-field"
      placeholder="username"
      v-model="usernameFilter"
      />
    </v-flex>
</v-list-tile>
  <v-list-tile v-for="user in this.computedUsers" :key="user.username">
    <v-flex xs6 sm4>
    <v-list-tile-content>
        <b>{{user.username}}</b>
    </v-list-tile-content>
    </v-flex>
    <v-spacer/>
    <v-flex xs6 sm4>
    <v-list-tile-content>
      <LinkButton
      :url="'/quizzes/'+ user.uuid"
        small
        color="blue"
        dark
      >Quizzes</LinkButton>
    </v-list-tile-content>
    </v-flex>
    <v-spacer/>
    <v-flex xs6 sm4>
    <v-list-tile-content>
      <v-btn
        small
        color="green"
        dark
        @click="handleInvite(user.uuid)" v-bind="$attrs"
      >Invite</v-btn>
    </v-list-tile-content>
    </v-flex>
  </v-list-tile>
</div>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import { invite } from '@/api/Friends'
export default {
  name: 'UsersListTiles',
  data () {
    return {
      usernameFilter: ''
    }
  },
  computed: {
    computedUsers: function () {
      return this.users.filter((user) => user.username.includes(this.usernameFilter))
    }
  },
  props: {
    users: {
      type: Array
    }
  },
  components: {
    LinkButton
  },
  methods: {
    handleInvite (uuid) {
      invite(uuid)
    }
  }
}
</script>
<style>
</style>
