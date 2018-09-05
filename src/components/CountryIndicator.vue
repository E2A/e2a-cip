<template>
  <BaseGutterWrapper
    v-if="!countryIndicator.error"
    :class="base.wrapper"
    el="section"
  >
    <div :class="base.stats">
      <BaseHeading
        :centered="false"
        :level="3"
        scale="delta"
        color="dark"
        weight="bold"
      >
        {{countryIndicator.name}}
      </BaseHeading>
      <BaseHeading
        v-if="countryIndicator.description !== ''"
        :class="space.paddingTopXxnarrow"
        :centered="false"
        scale="epsilon"
        weight="bold"
        color="highlight"
        sub
      >
        {{countryIndicator.description}}
      </BaseHeading>
      <BaseHeading
        :centered="false"
        scale="alpha"
        color="dark"
        sub
      >
        <!-- round to one decimal place, and put a unit after it -->
        {{Math.round(countryIndicator.value * 10) / 10}} <small>{{countryIndicator.unit}}</small>
      </BaseHeading>
      <div :class="base.citation">
        <a
          :class="base.citation"
          :href="countryIndicator.sourceUrl"
        >
          <small>{{countryIndicator.citation}}</small>
        </a>
      </div>
    </div>
    <div
      v-if="countryIndicator.questions"
      :class="base.questions"
    >
      <BaseHeading
        :level="4"
        :centered="false"
        :class="space.paddingBottomXnarrow"
        scale="epsilon"
        color="midtone"
      >
        {{$t('results.indicatorQuestions')}}
      </BaseHeading>
      <ul :class="base.questionList">
        <li
          v-for="(question, index) in countryIndicator.questions"
          :key="`question-${index}`"
        >
          <BaseBodyText :content="question" />
        </li>
      </ul>
    </div>
  </BaseGutterWrapper>
</template>

<script>
import BaseHeading from './BaseHeading.vue'
import BaseBodyText from './BaseBodyText.vue'
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
    BaseBodyText,
    BaseGutterWrapper,
    BaseCalloutBox
  },
  computed: {
    // DEPRECATED - disabling country notification logic here b/c we're prob not using comparators
    // countryNotification: function () {
    //   if (!this.countryIndicator.comparatorIndicator) {
    //     return false
    //   }

    //   // Set comparator value
    //   var comparatorIndicatorValue = 0

    //   // set to special string value
    //   if (this.countryIndicator.comparatorIndicator === 'youthFocusBudget') {
    //     comparatorIndicatorValue = this.getChartData(this.getActvityData()).youthCentricBudgetData[0].youthCentricPercent * 100
    //   }

    //   // Use other country indicator, if valid
    //   if (!this.getCountryIndicator(this.countryIndicator.comparatorIndicator).error) {
    //     comparatorIndicatorValue = this.getCountryIndicator(this.countryIndicator.comparatorIndicator).value
    //   }

    //   // Run comparison & set notification text & type
    //   var notificationObj = {}

    //   // Using eval to be able to parse comparator operator.
    //   // ">" = >
    //   // eslint-disable-next-line
    //   if (eval(`${parseFloat(this.countryIndicator.value)} ${this.countryIndicator.comparatorOperator} ${parseFloat(comparatorIndicatorValue)}`)) {
    //     notificationObj = {
    //       text: this.countryIndicator.comparatorTextTrue,
    //       type: this.countryIndicator.comparatorTextTrueType
    //     }
    //   } else {
    //     notificationObj = {
    //       text: this.countryIndicator.comparatorTextFalse,
    //       type: this.countryIndicator.comparatorTextFalseType
    //     }
    //   }

    //   return notificationObj
    // }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
@import '~bourbon/core/bourbon';
@import '~styleConfig/breakpoints';

.wrapper {
  display: block;
  font-size: 0;
}

.breakpoint {
  composes: scaleDefault from 'styles/type.scss';
  display: inline-block;
  width: calc((42em - 100%) * 1000);
  max-width: 100%;
  vertical-align: top;
}

.stats {
  composes: breakpoint;
  min-width: 33%;
}

.questions {
  composes: breakpoint;
  min-width: 66%;
}

.questionList {
  padding-left: 1em;
}

.citation {
  composes: leadingTight from 'styles/type.scss';
  composes: midtone from 'styles/color.scss';
}
</style>
