import Papa from 'papaparse'
import i18n from '@/i18n.js'

export const initData = {
  created () {
    // Initialize data on create
    if (this.$store.getters['entities/countryindicators/query']().count() === 0) {
      this.setupCountryIndicators()
    }
  },
  computed: {
    countryIndicators: function () {
      // Get indicators from i18n and pull into object
      return Object.values(i18n.messages[i18n.locale].countryIndicators).map((countryIndicator, index) => {
        return {
          name: this.$t(`countryIndicators.indicator${index + 1}.name`),
          source: this.$t(`countryIndicators.indicator${index + 1}.source`),
          fileName: this.$t(`countryIndicators.indicator${index + 1}.fileName`),
          iso2codeHeader: this.$t(`countryIndicators.indicator${index + 1}.iso2codeHeader`),
          indicatorValueHeader: this.$t(`countryIndicators.indicator${index + 1}.indicatorValueHeader`),
          id: (index + 1)
        }
      })
    }
  },
  methods: {
    setupCountryIndicators: function () {
      // For each indicator, parse file and send data to be stored
      this.countryIndicators.forEach((indicator) => {
        Papa.parse(`country_indicators/${indicator.fileName}`, {
          download: true,
          header: true,
          complete: (results) => {
            this.storeCountryIndicators(indicator, results.data)
          }
        })
      })
    },
    storeCountryIndicators: function (indicator, indicatorData) {
      // Map Data to Model format
      const setupData = indicatorData.map((dataItem) => {
        return {
          countryCode: dataItem[indicator.iso2codeHeader],
          indicatorName: indicator.name,
          indicatorId: indicator.id,
          indicatorValue: dataItem[indicator.indicatorValueHeader]
        }
      })
      // Create for initial load
      this.$store.dispatch('entities/countryindicators/insert', { data: setupData })
    }
  }
}
