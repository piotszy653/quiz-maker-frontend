<template>
  <div>
    <v-subheader>Invited users</v-subheader>
    <v-list-tile v-for="invitedUser in this.invitedUsers" :key="invitedUser.username">
      <v-flex xs6 sm4>
      <v-list-tile-content>
          <b>{{ invitedUser.username }}</b>
      </v-list-tile-content>
      </v-flex>
      <v-flex xs6 sm4>
      <v-list-tile-content>
        <v-btn
          small
          color="red"
          dark
          @click="handleRemoveInvitation(invitedUser.uuid)" v-bind="$attrs"
        >Delete</v-btn>
      </v-list-tile-content>
      </v-flex>
    </v-list-tile>
  </div>
</template>

<script>
import { removeInvitation } from '@/api/Friends'
export default {
  name: 'InvitedUsersListTiles',
  props: {
    invitedUsers: {
      type: Array
    }
  },
  methods: {
    handleRemoveInvitation (uuid) {
      removeInvitation(uuid)
    }
  }
}
</script>
<style>
</style>
