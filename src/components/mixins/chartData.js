export const initData = {
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
    }
  }
}
