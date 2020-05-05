<!--
  Column Layout
  -> Creates a 6/12 column layout with slot components
-->

<template>
  <div :class="[base.wrapper, ...spacingClasses]">
    <div
      v-for="(item, index) in items"
      :class="[base.item, base.col6]"
      :key="item.id || `list-${index}`"
    >
      <slot :item="item" :index="index">{{ item }}</slot>
    </div>
  </div>
</template>

<script>
import { styleHelpers } from "./mixins/helpers.js";

export default {
  name: "BaseColumnLayout",
  mixins: [styleHelpers],
  props: {
    items: {
      type: Array,
    },
    spacing: {
      type: String,
      default: "medium",
    },
  },
  computed: {
    spacingClasses: function () {
      const padding = this.spaceClass({
        size: this.spacing,
        side: "vertical",
        between: true,
      });
      const margin = this.spaceClass({
        prop: "margin",
        size: this.spacing,
        side: "vertical",
        between: true,
      });
      return [this.space[padding]];
    },
  },
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
@import "~styleConfig/borders";
@import "~styleConfig/spacing";

.wrapper {
  display: flex;
  flex-wrap: wrap;
}

.item {
  display: block;
  flex: 1;
  padding: 0 space("medium");
  margin: space("wide") 0;
}

.col6 {
  max-width: 50%;
  flex-basis: 50%;
}
</style>
