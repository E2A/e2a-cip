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
  mixins: [buttonStyles]
}
</script>

<style src="@/stylesheets/shared/button.scss" lang="scss" module="button"></style>
