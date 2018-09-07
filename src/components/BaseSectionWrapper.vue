<!--
  Section Wrapper component
  -> a full-width container with standard outside padding
-->

<template>
  <component :is="el" :class="[marginClass, {[borders.top]: border}]">
    <slot>Add stuff here!</slot>
  </component>
</template>

<script>
import { styleHelpers } from './mixins/helpers'

export default {
  name: 'BaseSectionWrapper',
  mixins: [ styleHelpers ],
  props: {
    margin: {
      type: String,
      default: 'wide'
    },
    el: {
      type: String,
      default: 'section'
    },
    border: Boolean
  },
  computed: {
    marginClass: function () {
      return this.space[this.spaceClass({ size: this.margin })]
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/borders.scss" lang="scss" module="borders"></style>
