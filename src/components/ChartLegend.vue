<template>
  <!-- Chart Labels -->
  <dl>
    <div
      v-for="(label, index) of labelData"
      :class="legend.item"
      :key="`${chartName}-${index}`"
    >
      <dt :class="[legend.key, label.class]">{{label.value}}%</dt>
      <dd :class="legend.value">{{label.labelText}}</dd>
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
  }
}
</script>

<style lang="scss" module="legend">
@import '~styleConfig/scale';
@import '~styleConfig/color';

.item {
  display: block;
}

.key {
  $size: 3.5em;
  composes: white from 'styles/color.scss';
  composes: scaleEta bold from 'styles/type.scss';
  display: inline-block;
  border-radius: 50%;
  // fix magic number
  padding: 1.2em 0;
  width: $size;
  height: $size;
  text-align: center;
  vertical-align: middle;
  line-height: 1;
}

.value {
  composes: scaleZeta from 'styles/type.scss';
  display: inline-block;
  margin-left: 0.5em;
  vertical-align: middle;
}

// TODO @jay figure out how to make these part of the module
// -> maybe https://github.com/blakeembrey/camel-case
:global {
  .demand-generation {
    fill: color('accent');
    stroke: color('accent');
    background: color('accent');
    color: white;
  }

  .service-delivery {
    fill: color('midtone');
    stroke: color('midtone');
    background: color('midtone');
    color: white;
  }

  .enabling-environment {
    fill: color('highlight');
    stroke: color('highlight');
    background: color('highlight');
    color: white;
  }

  .coordination {
    fill: color('primary');
    stroke: color('primary');
    background: color('primary');
    color: white;
  }

  .youth-centric {
    fill: color('primary');
    stroke: color('primary');
    background: color('primary');
    color: white;
  }

  .not-youth-centric {
    fill: color('midtone');
    stroke: color('midtone');
    background: color('midtone');
    color: white;
  }
}
</style>
