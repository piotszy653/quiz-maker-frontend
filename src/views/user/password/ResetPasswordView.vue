<template>
    <v-flex sm12 md10 offset-md1 lg8 offset-lg2>
      <v-card flat v-if="token">
        <TitleContainer title="Quiz Maker"/>
        <v-form class="form">
        <v-flex sm6 offset-sm3>
         <v-text-field :rules="passwordRules" label="Password" class="input-text" v-model="password"></v-text-field>
         <v-text-field
           label="Repeat Password"
           :rules="passwordRules"
           class="input-text"
           v-model="passwordConfirmation"
         ></v-text-field>
          <v-btn @click="handleResetPassword(password, passwordConfirmation, token)" color="primary">Reset password</v-btn>
        </v-flex>
        </v-form>
      </v-card>
    </v-flex>
</template>

<script>
import TitleContainer from '@/components/TitleContainer'
import { handleResetPassword } from '@/api/Password.js'
export default {
  name: 'ResetPassword',
  props: {
    token: String
  },
  data () {
    return {
      password: '',
      passwordConfirmation: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 5 || 'Password must be more than 5 characters',
        v => this.password === v || 'Passwords are not the same'
      ]
    }
  },
  components: {
    TitleContainer
  },
  methods: {
    handleResetPassword
  }
}
</script>

<style lang="scss">
.form {
  position: center;
}
</style>
