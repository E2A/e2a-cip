<!--
  Heading component
  -> presentational component to render styled headings
  -> use this instead of just h1, h2, etc.
-->

<template>
  <component
    :is="this.tag"
    :class="[base.heading, scaleClass, centered === true && type.centered]"
  >
    <slot>Add a heading!</slot>
  </component>
</template>

<script>
import { styleHelpers } from './mixins/helpers.js'

export default {
  name: 'BaseHeading',
  mixins: [styleHelpers],
  props: {
    // heading level, 1-6
    level: {
      type: Number,
      default: 1
    },
    // optional: use a different scale class from the actual heading level
    // -> e.g. <h1 class="scaleGamma">
    scale: {
      type: String
    },
    centered: {
      type: Boolean,
      default: true
    },
    // is this a subheading?
    sub: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // default type scale names used for h1 - h6 tags
      // e.g. h1 = 'alpha', or <h1 :class="type.scaleAlpha">
      // see stylesheets/config/_scale.scss
      scaleNames: [
        'alpha',
        'beta',
        'gamma',
        'delta',
        'epsilon',
        'zeta'
      ]
    }
  },
  computed: {
    tag: function () {
      // -> if this is a subhead, render as a <p> instead of <h*>
      return this.sub ? 'p' : `h${this.level}`
    },
    scaleClass: function () {
      if (this.scale) {
        return this.type[this.typeScaleClass(this.scale)]
      }
      return this.type[this.typeScaleClass(this.scaleNames[this.level - 1])]
    }
  }
}
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
.heading {
  composes: dark from 'styles/color.scss';
  composes: display leadingTight from 'styles/type.scss';
  display: block;
  margin: 0;
  position: relative;
}
</style>
