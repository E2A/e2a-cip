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
      {{this.$t(`chartTitles.${chartName}`)}} <BaseTooltip v-if="toolTipPresent" :body="toolTip" />
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
import BaseTooltip from './BaseTooltip.vue'
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
      required: false
    },
    toolTip: {
      type: String,
      required: false
    }
  },
  computed: {
    activitiesPresent: function () {
      return this.getItemCount('activities') > 0
    },
    series: function () {
      return this.seriesData.map(data => data.value)
    },
    toolTipPresent: function () {
      return this.toolTip.length > 0
    },
    isSeriesEmpty: function () {
      return this.series.every(val => val === 0)
    },
    total: function () {
      if (this.isSeriesEmpty) return this.series.length
      return this.series.reduce((total, value) => total + value, 0)
    }
  },
  components: {
    BaseHeading,
    BaseGutterWrapper,
    ChartLegend,
    BaseTooltip
  },
  data: function () {
    return {
      filteredSeries: null,
      // Threshold for piece of pie
      // 2x is threshold for label
      minimumPercent: 0.03
    }
  },
  methods: {
    filterSeries () {
      if (this.isSeriesEmpty) {
        // If everything is empty, give everything an equal share
        // Later, just make the labels 0
        this.filteredSeries = this.seriesData.map(obj => {
          return {
            ...obj,
            value: 1
          }
        })
        return
      }
      // Filters series below a certain percentage of total
      this.filteredSeries = this.seriesData.filter(obj => (obj.value / this.total) > this.minimumPercent)
    },
    chartLabels (context) {
      if (context.type === 'label') {
        // Just leave text black since label will be in donut hole
        if (this.filteredSeries.length === 1) return
        // get the classname from the corresponding data series
        const labelClass = this.filteredSeries[context.index].className
        // append `label-` to the classname and add it to the node's classlist
        context.element._node.classList.add(`label-${labelClass}`)
      }
    }
  },
  mounted () {
    this.filterSeries()
    const element = `#${this.chartName}`
    const data = {
      series: this.filteredSeries
    }
    const isCurrency = this.isCurrency
    const setup = this.getItemValue('setup')

    new Chartist.Pie(element, data, {
      donut: true,
      donutWidth: 80,
      donutSolid: true,
      startAngle: 270,
      showLabel: true,
      labelInterpolationFnc: (value, index, labels) => {
        // Don't render label below 6%
        if (value / this.total <= this.minimumPercent * 2) {
          return null
        }

        // If everything is empty, everything is 0
        if (this.isSeriesEmpty) {
          return 0
        }

        // Format the value with metric suffix (1000 => 1k)
        let parsedValue = parseIntWithSuffix(value)

        let symbol = ''
        // If the chart represents a currency, add the currency symbol
        if (isCurrency) {
          symbol = ` ${getCurrencySymbol(setup.countryCode, setup.currencyCode)}`
        }

        return `${parsedValue}${symbol}`
      }
    }).on('draw', (context) => this.chartLabels(context))
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
