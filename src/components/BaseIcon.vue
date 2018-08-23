<template>
  <svg :class="base.icon" :role="role">
    <use :xlink:href="name"></use>
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
    alt: {
      type: String
    },
    role: {
      type: String,
      default: 'presentation'
    }
  }
}
</script>

<style lang="scss" module="base">
@import '~bourbon/core/bourbon';
.icon {
  @include size(1em);
  display: inline-block;
}
</style>
