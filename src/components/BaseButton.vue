<template>
  <button
    @click="$emit('click')"
    :class="defaultClassList"
  >
    <BaseIcon
      v-if="iconLeft !== 'none'"
      :class="button.iconLeft"
      :name="iconLeft"
      :size="iconSize"
    />
    {{label}}
    <BaseIcon
      v-if="iconRight !== 'none'"
      :class="button.iconRight"
      :name="iconRight"
      :size="iconSize"
    />
  </button>
</template>

<script>
import { buttonStyles } from './mixins/buttonStyles'
import BaseIcon from './BaseIcon.vue'

export default {
  name: 'BaseButton',
  mixins: [buttonStyles],
  components: {
    BaseIcon
  }
}
</script>

<style src="@/stylesheets/shared/button.scss" lang="scss" module="button"></style>
