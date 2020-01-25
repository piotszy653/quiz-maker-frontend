<template>
<div>
<v-list-tile v-for="friend in this.friends" :key="friend.username">
  <v-flex xs6 sm4>
  <v-list-tile-content>
      <b>{{friend.profile.name}}</b> {{ friend.username }}
  </v-list-tile-content>
  </v-flex>
  <v-spacer/>
  <v-flex xs6 sm4>
  <v-list-tile-content>
    <LinkButton
    :url="'/quizzes/'+ friend.uuid"
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
      color="red"
      dark
      @click="handleRemoveFriend(friend.uuid)" v-bind="$attrs"
    >Remove</v-btn>
  </v-list-tile-content>
  </v-flex>
</v-list-tile>
</div>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import { removeFriend } from '@/api/Friends'
export default {
  name: 'FriendsListTiles',
  props: {
    friends: {
      type: Array
    }
  },
  components: {
    LinkButton
  },
  methods: {

    handleRemoveFriend (uuid) {
      removeFriend(uuid)
    }
  }
}
</script>
<style>
</style>
