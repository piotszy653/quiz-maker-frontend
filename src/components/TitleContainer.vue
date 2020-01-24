<template>
  <div class="title-container">
    <div v-if="url" class="backButton">
      <LinkButton :url="url" flat>
        <v-icon x-large color="#f5f1f1">keyboard_backspace</v-icon>
      </LinkButton>
    </div>
    <h3>{{title}}</h3>
  </div>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'

export default {
  name: 'TitleContainer',
  props: {
    title: String,
    url: String
  },
  components: {
    LinkButton
  }
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
.title-container {
  position: relative;
  width: 100%;
  height: 65px;
  background-image: linear-gradient(-50deg, #070849c4, #070849);

  h3 {
    font-family: "Roboto", sans-serif;
    letter-spacing: 1px;
    color: rgb(233, 230, 230);
    font-size: 34px;
    line-height: 65px;
  }

  .backButton {
    position: absolute;
    top: 50%;
    left: -10px;
    transform: translateY(-50%);
    opacity: 0.8;
    transition: all 500ms;
  }

  .backButton:hover {
    left: -15px;
    opacity: 1;
  }
}
</style>
