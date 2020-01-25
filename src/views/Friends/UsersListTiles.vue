<template>
<div>
  <v-list-tile v-for="user in this.users" :key="user.username">
    <v-flex xs6 sm4>
    <v-list-tile-content>
        <b>{{user.profile.name}}</b> {{ user.username }}
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
