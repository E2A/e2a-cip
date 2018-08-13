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
        return (setup.title && setup.country && setup.role && setup.currencyCode && setup.currencyName)
      } else {
        return false
      }
    }
  }
}
