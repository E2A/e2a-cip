<template>
  <div>
    <BaseHeading
      :class="space.paddingBottomNarrow"
      :level="3"
      scale="delta"
      weight="bold"
      color="dark"
      v-if="chartItemTitle"
    >
      {{chartItemTitle}}
    </BaseHeading>
    <Chart
      v-for="(chartName,i) of chartNames"
      :key="`chart-${i}`"
      :chartName="chartName"
      :seriesData="chartData.seriesData[chartName]"
      :labelData="chartData.labelData[chartName]"
    />
  </div>
</template>

<script>
import { dataIO } from './mixins/dataIO'
import { dataMethods } from './mixins/dataMethods'
import { activityTypes } from './mixins/activityTypes'
import Chart from './Chart.vue'
import BaseButton from './BaseButton.vue'
import BaseHeading from './BaseHeading.vue'

export default {
  name: 'ChartItems',
  mixins: [dataIO, dataMethods, activityTypes],
  components: {
    Chart,
    BaseButton,
    BaseHeading
  },
  data () {
    return {
      chartData: this.renderChartData()
    }
  },
  props: {
    viewType: {
      type: [String],
      required: false,
      default: 'full'
    },
    chartNames: {
      type: Array,
      required: false,
      default: () => {
        return [
          'youthFocusBudget',
          'youthFocusCount',
          'activityTypeBudget',
          'activityTypeCount'
        ]
      },
      validator: (value) => {
        // The value must match one of these strings
        const valueArray = value.map((v) =>
          [
            'youthFocusBudget',
            'youthFocusCount',
            'activityTypeBudget',
            'activityTypeCount'
          ].indexOf(v) !== -1
        )
        return valueArray.indexOf(true) !== -1
      }
    },
    chartItemTitle: {
      type: String,
      required: false
    }
  },
  methods: {
    renderChartData: function () {
      // Get Data
      const chartData = this.getChartData(this.getActvityData())

      // Build Series Data
      var activtyTypeCountSeries = []
      var activtyTypeBudgetSeries = []

      // Parse series data to be chartist friendly
      chartData.activityTypeData.forEach(function (item) {
        activtyTypeCountSeries.push(
          {
            value: item.count,
            name: item.type,
            className: item.class
          }
        )
        activtyTypeBudgetSeries.push(
          {
            value: item.budgetAmount,
            name: item.type,
            className: item.class
          }
        )
      })

      const youthFocusedBudgetSeries = [
        {
          value: chartData.youthCentricBudgetData[0].youthCentricBudget,
          name: this.$t('chartTitles.youthCentricLabel'),
          className: 'youth-centric'
        },
        {
          value: chartData.youthCentricBudgetData[0].notYouthCentricBudget,
          name: this.$t('chartTitles.notYouthCentricLabel'),
          className: 'not-youth-centric'
        }
      ]

      const youthFocusedCountSeries = [
        {
          value: chartData.youthCentricActivityData[0].youthCentricCount,
          name: this.$t('chartTitles.youthCentricLabel'),
          className: 'youth-centric'
        },
        {
          value: chartData.youthCentricActivityData[0].notYouthCentricCount,
          name: this.$t('chartTitles.notYouthCentricLabel'),
          className: 'not-youth-centric'
        }
      ]

      // Build Labels

      const youthFocusedCountLabel = [
        {
          value: Math.round(chartData.youthCentricActivityData[0].notYouthCentricPercent * 100),
          labelText: this.$t('chartTitles.notYouthCentricLabel')
        },
        {
          value: Math.round(chartData.youthCentricActivityData[0].youthYouthCentricPercent * 100),
          labelText: this.$t('chartTitles.youthCentricLabel')
        }
      ]

      const youthFocusedBudgetLabel = [
        {
          value: Math.round(chartData.youthCentricBudgetData[0].notYouthCentricPercent * 100),
          labelText: this.$t('chartTitles.notYouthCentricLabel')
        },
        {
          value: Math.round(chartData.youthCentricBudgetData[0].youthYouthCentricPercent * 100),
          labelText: this.$t('chartTitles.youthCentricLabel')
        }
      ]

      const activtyTypeBudgetLabel = chartData.activityTypeData.map((item) => {
        return {
          value: Math.round(item.budgetPercent * 100),
          labelText: item.type
        }
      })

      const activtyTypeCountLabel = chartData.activityTypeData.map((item) => {
        return {
          value: Math.round(item.countPercent * 100),
          labelText: item.type
        }
      })

      // Build object
      return {
        'seriesData': {
          'youthFocusBudget': youthFocusedBudgetSeries,
          'youthFocusCount': youthFocusedCountSeries,
          'activityTypeBudget': activtyTypeBudgetSeries,
          'activityTypeCount': activtyTypeCountSeries
        },
        'labelData': {
          'youthFocusBudget': youthFocusedBudgetLabel,
          'youthFocusCount': youthFocusedCountLabel,
          'activityTypeBudget': activtyTypeBudgetLabel,
          'activityTypeCount': activtyTypeCountLabel
        }
      }
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style>
/* Hide default chart legend */
/*.chart-legend {
  display: none;
}*/
.ct-label {
  display: none;
}
</style>

<style lang="scss" module="base">
@import '~styleConfig/scale';
@import '~styleConfig/type';
@import '~styleConfig/color';

.grid {
  display: block;
  font-size: 0;
}

.gridItem {
  @include type-size-default;
  display: inline-block;
  vertical-align: top;
  width: 100%;

  @include media('>small') {
    width: 50%;
  }

  @include media('>large') {
    width: (100%/4);
  }
}

.chart {
  display: block;
}

.legend {
  composes: paddingVerticalBetweenXnarrow from 'styles/spacing.scss';
  margin-top: 0;
  margin-bottom: 0;
}
</style>

<style lang="scss" module="legend">
@import '~styleConfig/scale';
@import '~styleConfig/color';

.item {
  display: block;
}

.key {
  $size: 3.5em;
  composes: light from 'styles/color.scss';
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
