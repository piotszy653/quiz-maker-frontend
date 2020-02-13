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
<v-list-tile v-for="friend in this.computedFriends" :key="friend.username">
  <v-flex xs6 sm4>
  <v-list-tile-content>
      <b>{{friend.username}}</b>
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
  data () {
    return {
      usernameFilter: ''
    }
  },
  computed: {
    computedFriends: function () {
      return this.friends.filter((friend) =>
        friend.username.includes(this.usernameFilter)
      )
    }
  },
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
.filter-field {
  margin-right: 5%
}
</style>
