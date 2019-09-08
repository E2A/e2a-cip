<!--
  Setup Input component
  -> use to enter initial input data
-->
<template>
  <form :class="space.paddingVerticalBetween">

    <!-- Title -->
    <BaseFormInput
      v-model="setupTitle"
      @input="addSetup"
      :label="$t('setup.CIPTitle')"
      name="cip-title"
      el="textarea"
      :key="forceTitleUpdate"
    />

    <BaseFormDate
      v-model="setupDate"
      @input="addSetup"
      :label="$t('setup.selectDate')"
      name="cip-date"
    />

    <!-- Country -->
    <BaseFormSelect
      v-model="setupCountry"
      @input="addSetup"
      :label="$t('setup.selectCountry')"
      :options="setupCountries"
      name="cip-country"
      searchable
    />

    <!-- Currency -->
    <BaseFormSelect
      v-model="setupCurrency"
      @input="addSetup"
      :label="$t('setup.selectCurrency')"
      :options="setupCurrencies"
      name="cip-currency"
      searchable
    />

    <!-- Role -->
    <BaseFormSelect
      v-model="setupRole"
      @input="addSetup"
      :label="$t('setup.selectRole')"
      :options="setupRoles"
      name="cip-role"
    />
  </form>
</template>

<script>
import countryList from '@/authorities/country-data'
import currencyList from '@/authorities/currency-data'
import BaseFormInput from './BaseFormInput.vue'
import BaseFormLabel from './BaseFormLabel.vue'
import BaseFormSelect from './BaseFormSelect.vue'
import BaseFormDate from './BaseFormDate.vue'
import vSelect from 'vue-select'
import i18n from '@/i18n.js'

export default {
  name: 'SetupInput',
  components: {
    vSelect,
    BaseFormInput,
    BaseFormLabel,
    BaseFormSelect,
    BaseFormDate
  },
  props: {
    clear: Boolean
  },
  data () {
    return {
      setupTitle: '',
      forceTitleUpdate: 0,
      setupCountries: countryList,
      setupCurrencies: currencyList,
      setupCountry: null,
      setupRole: null,
      setupCurrency: null,
      setupDate: new Date(),
    }
  },
  computed: {
    setupRoles: function () {
      return Object.values(i18n.messages[i18n.locale].userRoles).map((userRole, index) => {
        return this.$t(`userRoles.role${index + 1}`)
      })
    }
  },
  watch: {
    clear: function (newVal) {
      if (newVal) this.clearData()
    }
  },
  methods: {
    clearData: function () {
      // Changing the key (forceTitleUpdate) forces the title's BaseFormInput to re-render
      // https://michaelnthiessen.com/force-re-render
      this.forceTitleUpdate++
      this.setupTitle = ''
      this.setupCountry = null
      this.setupRole = null
      this.setupCurrency = null
      this.setupDate = new Date()
      this.$emit('clear-success')
    },
    updateData: function () {
      // Update data based on what is stored
      const setupData = this.getData()

      var setupCurrencyVal = null
      var setupCountryVal = null

      if (setupData && setupData.currencyCode) {
        setupCurrencyVal = { value: setupData.currencyCode, label: setupData.currencyName }
      }

      if (setupData && setupData.countryCode) {
        setupCountryVal = { value: setupData.countryCode, label: setupData.countryName }
      }

      if (setupData) {
        this.setupTitle = setupData.title
        this.setupCountry = setupCountryVal
        this.setupRole = setupData.role
        this.setupCurrency = setupCurrencyVal
        this.setupDate = setupData.date
      }
    },
    getData: function () {
      return this.$store.getters['entities/setup/query']().first()
    },
    addSetup: function (e) {
      const currencyData = this.setupCurrency
      const countryData = this.setupCountry
      const planDate = this.setupDate
      var currencyCodeData = null
      var currencyNameData = null
      var countryCodeData = null
      var countryNameData = isNull

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
          currencyName: currencyNameData,
          date: planDate,
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
