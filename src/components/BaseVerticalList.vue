<!--
  Vertical List component
  -> creates a stacked list of its children, with equal spacing and (optional) borders
-->

<template>
  <component :is="el" :class="[base.wrapper, ...spacingClasses]">
    <component
      v-for="(item, index) in items"
      :is="itemEl"
      :class="[base.item, borders && base.border]"
      :key="item.id || `list-${index}`"
    >
      <slot :item="item" :index="index">{{ item }}</slot>
    </component>
  </component>
</template>

<script>
import { styleHelpers } from "./mixins/helpers.js";

export default {
  name: "BaseVerticalList",
  mixins: [styleHelpers],
  props: {
    items: {
      type: Array
    },
    el: {
      type: String,
      default: "ul"
    },
    spacing: {
      type: String,
      default: "medium"
    },
    borders: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    itemEl: function() {
      const listEls = ["ul", "ol"];
      return listEls.includes(this.el) ? "li" : "div";
    },
    spacingClasses: function() {
      const padding = this.spaceClass({
        size: this.spacing,
        side: "vertical",
        between: true
      });
      const margin = this.spaceClass({
        prop: "margin",
        size: this.spacing,
        side: "vertical",
        between: true
      });
      return [this.space[padding], this.borders && this.space[margin]];
    }
  }
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
@import "~styleConfig/borders";

.wrapper {
  display: block;
  list-style: none;
  margin: 0;
  padding-left: 0;
}

.item {
  display: block;
}

.border {
  & + & {
    @include border("top");
  }
}
</style>
