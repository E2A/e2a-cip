<template>
  <!-- Chart Labels -->
  <dl :class="base.wrapper">
    <div
      v-for="(label, index) of labelData"
      :class="base.item"
      :key="`${chartName}-${index}`"
    >
      <dt :class="[base.key, legend[label.className]]">{{label.value}}%</dt>
      <dd :class="base.value">{{label.labelText}}</dd>
    </div>
  </dl>
</template>

<script>

export default {
  name: 'ChartLabel',
  props: {
    chartName: {
      type: String,
      required: true
    },
    labelData: {
      type: Array,
      required: true
    }
  },
}
</script>

<style src="styleShared/chart.scss" lang="scss" module="legend"></style>

<style lang="scss" module="base">
.wrapper {
  composes: paddingVerticalBetweenXnarrow from 'styles/spacing.scss';
  display: block;

  // try to make webkit/chrome print background colors here
  -webkit-print-color-adjust: exact;
}

.item {
  display: block;
}

.key {
  $size: 3.5em;
  composes: white from 'styles/color.scss';
  composes: scaleEta bold from 'styles/type.scss';
  display: inline-block;
  border-radius: 50%;
  width: $size;
  height: $size;
  text-align: center;
  vertical-align: middle;
  line-height: $size;
}

.value {
  composes: scaleZeta from 'styles/type.scss';
  display: inline-block;
  margin-left: 0.5em;
  vertical-align: middle;
}
</style>
