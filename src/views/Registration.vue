<template>
  <div class="Registration">
    <v-card class="card">
      <TitleContainer title="Registration"/>
      <v-form class="form">
        <v-text-field autofocus label="Mail" class="input-text" :rules="emailRules" v-model="mail"></v-text-field>
        <v-text-field label="Nickname" placeholder="Optional" class="input-text" v-model="nickname"></v-text-field>
        <v-text-field :rules="passwordRules" label="Password" class="input-text" v-model="password"></v-text-field>
        <v-text-field
          label="Repeat Password"
          :rules="passwordRules"
          class="input-text"
          v-model="passwordConfirmation"
        ></v-text-field>
        <v-btn @click="handleSignUp(mail,password,nickname)" block color="primary">Sign up</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import TitleContainer from '@/components/TitleContainer.vue'
import { handleSignUp } from '../api/Registration.js'
export default {
  name: 'Registration',
  data () {
    return {
      nickname: '',
      password: '',
      passwordConfirmation: '',
      mail: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 5 || 'Password must be more than 5 characters',
        v => this.password === v || 'Passwords are not the same'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    handleSignUp
  },
  components: {
    TitleContainer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Registration {
  height: 100hv;
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
