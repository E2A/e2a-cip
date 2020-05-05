import i18n from "@/i18n.js";

export const activityBudget = {
  methods: {
    getBudgetScales: function () {
      return Object.values(i18n.messages[i18n.locale].budgetScales).map(
        (budgetScale, index) => {
          return {
            title: this.$t(`budgetScales.scale${index + 1}.title`),
            key: +this.$t(`budgetScales.scale${index + 1}.key`),
          };
        }
      );
    },
    getLocalizedBudget: function (base, locale = null) {
      // Replace comma(fr)/period(en)
      // toLocale is the language you're changing to
      const baseString = String(base);
      const toLocale = locale || this.$root.$i18n.locale;

      if (base === null) return 0;
      if (toLocale === "en") {
        // console.log('base string formatted', baseString.replace(',', ''))
        return baseString.replace(",", "");
      } else {
        // console.log('base string formatted', baseString.replace('.', '').replace(',', '.'))
        return baseString.replace(".", "").replace(",", ".");
      }
    },
  },
};
