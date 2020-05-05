<template>
  <NavFooter
    :left-buttons="navButtons.left"
    :right-buttons="navButtons.right"
    wrapper-el="article"
  >
    <NavBreadcrumbs />
    <BasePageIntro
      :title="$t('summary.title')"
      :subtitle="$t('summary.subtitle')"
      :blurb="$t('summary.intro')"
    />
    <section
      :class="[space.paddingHorizontalWide, space.paddingVerticalNarrow]"
    >
      <BaseWidthWrapper width="xxwide">
        <BaseHeading
          :level="2"
          :class="[space.paddingBottom, type.leadingDefault]"
          scale="delta"
          weight="bold"
        >
          {{ cipTitle }}
        </BaseHeading>
        <!-- table here -->
        <ActivitiesList :grouped-activities="groupedActivities">
          <template #activities="{ activities, setActivityId }">
            <div v-if="activities.activityObjects.length > 0">
              <ActivitiesTypeHeading>
                {{ activities.activityTypeName }}
              </ActivitiesTypeHeading>
              <ActivitiesItemAssessment
                v-for="(activity, index) in activities.activityObjects"
                :key="`activity-${index}`"
                :activity="activity"
                number-index
                editable
                @activitySelect="setActivityId"
              />
            </div>
          </template>
        </ActivitiesList>
      </BaseWidthWrapper>
    </section>
  </NavFooter>
</template>

<script>
import NavFooter from "@/components/NavFooter.vue";
import NavBreadcrumbs from "@/components/NavBreadcrumbs.vue";
import BaseWidthWrapper from "@/components/BaseWidthWrapper.vue";
import BasePageIntro from "@/components/BasePageIntro.vue";
import BaseHeading from "@/components/BaseHeading.vue";
import ActivitiesList from "@/components/ActivitiesList.vue";
import ActivitiesTypeHeading from "@/components/ActivitiesTypeHeading.vue";
import ActivitiesItemAssessment from "@/components/ActivitiesItemAssessment.vue";
import ActivitiesExportTray from "@/components/ActivitiesExportTray.vue";
import { activityTypes } from "@/components/mixins/activityTypes";
import { dataMethods } from "@/components/mixins/dataMethods";

export default {
  name: "Summary",
  components: {
    NavFooter,
    NavBreadcrumbs,
    BaseWidthWrapper,
    BasePageIntro,
    BaseHeading,
    ActivitiesList,
    ActivitiesTypeHeading,
    ActivitiesItemAssessment,
    ActivitiesExportTray,
  },
  mixins: [activityTypes, dataMethods],
  data() {
    return {
      cipTitle: this.getItemValue("setup", "title"),
    };
  },
  computed: {
    groupedActivities: function () {
      return this.getGroupedActivites();
    },
    navButtons: function () {
      return {
        left: [
          {
            to: { name: "setup" },
            label: this.$t("summary.previousStep"),
          },
        ],
        right: [
          {
            to: { name: "evidence-informed-practices" },
            label: this.$t("saveAndContinue"),
            role: "primary",
          },
        ],
      };
    },
  },
};
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
