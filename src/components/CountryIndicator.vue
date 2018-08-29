<template>
  <div
    v-if="!countryIndicator.error"
  >
    <BaseHeading
      :centered="false"
      :level="2"
      scale="beta"
    >
      <strong>{{countryIndicator.value}}</strong> {{countryIndicator.name}}
    </BaseHeading>
    <BaseHeading
      :centered="false"
      :level="3"
      scale="delta"
    >
      {{countryIndicator.description}}
    </BaseHeading>
    <a :href="countryIndicator.sourceUrl"><small>{{countryIndicator.citation}}</small></a>
    <BaseCalloutBox
      v-if="countryNotification"
      :message="countryNotification.text"
      :role="countryNotification.type"
    />
  </div>
</template>

<script>
import BaseHeading from './BaseHeading.vue'
import BaseGutterWrapper from './BaseGutterWrapper.vue'
import BaseCalloutBox from './BaseCalloutBox.vue'
import { dataMethods } from './mixins/dataMethods'
import { activityTypes } from './mixins/activityTypes'

export default {
  name: 'CountryIndicator',
  mixins: [dataMethods, activityTypes],
  props: {
    countryIndicator: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseHeading,
    BaseGutterWrapper,
    BaseCalloutBox
  },
  computed: {
    countryNotification: function () {
      if (!this.countryIndicator.comparatorIndicator) {
        return false
      }

      // Set comparator value
      var comparatorIndicatorValue = 0

      // set to special string value
      if (this.countryIndicator.comparatorIndicator === 'youthFocusBudget') {
        comparatorIndicatorValue = this.getChartData(this.getActvityData()).youthCentricBudgetData[0].youthCentricPercent * 100
      }

      // Use other country indicator, if valid
      if (!this.getCountryIndicator(this.countryIndicator.comparatorIndicator).error) {
        comparatorIndicatorValue = this.getCountryIndicator(this.countryIndicator.comparatorIndicator).value
      }

      // Run comparison & set notification text & type
      var notificationObj = {}

      // Using eval to be able to parse comparator operator.
      // ">" = >
      // eslint-disable-next-line
      if (eval(`${parseFloat(this.countryIndicator.value)} ${this.countryIndicator.comparatorOperator} ${parseFloat(comparatorIndicatorValue)}`)) {
        notificationObj = {
          text: this.countryIndicator.comparatorTextTrue,
          type: this.countryIndicator.comparatorTextTrueType
        }
      } else {
        notificationObj = {
          text: this.countryIndicator.comparatorTextFalse,
          type: this.countryIndicator.comparatorTextFalseType
        }
      }

      return notificationObj
    }
  }
}
</script>
