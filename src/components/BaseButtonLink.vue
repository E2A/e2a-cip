<!--
  ButtonLink component
  -> a RouterLink that looks like a button
-->
<template>
  <router-link
    :to="to"
    :class="defaultClassList"
    v-if="router"
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
  </router-link>
  <a
    :href="to"
    :class="[button.default, sizeClass, roleClass, iconClass]"
    :target="target"
    v-else
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
  </a>
</template>

<script>
import { buttonStyles } from './mixins/buttonStyles'
import BaseIcon from './BaseIcon.vue'

export default {
  name: 'BaseButtonLink',
  mixins: [buttonStyles],
  props: {
    to: [Object, String],
    router: {
      type: Boolean,
      default: true
    },
    target: {
      type: String,
      default: '_self'
    }
  },
  components: {
    BaseIcon
  }
}
</script>

<style src="styleShared/button.scss" lang="scss" module="button"></style>
