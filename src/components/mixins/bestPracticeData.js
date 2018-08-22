import i18n from '@/i18n.js'

// https://medium.com/chrisburgin/javascript-converting-an-object-to-an-array-94b030a1604c
export const bestPracticeData = {
  data: function () {
    return {
      bestPractices: Object.values(i18n.messages[i18n.locale].bestPractices).map((bestPractice, index) => {
        return {
          title: this.$t(`bestPractices.bestPractice${index + 1}.title`),
          icon: this.$t(`bestPractices.bestPractice${index + 1}.icon`),
          teaser: this.$t(`bestPractices.bestPractice${index + 1}.teaser`),
          body: this.$t(`bestPractices.bestPractice${index + 1}.body`),
          resources: this.$t(`bestPractices.bestPractice${index + 1}.resources`),
          id: (index + 1)
        }
      })
    }
  },
  methods: {
    getActivityTypeCounts: function (activityType) {
      return this.bestPractices.map((bestPractice) => {
        return {
          title: bestPractice.title,
          count: this.getActivityTypeBPCount(activityType, bestPractice.id)
        }
      })
    },
    getActivityTypeBPCount: function (activityType, bestPracticeId) {
      return this.$store.getters['entities/assessments/query']()
        .where('value', this.$t('bestPracticeOptions.yesKey'))
        .where('best_practice_id', bestPracticeId)
        .whereHas('activity', (query) => {
          query.where('type', activityType)
        })
        .count()
    }
  }
}
