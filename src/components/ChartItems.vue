<template>
  <div class="ChartItems">

    <!-- % Activity count by type -->
    <BaseHeading
      scale="delta"
      :sub="true"
    >{{this.$t('chartTitles.activityTypeCount')}} </BaseHeading>
    <div v-if="this.getItemCount('activities') > 0" id="activityTypeCount"></div>

    <!-- Chart Labels -->
    <ul v-for="(label,index) of labelData.activityTypeData" :key="`aCount-${index}`" class='chart-labels'>
      <li><span :class="label.class">{{label.countPercent*100}}% </span>{{label.type}}</li>
    </ul>

    <!-- Budget % of total by activity types -->
    <BaseHeading
      scale="delta"
      :sub="true"
    >{{this.$t('chartTitles.activityTypeBudget')}} </BaseHeading>
    <div v-if="this.getItemCount('activities') > 0" id="activityTypeBudget"></div>

    <!-- Chart Labels -->
    <ul v-for="(label,index) of labelData.activityTypeData" :key="`aBudget-${index}`" class='chart-labels'>
      <li><span :class="label.class">{{label.budgetPercent*100}}% </span>{{label.type}}</li>
    </ul>

    <!-- Budget % youth focused -->
    <BaseHeading
      scale="delta"
      :sub="true"
    >{{this.$t('chartTitles.youthFocusBudget')}} </BaseHeading>
    <div v-if="this.getItemCount('activities') > 0" id="youthFocusBudget"></div>
    <!-- Chart Labels -->
    <ul class='chart-labels'>
      <li><span class="youth-centric">{{labelData.youthCentricBudgetData[0].youthCentricPercent*100}}% </span>{{this.$t('chartTitles.youthCentricLabel')}}</li>
      <li><span class="not-youth-centric">{{labelData.youthCentricBudgetData[0].notYouthCentricPercent*100}}% </span>{{this.$t('chartTitles.notYouthCentricLabel')}}</li>
    </ul>

    <!-- % activity count by youth focused -->
    <BaseHeading
      scale="delta"
      :sub="true"
    >{{this.$t('chartTitles.youthFocusCount')}} </BaseHeading>
    <div v-if="this.getItemCount('activities') > 0" id="youthFocusCount"></div>
    <!-- Chart Labels -->
    <ul class='chart-labels'>
      <li><span class="youth-centric">{{labelData.youthCentricActivityData[0].youthCentricPercent*100}}% </span>{{this.$t('chartTitles.youthCentricLabel')}}</li>
      <li><span class="not-youth-centric">{{labelData.youthCentricActivityData[0].notYouthCentricPercent*100}}% </span>{{this.$t('chartTitles.notYouthCentricLabel')}}</li>
    </ul>

    <button v-if="this.getItemCount('activities') > 0" @click="exportChartData()">Export Chart Data</button>
  </div>
</template>

<script>
import { dataIO } from './mixins/dataIO'
import { dataMethods } from './mixins/dataMethods'
import { activityTypes } from './mixins/activityTypes'
import Chartist from 'chartist'
import BaseHeading from '@/components/BaseHeading.vue'

export default {
  name: 'ChartItems',
  mixins: [dataIO, dataMethods, activityTypes],
  components: {
    BaseHeading
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
<style>
/* Hide default chart legend */
/*.chart-legend {
  display: none;
}*/
.ct-label {
  display: none;
}

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
</style>
