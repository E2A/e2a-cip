<!--
  Assessment Input component
  -> use to add an assessment to an activity
  -> part of Activity List
-->

<template>
  <div :class="[base.wrapper]" @click="emitClick">
    <BaseDetails :reverseSpacing="numberIndex">
      <template slot="summaryLeft">
        <BaseHeading
          :level="6"
          :centered="false"
          :class="[type.leadingDefault, space.marginRightNarrow, base.tableIndex]"
          weight="regular"
          :color="'midtone'"
          sub
        >
          {{id}}
        </BaseHeading>
        <BaseHeading
          v-if="numberIndex"
          :level="6"
          :centered="false"
          :class="[type.leadingDefault, base.tableIndex, space.marginRightNarrow, numberIndex && base.numberIndex]"
          weight="regular"
          :color="'dark'"
          sub
        >
          {{displayNumber}}
        </BaseHeading>
        <BaseHeading
          :level="6"
          :centered="false"
          :class="type.leadingDefault"
          weight="regular"
          :color="youth || numberIndex ? 'dark' : 'midtone'"
          sub
        >
          {{displayText}}
        </BaseHeading>
      </template>
      <template slot="summaryRight">
        <!-- list of best practice icons -->
        <BaseGutterWrapper
          v-if="youth"
          :class="base.right"
          el="ul"
          gutterX="xnarrow"
          gutterY="xnarrow"
        >
          <li
            v-for="(bestPractice, index) of bestPractices"
            :key="index"
            :class="base.gutter"
          >
            <BestPracticeInfoIcon
              :id="bestPractice.id"
              :activityID="id"
              :align="index > 4 ? 'right' : 'center'"
            />
          </li>
        </BaseGutterWrapper>
        <!-- Edit -->
        <BaseGutterWrapper v-else-if="editable" :class="[base.right, space.paddingHorizontalNone]" gutterY="xnarrow" gutterX="xnarrow">
          <router-link
            :to="{ name: 'activity', params: { activityId: id } }"
            :class="base.rowAction"
          >{{this.$t('edit')}}</router-link>
        </BaseGutterWrapper>

      </template>

    </BaseDetails>
  </div>
</template>

<script>
import BaseDetails from './BaseDetails'
import BaseHeading from './BaseHeading'
import BaseButtonLink from './BaseButtonLink'
import BaseGutterWrapper from './BaseGutterWrapper'
import BestPracticeInfoIcon from './BestPracticeInfoIcon'
import BaseDataGrid from './BaseDataGrid'
import ActivitiesItemInput from '@/components/ActivitiesItemInput.vue'
import BaseButton from './BaseButton'
import { bestPracticeData } from './mixins/bestPracticeData'
import { dataMethods } from './mixins/dataMethods'

export default {
  name: 'ActivityItemAssessment',
  mixins: [bestPracticeData, dataMethods],
  props: {
    activity: {
      type: Object,
      required: true
    },
    youth: Boolean,
    editable: Boolean,
    numberIndex: Boolean
  },
  components: {
    BaseHeading,
    BaseDetails,
    BaseGutterWrapper,
    BestPracticeInfoIcon,
    BaseButtonLink,
    BaseDataGrid,
    ActivitiesItemInput,
    BaseButton
  },
  computed: {
    expandedData: function () {
      return {
        [this.$t('activityTable.defaultID')]: this.id,
        [this.$t('activityTable.defaultBudget')]: `${this.budget} <small>${this.getItemValue('setup', 'currencyCode')}</small>`,
        [this.$t('activityTable.defaultYouthCentered')]: this.youth ? this.$t('yesRaw') : this.$t('noRaw')
      }
    },
    url: function () {
      return { name: 'activity', params: { activityId: this.id } }
    }
  },
  data: function () {
    return {
      id: this.activity.id,
      number: this.activity.activityNumber,
      displayText: this.activity.shortText || this.activity.text,
      displayNumber: this.activity.shortNumber || this.activity.number,
      bestPracticeId: null,
      assessmentInstance: null,
      assessmentComments: null,
      commentsNotPresent: false
    }
  },
  methods: {
    emitClick: function (event) {
      this.$emit('activitySelect', event, this.id)
    },
    getAssessmentInstance: function (bestPracticeId) {
      this.assessmentInstance = this.$store.getters['entities/assessments/query']()
        .with('comments')
        .where('activity_id', this.id)
        .where('best_practice_id', bestPracticeId)
        .first()

      this.assessmentComments = this.assessmentInstance.comments
      this.commentsNotPresent = this.assessmentInstance.comments.length === 0
    },
    getNewAssessment: function () {
      this.getAssessmentInstance(this.bestPracticeId)
    },

    expandText: function () {
      this.displayText = this.text
    },
    truncateText: function () {
      if (this.shortText) {
        this.displayText = this.shortText
      }
    },
    handleOpen: function () {
      this.expandText()
      this.isOpen = true
    },
    handleClose: function () {
      this.truncateText()
      this.isOpen = false
      this.commentsOpen = false
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
@import '~styleConfig/breakpoints';
@import '~styleConfig/color';
@import '~styleConfig/spacing';
@import '~styleConfig/type';

$breakpoint: medium;

.wrapper {
  composes: top from 'styles/borders.scss';
  composes: paddingVerticalNarrow from 'styles/spacing.scss';
  display: block;
  position: relative;

  &:hover {
    background-color: rgba(color('accent'), 0.20);
  }
}

.expandedWrapper {
  composes: paddingTopNarrow from 'styles/spacing.scss';
  display: block;

  @include media('>#{$breakpoint}') {
    @supports (display: flex) {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
}

.data {
  display: inline-block;

  @supports (flex: 1) {
    flex: 1;
  }
}

.rowAction {
  font-size: 0.75rem;
  @include font('display', $weight: light, $style: normal);
}

.right {
  list-style: none;
  display: flex;
  padding-right: 0;
  justify-content: flex-end;
}

.gutter {
  display: inline-block;
  vertical-align: middle;
  width: 45px;
  margin: 0 15px;
}

.numberIndex {
  min-width: 90px;
  width: 90px;
}
</style>
