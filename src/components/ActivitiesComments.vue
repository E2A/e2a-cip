<template>
  <BaseSectionWrapper :class="space.paddingTop" border>
    <BaseHeading :level="2" :class="space.paddingBottom" scale="gamma">
      {{ $t("results.comments.title") }}
    </BaseHeading>
    <BaseWidthWrapper :class="space.paddingBottom">
      <BaseBodyText
        :content="$t('results.comments.review')"
        :class="space.paddingBottom"
      />

      <!-- List activities -->
      <ul
        :class="[
          base.list,
          border.top,
          border.secondary,
          space.paddingTop,
          space.marginVerticalBetween,
        ]"
      >
        <li
          v-for="(activity, index) in activitiesWithComments"
          :key="`gA-${index}`"
        >
          <!-- Activity heading -->
          <BaseHeading
            :level="2"
            :centered="false"
            :class="space.paddingBottomXnarrow"
            weight="bold"
            color="midtone"
            scale="epsilon"
          >
            {{ $t("Activity") + ` ${activity.activityNumber}` }}
          </BaseHeading>

          <!-- List comments -->
          <BaseVerticalList
            :items="activity.comments.map((comment) => comment.text)"
          />
        </li>
      </ul>
    </BaseWidthWrapper>
  </BaseSectionWrapper>
</template>

<script>
import { mapState } from "vuex";
import BaseHeading from "@/components/BaseHeading.vue";
import BaseBodyText from "@/components/BaseBodyText.vue";
import BaseSectionWrapper from "@/components/BaseSectionWrapper.vue";
import BaseWidthWrapper from "@/components/BaseWidthWrapper.vue";
import BaseVerticalList from "@/components/BaseVerticalList.vue";

export default {
  name: "ActivitiesToolTray",
  components: {
    BaseHeading,
    BaseBodyText,
    BaseSectionWrapper,
    BaseWidthWrapper,
    BaseVerticalList,
  },
  computed: {
    activitiesWithComments: function () {
      const activities = this.$store.getters["entities/activities/query"]()
        .with("comments")
        .all();

      return activities.filter((activity) => activity.comments.length > 0);
    },
  },
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>

<style lang="scss" module="base">
@import "~styleConfig/spacing";

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.commentHeader {
  margin: space("medium") 0 space("narrow");
}

.commentList {
  list-style: disc;
}
</style>
