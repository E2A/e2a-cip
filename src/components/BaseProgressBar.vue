<template>
  <div :class="space.marginHorizontalBetweenXnarrow">
    <label
      v-if="label"
      :for="id"
      :class="base.label"
    >
      {{label}}
    </label>
    <progress
      :id="id"
      :class="[base.bar, isComplete && base.complete]"
      :value="percentage"
      max="100"
    >
      {{percentage}}%
    </progress>
    <label
      :for="id"
      :class="[base.percentage, isComplete ? color.yes : color.midtone]"
    >{{percentage}}%</label>
  </div>
</template>

<script>
export default {
  name: 'BaseProgressBar',
  props: {
    id: String,
    percentage: {
      type: Number,
      default: 0,
      validator: function (value) {
        return value >= 0 && value <= 100
      }
    },
    label: String
  },
  computed: {
    isComplete: function () {
      return this.percentage === 100
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
@import '~styleConfig/borders';
@import '~styleConfig/color';

$height: 0.4em;
$radius: 1000px;
$color-bar: color('light');
$color-value: color('accent');
$color-value-complete: color('yes');

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
  vertical-align: middle;
  // width: 100%;
  width: 8rem;

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
  composes: scaleZeta from 'styles/type.scss';
  display: inline-block;
}

.percentage {
  composes: label;
  composes: bold from 'styles/type.scss';
}
</style>
