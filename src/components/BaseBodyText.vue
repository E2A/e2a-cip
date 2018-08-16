<template>
  <div
    :class="[base.content, type[typeScaleClass(size)]]"
  >
    <VueMarkdown >{{content}}</VueMarkdown>
  </div>
</template>

<script>
import { styleHelpers } from './mixins/helpers'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'BaseBodyText',
  components: {
    VueMarkdown
  },
  mixins: [styleHelpers],
  props: {
    content: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'epsilon'
    }
  }
}
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
  .content {
    > * + * {
      margin-top: 1em;
    }
  }

  p {
    margin: 0;
  }
</style>
