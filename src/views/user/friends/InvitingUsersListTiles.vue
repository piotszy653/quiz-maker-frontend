<template>
  <div>
    <v-subheader>Inviting users</v-subheader>
    <v-list-tile v-for="invitingUser in this.invitingUsers" :key="invitingUser.username">
      <v-flex xs6 sm4>
      <v-list-tile-content>
          <b>{{invitingUser.username}}</b>
      </v-list-tile-content>
      </v-flex>
      <v-spacer/>
      <v-flex xs6 sm4>
      <v-list-tile-content>
        <v-btn
          small
          color="green"
          dark
          @click="handleResolveInvitation(true, invitingUser.uuid)" v-bind="$attrs"
        >Accept</v-btn>
      </v-list-tile-content>
      </v-flex>
      <v-spacer/>
      <v-flex xs6 sm4>
      <v-list-tile-content>
        <v-btn
          small
          color="red"
          dark
          @click="handleResolveInvitation(false, invitingUser.uuid)" v-bind="$attrs"
        >Decline</v-btn>
      </v-list-tile-content>
      </v-flex>
    </v-list-tile>
  </div>
</template>

<script>
import { resolveInvitation } from '@/api/Friends'
export default {
  name: 'InvitingUsersListTiles',
  props: {
    invitingUsers: {
      type: Array
    }
  },
  methods: {
    handleResolveInvitation (accepted, uuid) {
      resolveInvitation(accepted, uuid)
    }
  }
}
</script>
<style>
</style>
