<template>
  <NavFooter
    wrapperEl="article"
    :leftButtons="navButtons.left"
    :rightButtons="navButtons.right"
  >
    <FileUpload :exportType="['Export']" />
    <ClearItems :clearType="['Assessments']" />
    <BasePageIntro
      :title="$t('analysis.title')"
      :blurb="$t('analysis.intro')"
    />
    <section :class="space.paddingWide">
      <BaseWidthWrapper width="wide">
        <BaseHeading
          :level="2"
          scale="gamma"
          :class="space.paddingBottomNarrow"
        >
          {{cipTitle}}
        </BaseHeading>

        <!-- table of activities -->
        <ActivitiesList>
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
              <ActivitiesItemAssessment
                v-for="(activity, index) in activities.activityObjects"
                :key="`activity-${index}`"
                :text="activity.text"
                :id="activity.id"
                :budget="activity.budget"
                :youth="activity.youthCentric"
              />
            </template>
          </div>
        </ActivitiesList>
      </BaseWidthWrapper>
    </section>
  </NavFooter>
</template>

<script>
import NavFooter from '@/components/NavFooter.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BasePageIntro from '@/components/BasePageIntro.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import ActivitiesList from '@/components/ActivitiesList.vue'
import ActivitiesItemAssessment from '@/components/ActivitiesItemAssessment.vue'
import FileUpload from '@/components/FileUpload.vue'
import ClearItems from '@/components/ClearItems.vue'
import { activityTypes } from '@/components/mixins/activityTypes'
import { dataMethods } from '@/components/mixins/dataMethods'

export default {
  name: 'Assessment',
  mixins: [activityTypes, dataMethods],
  components: {
    NavFooter,
    BaseWidthWrapper,
    BasePageIntro,
    BaseHeading,
    ActivitiesList,
    ActivitiesItemAssessment,
    FileUpload,
    ClearItems
  },
  data () {
    return {
      groupedActivities: this.getGroupedActivites(),
      cipTitle: this.getItemValue('setup', 'title'),
      navButtons: {
        left: [
          {
            to: {name: 'evidence-informed-practices'},
            label: this.$t('analysis.previousStep')
          }
        ],
        right: [
          {
            to: {name: 'results'},
            label: this.$t('analysis.nextStep'),
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

<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
