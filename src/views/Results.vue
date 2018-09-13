<template>
  <NavFooter
    wrapperEl="article"
    :leftButtons="navButtons.left"
    :rightButtons="navButtons.right"
  >
    <!-- Export tool tray -->
    <ActivitiesExportTray charts />

    <!-- header & charts -->
    <ResultsCharts />

    <!-- Activities list -->
    <BaseSectionWrapper
      :class="space.paddingTop"
      border
    >
      <BaseWidthWrapper width="xxwide">

        <!-- Count & export tools -->
        <ActivitiesListHeader clearRecommendations />

        <!-- Table -->
        <ActivitiesList ref="activityList">
          <template v-for="(activities, index) in groupedActivities">
            <li
              v-if="activities.activityObjects.length > 0"
              :key="`gA-${index}`"
            >
              <!-- activity type heading with stats -->
              <ActivitiesTypeHeading>
                {{activities.activityTypeName}}
                <template slot="stats">
                  <BaseProgressBar
                    :label="$t('results.activityWithEIPbyType')"
                    :percentage="percentBPActivitesByType(activities.activityTypeKey)" />
                </template>
              </ActivitiesTypeHeading>

              <ul :class="base.activityTypeList">
                <ActivitiesItemResult
                  v-for="(activity, index) in activities.activityObjects"
                  :key="`activity-${index}`"
                  :activityInstance="activity"
                />
              </ul>
            </li>
          </template>
        </ActivitiesList>
      </BaseWidthWrapper>
    </BaseSectionWrapper>
  </NavFooter>
</template>

<script>
import ActivitiesExportTray from '@/components/ActivitiesExportTray.vue'
import ResultsCharts from '@/components/ResultsCharts.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import ActivitiesList from '@/components/ActivitiesList.vue'
import ActivitiesListHeader from '@/components/ActivitiesListHeader.vue'
import ActivitiesTypeHeading from '@/components/ActivitiesTypeHeading.vue'
import BaseProgressBar from '@/components/BaseProgressBar.vue'
import ActivitiesItemResult from '@/components/ActivitiesItemResult.vue'
import ClearItems from '@/components/ClearItems.vue'
import NavFooter from '@/components/NavFooter.vue'
import PrintPage from '@/components/PrintPage.vue'
import { activityTypes } from '@/components/mixins/activityTypes'
import { bestPracticeData } from '@/components/mixins/bestPracticeData'
import { dataMethods } from '@/components/mixins/dataMethods'

export default {
  name: 'Results',
  mixins: [activityTypes, dataMethods, bestPracticeData],
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
    BaseProgressBar,
    ActivitiesItemResult,
    ClearItems,
    NavFooter
  },
  computed: {
    groupedActivities: function () {
      return this.getGroupedActivites()
    },
    navButtons: function () {
      return {
        left: [
          {
            to: {name: 'assessment'},
            label: this.$t('results.previousStep')
          }
        ],
        right: [
          {
            to: {name: 'advocate'},
            label: this.$t('results.nextStep'),
            role: 'primary'
          }
        ]
      }
    }
  },
  created () {
    // Clear any open icons
    this.$store.dispatch('entities/bestpracticeicons/deleteAll')
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">

.tableHeader {
  composes: paddingBottom from 'styles/spacing.scss';
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
</style>
