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
        const translatedIndicator = `countryIndicators.indicator${index + 1}`
        // base props for all indicators
        let indicator = {
          id: (index + 1),
          name: this.$t(`${translatedIndicator}.name`),
          description: countryIndicator.description ? this.$t(`${translatedIndicator}.description`) : '',
          citation: this.$t(`${translatedIndicator}.sourceCitation`),
          sourceUrl: this.$t(`${translatedIndicator}.sourceUrl`),
          fileName: this.$t(`${translatedIndicator}.fileName`),
          iso2codeHeader: this.$t(`${translatedIndicator}.iso2codeHeader`),
          indicatorValueHeader: this.$t(`${translatedIndicator}.indicatorValueHeader`),
          indicatorValueUnit: this.$t(`${translatedIndicator}.indicatorValueUnit`)
        }

        // if there are questions, add to object
        if (countryIndicator.questions) {
          indicator.questions = []
          Object.values(countryIndicator.questions).map((question, i) => {
            indicator.questions.push(this.$t(`${translatedIndicator}.questions.${i + 1}`))
          })
        }

        // Deprecated?
        if (countryIndicator.comparatorOperator) {
          // if a comparator is present, append those props to the indicator object
          indicator = {
            ...indicator,
            comparatorOperator: this.$t(`${translatedIndicator}.comparatorOperator`),
            comparatorIndicator: this.$t(`${translatedIndicator}.comparatorIndicator`),
            comparatorTextTrue: this.$t(`${translatedIndicator}.comparatorTextTrue`),
            comparatorTextFalse: this.$t(`${translatedIndicator}.comparatorTextFalse`),
            comparatorTextTrueType: this.$t(`${translatedIndicator}.comparatorTextTrueType`),
            comparatorTextFalseType: this.$t(`${translatedIndicator}.comparatorTextFalseType`)
          }
        }
        return indicator
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
        let props = {
          countryCode: dataItem[indicator.iso2codeHeader],
          name: indicator.name,
          description: indicator.description,
          indicatorId: indicator.id,
          value: dataItem[indicator.indicatorValueHeader],
          unit: indicator.unit,
          sourceUrl: indicator.sourceUrl,
          citation: indicator.citation,
          questions: indicator.questions || null
        }

        if (indicator.comparatorOperator) {
          props = {
            ...props,
            comparatorOperator: indicator.comparatorOperator,
            comparatorIndicator: indicator.comparatorIndicator,
            comparatorTextTrue: indicator.comparatorTextTrue,
            comparatorTextFalse: indicator.comparatorTextFalse,
            comparatorTextTrueType: indicator.comparatorTextTrueType,
            comparatorTextFalseType: indicator.comparatorTextFalseType
          }
        }
        return props
      })

      // Create for initial load
      this.$store.dispatch('entities/countryindicators/insert', { data: setupData })
    }
  }
}
