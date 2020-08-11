<template>
  <BaseGutterWrapper :class="base.wrapper" el="section">
    <div v-if="!countryIndicator.error" :class="base.stats">
      <BaseHeading
        :centered="false"
        :level="3"
        scale="delta"
        color="dark"
        weight="bold"
      >
        {{ countryIndicator.name }}
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
        {{ countryIndicator.description }}
      </BaseHeading>
      <BaseHeading :centered="false" scale="alpha" color="dark" sub>
        <!-- round to one decimal place, and put a unit after it -->
        {{ roundedValue }} <small>{{ countryIndicator.unit }}</small>
      </BaseHeading>
      <div :class="base.citation">
        <a :class="base.citation" :href="countryIndicator.sourceUrl">
          <small>{{ countryIndicator.citation }}</small>
        </a>
      </div>
    </div>
    <ResultsQuestions
      v-if="
        countryIndicator.questions &&
          !countryIndicator.error &&
          displayQuestions
      "
      :questions="countryIndicator.questions"
      :class="base.questions"
    />

    <div v-if="countryIndicator.error" :class="base.stats">
      <BaseHeading
        :centered="false"
        :level="3"
        scale="delta"
        color="dark"
        weight="bold"
      >
        {{ countryIndicator.name }}
      </BaseHeading>
      <BaseHeading
        :centered="false"
        :level="5"
        :class="space.paddingTopNarrow"
        scale="zeta"
        color="dark"
        weight="light"
      >
        {{ countryIndicator.error }}
      </BaseHeading>
    </div>
  </BaseGutterWrapper>
</template>

<script>
import BaseHeading from "./BaseHeading.vue";
import BaseBodyText from "./BaseBodyText.vue";
import BaseGutterWrapper from "./BaseGutterWrapper.vue";
import BaseCalloutBox from "./BaseCalloutBox.vue";
import ResultsQuestions from "./ResultsQuestions.vue";
import { dataMethods } from "./mixins/dataMethods";
import { activityTypes } from "./mixins/activityTypes";

export default {
  name: "CountryIndicator",
  components: {
    BaseHeading,
    BaseBodyText,
    BaseGutterWrapper,
    BaseCalloutBox,
    ResultsQuestions
  },
  mixins: [dataMethods, activityTypes],
  props: {
    countryIndicator: {
      type: Object,
      required: true
    },
    displayQuestions: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    roundedValue: function() {
      const parsedValue = this.countryIndicator.value.match(/^\d*\.?\d*/)[0];
      return Math.round(parsedValue * 10) / 10;
    }
  }
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
@import "~bourbon/core/bourbon";
@import "~styleConfig/breakpoints";

.wrapper {
  display: block;
  font-size: 0;

  @media print {
    page-break-inside: avoid;
  }
}

.stats {
  composes: scaleDefault from "styles/type.scss";
  display: block;
  min-width: 33%;
}

.questions {
  display: block;
  min-width: 66%;
}

.questionList {
  padding-left: 1.2em;

  > li + li {
    padding-top: 0.5em;
  }
}

.citation {
  composes: leadingTight from "styles/type.scss";
  composes: midtone from "styles/color.scss";
}
</style>
