<template>
  <article>
    <BasePageIntro
      :title="$t('summary.title')"
      :blurb="$t('summary.intro')"
    />
    <section :class="space.paddingWide">
      <BaseWidthWrapper width="wide">
        <BaseHeading
          :level="3"
          align="center"
        >
          {{cipTitle}}
        </BaseHeading>
        <!-- table here -->
        <ActivitiesTable
            v-for="(activities, index) in groupedActivities"
            :key="`gA-${index}`">
          <!-- dummy for styling -->
          <ActivitiesItemSummary
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si longus, levis dictata sunt. Videamus igitur sententias eorum, tum ad verba redeamus."
            :budget="1000354687"
            :youth="true"
          />
          <!-- real content -->
            <BaseHeading
              :level="2"
              align="center"
            >
              {{activities.activityTypeName}}
            </BaseHeading>
            <ActivitiesItemSummary
              v-for="(activity, index) in activities.activityObjects"
              :key="`activity-${index}`"
              :text="activity.text"
              :budget="activity.budget"
              :youth="activity.youthCentric"
              :id="activity.id"
            />
            <hr />
        </ActivitiesTable>
      </BaseWidthWrapper>
    </section>
  </article>
</template>

<script>
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BasePageIntro from '@/components/BasePageIntro.vue'
import BaseHeading from '@/components/BaseHeading.vue'
import ActivitiesTable from '@/components/ActivitiesTable.vue'
import ActivitiesItemSummary from '@/components/ActivitiesItemSummary.vue'
import { activityTypes } from '@/components/mixins/activityTypes'
import { dataMethods } from '@/components/mixins/dataMethods'

export default {
  name: 'Summary',
  mixins: [ activityTypes, dataMethods ],
  components: {
    BaseWidthWrapper,
    BasePageIntro,
    BaseHeading,
    ActivitiesTable,
    ActivitiesItemSummary
  },
  data () {
    return {
      groupedActivities: this.getGroupedActivites(),
      cipTitle: this.getItemValue('setup', 'title')
    }
  }
}
</script>

<style src="../stylesheets/utilities/borders.scss" lang="scss" module="border"></style>
<style src="../stylesheets/utilities/spacing.scss" lang="scss" module="space"></style>
