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
        <ul v-if="activity.comments" :class="base.comments">
          <!-- Display comment -->
          <ActivityComment
            v-for="comment in activity.comments"
            :key="comment.id"
            :comment="comment"
            :activityId="activity.id"
          />
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import BestPracticeIconSelect from '@/components/BestPracticeIconSelect.vue'
import ActivityComment from '@/components/ActivityComment.vue'

export default {
  name: 'AllComments',
  components: {
    BaseButton,
    BaseHeading,
    BestPracticeIconSelect,
    ActivityComment
  },
  computed: {
    getActivitiesWithComments: function () {
      return this.$store.getters['entities/activities/query']()
        .with('comments')
        .all()
        .filter(activity => activity.comments.length > 0)
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
