import i18n from '@/i18n.js'

export const activityBudget = {
  methods: {
    getBudgetScales: function () {
      return Object.values(i18n.messages[i18n.locale].budgetScales).map((budgetScale, index) => {
        return {
          title: this.$t(`budgetScales.scale${index + 1}.title`),
          key: +this.$t(`budgetScales.scale${index + 1}.key`)
        }
      })
    }
  }
}
