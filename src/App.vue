<template>
  <v-app id="app">
    <router-view @login="handleLogin" @logout="handleLogout" @tokenExpired="handleTokenExpired"/>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  methods: {
    handleLogout () {
      localStorage.removeItem('username')
      localStorage.removeItem('access_token')
      axios.defaults.headers['Authorization'] = null
      this.$router.push('/login')
    },
    handleLogin (user) {
      localStorage.setItem('access_token', user.token)
      axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`
      localStorage.setItem('username', user.username)
      this.$router.push('/dashboard')
    },
    handleDashboard () {
      this.$router.push('/dashboard')
    },
    handleTokenExpired () {
      this.$router.push('/login')
    }
  }
}
</script>
>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
