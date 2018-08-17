<template>
  <div>
    <BaseGutterWrapper :class="base.grid">

      <!-- TODO @jay: turn each chart into a component, see ChartPie.vue -->
      <!-- % Activity count by type -->
      <div :class="base.gridItem">
        <div :class="[border.top, space.paddingTop]">
          <BaseHeading
            :class="space.paddingBottomNarrow"
            :level="3"
            scale="delta"
          >
            {{this.$t('chartTitles.activityTypeCount')}}
          </BaseHeading>

          <BaseGutterWrapper
            gutterY="narrow"
            gutterX="narrow"
          >
            <div
              v-if="this.getItemCount('activities') > 0"
              id="activityTypeCount"
              :class="base.chart"
            ></div>

            <!-- Chart Labels -->
            <dl :class="base.legend">
              <div
                v-for="(label,index) of labelData.activityTypeData"
                :class="legend.item"
                :key="`aCount-${index}`"
              >
                <dt :class="[legend.key, label.class]">{{Math.round(label.countPercent*100)}}%</dt>
                <dd :class="legend.value">{{label.type}}</dd>
              </div>
            </dl>
          </BaseGutterWrapper>
        </div>
      </div>

      <!-- Budget % of total by activity types -->
      <div :class="base.gridItem">
        <div :class="[border.top, space.paddingTop]">
          <BaseHeading
            :class="space.paddingBottomNarrow"
            :level="3"
            scale="delta"
          >
            {{this.$t('chartTitles.activityTypeBudget')}}
          </BaseHeading>

          <BaseGutterWrapper
            gutterY="narrow"
            gutterX="narrow"
          >
            <!-- Chart -->
            <div
              v-if="this.getItemCount('activities') > 0"
              :class="base.chart"
              id="activityTypeBudget"
            ></div>

            <!-- Chart Labels -->
            <dl :class="base.legend">
              <div
                v-for="(label,index) of labelData.activityTypeData"
                :class="legend.item"
                :key="`aBudget-${index}`"
              >
                <dt :class="[legend.key, label.class]">
                  {{Math.round(label.budgetPercent * 100)}}%
                </dt>
                <dd :class="legend.value">{{label.type}}</dd>
              </div>
            </dl>
          </BaseGutterWrapper>
        </div>
      </div>

      <!-- Budget % youth focused -->
      <div :class="base.gridItem">
        <div :class="[border.top, space.paddingTop]">
          <BaseHeading
            :class="space.paddingBottomNarrow"
            :level="3"
            scale="delta"
          >
            {{this.$t('chartTitles.youthFocusBudget')}}
          </BaseHeading>

          <BaseGutterWrapper
            gutterY="narrow"
            gutterX="narrow"
          >
            <!-- Chart -->
            <div
              v-if="this.getItemCount('activities') > 0"
              :class="base.chart"
              id="youthFocusBudget"
            ></div>

            <!-- Chart Labels -->
            <dl :class="base.legend">
              <div :class="legend.item">
                <dt :class="[legend.key]" class="youth-centric">
                  {{Math.round(labelData.youthCentricBudgetData[0].youthCentricPercent * 100)}}%
                </dt>
                <dd :class="legend.value">{{this.$t('chartTitles.youthCentricLabel')}}</dd>
              </div>
              <div :class="legend.item">
                <dt :class="[legend.key]" class="not-youth-centric">
                  {{Math.round(labelData.youthCentricBudgetData[0].notYouthCentricPercent * 100)}}%
                </dt>
                <dd :class="legend.value">{{this.$t('chartTitles.notYouthCentricLabel')}}</dd>
              </div>
            </dl>
          </BaseGutterWrapper>
        </div>
      </div>

      <!-- % activity count by youth focused -->
      <div :class="base.gridItem">
        <div :class="[border.top, space.paddingTop]">
          <BaseHeading
            :class="space.paddingBottomNarrow"
            :level="3"
            scale="delta"
          >
            {{this.$t('chartTitles.youthFocusCount')}}
          </BaseHeading>

          <BaseGutterWrapper
            gutterY="narrow"
            gutterX="narrow"
          >
            <!-- Chart -->
            <div
              v-if="this.getItemCount('activities') > 0"
              :class="base.chart"
              id="youthFocusCount"
            ></div>

            <!-- Chart Labels -->
            <dl :class="base.legend">
              <div :class="legend.item">
                <dt :class="[legend.key]" class="youth-centric">
                  {{Math.round(labelData.youthCentricActivityData[0].youthCentricPercent * 100)}}%
                </dt>
                <dd :class="legend.value">{{this.$t('chartTitles.youthCentricLabel')}}</dd>
              </div>
              <div :class="legend.item">
                <dt :class="[legend.key]" class="not-youth-centric">
                  {{Math.round(labelData.youthCentricActivityData[0].notYouthCentricPercent * 100)}}%
                </dt>
                <dd :class="legend.value">{{this.$t('chartTitles.notYouthCentricLabel')}}</dd>
              </div>
            </dl>
          </BaseGutterWrapper>
        </div>
      </div>
    </BaseGutterWrapper>
    <div :class="[space.marginTop, space.paddingTop, border.top, type.right]">
      <BaseButton
        v-if="this.getItemCount('activities') > 0"
        @click="exportChartData()"
        :label="$t('results.exportCharts')"
        size="small"
      />
    </div>
  </div>
