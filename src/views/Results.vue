<template>
  <NavFooter
    wrapperEl="article"
    :leftButtons="navButtons.left"
    :rightButtons="navButtons.right"
  >
    <BaseSectionWrapper el="div">
      <header :class="[type.center, space.paddingTop]">
        <BaseHeading :class="space.paddingBottomNarrow">{{setupTitle}}</BaseHeading>
        <BaseGutterWrapper
          gutterX="medium"
          gutterY="xnarrow"
        >
          <BaseHeading
            scale="zeta"
            :class="base.byline"
            sub
          >
            {{setupRole}}
          </BaseHeading>
          <BaseHeading
            scale="zeta"
            :class="base.byline"
            sub
          >
            {{setupCountry}}
          </BaseHeading>
        </BaseGutterWrapper>
      </header>

      <!-- charts -->
      <section>
        <BaseHeading
          :class="space.paddingVerticalWide"
          scale="gamma"
          sub
        >
          {{$t('resultsSubhead')}}
        </BaseHeading>
        <ChartItems />
      </section>
    </BaseSectionWrapper>

    <!-- Activities list -->
    <BaseSectionWrapper border>

      <!-- Count & export tools -->
      <header :class="base.toolTray">
        <BaseHeading
          :centered="false"
          :level="2"
          scale="delta"
        >
          <strong>{{getItemCount('activities')}}</strong> {{getItemCount('activities') === 1 ? $t('activity') : $t('activities')}}
        </BaseHeading>
        <BaseGutterWrapper gutterX="xnarrow" gutterY="xnarrow">
          <div :class="base.toolTrayItem">
            <FileUpload :exportType="['Export']" />
          </div>
          <div :class="base.toolTrayItem">
            <ClearItems :clearType="['Recommendations']" />
          </div>
        </BaseGutterWrapper>
      </header>

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
            <ul>
              <li v-for="(bestPracticeCount, index) in bpCounts = getActivityTypeCounts(activities.activityTypeName)"
                :key="`activity-${index}`"
               >
               {{bestPracticeCount.title}}: {{bestPracticeCount.count}}
             </li>
            </ul>
            <ActivitiesItemResult
              v-for="(activity, index) in activities.activityObjects"
              :key="`activity-${index}`"
              :activityInstance="activity"
            />
          </template>
        </div>
      </ActivitiesList>
    </BaseSectionWrapper>
  </NavFooter>
</template>

<script>
import BaseHeading from '@/components/BaseHeading.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import ActivitiesList from '@/components/ActivitiesList.vue'
import ActivitiesItemResult from '@/components/ActivitiesItemResult.vue'
import FileUpload from '@/components/FileUpload.vue'
import ClearItems from '@/components/ClearItems.vue'
import ChartItems from '@/components/ChartItems.vue'
import NavFooter from '@/components/NavFooter.vue'
import PrintPage from '@/components/PrintPage.vue'
import { activityTypes } from '@/components/mixins/activityTypes'
import { bestPracticeData } from '@/components/mixins/bestPracticeData'
import { dataMethods } from '@/components/mixins/dataMethods'

export default {
  name: 'Results',
  mixins: [activityTypes, dataMethods, bestPracticeData],
  components: {
    BaseHeading,
    BaseButton,
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseGutterWrapper,
    PrintPage,
    ActivitiesList,
    ActivitiesItemResult,
    FileUpload,
    ClearItems,
    ChartItems,
    NavFooter
  },
  data () {
    return {
      groupedActivities: this.getGroupedActivites(),
      setupTitle: this.getItemValue('setup', 'title'),
      setupRole: this.getItemValue('setup', 'role'),
      setupCountry: this.getItemValue('setup', 'country'),
      navButtons: {
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
