<template>
  <NavFooter
    wrapperEl="article"
    :leftButtons="navButtons.left"
    :rightButtons="navButtons.right"
  >
    <!-- header and charts -->
    <ResultsCharts />

    <!-- Activities list -->
    <BaseSectionWrapper
      :class="space.paddingTop"
      border
    >
      <BaseWidthWrapper width="xxwide">

        <!-- Count & export tools -->
        <ActivitiesListHeader />

        <!-- Table -->
        <ActivitiesList ref="activityList">
          <div
            v-for="(activities, index) in groupedActivities"
            :key="`gA-${index}`"
          >
            <template v-if="activities.activityObjects.length > 0">
              <BaseHeading
                :level="3"
                scale="eta"
                :centered="false"
                :class="[space.paddingXxnarrow, color.light, type.uppercase, color.midtoneBg, border.top]"
              >
                {{activities.activityTypeName}}
              </BaseHeading>
              <ActivitiesItemResultPrint
                v-for="(activity, index) in activities.activityObjects"
                :key="`activity-${index}`"
                :activityInstance="activity"
              />
            </template>
          </div>
        </ActivitiesList>
      </BaseWidthWrapper>
    </BaseSectionWrapper>
  </NavFooter>
</template>

<script>
import ResultsCharts from '@/components/ResultsCharts.vue'
import ActivitiesListHeader from '@/components/ActivitiesListHeader.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import ActivitiesList from '@/components/ActivitiesList.vue'
import ActivitiesItemResultPrint from '@/components/ActivitiesItemResultPrint.vue'
import ClearItems from '@/components/ClearItems.vue'
import ChartItems from '@/components/ChartItems.vue'
import NavFooter from '@/components/NavFooter.vue'
import PrintPage from '@/components/PrintPage.vue'
import { activityTypes } from '@/components/mixins/activityTypes'
import { dataMethods } from '@/components/mixins/dataMethods'

export default {
  name: 'Print',
  mixins: [activityTypes, dataMethods],
  components: {
    ResultsCharts,
    ActivitiesListHeader,
    BaseHeading,
    BaseButton,
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseGutterWrapper,
    PrintPage,
    ActivitiesList,
    ActivitiesItemResultPrint,
    ClearItems,
    ChartItems,
    NavFooter
  },
  data () {
    return {
      groupedActivities: this.getGroupedActivites(),
      setupTitle: this.getItemValue('setup', 'title'),
      setupRole: this.getItemValue('setup', 'role'),
      setupCountry: this.getItemValue('setup', 'countryName'),
      navButtons: {
        left: [
          {
            to: {name: 'advocate'},
            label: this.$t('print.previousStep')
          }
        ],
        right: [
          {
            type: 'print'
          }
        ]
      }
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
@import '~styleConfig/borders';
@import '~styleConfig/breakpoints';

.byline {
  composes: midtone from 'styles/color.scss';
  composes: leadingTight from 'styles/type.scss';
  display: block;

  @include media('>xsmall') {
    display: inline-block;

    & + & {
      @include border('left');
    }
  }
}

.toolTray {
  composes: paddingBottomWide from 'styles/spacing.scss';
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
</style>
