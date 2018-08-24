<template>
  <NavFooter
    wrapperEl="article"
    :leftButtons="navButtons.left"
    :rightButtons="navButtons.right"
  >
    <BaseSectionWrapper el="div">
      <header :class="[type.center, space.paddingTop]">
        <BaseHeading
          :class="space.paddingBottomNarrow"
          scale="beta"
        >
          {{setupTitle}}
        </BaseHeading>
        <BaseGutterWrapper
          gutterX="medium"
          gutterY="xnarrow"
        >
          <BaseHeading
            scale="zeta"
            :class="base.byline"
            weight="regular"
            color="midtone"
            sub
          >
            {{setupRole}}
          </BaseHeading>
          <BaseHeading
            scale="zeta"
            :class="base.byline"
            weight="regular"
            color="midtone"
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
          color="midtone"
          sub
        >
          {{$t('resultsSubhead')}}
        </BaseHeading>
        <ChartItems />
      </section>
    </BaseSectionWrapper>

    <!-- Activities list -->
    <BaseSectionWrapper border>

      <BaseWidthWrapper width="xxwide">
        <!-- Count & export tools -->
        <header :class="base.toolTray">
          <BaseHeading
            :centered="false"
            :level="2"
            scale="epsilon"
            color="midtone"
          >
            <strong>{{getItemCount('activities')}}</strong> {{getItemCount('activities') === 1 ? $t('activity') : $t('activities')}}
          </BaseHeading>

          <!-- Count of Activities with EIP Initial Stab -->
          <BaseHeading
            :centered="false"
            :level="2"
            scale="delta"
            v-if="false"
          >
            <strong>{{percentBPActivites}%</strong> {{$t('results.percentActivitesWithBP')}}
          </BaseHeading>

          <BaseGutterWrapper gutterX="xnarrow" gutterY="xnarrow">
            <div :class="base.toolTrayItem">
              <FileExport />
            </div>
            <div :class="base.toolTrayItem">
              <ClearItems :clearType="['Recommendations']" />
            </div>
          </BaseGutterWrapper>
        </header>

        <!-- Indicator Initial Stab -->
        <div v-if="false">
          <BaseHeading
            :centered="false"
            :level="2"
            scale="delta"
            v-if="!countryIndicator1.error"
          >
            <strong>{{countryIndicator1.value}}%</strong> {{countryIndicator1.name}}
          </BaseHeading>
          <BaseHeading
            :centered="false"
            :level="2"
            scale="delta"
            v-if="!countryIndicator2.error"
          >
            <strong>{{countryIndicator2.value}}%</strong> {{countryIndicator2.name}}
          </BaseHeading>
        </div>

        <!-- Table -->
        <ActivitiesList ref="activityList">
          <div
            v-for="(activities, index) in groupedActivities"
            :key="`gA-${index}`"
          >
            <template v-if="activities.activityObjects.length > 0">
              <BaseHeading
                :level="3"
                scale="zeta"
                :centered="false"
                :class="[space.paddingXxnarrow, type.uppercase, color.lightBg, border.top]"
                color="midtone"
                weight="bold"
              >
                {{activities.activityTypeName}}
                <!-- Activity Count with EIP Initial Stab, remove text I dont think we need it or put it in translation -->
                | <strong>{{percentBPActivitesByType(activities.activityTypeName)}}%</strong> {{$t('activityWithEIPbyType')}}
              </BaseHeading>

              <ActivitiesItemResult
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
import BaseHeading from '@/components/BaseHeading.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import ActivitiesList from '@/components/ActivitiesList.vue'
import ActivitiesItemResult from '@/components/ActivitiesItemResult.vue'
import FileExport from '@/components/FileExport.vue'
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
    FileExport,
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
      },
      countryIndicator1: this.getCountryIndicator(1),
      countryIndicator2: this.getCountryIndicator(2)
    }
  },
  computed: {
    percentBPActivites: function () {
      const activitiesWithBP = this.$store.getters['entities/activities/query']().whereHas('assessments', (query) => {
        query.where('value', [this.$t('bestPracticeOptions.yesKey')])
      }).count()

      return (activitiesWithBP / this.getItemCount('activities')).toFixed(2) * 100
    }
  },
  methods: {
    percentBPActivitesByType: function (activityType) {
      const activitiesWithBP = this.$store.getters['entities/activities/query']().whereHas('assessments', (query) => {
        query.where('value', [this.$t('bestPracticeOptions.yesKey')])
      }).where('type', activityType).count()

      const activitiesInType = this.$store.getters['entities/activities/query']().where('type', activityType).count()

      return (activitiesWithBP / activitiesInType).toFixed(2) * 100
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
