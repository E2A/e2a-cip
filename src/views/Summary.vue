<template>
  <NavFooter
    wrapperEl="article"
    :leftButtons="navButtons.left"
    :rightButtons="navButtons.right"
  >
    <NavBreadcrumbs/>
    <BasePageIntro
      :title="$t('summary.title')"
      :subtitle="$t('summary.subtitle')"
      :blurb="$t('summary.intro')"
    />
    <section :class="[space.paddingHorizontalWide, space.paddingVerticalNarrow]">
      <BaseWidthWrapper width="xxwide">
        <BaseHeading
          :level="2"
          scale="delta"
          weight="bold"
          :class="[space.paddingBottom, type.leadingDefault]"
        >
          {{cipTitle}}
        </BaseHeading>
        <!-- table here -->
        <ActivitiesList v-bind:groupedActivities="groupedActivities">
          <template #activities="{ activities, setActivityId }">
            <div v-if="activities.activityObjects.length > 0" >
              <ActivitiesTypeHeading>
                {{activities.activityTypeName}}
              </ActivitiesTypeHeading>
              <ActivitiesItemAssessment
                v-for="(activity, index) in activities.activityObjects"
                :key="`activity-${index}`"
                :activity="activity"
                @activitySelect="setActivityId"
                :class="[mountedActivity === activity.id && instructions.itemSelected]"
                numberIndex
                editable
              />
            </div>
          </template>
        </ActivitiesList>
      </BaseWidthWrapper>
    </section>
  </NavFooter>
</template>

<script>
import NavFooter from '@/components/NavFooter.vue'
import NavBreadcrumbs from '@/components/NavBreadcrumbs.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BasePageIntro from '@/components/BasePageIntro.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import ActivitiesList from '@/components/ActivitiesList.vue'
import ActivitiesTypeHeading from '@/components/ActivitiesTypeHeading.vue'
import ActivitiesItemAssessment from '@/components/ActivitiesItemAssessment.vue'
import ActivitiesExportTray from '@/components/ActivitiesExportTray.vue'
import { activityTypes } from '@/components/mixins/activityTypes'
import { dataMethods } from '@/components/mixins/dataMethods'

export default {
  name: 'Summary',
  mixins: [ activityTypes, dataMethods ],
  components: {
    NavFooter,
    NavBreadcrumbs,
    BaseWidthWrapper,
    BasePageIntro,
    BaseHeading,
    ActivitiesList,
    ActivitiesTypeHeading,
    ActivitiesItemAssessment,
    ActivitiesExportTray
  },
  computed: {
    groupedActivities: function () {
      return this.getGroupedActivites()
    },
    navButtons: function () {
      return {
        left: [
          {
            to: { name: 'setup' },
            label: this.$t('summary.previousStep')
          }
        ],
        right: [
          {
            to: { name: 'evidence-informed-practices' },
            label: this.$t('saveAndContinue'),
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
  }
}
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
