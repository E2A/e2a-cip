<template>
  <svg
    :class="[base.icon, { [base.noMargin]: noMargin }]"
    :style="{
      width: size,
      height: size,
    }"
    :role="role"
  >
    <circle
      v-if="backdrop"
      :cx="circlePosition"
      :cy="circlePosition"
      :r="circleSize"
      fill="white"
    />
    <use :xlink:href="`#${name}`" />
    <desc v-if="alt">{{ alt }}</desc>
  </svg>
</template>

<script>
export default {
  name: "BaseIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "1em",
    },
    role: {
      type: String,
      default: "presentation",
    },
    alt: {
      type: String,
    },
    noMargin: {
      type: Boolean,
      default: false,
    },
    // For when the background is not already white
    backdrop: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    circleSize: function () {
      // Make it a little smaller to make sure the edge is hidden
      return this.filteredSize[0] / 2.05 + this.filteredSize[1];
    },
    circlePosition: function () {
      return this.filteredSize[0] / 2 + this.filteredSize[1];
    },
    filteredSize: function () {
      // Split letters/numbers: [2, 'rem']
      return this.size.match(/[a-z]+|[^a-z]+/gi);
    },
  },
};
</script>

<style lang="scss" module="base">
@import "~bourbon/core/bourbon";

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
