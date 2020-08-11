<template>
  <BaseSectionWrapper :el="wrapperEl">
    <header :class="[type.center]">
      <BaseHeading :class="space.paddingBottomNarrow" scale="beta">
        {{ setupTitle }}
      </BaseHeading>
      <BaseGutterWrapper gutterX="medium" gutterY="xnarrow">
        <BaseHeading
          :class="base.byline"
          scale="zeta"
          weight="regular"
          color="midtone"
          sub
        >
          {{ setupRole }}
        </BaseHeading>
        <BaseHeading
          :class="base.byline"
          scale="zeta"
          weight="regular"
          color="midtone"
          sub
        >
          {{ setupCountry }}
        </BaseHeading>

        <BaseHeading
          :class="base.byline"
          scale="zeta"
          weight="regular"
          color="midtone"
          sub
        >
          {{ setupDate }}
        </BaseHeading>
      </BaseGutterWrapper>
    </header>

    <!-- country analysis -->
    <BaseWidthWrapper :class="space.paddingTopWide" el="section" width="wide">
      <BaseHeading
        :class="space.paddingBottomWide"
        :level="2"
        scale="gamma"
        color="midtone"
      >
        {{ $t("results.analysis.country") }}
      </BaseHeading>
      <ChartItems
        :display-questions="displayQuestions"
        :chart-names="['youthFocusCount', 'youthFocusBudget']"
      />

      <!-- country indicators -->
      <section :class="space.paddingTop">
        <BaseGallery :items="countryIndicators" size="large">
          <div
            v-if="!item.error"
            slot-scope="{ item }"
            :class="[border.top, border.secondary, space.paddingTop]"
          >
            <CountryIndicator
              :country-indicator="getCountryIndicator(item.id)"
              :display-questions="displayQuestions"
            />
          </div>
        </BaseGallery>
      </section>
    </BaseWidthWrapper>

    <!-- activity analysis -->
    <BaseWidthWrapper :class="space.paddingTopWide" el="section" width="wide">
      <BaseHeading
        :class="space.paddingBottomWide"
        scale="gamma"
        color="midtone"
        sub
      >
        {{ $t("results.analysis.activity") }}
      </BaseHeading>
      <ChartItems
        :display-questions="displayQuestions"
        :chart-names="['activityTypeBudget', 'activityTypeCount']"
        :questions="[
          {
            name: 'activityTypeBudget',
            questions: findQuestions('activityTypeBudgetQuestions')
          },
          {
            name: 'activityTypeCount',
            questions: findQuestions('activityTypeCountQuestions')
          }
        ]"
      />
    </BaseWidthWrapper>
  </BaseSectionWrapper>
</template>

<script>
import i18n from "@/i18n.js";
import BaseHeading from "@/components/BaseHeading.vue";
import BaseSectionWrapper from "@/components/BaseSectionWrapper.vue";
import BaseGutterWrapper from "@/components/BaseGutterWrapper.vue";
import BaseWidthWrapper from "@/components/BaseWidthWrapper.vue";
import ChartItems from "@/components/ChartItems.vue";
import CountryIndicator from "@/components/CountryIndicator.vue";
import BaseGallery from "@/components/BaseGallery.vue";
import { dataMethods } from "@/components/mixins/dataMethods";
import { initData } from "@/components/mixins/initData";

export default {
  name: "ResultsCharts",
  components: {
    BaseHeading,
    BaseSectionWrapper,
    BaseGutterWrapper,
    BaseWidthWrapper,
    ChartItems,
    CountryIndicator,
    BaseGallery
  },
  mixins: [dataMethods, initData],
  props: {
    wrapperEl: {
      type: String,
      default: "div"
    },
    displayQuestions: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      setupTitle: this.getItemValue("setup", "title"),
      setupRole: this.getItemValue("setup", "role"),
      setupCountry: this.getItemValue("setup", "countryName")
    };
  },
  computed: {
    setupDate: function() {
      const startTime = this.getItemValue("setup", "dateStart");
      const endTime = this.getItemValue("setup", "dateEnd");

      return `${startTime} - ${endTime}`;
    }
  },
  methods: {
    findQuestions(translationKey) {
      return Object.values(
        i18n.messages[i18n.locale].chartTitles[translationKey]
      ).map((question, index) =>
        this.$t(`chartTitles.${translationKey}.${index + 1}`)
      );
    }
  }
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>

<style lang="scss" module="base">
@import "~styleConfig/borders";
@import "~styleConfig/breakpoints";

.byline {
  composes: midtone from "styles/color.scss";
  composes: leadingTight from "styles/type.scss";
  display: block;

  @include media(">xsmall") {
    display: inline-block;

    & + & {
      @include border("left");
    }
  }
}
</style>
