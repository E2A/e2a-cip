<template>
  <div :class="base.wrapper">
    <BaseHeading
      v-if="title"
      :class="space.paddingBottomNarrow"
      :level="3"
      scale="delta"
      weight="bold"
      color="dark"
    >
      {{title}}
    </BaseHeading>

    <!-- List of charts -->
    <BaseGutterWrapper
      :class="base.grid"
      el="ul"
    >
      <li
        v-for="(chartName, index) of chartNames"
        :key="`chart-${index}`"
        :class="base.gridItem"
      >
        <div :class="[border.top, border.secondary, space.paddingTop]">
          <Chart
            :chartName="chartName"
            :seriesData="chartData.seriesData[chartName]"
            :labelData="chartData.labelData[chartName]"
          />
        </div>
      </li>
    </BaseGutterWrapper>
  </div>
</template>

<script>
import { dataIO } from './mixins/dataIO'
import { dataMethods } from './mixins/dataMethods'
import { activityTypes } from './mixins/activityTypes'
import Chart from './Chart.vue'
import BaseButton from './BaseButton.vue'
import BaseHeading from './BaseHeading.vue'
import BaseGutterWrapper from './BaseGutterWrapper.vue'

export default {
  name: 'ChartItems',
  mixins: [dataIO, dataMethods, activityTypes],
  components: {
    Chart,
    BaseButton,
    BaseHeading,
    BaseGutterWrapper
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
    title: {
      type: String
    }
  },
  computed: {
    currentLocale: function () {
      return this.$i18n.locale
    }
  },
  data () {
    return {
      chartData: this.renderChartData()
    }
  },
  watch: {
    // re-render the charts if the language changes
    // so the legend labels update
    currentLocale: function (newLocale) {
      this.chartData = this.renderChartData()
    }
  },
  methods: {
    // Use Largest Remainder Method to ensure rounded percentages always add to 100
    // https://stackoverflow.com/questions/1410711/rounding-an-arrays-of-values-to-100
    getRoundedPercentages: function (numbers) {
      const numberVersions = numbers.map(number => {
        const rounded = Math.floor(number)
        return {
          original: number,
          rounded: rounded,
          remainder: (number - rounded)
        }
      }).sort((a, b) => {
        return a.remainder - b.remainder
      })

      numberVersions.forEach(number => {
        const integerSum = numberVersions.reduce((sum, number) => {
          return sum + number.rounded
        }, 0)

        if (integerSum < 100) {
          // round up
          number.rounded = Math.ceil(number.original)
        }
      })

      return numberVersions.map(number => number.rounded)
    },
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

      // className values need to match global classes in Chart.vue
      // so color codes are assigned correctly
      const youthFocusedBudgetSeries = [
        {
          value: chartData.youthCentricBudgetData[0].youthCentricBudget,
          name: this.$t('chartTitles.youthCentricLabel'),
          className: 'youthCentric'
        },
        {
          value: chartData.youthCentricBudgetData[0].notYouthCentricBudget,
          name: this.$t('chartTitles.notYouthCentricLabel'),
          className: 'notYouthCentric'
        }
      ]

      const youthFocusedCountSeries = [
        {
          value: chartData.youthCentricActivityData[0].youthCentricCount,
          name: this.$t('chartTitles.youthCentricLabel'),
          className: 'youthCentric'
        },
        {
          value: chartData.youthCentricActivityData[0].notYouthCentricCount,
          name: this.$t('chartTitles.notYouthCentricLabel'),
          className: 'notYouthCentric'
        }
      ]

      const youthFocusedCountRoundedPercentages = this.getRoundedPercentages([
        chartData.youthCentricActivityData[0].notYouthCentricPercent * 100,
        chartData.youthCentricActivityData[0].youthCentricPercent * 100
      ])

      // Build Labels
      const youthFocusedCountLabel = [
        {
          value: youthFocusedCountRoundedPercentages[0],
          labelText: this.$t('chartTitles.notYouthCentricLabel'),
          className: 'notYouthCentric'
        },
        {
          value: youthFocusedCountRoundedPercentages[1],
          labelText: this.$t('chartTitles.youthCentricLabel'),
          className: 'youthCentric'
        }
      ]

      const youthFocusedBudgetRoundedPercentages = this.getRoundedPercentages([
        chartData.youthCentricBudgetData[0].notYouthCentricPercent * 100,
        chartData.youthCentricBudgetData[0].youthCentricPercent * 100
      ])

      const youthFocusedBudgetLabel = [
        {
          value: youthFocusedBudgetRoundedPercentages[0],
          labelText: this.$t('chartTitles.notYouthCentricLabel'),
          className: 'notYouthCentric'
        },
        {
          value: youthFocusedBudgetRoundedPercentages[1],
          labelText: this.$t('chartTitles.youthCentricLabel'),
          className: 'youthCentric'
        }
      ]

      const activtyTypeBudgetRoundedPercentages = this.getRoundedPercentages(chartData.activityTypeData.map((item) => item.budgetPercent * 100))

      const activtyTypeBudgetLabel = chartData.activityTypeData.map((item, index) => {
        return {
          value: activtyTypeBudgetRoundedPercentages[index],
          labelText: item.type,
          className: item.class
        }
      })

      const activtyTypeCountRoundedPercentages = this.getRoundedPercentages(chartData.activityTypeData.map((item) => item.countPercent * 100))

      const activtyTypeCountLabel = chartData.activityTypeData.map((item, index) => {
        return {
          value: activtyTypeCountRoundedPercentages[index],
          labelText: item.type,
          className: item.class
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

<style lang="scss" module="base">
@import '~styleConfig/scale';
@import '~styleConfig/type';
@import '~styleConfig/color';

.wrapper {
  @media print {
    page-break-inside: avoid;
  }
}

.grid {
  display: block;
  font-size: 0;
  list-style: none;
}

.gridItem {
  @include type-size-default;
  display: inline-block;
  vertical-align: top;
  width: 100%;

  @include media('>medium') {
    width: 50%;
  }

  @media print {
    width: 50%;
  }
}

// hide default chartist labels
:global {
  .ct-label {
    display: none;
  }
}
</style>
