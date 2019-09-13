export const dataMethods = {
  methods: {
    getItemCount: function (objectType) {
      if (objectType === 'all') {
        const activityCount = this.$store.getters['entities/activities/query']().count()
        const setupCount = this.$store.getters['entities/setup/query']().count()
        const recommendationCount = this.$store.getters['entities/recommendations/query']().count()
        const assessmentsCount = this.$store.getters['entities/assessments/query']().count()
        return activityCount + setupCount + recommendationCount + assessmentsCount
      } else {
        return this.$store.getters[`entities/${objectType}/query`]().count()
      }
    },
    getItemValue: function (objectType, objectField, objectId) {
      var objectItem = null
      // Get object from store
      if (objectId) {
        objectItem = this.$store.getters[`entities/${objectType}/query`]().find(objectId)
      } else {
        objectItem = this.$store.getters[`entities/${objectType}/query`]().first()
      }
      // Return either the object or the value of a particular field
      if (objectField && objectItem) {
        return objectItem[`${objectField}`]
      } else {
        return objectItem
      }
    },
    getNextActivity: function () {
      const lastActivity = this.$store.getters['entities/activities/query']().last()
      var nextActivityId = 1
      if (lastActivity) {
        nextActivityId = lastActivity.id
      }
      return String(nextActivityId + 1)
    },
    getLastItem: function () {
      const lastActivity = this.$store.getters['entities/activities/query']().last()
      return lastActivity ? lastActivity.id : 0
    },
    setupPresent: function () {
      const setup = this.getItemValue('setup')

      // if setup entitly exists, ensure all fields are present
      if (setup) {
        return (setup.title && setup.countryCode && setup.role && setup.currencyCode)
      } else {
        return false
      }
    },
    checkElectron: function () {
      // Check if electron is being used
      var userAgent = navigator.userAgent.toLowerCase()
      return userAgent.indexOf(' electron/') > -1
    },
    getCountryIndicator: function (indicatorId) {
      // Check for indicator presence, if so find name
      const indicator = this.$store.getters['entities/countryindicators/query']().where('indicatorId', indicatorId).first()
      var indicatorName = ''
      if (indicator) {
        indicatorName = indicator.indicatorName
      } else {
        return { error: this.$t('indicatorNotPresent') }
      }

      // return country indicator
      const countryIndicator = this.$store.getters['entities/countryindicators/query']()
        .where('indicatorId', indicatorId)
        .where('countryCode', this.getItemValue('setup', 'countryCode'))
        .first()
      if (countryIndicator) {
        return countryIndicator
      } else {
        return { error: this.$t('indicatorDataNotPresent', { indicatorName: indicatorName }) }
      }
    },
    getBudgetTotal: function (queryObject) {
      return queryObject.reduce((budgetTotal, entity) => {
        return budgetTotal + entity.budget
      }, 0)
    },
    getYouthCentricActivities: function () {
      return this.$store.getters['entities/activities/query']().where('youthCentric', true).count()
    },
    getYouthCentricBudget: function () {
      return this.getBudgetTotal(this.$store.getters['entities/activities/query']().where('youthCentric', true).get())
    },
    getChartData: function (activityTypes) {
      // Get chart data
      var chartDataObject = {}

      // % Activity count by type & Budget % of total by activity types
      var activityTypeData = []
      var youthCentricBudgetData = []
      var youthCentricAcitivtyData = []
      // only count youth-centric activities for Budget counts
      const totalYouthActivities = this.getYouthCentricActivities() // can be 0
      const totalYouthBudget = this.getYouthCentricBudget() // can be 0

      // actual totals (all activities regardless of youth centricity)
      const totalActivities = this.$store.getters['entities/activities/query']().count()
      const totalBudget = this.getBudgetTotal(this.$store.getters['entities/activities/all']()) // can be 0

      // Get counts, budget and percents for each activityType
      for (const activityType of activityTypes) {
        const activityCount = this.$store.getters['entities/activities/query']().where('type', activityType.key).where('youthCentric', true).count()
        const activityTypesObjects = this.$store.getters['entities/activities/query']().where('type', activityType.key).where('youthCentric', true).get()
        activityTypeData.push({
          type: activityType.title,
          count: activityCount,
          countPercent: totalYouthActivities ? (activityCount / totalYouthActivities).toFixed(3) : 0.25,
          budgetAmount: this.getBudgetTotal(activityTypesObjects),
          budgetPercent: totalYouthBudget ? (this.getBudgetTotal(activityTypesObjects) / totalYouthBudget).toFixed(3) : 0.25,
          class: activityType.key
        })
      }
      chartDataObject['activityTypeData'] = activityTypeData

      // Budget % youth centric
      const youthCentricBudget = this.getYouthCentricBudget()

      // Add to array (so that CSV can read correctly)
      youthCentricBudgetData.push({
        youthCentricBudget: youthCentricBudget,
        notYouthCentricBudget: totalBudget - youthCentricBudget,
        youthCentricPercent: totalBudget ? (youthCentricBudget / totalBudget).toFixed(3) : 0.5,
        notYouthCentricPercent: totalBudget ? (1 - (youthCentricBudget / totalBudget)).toFixed(3) : 0.5
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
    notify: function (message, role = 'info', timeout = 4000, visible = true) {
      // Clear notifications before adding a new one
      this.$store.dispatch('entities/globalnotifications/deleteAll')

      this.$store.dispatch('entities/globalnotifications/create', {
        data: {
          visible: visible,
          timeout: timeout,
          role: role,
          message: message
        }
      })
    }
  }
}