</template>

<script>
import { dataIO } from './mixins/dataIO'
import { dataMethods } from './mixins/dataMethods'
import { activityTypes } from './mixins/activityTypes'
import Chartist from 'chartist'
import BaseHeading from './BaseHeading.vue'
import BaseButton from './BaseButton.vue'
import BaseGutterWrapper from './BaseGutterWrapper.vue'

export default {
  name: 'ChartItems',
  mixins: [dataIO, dataMethods, activityTypes],
  components: {
    BaseHeading,
    BaseButton,
    BaseGutterWrapper
  },
  data () {
    return {
      labelData: this.getChartData()
    }
  },
  methods: {
    getChartData: function () {
      // Get chart data
      var chartDataObject = {}

      // % Activity count by type & Budget % of total by activity types
      var activityTypeData = []
      var youthCentricBudgetData = []
      var youthCentricAcitivtyData = []
      const totalActivities = this.getItemCount('activities')
      const activityTypes = this.getActvityData()
      const totalBudget = this.getBudgetTotal(this.$store.getters['entities/activities/all']())

      // Get counts, budget and percents for each activityType
      for (const activityType of activityTypes) {
        const activityCount = this.$store.getters['entities/activities/query']().where('type', activityType.title).count()
        const activityTypesObjects = this.$store.getters['entities/activities/query']().where('type', activityType.title).get()
        activityTypeData.push({
          type: activityType.title,
          count: activityCount,
          countPercent: (activityCount / totalActivities).toFixed(3),
          budgetAmount: this.getBudgetTotal(activityTypesObjects),
          budgetPercent: (this.getBudgetTotal(activityTypesObjects) / totalBudget).toFixed(3),
          class: activityType.title.replace(/\s+/g, '-').toLowerCase()
        })
      }
      chartDataObject['activityTypeData'] = activityTypeData

      // Budget % youth centric
      const youthCentricBudget = this.getBudgetTotal(this.$store.getters['entities/activities/query']().where('youthCentric', true).get())

      // Add to array (so that CSV can read correctly)
      youthCentricBudgetData.push({
        youthCentricBudget: youthCentricBudget,
        notYouthCentricBudget: totalBudget - youthCentricBudget,
        youthCentricPercent: (youthCentricBudget / totalBudget).toFixed(3),
        notYouthCentricPercent: (1 - (youthCentricBudget / totalBudget)).toFixed(3)
      })

      chartDataObject['youthCentricBudgetData'] = youthCentricBudgetData

      // % activity count by youth focused
      const youthCentricCount = this.$store.getters['entities/activities/query']().where('youthCentric', true).count()

      // Add to array (so that CSV can read correctly)
      youthCentricAcitivtyData.push({
        youthCentricPercent: (youthCentricCount / totalActivities).toFixed(3),
        notYouthCentricPercent: (1 - (youthCentricCount / totalActivities)).toFixed(3),
        youthCentricCount: youthCentricCount,
        notYouthCentricCount: totalActivities - youthCentricCount
      })

      chartDataObject['youthCentricActivityData'] = youthCentricAcitivtyData

      // Return chart data
      return chartDataObject
    },
    getBudgetTotal: function (queryObject) {
      var budgetTotal = 0
      for (const entity of queryObject) {
        budgetTotal += entity.budget
      }
      return budgetTotal
    },
    exportChartData: function () {
      const chartDataObject = this.getChartData()

      // Export csv data for each data type
      this.csvExportItem(chartDataObject.youthCentricActivityData, 'youth-centric-activity-data')
      this.csvExportItem(chartDataObject.youthCentricBudgetData, 'youth-centric-budget-data')
      this.csvExportItem(chartDataObject.activityTypeData, 'activity-type-data')
    },
    createCharts: function () {
      // Get Data
      const chartData = this.getChartData()
      var activtyTypeCountSeries = []
      var activtyTypeBudgetSeries = []

      // Parse series data
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

      // % Activity count by type
      // eslint-disable-next-line
      const activityTypeCount = new Chartist.Pie('#activityTypeCount', {series: activtyTypeCountSeries})

      // Budget % of total by activity types
      // eslint-disable-next-line
      const activityTypeBudget = new Chartist.Pie('#activityTypeBudget', {series: activtyTypeBudgetSeries})

      // Budget % youth focused
      // eslint-disable-next-line
      const youthFocusBudget = new Chartist.Pie('#youthFocusBudget', {
        series: [
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
      })

      // % activity count by youth focused
      // eslint-disable-next-line
      const youthFocusCount = new Chartist.Pie('#youthFocusCount', {
        series: [
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
      })
    }
  },
  mounted () {
    this.createCharts()
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
  .service-delivery {
    fill: red;
    stroke: red;
    background: red;
    color: white;
  }

  .demand-generation {
    fill: blue;
    stroke: blue;
    background: blue;
    color: white;
  }

  .enabling-environment {
    fill: green;
    stroke: green;
    background: green;
    color: white;
  }

  .coordination {
    fill: purple;
    stroke: purple;
    background: purple;
    color: white;
  }

  .youth-centric {
    fill: purple;
    stroke: purple;
    background: purple;
    color: white;
  }

  .not-youth-centric {
    fill: green;
    stroke: green;
    background: green;
    color: white;
  }
}
</style>
