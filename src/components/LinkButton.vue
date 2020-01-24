<template>
  <v-btn @click="handleClick" v-bind="$attrs">
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'LinkButton',
  props: {
    url: String
  },
  methods: {
    handleClick () {
      this.$emit('click')
      this.$router.push(this.url)
    }
  }
}
</script>

<style>
</style>
