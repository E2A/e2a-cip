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
    },
    getLocalizedBudget: function (base, locale = null) {
      // Replace comma(fr)/period(en)
      // toLocale is the language you're changing to
      const baseString = String(base)
      const toLocale = locale || this.$i18n.locale

      return toLocale === 'en' ? baseString.replace(',', '.') : baseString.replace('.', ',')
    }
  }
}
