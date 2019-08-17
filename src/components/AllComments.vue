<template>
  <div>
    <!-- activities -->
    <ul :class="[base.comments]">
      <li
        v-for="activity in getActivitiesWithComments"
        :key="activity.id"
        :class="[base.listStyle]"
      >
        <BaseHeading
          :level="3"
          :class="[space.paddingBottomXNarrow, space.paddingTopWide]"
        >
          {{activity.activityNumber}}
        </BaseHeading>

        <!-- assessments -->
        <ul v-for="assessment in activity.assessments" :key="assessment.id" :class="base.comments">
          <div :class="[space.paddingTop, space.paddingBottomNarrow]">
            <BestPracticeIcon
              :id="assessment.best_practice_id"
              :activityID="assessment.activity_id"
              :align="index > 4 ? 'right' : 'center'"
              :class="base.icon"
            />
          </div>
          <!-- Display comment -->
          <ActivityRecommendationInput
            v-for="comment of assessment.comments"
            :key="comment.id"
            :recommendationId="comment.id"
            recommendationType='updateComment'
            :existingRecommendationText="comment.text"
          />
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BestPracticeIcon from '@/components/BestPracticeIcon.vue'
import ActivityRecommendationInput from '@/components/ActivityRecommendationInput.vue'

export default {
  name: 'AllComments',
  components: {
    BaseButton,
    BaseHeading,
    BestPracticeIcon,
    ActivityRecommendationInput
  },
  computed: {
    getActivitiesWithComments: function () {
      // Get all global comments
      const allActivities = this.$store.getters['entities/activities/query']()
        .with('assessments.comments')
        .all()

      // Remove assessments that don't contain a comment
      const activitiesWithFilteredAssessments = allActivities.map(activity => {
        let filteredAssessments = activity.assessments.filter(assessment => assessment.comments.length > 0)

        return {
          ...activity,
          assessments: filteredAssessments
        }
      })

      // Remove activites with no unfiltered assessments
      const filteredActivities = activitiesWithFilteredAssessments.filter(activity => activity.assessments.length > 0)

      return filteredActivities
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
.wrapper {
  composes: top from 'styles/borders.scss';
  composes: paddingVerticalNarrow from 'styles/spacing.scss';
  display: block;
  position: relative;
}

.icons {
  display: inline-block;
  list-style: none;
  text-align: right;
}

.icon {
  display: inline-block;
}

.comments {
  padding-left: 0;
}

.listStyle {
  list-style-type: none;
}
</style>
