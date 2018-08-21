<template>
  <NavFooter
    wrapperEl="article"
    :leftButtons="navButtons.left"
    :rightButtons="navButtons.right"
  >
    <BasePageIntro
      :title="$t('summary.title')"
      :blurb="$t('summary.intro')"
    />
    <section :class="space.paddingWide">
      <BaseWidthWrapper width="wide">
        <BaseHeading
          :level="2"
          scale="gamma"
          :class="space.paddingBottomNarrow"
        >{{cipTitle}}</BaseHeading>
        <!-- table here -->
        <ActivitiesTable>
          <!-- real content -->
          <template
            v-for="(activities, index) in groupedActivities"
          >
            <template v-if="activities.activityObjects.length > 0">
              <!-- category subheading -->
              <tr :key="`gA-${index}`">
                <td
                  :class="[color.midtoneBg, border.top]"
                  colspan="4"
                >
                  <BaseHeading
                    :level="3"
                    scale="eta"
                    :centered="false"
                    :class="[space.paddingXxnarrow, color.light, type.uppercase]"
                  >
                    {{activities.activityTypeName}}
                  </BaseHeading>
                </td>
              </tr>
              <!-- activity row -->
              <ActivitiesItemSummary
                v-for="activity in activities.activityObjects"
                :key="`activity-${activity.id}`"
                :text="activity.text"
                :budget="activity.budget"
                :youth="activity.youthCentric"
                :id="activity.id"
              />
            </template>
          </template>
        </ActivitiesTable>
      </BaseWidthWrapper>
    </section>
  </NavFooter>
</template>

<script>
import NavFooter from '@/components/NavFooter.vue'
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
    NavFooter,
    BaseWidthWrapper,
    BasePageIntro,
    BaseHeading,
    ActivitiesTable,
    ActivitiesItemSummary
  },
  data () {
    return {
      groupedActivities: this.getGroupedActivites(),
      cipTitle: this.getItemValue('setup', 'title'),
      navButtons: {
        left: [
          {
            to: {name: 'setup'},
            label: this.$t('summary.previousStep')
          }
        ],
        right: [
          {
            to: {name: 'evidence-informed-practices'},
            label: this.$t('summary.nextStep'),
            role: 'primary'
          }
        ]
      }
    }
  }
}
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>
