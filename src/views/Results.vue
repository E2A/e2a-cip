<template>
  <NavFooter
    :left-buttons="navButtons.left"
    :right-buttons="navButtons.right"
    wrapper-el="article"
  >
    <!-- Export tool tray -->
    <ActivitiesExportTray charts />
    <NavBreadcrumbs />
    <!-- header & charts -->
    <ResultsCharts :display-questions="true" />

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
                  :class="[
                    mountedActivity === activity.id && base.itemSelected
                  ]"
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
import { mapState } from "vuex";
import ActivitiesExportTray from "@/components/ActivitiesExportTray.vue";
import ResultsCharts from "@/components/ResultsCharts.vue";
import BaseHeading from "@/components/BaseHeading.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseSectionWrapper from "@/components/BaseSectionWrapper.vue";
import BaseWidthWrapper from "@/components/BaseWidthWrapper.vue";
import BaseGutterWrapper from "@/components/BaseGutterWrapper.vue";
import ActivitiesList from "@/components/ActivitiesList.vue";
import ActivitiesListHeader from "@/components/ActivitiesListHeader.vue";
import ActivitiesTypeHeading from "@/components/ActivitiesTypeHeading.vue";
import ActivitiesComments from "@/components/ActivitiesComments.vue";
import BaseProgressBar from "@/components/BaseProgressBar.vue";
import ActivitiesItemResult from "@/components/ActivitiesItemResult.vue";
import ClearItems from "@/components/ClearItems.vue";
import NavFooter from "@/components/NavFooter.vue";
import NavBreadcrumbs from "@/components/NavBreadcrumbs.vue";
import PrintPage from "@/components/PrintPage.vue";
import ActivitiesItemAssessment from "@/components/ActivitiesItemAssessment.vue";
import { activityTypes } from "@/components/mixins/activityTypes";
import { bestPracticeData } from "@/components/mixins/bestPracticeData";
import { dataMethods } from "@/components/mixins/dataMethods";

export default {
  name: "Results",
  components: {
    ActivitiesExportTray,
    ResultsCharts,
    BaseHeading,
    BaseButton,
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseGutterWrapper,
    PrintPage,
    ActivitiesList,
    ActivitiesListHeader,
    ActivitiesTypeHeading,
    ActivitiesComments,
    BaseProgressBar,
    ActivitiesItemResult,
    ClearItems,
    NavFooter,
    NavBreadcrumbs,
    ActivitiesItemAssessment
  },
  mixins: [activityTypes, dataMethods, bestPracticeData],
  computed: {
    groupedActivities: function() {
      return this.getGroupedYouthActivities();
    },
    ...mapState({
      mountedActivity: state => state.mountedActivity
    }),
    navButtons: function() {
      return {
        left: [
          {
            to: { name: "assessment" },
            label: this.$t("results.previousStep")
          }
        ],
        right: [
          {
            to: { name: "advocate" },
            label: this.$t("results.nextStep"),
            role: "primary"
          }
        ]
      };
    }
  },
  created() {
    // Clear any open icons
    this.$store.dispatch("entities/bestpracticeicons/deleteAll");
    this.$store.commit("SET_PROGRESS", { results: true });
  }
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
@import "~styleConfig/color";

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
