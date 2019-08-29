<template>
  <svg
    :class="[base.icon, {[base.noMargin]: noMargin}]"
    :style="{
      width: size,
      height: size,
    }"
    :role="role"
  >
    <use :xlink:href="`#${name}`"></use>
    <desc v-if="alt">{{alt}}</desc>
  </svg>
</template>

<script>
export default {
  name: 'BaseIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '1em'
    },
    role: {
      type: String,
      default: 'presentation'
    },
    alt: {
      type: String
    },
    noMargin: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" module="base">
@import '~bourbon/core/bourbon';

.icon {
  display: inline-block;
  fill: currentColor;
  margin-top: -0.15em;
  pointer-events: none;
  position: relative;
  text-decoration: none;
  vertical-align: middle;
}

.noMargin {
  margin-top: 0;
}
</style>
