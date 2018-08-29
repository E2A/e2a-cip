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
        if (this.$t(`countryIndicators.indicator${index + 1}.comparatorOperator`) !== `countryIndicators.indicator${index + 1}.comparatorOperator`) {
          return {
            name: this.$t(`countryIndicators.indicator${index + 1}.name`),
            description: this.$t(`countryIndicators.indicator${index + 1}.description`),
            citation: this.$t(`countryIndicators.indicator${index + 1}.sourceCitation`),
            sourceUrl: this.$t(`countryIndicators.indicator${index + 1}.sourceUrl`),
            fileName: this.$t(`countryIndicators.indicator${index + 1}.fileName`),
            iso2codeHeader: this.$t(`countryIndicators.indicator${index + 1}.iso2codeHeader`),
            indicatorValueHeader: this.$t(`countryIndicators.indicator${index + 1}.indicatorValueHeader`),
            comparatorOperator: this.$t(`countryIndicators.indicator${index + 1}.comparatorOperator`),
            comparatorIndicator: this.$t(`countryIndicators.indicator${index + 1}.comparatorIndicator`),
            comparatorTextTrue: this.$t(`countryIndicators.indicator${index + 1}.comparatorTextTrue`),
            comparatorTextFalse: this.$t(`countryIndicators.indicator${index + 1}.comparatorTextFalse`),
            comparatorTextTrueType: this.$t(`countryIndicators.indicator${index + 1}.comparatorTextTrueType`),
            comparatorTextFalseType: this.$t(`countryIndicators.indicator${index + 1}.comparatorTextFalseType`),
            id: (index + 1)
          }
        } else {
          return {
            name: this.$t(`countryIndicators.indicator${index + 1}.name`),
            description: this.$t(`countryIndicators.indicator${index + 1}.description`),
            citation: this.$t(`countryIndicators.indicator${index + 1}.sourceCitation`),
            sourceUrl: this.$t(`countryIndicators.indicator${index + 1}.sourceUrl`),
            fileName: this.$t(`countryIndicators.indicator${index + 1}.fileName`),
            iso2codeHeader: this.$t(`countryIndicators.indicator${index + 1}.iso2codeHeader`),
            indicatorValueHeader: this.$t(`countryIndicators.indicator${index + 1}.indicatorValueHeader`),
            id: (index + 1)
          }
        }
      })
    }
  },
  methods: {
    setupCountryIndicators: function () {
      // For each indicator, parse file and send data to be stored
      this.countryIndicators.forEach((indicator) => {
        Papa.parse(`uploads/country_indicators/${indicator.fileName}`, {
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
        if (indicator.comparatorOperator) {
          return {
            countryCode: dataItem[indicator.iso2codeHeader],
            name: indicator.name,
            description: indicator.description,
            indicatorId: indicator.id,
            value: dataItem[indicator.indicatorValueHeader],
            sourceUrl: indicator.sourceUrl,
            citation: indicator.citation,
            comparatorOperator: indicator.comparatorOperator,
            comparatorIndicator: indicator.comparatorIndicator,
            comparatorTextTrue: indicator.comparatorTextTrue,
            comparatorTextFalse: indicator.comparatorTextFalse,
            comparatorTextTrueType: indicator.comparatorTextTrueType,
            comparatorTextFalseType: indicator.comparatorTextFalseType
          }
        } else {
          return {
            countryCode: dataItem[indicator.iso2codeHeader],
            name: indicator.name,
            description: indicator.description,
            indicatorId: indicator.id,
            value: dataItem[indicator.indicatorValueHeader],
            sourceUrl: indicator.sourceUrl,
            citation: indicator.citation
          }
        }
      })
      // Create for initial load
      this.$store.dispatch('entities/countryindicators/insert', { data: setupData })
    }
  }
}
