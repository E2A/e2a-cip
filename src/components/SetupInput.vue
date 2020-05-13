<!--
  Setup Input component
  -> use to enter initial input data
-->
<template>
  <form :class="space.paddingVerticalBetween">
    <!-- Title -->
    <BaseFormInput
      v-model="setupTitle"
      :label="$t('setup.CIPTitle')"
      :height="1"
      :key="forceTitleUpdate"
      name="cip-title"
      @input="addSetup"
    />

    <BaseFormLabel :id="'cip-date'" :label="$t('setup.selectDate')">
      <div :class="base.wrapper">
        <BaseFormSelect
          v-model="setupDateStart"
          :options="yearsArray"
          :class="base.date"
          name="cip-date-1"
          searchable
          @input="addSetup('start')"
        />
        <div :class="base.divider" />
        <BaseFormSelect
          v-model="setupDateEnd"
          :options="yearsArray"
          :class="base.date"
          name="cip-date-2"
          searchable
          @input="addSetup('end')"
        />
      </div>
    </BaseFormLabel>

    <!-- Country -->
    <BaseFormSelect
      v-model="setupCountry"
      :label="$t('setup.selectCountry')"
      :options="setupCountries"
      name="cip-country"
      searchable
      @input="addSetup"
    />

    <!-- Currency -->
    <BaseFormSelect
      v-model="setupCurrency"
      :label="$t('setup.selectCurrency')"
      :options="setupCurrencies"
      name="cip-currency"
      searchable
      @input="addSetup"
    />

    <!-- Role -->
    <BaseFormSelect
      v-model="setupRole"
      :label="$t('setup.selectRole')"
      :options="setupRoles"
      name="cip-role"
      @input="addSetup"
    />
  </form>
</template>

<script>
import countryList from "@/authorities/country-data";
import currencyList from "@/authorities/currency-data";
import BaseFormInput from "./BaseFormInput.vue";
import BaseFormLabel from "./BaseFormLabel.vue";
import BaseFormSelect from "./BaseFormSelect.vue";
import vSelect from "vue-select";
import i18n from "@/i18n.js";

export default {
  name: "SetupInput",
  components: {
    vSelect,
    BaseFormInput,
    BaseFormLabel,
    BaseFormSelect,
  },
  props: {
    clear: Boolean,
  },
  data() {
    return {
      setupTitle: "",
      forceTitleUpdate: 0,
      setupCountries: countryList,
      setupCurrencies: currencyList,
      setupCountry: null,
      setupRole: null,
      setupCurrency: null,
      setupDateStart: new Date(),
      setupDateEnd: new Date(),
    };
  },
  computed: {
    setupRoles: function () {
      return Object.values(i18n.messages[i18n.locale].userRoles).map(
        (userRole, index) => {
          return this.$t(`userRoles.role${index + 1}`);
        }
      );
    },
    yearsArray: function () {
      const currentYear = new Date().getFullYear();

      let array = [];
      for (let i = currentYear - 9; i <= currentYear + 10; i++) {
        array.push(i);
      }

      return array;
    },
  },
  watch: {
    clear: function (newVal) {
      if (newVal) this.clearData();
    },
  },
  created() {
    this.updateData();
  },
  methods: {
    clearData: function () {
      // Changing the key (forceTitleUpdate) forces the title's BaseFormInput to re-render
      // https://michaelnthiessen.com/force-re-render
      this.forceTitleUpdate++;
      this.setupTitle = "";
      this.setupCountry = null;
      this.setupRole = null;
      this.setupCurrency = null;
      this.setupDateStart = new Date();
      this.setupDateEnd = new Date();
      this.$emit("clear-success");
    },
    updateData: function () {
      // Update data based on what is stored
      const setupData = this.getData();

      var setupCurrencyVal = null;
      var setupCountryVal = null;

      if (setupData && setupData.currencyCode) {
        setupCurrencyVal = {
          value: setupData.currencyCode,
          label: setupData.currencyName,
        };
      }

      if (setupData && setupData.countryCode) {
        setupCountryVal = {
          value: setupData.countryCode,
          label: setupData.countryName,
        };
      }

      if (setupData) {
        this.setupTitle = setupData.title;
        this.setupCountry = setupCountryVal;
        this.setupRole = setupData.role;
        this.setupCurrency = setupCurrencyVal;
        this.setupDateStart = setupData.dateStart;
        this.setupDateEnd = setupData.dateEnd;
      }
    },
    getData: function () {
      return this.$store.getters["entities/setup/query"]().first();
    },
    validateDates(dateChanged) {
      if (this.setupDateStart > this.setupDateEnd) {
        if (dateChanged === "start") {
          this.setupDateEnd = null;
        } else {
          this.setupDateStart = null;
        }
      }
    },
    addSetup: function (dateChanged) {
      this.validateDates(dateChanged);

      const currencyData = this.setupCurrency;
      const countryData = this.setupCountry;
      const planDateStart = this.setupDateStart;
      const planDateEnd = this.setupDateEnd;
      var currencyCodeData = null;
      var currencyNameData = null;
      var countryCodeData = null;
      var countryNameData = null;

      if (currencyData) {
        currencyCodeData = currencyData.value;
        currencyNameData = currencyData.label;
      }

      if (countryData) {
        countryCodeData = countryData.value;
        countryNameData = countryData.label;
      }

      // Create setup data (create sets replaces the entity each time it is updated)
      this.$store.dispatch("entities/setup/create", {
        data: {
          title: this.setupTitle,
          countryName: countryNameData,
          countryCode: countryCodeData,
          role: this.setupRole,
          currencyCode: currencyCodeData,
          currencyName: currencyNameData,
          dateStart: planDateStart,
          dateEnd: planDateEnd,
        },
      });
    },
  },
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
@import "~styleConfig/color";
@import "~styleConfig/spacing";

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
  background-color: color("dark");
  margin: space("narrow");
}
</style>
