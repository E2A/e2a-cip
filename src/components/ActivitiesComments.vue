<template>
  <BaseSectionWrapper :class="space.paddingTop" border>
    <BaseWidthWrapper width="default">
      <BaseHeading :level="2" :class="space.marginBottomNarrow">
        Comments
      </BaseHeading>

      <!-- List activities -->
      <ul :class="base.list">
        <li v-for="(activity, index) in activitiesWithComments" :key="`gA-${index}`">
          <!-- Activity heading -->
          <BaseHeading
            :level="3"
            :color="'dark'"
            :class="[base.commentHeader]"
          >
            {{activity.activityNumber}}
          </BaseHeading>

          <!-- List comments -->
          <ul :class="[base.commentList, space.marginVerticalBetweenNarrow]">
            <li v-for="(comment, index) in activity.comments.map(comment => comment.text)" :key="`list-${index}`">
              {{comment}}
            </li>
          </ul>
        </li>
      </ul>
    </BaseWidthWrapper>
  </BaseSectionWrapper>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseVerticalList from '@/components/BaseVerticalList.vue'

export default {
  name: 'ActivitiesToolTray',
  components: {
    BaseHeading,
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseVerticalList
  },
  computed: {
    activitiesWithComments: function () {
      const activities = this.$store.getters['entities/activities/query']()
        .with('comments')
        .all()

      return activities.filter(activity => activity.comments.length > 0)
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
@import '~styleConfig/spacing';

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.commentHeader {
  margin: space('medium') 0 space('narrow')
}

.commentList {
  list-style: disc;
}
</style>
