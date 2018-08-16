<template>
  <div :class="[base.card, space[spaceClass({size: padding})]]">
    <slot>Add content here</slot>
    <div :class="base.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { styleHelpers } from './mixins/helpers'

export default {
  name: 'BaseCard',
  mixins: [styleHelpers],
  props: {
    padding: {
      type: String,
      default: 'narrow'
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
.card {
  composes: default round from 'styles/borders.scss';
  composes: lightBg from 'styles/color.scss';

  @supports (display: flex) {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}

.footer {
  margin-top: auto;
}
</style>
