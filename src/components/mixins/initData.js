import * as Papa from "papaparse";
import i18n from "@/i18n.js";

export const initData = {
  computed: {
    currentLocale: function() {
      return this.$i18n.locale;
    },
    countryIndicators: function() {
      return this.getTranslatedCountryIndicators();
    }
  },
  created() {
    // Initialize data on create
    if (
      this.$store.getters["entities/countryindicators/query"]().count() === 0
    ) {
      this.setupCountryIndicators();
    }
  },
  watch: {
    currentLocale: function(newLocale) {
      this.setupCountryIndicators();
    }
  },
  methods: {
    getTranslatedCountryIndicators: function() {
      // Get indicators from i18n and pull into object
      return Object.values(i18n.messages[i18n.locale].countryIndicators).map(
        (countryIndicator, index) => {
          const translatedIndicator = `countryIndicators.indicator${index + 1}`;
          // base props for all indicators
          let indicator = {
            id: index + 1,
            name: this.$t(`${translatedIndicator}.name`),
            description: countryIndicator.description
              ? this.$t(`${translatedIndicator}.description`)
              : "",
            citation: this.$t(`${translatedIndicator}.sourceCitation`),
            sourceUrl: this.$t(`${translatedIndicator}.sourceUrl`),
            fileName: this.$t(`${translatedIndicator}.fileName`),
            iso2codeHeader: this.$t(`${translatedIndicator}.iso2codeHeader`),
            indicatorValueHeader: this.$t(
              `${translatedIndicator}.indicatorValueHeader`
            ),
            indicatorValueUnit: this.$t(
              `${translatedIndicator}.indicatorValueUnit`
            )
          };

          // if there are questions, add to object
          if (countryIndicator.questions) {
            indicator.questions = [];
            Object.values(countryIndicator.questions).map((question, i) => {
              indicator.questions.push(
                this.$t(`${translatedIndicator}.questions.${i + 1}`)
              );
            });
          }
          return indicator;
        }
      );
    },
    setupCountryIndicators: function() {
      // wipe out the indicators to make sure we have a clean slate
      this.$store.dispatch("entities/countryindicators/deleteAll");
      // For each indicator, parse file and send data to be stored
      this.getTranslatedCountryIndicators().forEach(indicator => {
        Papa.parse(`uploads/country_indicators/${indicator.fileName}`, {
          download: true,
          header: true,
          complete: results => {
            this.storeCountryIndicators(indicator, results.data);
          }
        });
      });
    },
    storeCountryIndicators: function(indicator, indicatorData) {
      // Map Data to Model format
      const setupData = indicatorData.map(dataItem => {
        return {
          countryCode: dataItem[indicator.iso2codeHeader],
          name: indicator.name,
          description: indicator.description,
          indicatorId: indicator.id,
          value: dataItem[indicator.indicatorValueHeader],
          unit: indicator.unit,
          sourceUrl: indicator.sourceUrl,
          citation: indicator.citation,
          questions: indicator.questions || null
        };
      });

      // Create for initial load
      this.$store.dispatch("entities/countryindicators/insert", {
        data: setupData
      });
    }
  }
};
