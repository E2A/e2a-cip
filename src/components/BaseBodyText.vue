<template>
  <VueMarkdown :class="[base.content, type[typeScaleClass(size)]]">
    {{content}}
  </VueMarkdown>
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
@import '~styleConfig/scale';
@import '~styleConfig/color';
@import '~styleConfig/borders';

$gutter: 0.8em; // eta on scale

.content {
  > * + * {
    margin-top: $gutter;
  }
}

:global {
  p {
    margin: 0;
  }

  li + li {
    margin-top: $gutter;
  }

  .footnotes-sep {
    border: none;
    height: border-w('thin');
    background-color: border('light');
    margin: 1.44em 0; // delta on scale
  }

  .footnotes {
    font-size: scale-type('zeta');
    color: color('midtone');
  }
}
</style>

style
