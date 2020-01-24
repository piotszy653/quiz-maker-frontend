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
              <v-list-tile v-for="friend in this.friends" :key="friend.username">
                <v-list-tile-content>
                    <b>{{friend.profile.name}}</b> {{ friend.username }}
                </v-list-tile-content>
                <v-spacer/>
                <v-list-tile-content>
                  <LinkButton
                  :url="'/quizzes/'+ friend.uuid"
                    small
                    color="blue"
                    dark
                  >Quizzes</LinkButton>
                </v-list-tile-content>
                <v-spacer/>
                <v-list-tile-content>
                  <v-btn
                    small
                    color="red"
                    dark
                    @click="handleRemoveFriend(friend.uuid)" v-bind="$attrs"
                  >Remove</v-btn>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-tab-item>
          <v-tab-item>
              <v-list v-if="invitedUsers">
            <v-subheader>Invited users</v-subheader>
              <v-list-tile v-for="invitedUser in this.invitedUsers" :key="invitedUser.username">
                <v-list-tile-content>
                    <b>{{invitedUser.profile.name}}</b> {{ invitedUser.username }}
                </v-list-tile-content>
                <v-spacer/>
                <v-list-tile-content>
                  <v-btn
                    small
                    color="red"
                    dark
                    @click="handleRemoveInvitation(invitedUser.uuid)" v-bind="$attrs"
                  >Delete</v-btn>
                </v-list-tile-content>
                <v-spacer/>
                <v-list-tile-content>
                  <v-btn
                    small
                    color="white"
                    flat
                  ></v-btn>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-list v-if="invitingUsers">
            <v-subheader>Inviting users</v-subheader>
              <v-list-tile v-for="invitingUser in this.invitingUsers" :key="invitingUser.username">
                <v-list-tile-content>
                    <b>{{invitingUser.profile.name}}</b> {{ invitingUser.username }}
                </v-list-tile-content>
                <v-spacer/>
                <v-list-tile-content>
                  <v-btn
                    small
                    color="green"
                    dark
                    @click="handleResolveInvitation(true, invitingUser.uuid)" v-bind="$attrs"
                  >Accept</v-btn>
                </v-list-tile-content>
                <v-spacer/>
                <v-list-tile-content>
                  <v-btn
                    small
                    color="red"
                    dark
                    @click="handleResolveInvitation(false, invitingUser.uuid)" v-bind="$attrs"
                  >Decline</v-btn>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-tab-item>
          <v-tab-item>
            <v-list v-if="users">
              <v-list-tile v-for="user in this.users" :key="user.username">
                <v-list-tile-content>
                    <b>{{user.profile.name}}</b> {{ user.username }}
                </v-list-tile-content>
                <v-spacer/>
                <v-list-tile-content>
                  <LinkButton
                  :url="'/quizzes/'+ user.uuid"
                    small
                    color="blue"
                    dark
                  >Quizzes</LinkButton>
                </v-list-tile-content>
                <v-spacer/>
                <v-list-tile-content>
                  <v-btn
                    small
                    color="green"
                    dark
                    @click="handleInvite(user.uuid)" v-bind="$attrs"
                  >Invite</v-btn>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-tab-item>
        </v-tabs>
    </v-card>
    </v-flex>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import { fetchFriends, fetchUsers, fetchInvitingUsers, fetchInvitedUsers,
  removeFriend, invite, resolveInvitation, removeInvitation } from '@/api/Friends'
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
    LinkButton
  },
  methods: {
    handleLogout () {
      this.$emit('logout')
    },
    handleRemoveFriend (uuid) {
      removeFriend(uuid)
    },
    handleInvite (uuid) {
      invite(uuid)
    },
    handleResolveInvitation (accepted, uuid) {
      resolveInvitation(accepted, uuid)
    },
    handleRemoveInvitation (uuid) {
      removeInvitation(uuid)
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
