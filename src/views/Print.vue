<template>
  <NavFooter
    :left-buttons="navButtons.left"
    :right-buttons="navButtons.right"
    wrapper-el="article"
  >
    <!-- header and charts -->
    <ResultsCharts :display-questions="false" />

    <!-- Global Recommendations -->
    <BaseSectionWrapper border>
      <BaseHeading :level="2" :class="space.paddingBottom" scale="gamma">
        {{ $t("print.globalRecommendations.title") }}
      </BaseHeading>
      <BaseWidthWrapper :class="space.paddingBottom">
        <BaseBodyText :content="$t('print.globalRecommendations.content')" />

        <BaseVerticalList
          :items="globalRecommendations"
          :class="[
            space.paddingTop,
            space.marginTop,
            border.top,
            border.secondary,
          ]"
        >
          <template slot-scope="{ item, index }">
            <template v-if="item.text">
              <BaseHeading
                :level="2"
                :centered="false"
                :class="space.paddingBottomXnarrow"
                weight="bold"
                color="midtone"
                scale="epsilon"
              >
                {{
                  $t("print.globalRecommendations.recommendation", {
                    count: index + 1,
                  })
                }}
              </BaseHeading>
              <BaseBodyText :content="item.text" />
            </template>
          </template>
        </BaseVerticalList>
      </BaseWidthWrapper>
    </BaseSectionWrapper>

    <!-- Activities list -->
    <BaseSectionWrapper :class="space.paddingTop" border>
      <BaseWidthWrapper width="wide">
        <!-- Count & export tools -->
        <ActivitiesListHeader clear-recommendations />

        <!-- Table -->
        <ActivitiesList
          ref="activityList"
          :grouped-activities="groupedActivities"
        >
          <template #activities="{ activities, setActivityId }">
            <div v-if="activities.activityObjects.length > 0">
              <ActivitiesTypeHeading>
                {{ activities.activityTypeName }}
                <template slot="stats">
                  <BaseProgressBar
                    :label="$t('results.activityWithEIPbyType')"
                    :percentage="
                      percentBPActivitesByType(activities.activityTypeKey)
                    "
                  />
                </template>
              </ActivitiesTypeHeading>
              <ul :class="base.activityTypeList">
                <ActivitiesItemAssessment
                  v-for="(activity, index) in activities.activityObjects"
                  :key="`activity-${index}`"
                  :activity="activity"
                  :youth="activity.youthCentric"
                  number-index
                  @activitySelect="setActivityId"
                />
              </ul>
            </div>
          </template>
        </ActivitiesList>
      </BaseWidthWrapper>
    </BaseSectionWrapper>

    <!-- Activity Comments -->
    <ActivitiesComments />
  </NavFooter>
</template>

<script>
import ResultsCharts from "@/components/ResultsCharts.vue";
import ActivitiesListHeader from "@/components/ActivitiesListHeader.vue";
import BaseHeading from "@/components/BaseHeading.vue";
import BaseBodyText from "@/components/BaseBodyText.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseProgressBar from "@/components/BaseProgressBar.vue";
import BaseSectionWrapper from "@/components/BaseSectionWrapper.vue";
import BaseWidthWrapper from "@/components/BaseWidthWrapper.vue";
import BaseGutterWrapper from "@/components/BaseGutterWrapper.vue";
import BaseVerticalList from "@/components/BaseVerticalList.vue";
import ActivitiesList from "@/components/ActivitiesList.vue";
import ActivitiesTypeHeading from "@/components/ActivitiesTypeHeading.vue";
import ActivitiesItemResultPrint from "@/components/ActivitiesItemResultPrint.vue";
import ActivitiesComments from "@/components/ActivitiesComments.vue";
import ClearItems from "@/components/ClearItems.vue";
import ChartItems from "@/components/ChartItems.vue";
import NavFooter from "@/components/NavFooter.vue";
import PrintPage from "@/components/PrintPage.vue";
import ActivitiesItemAssessment from "@/components/ActivitiesItemAssessment.vue";
import { activityTypes } from "@/components/mixins/activityTypes";
import { dataMethods } from "@/components/mixins/dataMethods";
import { bestPracticeData } from "@/components/mixins/bestPracticeData";

export default {
  name: "Print",
  components: {
    ResultsCharts,
    ActivitiesListHeader,
    BaseHeading,
    BaseBodyText,
    BaseButton,
    BaseProgressBar,
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseGutterWrapper,
    BaseVerticalList,
    PrintPage,
    ActivitiesList,
    ActivitiesTypeHeading,
    ActivitiesItemResultPrint,
    ActivitiesComments,
    ClearItems,
    ChartItems,
    ActivitiesItemAssessment,
    NavFooter,
  },
  mixins: [activityTypes, dataMethods, bestPracticeData],
  data() {
    return {
      setupTitle: this.getItemValue("setup", "title"),
      setupRole: this.getItemValue("setup", "role"),
      setupCountry: this.getItemValue("setup", "countryName"),
      globalRecommendations: this.$store.getters[
        "entities/globalrecommendations/all"
      ](),
    };
  },
  computed: {
    groupedActivities: function () {
      return this.getGroupedActivites();
    },
    navButtons: function () {
      return {
        left: [
          {
            to: { name: "advocate" },
            label: this.$t("print.previousStep"),
          },
        ],
        right: [
          {
            type: "print",
            size: "default",
          },
        ],
      };
    },
  },
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

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

.toolTray {
  composes: paddingBottomWide from "styles/spacing.scss";
  display: block;

  @supports (display: flex) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.toolTrayItem {
  display: inline-block;
}

.tableHeader {
  composes: paddingBottom from "styles/spacing.scss";
  display: block;

  @supports (display: flex) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
}

.activityTypeList {
  display: block;
  list-style: none;
  padding-left: 0;
}

.itemSelected {
  background-color: rgba(color("accent"), 0.2);
}
</style>
