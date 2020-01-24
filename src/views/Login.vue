<template>
    <div class="login">
      <v-card class="card">
        <TitleContainer title="Quiz Maker"/>
        <v-form class="form">
          <v-text-field v-model="username" autofocus label="Login"></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            :type="show ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            class="input-group--focused"
            @click:append="show = !show"
          ></v-text-field>
          <v-btn @click="handleSignIn" block color="primary">Sign in</v-btn>
          <p>
            New to our website?
            <router-link to="/registration">Sign up</router-link>
          </p>
        </v-form>
      </v-card>
    </div>
</template>

<script>
import TitleContainer from '@/components/TitleContainer'
import { handleSignIn } from '../api/Login.js'
export default {
  name: 'login',
  data () {
    return {
      show: false,
      username: null,
      password: null
    }
  },
  components: {
    TitleContainer
  },
  methods: {
    handleSignIn
  }
}
</script>

<style lang="scss">
.login {
  height: 100vh;
  margin: auto;
  min-width: 80%;
}
.card {
  max-width: 800px;
  margin: auto;
}

.form {
  padding: 8%;
}
</style>
