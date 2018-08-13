<template>
  <div
    :class="[base.content, type[typeScaleClass(size)]]"
    v-html="renderedMarkdown"
  ></div>
</template>

<script>
import marked from 'marked'
import { styleHelpers } from './mixins/helpers'

export default {
  name: 'BaseBodyText',
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
  },
  computed: {
    renderedMarkdown: function () {
      return marked(this.content, { sanitize: true })
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
