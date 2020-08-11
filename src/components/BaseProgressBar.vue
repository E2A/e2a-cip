<template>
  <div :class="[base.wrapper, type[typeScaleClass(labelSize)]]">
    <label v-if="label" :for="id" :class="[base.label, color[labelColor]]">
      {{ label }}
    </label>
    <progress
      :id="id"
      :class="[base.bar, isComplete && base.complete]"
      :value="percentage"
      max="100"
    >
      {{ percentage }}%
    </progress>
    <label
      :for="id"
      :class="[base.percentage, isComplete ? color.yes : color.midtone]"
      >{{ percentage }}%</label
    >
  </div>
</template>

<script>
import { styleHelpers } from "./mixins/helpers.js";
export default {
  name: "BaseProgressBar",
  mixins: [styleHelpers],
  props: {
    id: String,
    percentage: {
      type: Number,
      default: 0,
      validator: function(value) {
        return value >= 0 && value <= 100;
      }
    },
    label: String,
    labelColor: {
      type: String,
      default: "dark"
    },
    labelSize: {
      type: String,
      default: "zeta"
    }
  },
  computed: {
    isComplete: function() {
      return this.percentage === 100;
    }
  }
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
@import "~styleConfig/borders";
@import "~styleConfig/color";

$height: 0.5em;
$radius: 1000px;
$color-bar: color("light");
$color-value: color("accent");
$color-value-complete: color("yes");

.wrapper {
  composes: marginHorizontalBetweenXnarrow from "styles/spacing.scss";
  display: inline-block;

  // try to make webkit/chrome print background colors here
  -webkit-print-color-adjust: exact;
}

.bar {
  @include border();
  appearance: none;
  background-color: $color-bar;
  border-radius: $radius;
  color: $color-bar;
  display: inline-block;
  height: $height;
  margin: 0;
  position: relative;
  width: 6.4em;

  // manually polyfill this b/c autocomplete apparently doesn't cover it
  &::-webkit-progress-bar {
    background-color: $color-bar;
    border-radius: $radius;
  }

  &::-webkit-progress-value {
    background-color: $color-value;
    border-radius: $radius;
    position: relative;
  }

  &::-moz-progress-bar {
    background-color: $color-value;
    border-radius: $radius;
  }

  &::-ms-fill {
    background-color: $color-value;
  }
}

.complete {
  &::-webkit-progress-bar {
    background-color: $color-value-complete;
  }

  &::-webkit-progress-value {
    background-color: $color-value-complete;
  }

  &::-moz-progress-bar {
    background-color: $color-value-complete;
  }

  &::-ms-fill {
    background-color: $color-value;
  }
}

.label {
  display: inline-block;
  font-size: 1em;
}

.percentage {
  composes: label;
  composes: bold from "styles/type.scss";
}
</style>
