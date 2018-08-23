<!--
  Setup Input component
  -> use to enter initial input data
-->
<template>
  <form :class="space.paddingVerticalBetween">
    <BaseFormInput
      :label="$t('setup.CIPTitle')"
      id="cip-title"
      @input="addSetup"
      v-model="setupTitle"
    />
    <BaseFormLabel
      id="cip-country"
      :label="$t('setup.selectCountry')"
    >
      <vSelect id="cip-country" @input="addSetup" v-model="setupCountry" :options="setupCountries"/>
    </BaseFormLabel>
    <BaseFormLabel
      id="cip-currency"
      :label="$t('setup.selectCurrency')"
    >
      <vSelect id="cip-currency" @input="addSetup" v-model="setupCurrency" :options="setupCurrencies" />
    </BaseFormLabel>
    <BaseFormLabel
      id="cip-role"
      :label="$t('setup.selectRole')"
    >
      <vSelect id="cip-role" @input="addSetup" v-model="setupRole" :options="setupRoles" />
    </BaseFormLabel>
  </form>
</template>

<script>
import countryList from '@/authorities/country-data'
import currencyList from '@/authorities/currency-data'
import BaseFormInput from './BaseFormInput.vue'
import BaseFormLabel from './BaseFormLabel.vue'
import vSelect from 'vue-select'
import i18n from '@/i18n.js'

export default {
  name: 'SetupInput',
  components: {
    vSelect,
    BaseFormInput,
    BaseFormLabel
  },
  data () {
    return {
      setupTitle: '',
      setupCountries: countryList,
      setupCurrencies: currencyList,
      setupCountry: null,
      setupRole: null,
      setupCurrency: null
    }
  },
  computed: {
    setupRoles: function () {
      return Object.values(i18n.messages[i18n.locale].userRoles).map((userRole, index) => {
        return this.$t(`userRoles.role${index + 1}`)
      })
    }
  },
  methods: {
    updateData: function () {
      // Update data based on what is stored
      const setupData = this.getData()
      var setupCurrencyVal = null
      var setupCountryVal = null

      if (setupData && setupData.currencyCode) {
        setupCurrencyVal = {value: setupData.currencyCode, label: setupData.currencyName}
      }

      if (setupData && setupData.countryCode) {
        setupCountryVal = {value: setupData.countryCode, label: setupData.countryName}
      }

      if (setupData) {
        this.setupTitle = setupData.title
        this.setupCountry = setupCountryVal
        this.setupRole = setupData.role
        this.setupCurrency = setupCurrencyVal
      }
    },
    getData: function () {
      return this.$store.getters['entities/setup/query']().first()
    },
    addSetup: function () {
      const currencyData = this.setupCurrency
      const countryData = this.setupCountry
      var currencyCodeData = null
      var currencyNameData = null
      var countryCodeData = null
      var countryNameData = null

      if (currencyData) {
        currencyCodeData = currencyData.value
        currencyNameData = currencyData.label
      }

      if (countryData) {
        countryCodeData = countryData.value
        countryNameData = countryData.label
      }

      // Create setup data (create sets replaces the entity each time it is updated)
      this.$store.dispatch('entities/setup/create', {
        data: {
          title: this.setupTitle,
          countryName: countryNameData,
          countryCode: countryCodeData,
          role: this.setupRole,
          currencyCode: currencyCodeData,
          currencyName: currencyNameData
        }
      })
    }
  },
  created () {
    this.updateData()
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style lang="scss" module="base">
.label {
  display: block;
}

.input {
  display: block;
}
</style>
