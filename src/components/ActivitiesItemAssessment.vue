<!--
  Assessment Input component
  -> use to add an assessment to an activity
  -> part of Activity List
-->

<template>
  <li :class="base.wrapper">
    <BaseDetails>
      <template slot="collapsedLeft">
        <BaseHeading :level="6" :sub="true">{{text}}</BaseHeading>
      </template>
      <template slot="collapsedRight">
        <!-- list of best practice icons -->
        <BaseGutterWrapper
          spacing="xnarrow"
          :class="base.icons"
        >
          <li
            v-for="(bestPractice, index) of bestPractices"
            :key="index"
            :class="base.icon"
          >
            <BestPracticeIcon
              :icon="bestPractice.icon"
              :name="bestPractice.title"
            />
          </li>
        </BaseGutterWrapper>
      </template>
      <template>
        <!-- edit button -->
        <router-link :to="{
          name: 'activity',
          params: {
            activityId: String(id)
          }
        }">{{$t('edit')}}</router-link>
      </template>
    </BaseDetails>
  </li>
</template>

<script>
import BaseDetails from './BaseDetails'
import BaseHeading from './BaseHeading'
import BaseGutterWrapper from './BaseGutterWrapper'
import BestPracticeIcon from './BestPracticeIcon'
import { bestPracticeData } from './mixins/bestPracticeData'

export default {
  name: 'ActivityItemAssessment',
  mixins: [bestPracticeData],
  props: {
    'text': {
      type: String,
      required: true
    },
    'id': {
      type: Number,
      required: true
    }
  },
  components: {
    BaseHeading,
    BaseDetails,
    BaseGutterWrapper,
    BestPracticeIcon
  }
}
</script>

<style lang="scss" module="base">
.wrapper {
  composes: top from 'styles/borders.scss';
  composes: paddingVerticalXnarrow from 'styles/spacing.scss';
  display: block;
  position: relative;
}

.icons {
  list-style: none;
}

.icon {
  display: inline-block;
}
</style>
