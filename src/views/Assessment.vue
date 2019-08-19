<template>
  <NavFooter
    wrapperEl="article"
    :leftButtons="navButtons.left"
    :rightButtons="navButtons.right"
  >
    <ActivitiesExportTray :clear="['Assessments']" />
    <BasePageIntro
      :title="$t('analysis.title')"
      :blurb="$t('analysis.intro')"
    />

    <!-- Color key/guide -->
    <BaseSectionWrapper :class="color.lightBg">
      <BaseHeading
        :level="2"
        scale="delta"
        weight="bold"
      >
        {{$t('analysis.instructions.heading')}}
      </BaseHeading>
      <BaseWidthWrapper :class="space.paddingTop">
        <BaseGutterWrapper :class="instructions.wrapper">
          <div
            v-for="(option, index) in ['yes', 'partially', 'no']"
            :class="instructions.item"
            :key="`color-${index}`"
          >
            <div :class="[instructions.swatch, color[`${option}Bg`]]"></div>
            <BaseHeading
              :level="3"
              :class="space.paddingBottomXxnarrow"
              scale="epsilon"
              weight="bold"
              color="dark"
            >
              {{$t(`analysis.instructions.options.${option}.title`)}}
            </BaseHeading>
            <BaseBodyText
              :content="$t(`analysis.instructions.options.${option}.description`)"
              :class="color.midtone"
              size="zeta"
              font="display"
            />
          </div>
        </BaseGutterWrapper>
      </BaseWidthWrapper>
    </BaseSectionWrapper>

    <!-- Activities -->
    <BaseSectionWrapper border>
      <BaseWidthWrapper width="xxwide">
        <BaseHeading
          :level="2"
          :class="space.paddingBottom"
          scale="delta"
          weight="bold"
        >
          {{cipTitle}}
        </BaseHeading>

        <!-- table of activities -->
        <ActivitiesList>
          <template v-for="(activities, index) in groupedActivities">
            <li
              v-if="activities.activityObjects.length > 0"
              :key="`gA-${index}`"
            >
              <ActivitiesTypeHeading>
                {{activities.activityTypeName}}
              </ActivitiesTypeHeading>
              <ActivitiesItemAssessment
                v-for="(activity, index) in activities.activityObjects"
                :key="`activity-${index}`"
                :shortText="activity.shortText"
                :text="activity.text"
                :id="activity.id"
                :budget="activity.budget"
                :youth="activity.youthCentric"
              />
            </li>
          </template>
        </ActivitiesList>
      </BaseWidthWrapper>
    </BaseSectionWrapper>
  </NavFooter>
</template>

<script>
import NavFooter from '@/components/NavFooter.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import BasePageIntro from '@/components/BasePageIntro.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseBodyText from '@/components/BaseBodyText.vue'
import ActivitiesList from '@/components/ActivitiesList.vue'
import ActivitiesTypeHeading from '@/components/ActivitiesTypeHeading.vue'
import ActivitiesItemAssessment from '@/components/ActivitiesItemAssessment.vue'
import ActivitiesExportTray from '@/components/ActivitiesExportTray.vue'
import ClearItems from '@/components/ClearItems.vue'
import { activityTypes } from '@/components/mixins/activityTypes'
import { dataMethods } from '@/components/mixins/dataMethods'

export default {
  name: 'Assessment',
  mixins: [activityTypes, dataMethods],
  components: {
    NavFooter,
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseGutterWrapper,
    BasePageIntro,
    BaseHeading,
    BaseBodyText,
    ActivitiesList,
    ActivitiesTypeHeading,
    ActivitiesItemAssessment,
    ActivitiesExportTray,
    ClearItems
  },
  computed: {
    groupedActivities: function () {
      console.log(this.getGroupedActivites())
      return this.getGroupedActivites()
    },
    navButtons: function () {
      return {
        left: [
          {
            to: { name: 'evidence-informed-practices' },
            label: this.$t('analysis.previousStep')
          }
        ],
        right: [
          {
            to: { name: 'results' },
            label: this.$t('analysis.nextStep'),
            role: 'primary'
          }
        ]
      }
    }
  },
  data () {
    return {
      cipTitle: this.getItemValue('setup', 'title')
    }
  },
  created () {
    // Clear any open icons
    // this.$store.dispatch('entities/bestpracticeicons/deleteAll')
  }
}
</script>

<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="instructions">
@import '~bourbon/core/bourbon';

.wrapper {
  composes: paddingTop from 'styles/spacing.scss';
  font-size: 0;
  text-align: center;
}

.item {
  display: inline-block;
  width: (100% / 3);
  vertical-align: top;
}

.swatch {
  composes: marginBottomNarrow from 'styles/spacing.scss';
  composes: default from 'styles/borders.scss';
  composes: whiteBorder shadow from 'styles/color.scss';
  @include size(4rem);
  display: inline-block;
  border-radius: 50%;
}
</style>
