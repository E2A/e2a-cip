<template>
  <NavFooter
    wrapperEl="article"
    :leftButtons="navButtons.left"
    :rightButtons="navButtons.right"
  >
    <!-- Export tool tray -->
    <div :class="[border.bottom, space.paddingVerticalNarrow, space.paddingHorizontal, color.lightBg]">
      <BaseGutterWrapper
        :class="type.right"
        gutterY="xnarrow"
        gutterX="xnarrow"
      >
        <span :class="base.inlineBlock"><FileExport /></span>
        <span :class="base.inlineBlock"><ExportChartData /></span>
      </BaseGutterWrapper>
    </div>
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

      <!-- country analysis -->
      <BaseWidthWrapper
        :class="space.paddingTopWide"
        el="section"
        width="wide"
      >
        <BaseHeading
          :class="space.paddingBottomWide"
          :level="2"
          scale="gamma"
          color="midtone"
        >
          {{$t('results.analysis.country')}}
        </BaseHeading>
        <ChartItems
          :chartNames="['youthFocusBudget', 'youthFocusCount']"
        />

        <!-- country indicators -->
        <section :class="space.paddingTop">
          <BaseGallery :items="countryIndicators">
            <div
              :class="[border.top, border.secondary, space.paddingTop]"
              slot-scope="{item}"
            >
              <CountryIndicator
                :style="{
                  maxWidth: '25rem'
                }"
                :countryIndicator="getCountryIndicator(item.id)"
              />
            </div>
          </BaseGallery>
        </section>
      </BaseWidthWrapper>

      <!-- activity analysis -->
      <BaseWidthWrapper
        :class="space.paddingTopWide"
        el="section"
        width="wide"
      >
        <BaseHeading
          :class="space.paddingBottomWide"
          scale="gamma"
          color="midtone"
          sub
        >
          {{$t('results.analysis.activity')}}
        </BaseHeading>
        <ChartItems
          :chartNames="['activityTypeBudget', 'activityTypeCount']"
        />
      </BaseWidthWrapper>
    </BaseSectionWrapper>

    <!-- Activities list -->
    <BaseSectionWrapper
      :class="space.paddingTop"
      border
    >
      <BaseWidthWrapper width="xxwide">

        <!-- Count & export tools -->
        <BaseGutterWrapper
          :class="base.toolTray"
          el="header"
          gutterX="narrow"
          gutterY="narrow"
        >
          <BaseHeading
            :class="base.inlineBlock"
            :centered="false"
            :level="2"
            scale="delta"
            color="dark"
          >
            <strong>{{getItemCount('activities')}}</strong> {{getItemCount('activities') === 1 ? $t('activity') : $t('activities')}}
          </BaseHeading>
          <div :class="[base.inlineBlock, space.marginHorizontalBetweenNarrow]">
            <BaseProgressBar
              :label="$t('results.percentActivitesWithBP')"
              :percentage="percentBPActivites"
              id="percent-BP-activities"
            />
            <ClearItems :clearType="['Recommendations']" />
          </div>
        </BaseGutterWrapper>

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
                    :percentage="percentBPActivitesByType(activities.activityTypeName)" />
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
import BaseHeading from '@/components/BaseHeading.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import ActivitiesList from '@/components/ActivitiesList.vue'
import ActivitiesTypeHeading from '@/components/ActivitiesTypeHeading.vue'
import BaseProgressBar from '@/components/BaseProgressBar.vue'
import ActivitiesItemResult from '@/components/ActivitiesItemResult.vue'
import FileExport from '@/components/FileExport.vue'
import ClearItems from '@/components/ClearItems.vue'
import ChartItems from '@/components/ChartItems.vue'
import NavFooter from '@/components/NavFooter.vue'
import PrintPage from '@/components/PrintPage.vue'
import ExportChartData from '@/components/ExportChartData.vue'
import CountryIndicator from '@/components/CountryIndicator.vue'
import BaseGallery from '@/components/BaseGallery.vue'
import { activityTypes } from '@/components/mixins/activityTypes'
import { bestPracticeData } from '@/components/mixins/bestPracticeData'
import { dataMethods } from '@/components/mixins/dataMethods'
import { initData } from '@/components/mixins/initData'

export default {
  name: 'Results',
  mixins: [activityTypes, dataMethods, bestPracticeData, initData],
  components: {
    BaseHeading,
    BaseButton,
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseGutterWrapper,
    PrintPage,
    ActivitiesList,
    ActivitiesTypeHeading,
    BaseProgressBar,
    ActivitiesItemResult,
    FileExport,
    ClearItems,
    ChartItems,
    NavFooter,
    CountryIndicator,
    ExportChartData,
    BaseGallery
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
      }
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
  composes: paddingBottom from 'styles/spacing.scss';
  display: block;

  @supports (display: flex) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
}

.inlineBlock {
  display: inline-block;
}

.activityTypeList {
  display: block;
  list-style: none;
  padding-left: 0;
}
</style>
