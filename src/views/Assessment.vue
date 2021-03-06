<template>
  <NavFooter
    :left-buttons="navButtons.left"
    :right-buttons="navButtons.right"
    wrapper-el="article"
  >
    <ActivitiesExportTray :clear="['Assessments']" />
    <NavBreadcrumbs />
    <BasePageIntro
      :title="$t('analysis.title')"
      :blurb="$t('analysis.intro')"
    />

    <!-- Color key/guide -->
    <BaseSectionWrapper :class="color.lightBg">
      <BaseHeading :level="2" scale="delta" weight="bold">
        {{ $t("analysis.instructions.heading") }}
      </BaseHeading>
      <BaseWidthWrapper :class="space.paddingTop">
        <BaseGutterWrapper :class="instructions.wrapper">
          <div
            v-for="(option, index) in ['no', 'partially', 'yes']"
            :class="instructions.item"
            :key="`color-${index}`"
          >
            <div :class="[instructions.swatch, color[`${option}Bg`]]" />
            <BaseHeading
              :level="3"
              :class="space.paddingBottomXxnarrow"
              scale="epsilon"
              weight="bold"
              color="dark"
            >
              {{ $t(`analysis.instructions.options.${option}.title`) }}
            </BaseHeading>
            <BaseBodyText
              :content="
                $t(`analysis.instructions.options.${option}.description`)
              "
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
          {{ cipTitle }}
        </BaseHeading>

        <!-- table of activities -->
        <ActivitiesList :groupedActivities="groupedActivities" :showTray="true">
          <template v-slot:activities="slotProps">
            <div v-if="slotProps.activities.activityObjects.length > 0">
              <ActivitiesTypeHeading>
                {{ slotProps.activities.activityTypeName }}
              </ActivitiesTypeHeading>
              <ActivitiesItemAssessment
                v-for="(activity, index) in slotProps.activities
                  .activityObjects"
                :key="`activity-${index}`"
                :activity="activity"
                :youth="activity.youthCentric"
                :class="[
                  mountedActivity === activity.id && instructions.itemSelected
                ]"
                @activitySelect="slotProps.setActivityId"
              />
            </div>
          </template>
        </ActivitiesList>
      </BaseWidthWrapper>
    </BaseSectionWrapper>
  </NavFooter>
</template>

<script>
import { mapState } from "vuex";
import NavFooter from "@/components/NavFooter.vue";
import NavBreadcrumbs from "@/components/NavBreadcrumbs.vue";
import BaseSectionWrapper from "@/components/BaseSectionWrapper.vue";
import BaseWidthWrapper from "@/components/BaseWidthWrapper.vue";
import BaseGutterWrapper from "@/components/BaseGutterWrapper.vue";
import BasePageIntro from "@/components/BasePageIntro.vue";
import BaseHeading from "@/components/BaseHeading.vue";
import BaseBodyText from "@/components/BaseBodyText.vue";
import ActivitiesList from "@/components/ActivitiesList.vue";
import ActivitiesTypeHeading from "@/components/ActivitiesTypeHeading.vue";
import ActivitiesItemAssessment from "@/components/ActivitiesItemAssessment.vue";
import ActivitiesExportTray from "@/components/ActivitiesExportTray.vue";
import ClearItems from "@/components/ClearItems.vue";
import { activityTypes } from "@/components/mixins/activityTypes";
import { dataMethods } from "@/components/mixins/dataMethods";

export default {
  name: "Assessment",
  components: {
    NavFooter,
    NavBreadcrumbs,
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
  mixins: [activityTypes, dataMethods],
  computed: {
    groupedActivities: function() {
      return this.getGroupedYouthActivities();
    },
    ...mapState({
      mountedActivity: state => state.mountedActivity
    }),
    navButtons: function() {
      return {
        left: [
          {
            to: { name: "evidence-informed-practices" },
            label: this.$t("analysis.previousStep")
          }
        ],
        right: [
          {
            to: { name: "results" },
            label: this.$t("saveAndContinue"),
            role: "primary"
          }
        ]
      };
    }
  },
  data() {
    return {
      cipTitle: this.getItemValue("setup", "title")
    };
  },
  created() {
    // Clear any open icons
    // this.$store.dispatch('entities/bestpracticeicons/deleteAll')
  }
};
</script>

<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="instructions">
@import "~bourbon/core/bourbon";
@import "~styleConfig/color";

.wrapper {
  composes: paddingTop from "styles/spacing.scss";
  font-size: 0;
  text-align: center;
}

.item {
  display: inline-block;
  width: (100% / 3);
  vertical-align: top;
}

.swatch {
  composes: marginBottomNarrow from "styles/spacing.scss";
  composes: default from "styles/borders.scss";
  composes: whiteBorder shadow from "styles/color.scss";
  @include size(4rem);
  display: inline-block;
  border-radius: 50%;
}

.itemSelected {
  background-color: rgba(color("accent"), 0.2);
}
</style>
