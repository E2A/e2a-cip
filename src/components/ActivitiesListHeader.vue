<template>
  <!-- Count & export tools -->
  <BaseGutterWrapper
    :class="base.tableHeader"
    :el="wrapperEl"
    gutterX="narrow"
    gutterY="narrow"
  >
    <BaseHeading
      :class="display.inlineBlock"
      :centered="false"
      :level="2"
      scale="delta"
      color="dark"
    >
      <strong>{{getItemCount('activities')}}</strong> {{getItemCount('activities') === 1 ? $t('activity') : $t('activities')}}
    </BaseHeading>
    <div :class="[display.inlineBlock, space.marginHorizontalBetweenNarrow]">
      <BaseProgressBar
        v-if="bestPracticePercentage"
        :label="$t('results.percentActivitesWithBP')"
        :percentage="percentBPActivites"
        id="percent-BP-activities"
      />
      <ClearItems
        v-if="clearRecommendations"
        :clearType="['Recommendations']"
      />
    </div>
  </BaseGutterWrapper>
</template>

<script>
import { activityTypes } from '@/components/mixins/activityTypes'
import { bestPracticeData } from '@/components/mixins/bestPracticeData'
import { dataMethods } from '@/components/mixins/dataMethods'
import BaseHeading from '@/components/BaseHeading.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import BaseProgressBar from '@/components/BaseProgressBar.vue'
import ClearItems from '@/components/ClearItems.vue'

export default {
  name: 'ActivitiesListHeader',
  mixins: [activityTypes, dataMethods, bestPracticeData],
  props: {
    wrapperEl: {
      type: String,
      default: 'header'
    },
    bestPracticePercentage: {
      type: Boolean,
      default: true
    },
    clearRecommendations: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    percentBPActivites: function () {
      const activitiesWithBP = this.$store.getters['entities/activities/query']().whereHas('assessments', (query) => {
        query.where('value', [this.$t('bestPracticeOptions.yesKey')])
      }).count()

      console.log(`all: ${this.$store.getters['entities/activities/query']().count()} | has bp: ${activitiesWithBP}`)

      return (activitiesWithBP / this.getItemCount('activities')).toFixed(2) * 100
    }
  },
  components: {
    BaseHeading,
    BaseGutterWrapper,
    BaseProgressBar,
    ClearItems
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/display.scss" lang="scss" module="display"></style>

<style lang="scss" module="base">
.tableHeader {
  composes: paddingBottom from 'styles/spacing.scss';
  display: block;

  @supports (display: flex) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
