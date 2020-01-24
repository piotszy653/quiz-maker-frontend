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
      <v-list v-if="friends">
              <v-list-tile v-for="friend in this.friends" :key="friend.id">
                <v-list-tile-content>{{friend.username}}</v-list-tile-content>

                <!-- <v-list-tile-content>
                  <LinkButton
                  :url="'/productDetails/'+ product.id"
                    small
                    color="blue"
                    dark
                  >Details</LinkButton>
                </v-list-tile-content>

                <v-list-tile-content>
                  <LinkButton
                  :url="'/product/'+ product.id"
                    small
                    color="green"
                    dark
                  >Update</LinkButton>
                </v-list-tile-content>

                <v-list-tile-content>
                  <v-btn
                    small
                    color="red"
                    dark
                    @click="handleDelete(product.id)" v-bind="$attrs"
                  >Delete</v-btn>
                </v-list-tile-content> -->
              </v-list-tile>
            </v-list>
    </v-card>
    </v-flex>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
import { fetchFriends } from '@/api/Friends'
export default {
  name: 'Friends',
  data () {
    return {
      friends: []
    }
  },
  components: {
    LinkButton
  },
  methods: {
    handleLogout () {
      this.$emit('logout')
    }
  },
  async created () {
    try {
      this.friends = await fetchFriends()
    } catch (error) {
      console.log('error', error)
      alert(error)
    }
  }
}
</script>
<style>
</style>
