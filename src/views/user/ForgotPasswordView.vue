<template>
    <v-flex sm12 md10 offset-md1 lg8 offset-lg2>
      <v-card flat>
        <TitleContainer title="Quiz Maker"/>
        <v-form class="form">
        <v-flex sm6 offset-sm3>
          <v-text-field v-model="mail" autofocus label="e-mail"></v-text-field>
          <v-btn @click="handleForgotPassword(mail)" color="primary">Reset password</v-btn>
        </v-flex>
        </v-form>
      </v-card>
    </v-flex>
</template>

<script>
import TitleContainer from '@/components/TitleContainer'
import { forgotPassword } from '@/api/Password.js'
export default {
  name: 'ForgotPassword',
  data () {
    return {
      mail: null
    }
  },
  components: {
    TitleContainer
  },
  methods: {
    handleForgotPassword (mail) {
      forgotPassword(mail)
    }
  }
}
</script>

<style lang="scss">
.form {
  position: center;
}
</style>
