import i18n from '@/i18n.js'

export const activityTypes = {
  data: function () {
    return {
      activityTypeDataset: this.getActvityData()
    }
  },
  methods: {
    getGroupedActivites: function () {
      const activityTypeList = this.getActvityData()
      var groupedActivities = []

      // Build array of activities by type
      // We only get activity assessments that are yes / maybe (no can be ignored given it is the default)
      for (const activityType of activityTypeList) {
        groupedActivities.push({
          activityTypeName: activityType.title,
          activityObjects: this.$store.getters['entities/activities/query']().with('assessments', (query) => {
            query.where('value', [
              this.$t('bestPracticeOptions.yesKey'),
              this.$t('bestPracticeOptions.maybeKey')
            ])
          }).where('type', activityType.title).get()
        })
      }
      return groupedActivities
    },
    getActvityData: function () {
      return Object.values(i18n.messages[i18n.locale].activityTypes).map((activityType, index) => {
        return {
          title: this.$t(`activityTypes.type${index + 1}.title`),
          body: this.$t(`activityTypes.type${index + 1}.body`)
        }
      })
    }
  }
}
