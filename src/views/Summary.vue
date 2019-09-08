<template>
  <NavFooter
    wrapperEl="article"
    :leftButtons="navButtons.left"
    :rightButtons="navButtons.right"
  >
    <NavBreadcrumbs/>
    <BasePageIntro
      :title="$t('summary.title')"
      :blurb="$t('summary.intro')"
    />
    <section :class="space.paddingWide">
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
        <ActivitiesTable>
          <!-- real content -->
          <template
            v-for="(activities, index) in groupedActivities"
          >
            <template v-if="activities.activityObjects.length > 0">
              <!-- category subheading -->
              <tr :key="`gA-${index}`">
                <td
                  :class="[color.lightBg, border.top]"
                  colspan="4"
                >
                  <BaseHeading
                    :level="3"
                    scale="zeta"
                    weight="bold"
                    color="midtone"
                    :centered="false"
                    :class="[space.paddingXxnarrow, type.uppercase]"
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
import NavBreadcrumbs from '@/components/NavBreadcrumbs.vue'
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
    NavBreadcrumbs,
    BaseWidthWrapper,
    BasePageIntro,
    BaseHeading,
    ActivitiesTable,
    ActivitiesItemSummary
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
            label: this.$t('summary.nextStep'),
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
