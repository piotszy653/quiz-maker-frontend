<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>
      <v-toolbar prominent class="toolbar">
        <v-toolbar-title class="toolbar-title">Friends</v-toolbar-title>
        <v-spacer/>
         <v-toolbar-items>
          <LinkButton url="/dashboard" color="primary" flat>Main</LinkButton>
          <v-btn @click="handleLogout" color="red" flat>Log out</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-tabs dark centered hide-slider grow>
          <v-tab class="gradient">Friends</v-tab>
          <v-tab class="gradient">Invitations</v-tab>
          <v-tab class="gradient">Others</v-tab>
          <v-tab-item>
            <v-list v-if="friends">
              <FriendsListTiles v-bind:friends="friends"/>
            </v-list>
          </v-tab-item>
          <v-tab-item>
              <v-list v-if="invitedUsers">
                <InvitedUsersListTiles v-bind:invitedUsers="invitedUsers"/>
            </v-list>
            <v-list v-if="invitingUsers">
              <InvitingUsersListTiles v-bind:invitingUsers="invitingUsers"/>
            </v-list>
          </v-tab-item>
          <v-tab-item>
            <v-list v-if="users">
              <UsersListTiles v-bind:users="users"/>
            </v-list>
          </v-tab-item>
        </v-tabs>
    </v-card>
    </v-flex>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import FriendsListTiles from '@/views/Friends/FriendsListTiles'
import InvitedUsersListTiles from '@/views/Friends/InvitedUsersListTiles'
import InvitingUsersListTiles from '@/views/Friends/InvitingUsersListTiles'
import UsersListTiles from '@/views/Friends/UsersListTiles'
import { fetchFriends, fetchUsers, fetchInvitingUsers, fetchInvitedUsers } from '@/api/Friends'
import { sortUsers } from '@/utils/Sort'
export default {
  name: 'Friends',
  data () {
    return {
      friends: [],
      users: [],
      invitingUsers: [],
      invitedUsers: []
    }
  },
  components: {
    LinkButton,
    FriendsListTiles,
    InvitedUsersListTiles,
    InvitingUsersListTiles,
    UsersListTiles
  },
  methods: {
    handleLogout () {
      this.$emit('logout')
    }
  },
  async created () {
    try {
      this.friends = await fetchFriends()
      this.friends = sortUsers(this.friends)
      this.users = await fetchUsers()
      this.users = sortUsers(this.users)
      this.invitingUsers = await fetchInvitingUsers()
      this.invitingUsers = sortUsers(this.invitingUsers)
      this.invitedUsers = await fetchInvitedUsers()
      this.invitedUsers = sortUsers(this.invitedUsers)
    } catch (error) {
      console.log('error', error)
      alert(error)
    }
  }
}
</script>
<style>
.gradient {
    background-image: linear-gradient(-50deg, #070849c4, #070849);
}
</style>
