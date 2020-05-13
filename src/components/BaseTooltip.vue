<template>
  <div :class="[base.wrapper]">
    <BaseIcon :name="'info'" :alt="'( i )'" :class="base.icon" :size="'14px'" />
    <span
      :class="[
        base.text,
        type[typeScaleClass('eta')],
        space.paddingHorizontalXnarrow,
        space.paddingVerticalXxnarrow,
      ]"
    >
      {{ body }}
    </span>
  </div>
</template>

<script>
import { styleHelpers } from "./mixins/helpers.js";
import BaseIcon from "./BaseIcon.vue";

export default {
  name: "BaseTooltip",
  components: {
    BaseIcon,
  },
  mixins: [styleHelpers],
  props: {
    body: {
      type: String,
      default: "Default tooltip text",
    },
  },
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
@import "~styleConfig/color";
$size: 14px;

.wrapper {
  position: relative;
  display: inline-block;
  height: $size;
  width: $size;
  bottom: 8px;
  left: 6px;

  &:hover {
    .text {
      opacity: 1;
      transition: opacity 0.2s ease-in;
    }
  }
}

.icon {
  composes: midtone from "styles/color.scss";
  position: absolute;
  margin-top: 0;
}

.text {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transition: opacity 0.15s ease-out;

  bottom: 18px;
  left: 20px;
  width: 250px;
  border: 1px color("midtone") solid;
  border-radius: 6px;
  color: color("gray");
  background: color("light");
}
</style>
