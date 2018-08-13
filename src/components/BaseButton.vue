<template>
  <button
    @click="$emit('click')"
    :class="[button.default, sizeClass, roleClass]"
  >
    {{ label }}
  </button>
</template>

<script>
import { buttonStyles } from './mixins/buttonStyles'

export default {
  name: 'BaseButton',
  mixins: [buttonStyles],
  props: {
    label: String
  }
}
</script>

<style src="styles/button.scss" lang="scss" module="button"></style>
