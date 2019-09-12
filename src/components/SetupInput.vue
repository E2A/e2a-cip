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
      :height="1"
      :key="forceTitleUpdate"
    />

    <BaseFormLabel
      :id="'cip-date'"
      :label="$t('setup.selectDate')"
    >
      <div :class="base.wrapper">
        <BaseFormSelect
          v-model="setupDateStart"
          @input="addSetup"
          :options="yearsArray"
          name="cip-date-1"
          :class="base.date"
          searchable
        />
        <div :class="base.divider" />
        <BaseFormSelect
          v-model="setupDateEnd"
          @input="addSetup"
          :options="yearsArray"
          name="cip-date-2"
          :class="base.date"
          searchable
        />
      </div>
    </BaseFormLabel>

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
import vSelect from 'vue-select'
import i18n from '@/i18n.js'

export default {
  name: 'SetupInput',
  components: {
    vSelect,
    BaseFormInput,
    BaseFormLabel,
    BaseFormSelect
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
      setupDateStart: new Date(),
      setupDateEnd: new Date()
    }
  },
  computed: {
    setupRoles: function () {
      return Object.values(i18n.messages[i18n.locale].userRoles).map((userRole, index) => {
        return this.$t(`userRoles.role${index + 1}`)
      })
    },
    yearsArray: function () {
      const currentYear = new Date().getFullYear()

      let array = []
      for (let i = currentYear - 9; i <= currentYear + 10; i++) {
        array.push(i)
      }

      return array
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
      this.setupDateStart = new Date()
      this.setupDateEnd = new Date()
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
        this.setupDateStart = setupData.dateStart
        this.setupDateEnd = setupData.dateEnd
      }
    },
    getData: function () {
      return this.$store.getters['entities/setup/query']().first()
    },
    addSetup: function () {
      const currencyData = this.setupCurrency
      const countryData = this.setupCountry
      const planDateStart = this.setupDateStart
      const planDateEnd = this.setupDateEnd
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
          currencyName: currencyNameData,
          dateStart: planDateStart,
          dateEnd: planDateEnd
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
  @import '~styleConfig/color';
  @import '~styleConfig/spacing';

  .wrapper {
    display: flex;
    align-items: center;
  }

  .date {
    width: 140px;
    display: inline-block;

    .vs__selected {
      padding: 0;
      margin: 0;
    }
  }

  .divider {
    display: inline-block;
    height: 2px;
    width: 10px;
    background-color: color('dark');
    margin: space('narrow');
  }
</style>
