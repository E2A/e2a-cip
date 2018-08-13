<template>
  <article>
    <FileUpload :exportType="['Export']" />
    <ClearItems :clearType="['Assessments']" />
    <BasePageIntro
      :title="$t('analysis.title')"
      :blurb="$t('analysis.intro')"
    />
    <section :class="space.paddingWide">
      <BaseWidthWrapper width="wide">
        <BaseHeading
          :level="3"
          align="center"
        >
          CIP name lorem ipsum
        </BaseHeading>

        <!-- table of activities -->
        <ActivitiesList>
          <div
            v-for="(activities, index) in groupedActivities"
            :key="`gA-${index}`"
          >
            <BaseHeading
              :level="2"
              align="center"
            >
              {{activities.activityTypeName}}
            </BaseHeading>
            <ActivitiesItemAssessment
              v-for="(activity, index) in activities.activityObjects"
              :key="`activity-${index}`"
              :activityInstance="activity"
              :text="activity.text"
              :id="activity.id"
            />
            <hr />
          </div>
        </ActivitiesList>
      </BaseWidthWrapper>
    </section>
  </article>
</template>

<script>
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BasePageIntro from '@/components/BasePageIntro.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import ActivitiesList from '@/components/ActivitiesList.vue'
import ActivitiesItemAssessment from '@/components/ActivitiesItemAssessment.vue'
import FileUpload from '@/components/FileUpload.vue'
import ClearItems from '@/components/ClearItems.vue'
import { activityTypes } from '@/components/mixins/activityTypes'

export default {
  name: 'Assessment',
  mixins: [activityTypes],
  components: {
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
      groupedActivities: this.getGroupedActivites()
    }
  }
}
</script>

<style src="../stylesheets/utilities/borders.scss" lang="scss" module="border"></style>
<style src="../stylesheets/utilities/spacing.scss" lang="scss" module="space"></style>
