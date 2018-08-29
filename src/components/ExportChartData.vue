<template>
  <div>
    <BaseButton
      v-if="showExport"
      @click="exportChartData()"
      :label="$t('results.exportCharts')"
      size="small"
    />
  </div>
</template>

<script>
import { dataIO } from './mixins/dataIO'
import { dataMethods } from './mixins/dataMethods'
import { activityTypes } from './mixins/activityTypes'
import BaseButton from './BaseButton.vue'

export default {
  name: 'ExportChartData',
  mixins: [dataIO, dataMethods, activityTypes],
  components: {
    BaseButton
  },
  computed: {
    showExport: function () {
      return this.viewType !== 'print' && this.getItemCount('activities') > 0
    }
  },
  methods: {
    exportChartData: function () {
      const chartDataObject = this.getChartData(this.getActvityData())

      this.csvExportItem(chartDataObject.youthCentricActivityData, 'youth-centric-activity-data')
      this.csvExportItem(chartDataObject.youthCentricBudgetData, 'youth-centric-budget-data')
      this.csvExportItem(chartDataObject.activityTypeData, 'activity-type-data')

      this.notify(this.$t('results.exportChartSuccess'), 'success')
    }
  }
}
</script>
