<template>
  <!-- Chart -->
  <div v-if="activitiesPresent">
    <BaseHeading
      :class="space.paddingBottom"
      :level="3"
      :centered="false"
      scale="delta"
      weight="bold"
      color="dark"
    >
      {{this.$t(`chartTitles.${chartName}`)}}
    </BaseHeading>

    <BaseGutterWrapper
      :class="base.chartWrapper"
      gutterY="narrow"
      gutterX="narrow"
    >
      <!-- Chart -->
      <div
        :id="chartName"
        :class="base.chart"
      ></div>

      <!-- Chart Labels -->
      <ChartLegend
        :labelData="labelData"
        :chartName="chartName"
        :class="base.legend"
      />
    </BaseGutterWrapper>
  </div>
</template>

<script>
import BaseHeading from './BaseHeading.vue'
import BaseGutterWrapper from './BaseGutterWrapper.vue'
import ChartLegend from './ChartLegend.vue'
import * as Chartist from 'chartist'
import { dataMethods } from './mixins/dataMethods'
import { parseIntWithSuffix, getCurrencySymbol } from './mixins/helpers'

export default {
  name: 'Chart',
  mixins: [dataMethods],
  props: {
    chartName: {
      type: String,
      required: true
    },
    seriesData: {
      type: Array,
      requred: true
    },
    labelData: {
      type: Array,
      required: true
    },
    isCurrency: { 
      type: Boolean,
      required: false,
    }
  },
  computed: {
    activitiesPresent: function () {
      return this.getItemCount('activities') > 0
    },
    series: function() {
      return this.seriesData.map(data => data.value)
    },
  },
  components: {
    BaseHeading,
    BaseGutterWrapper,
    ChartLegend
  },
  methods: {
    chartLabels (context) {
      if (context.type === 'label') {
        // get the classname from the corresponding data series
        const labelClass = this.seriesData[context.index].className;
        // append `label-` to the classname and add it to the node's classlist
        context.element._node.classList.add(`label-${labelClass}`)
      }
    }
  },
  mounted () {
    const element = `#${this.chartName}`
    const data = {
      series: this.seriesData
    }
    const isCurrency = this.isCurrency;
    const setup = this.getItemValue('setup')

    new Chartist.Pie(`#${this.chartName}`, data, {
      donut: true,
      donutWidth: 80,
      donutSolid: true,
      startAngle: 270,
      showLabel: true,
      labelInterpolationFnc: function(value, index, labels) {
        // Don't render a label if the value is 0
        if (value <= 0) {
          return null;
        }
        // Format the value with metric suffix (1000 => 1k)
        let parsedValue = formatNumber(value);
        
        let symbol = '';
        // If the chart represents a currency, add the currency symbol
        if (isCurrency) {
          symbol = ` ${getCurrencySymbol(setup.countryCode, setup.currencyCode)}`;
        }

        return `${parsedValue}${symbol}`;
      }
    }).on('draw', (context) => this.chartLabels(context));
  }
}
</script>

<style src="styleShared/chart.scss" lang="scss" module="chart"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">

.chartWrapper {
  display: block;

  @supports (display: flex) {
    display: flex;
    flex-wrap: wrap;
  }
}

.chart {
  $size: 14rem;

  display: block;
  min-height: $size;

  @supports (flex: 1 0 #{$size}) {
    flex: 1 0 #{$size};
  }

  @media print {
    flex: none;
    width: 100%;
    height: 220pt; // set static height to try to force whole circle to render
  }
}

.legend {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
