<!--
  Assessment Input component
  -> use to add an assessment to an activity
  -> part of Activity List
-->

<template>
  <li :class="base.wrapper">
    <BaseDetails>
      <template slot="summaryLeft">
        <BaseHeading
          :level="6"
          :centered="false"
          sub
        >{{text}}</BaseHeading>
      </template>
      <template slot="summaryRight">
        <!-- list of best practice icons -->
        <BaseGutterWrapper
          gutterX="xnarrow"
          gutterY="xnarrow"
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
              :id="bestPractice.id"
              :activityID="id"
              :align="index > 5 ? 'right' : 'center'"
              editable
            />
          </li>
        </BaseGutterWrapper>
      </template>
      <template>
        <div>
          <dl>
            <dt>Activity ID</dt>
            <dd>{{id}}</dd>
            <dt>Budget</dt>
            <dd>{{budget}}</dd>
            <dt>Youth Centric?</dt>
            <dd>{{youth}}</dd>
          </dl>

          <div>
            <!-- edit button -->
            <BaseButtonLink
              :to="{
                name: 'activity',
                params: {
                  activityId: String(id)
                }
              }"
              :label="$t('edit')"
              size="small"
            />
          </div>
        </div>
      </template>
    </BaseDetails>
  </li>
</template>

<script>
import BaseDetails from './BaseDetails'
import BaseHeading from './BaseHeading'
import BaseButtonLink from './BaseButtonLink'
import BaseGutterWrapper from './BaseGutterWrapper'
import BestPracticeIcon from './BestPracticeIcon'
import { bestPracticeData } from './mixins/bestPracticeData'

export default {
  name: 'ActivityItemAssessment',
  mixins: [bestPracticeData],
  props: {
    text: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    budget: Number,
    youth: Boolean
  },
  components: {
    BaseHeading,
    BaseDetails,
    BaseGutterWrapper,
    BestPracticeIcon,
    BaseButtonLink
  }
}
</script>

<style lang="scss" module="base">
.wrapper {
  composes: top from 'styles/borders.scss';
  composes: paddingVerticalNarrow from 'styles/spacing.scss';
  display: block;
  position: relative;
}

.icons {
  list-style: none;
  text-align: right;
}

.icon {
  display: inline-block;
}
</style>
