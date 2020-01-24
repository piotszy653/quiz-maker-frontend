<template>
    <v-flex md10 offset-md1>
    <v-card class="toolbar-card" flat>
      <v-toolbar prominent class="toolbar">
        <v-toolbar-title class="toolbar-title">Quiz Maker</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <LinkButton url="/quizzes" color="primary" flat>My Quizzes</LinkButton>
          <LinkButton url="/friends" color="primary" flat>Friends</LinkButton>
          <v-btn @click="handleLogout" color="red" flat>Log out</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div class="choice-buttons">
      </div>
    </v-card>
    </v-flex>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
export default {
  name: 'Dashboard',
  components: {
    LinkButton
  },
  methods: {
    handleLogout () {
      this.$emit('logout')
    }
  }
}
</script>
<style>
.toolbar {
  background-image: linear-gradient(-50deg, #070849c4, #070849);
}
.toolbar-title {
  font-family: "Roboto", sans-serif;
    letter-spacing: 1px;
    color: rgb(233, 230, 230);
    font-size: 34px;
    line-height: 65px;
}
.choice-buttons {
  padding: 10%;
  height: 100vh;
}
</style>
