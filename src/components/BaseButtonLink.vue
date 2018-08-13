<!--
  ButtonLink component
  -> a RouterLink that looks like a button
-->
<template>
  <router-link
    :to="to"
    :class="[button.default, sizeClass, roleClass]"
  >
    {{label}}
  </router-link>
</template>

<script>
import { buttonStyles } from './mixins/buttonStyles'

export default {
  name: 'BaseButtonLink',
  mixins: [buttonStyles],
  props: {
    label: String,
    to: [Object, String]
  }
}
</script>

<style src="styles/button.scss" lang="scss" module="button">
