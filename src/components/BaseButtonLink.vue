<!--
  ButtonLink component
  -> a RouterLink that looks like a button
-->
<template>
  <router-link
    :to="to"
    :class="[button.default, sizeClass, roleClass]"
    v-if="router"
  >
    {{label}}
  </router-link>
  <a
    :href="to"
    :class="[button.default, sizeClass, roleClass]"
    v-else
  >
    {{label}}
  </a>
</template>

<script>
import { buttonStyles } from './mixins/buttonStyles'

export default {
  name: 'BaseButtonLink',
  mixins: [buttonStyles],
  props: {
    label: String,
    to: [Object, String],
    router: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style src="styles/button.scss" lang="scss" module="button">
