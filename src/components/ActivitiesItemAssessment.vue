<!--
  Assessment Input component
  -> use to add an assessment to an activity
  -> part of Activity List
-->

<template>
  <div :class="[base.wrapper, {youth: base.disabled}]">
    <BaseDetails
      @open="handleOpen"
      @close="handleClose"
    >
      <template slot="summaryLeft">
        <BaseHeading
          :level="6"
          :centered="false"
          :class="type.leadingDefault"
          weight="regular"
          :color="youth ? 'dark' : 'midtone'"
          sub
        >
          {{displayText}}
        </BaseHeading>
      </template>
      <template slot="summaryRight">
        <!-- list of best practice icons -->
        <BaseGutterWrapper
          v-if="youth"
          v-show="!isOpen"
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
            <BestPracticeIcon
              :id="bestPractice.id"
              :activityID="id"
              :align="index > 5 ? 'right' : 'center'"
              editable
            />
          </li>
        </BaseGutterWrapper>
        <div
          v-show="isOpen"
          :class="base.right"
        >
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
      </template>
      <template>
        <BaseGutterWrapper
          :class="base.expandedWrapper"
          gutterY="narrow"
          gutterX="narrow"
        >
          <div :class="base.gutter">
            <BaseDataGrid
              :data="expandedData"
              :class="base.data"
            />
          </div>
          <!-- list of best practice icons -->
          <div :class="base.gutter">
            <BaseGutterWrapper
              v-if="youth"
              v-show="isOpen"
              :class="base.icons"
              el="ul"
              gutterX="xnarrow"
              gutterY="xnarrow"
            >
              <li
                v-for="(bestPractice, index) of bestPractices"
                :key="index"
                :class="base.gutter"
              >
                <BestPracticeIcon
                  :id="bestPractice.id"
                  :activityID="id"
                  :align="index > 5 ? 'right' : 'center'"
                  editable
                />
              </li>
            </BaseGutterWrapper>
          </div>
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
import BestPracticeIcon from './BestPracticeIcon'
import BaseDataGrid from './BaseDataGrid'
import { bestPracticeData } from './mixins/bestPracticeData'
import { dataMethods } from './mixins/dataMethods'

export default {
  name: 'ActivityItemAssessment',
  mixins: [bestPracticeData, dataMethods],
  props: {
    shortText: {
      type: String
    },
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
    BaseButtonLink,
    BaseDataGrid
  },
  data: function () {
    return {
      expandedData: {
        [this.$t('activityTable.defaultID')]: this.id,
        [this.$t('activityTable.defaultBudget')]: `${this.budget} <small>${this.getItemValue('setup', 'currencyCode')}</small>`,
        [this.$t('activityTable.defaultYouthCentered')]: this.youth ? this.$t('yesRaw') : this.$t('noRaw')
      },
      displayText: this.shortText || this.text,
      isOpen: false
    }
  },
  methods: {
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
    }
  }
}
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
@import '~styleConfig/breakpoints';

$breakpoint: medium;

.wrapper {
  composes: top from 'styles/borders.scss';
  composes: paddingVerticalNarrow from 'styles/spacing.scss';
  display: block;
  position: relative;
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

.right {
  list-style: none;

  @include media('>#{$breakpoint}') {
    text-align: right;
  }
}

.gutter {
  display: inline-block;
  vertical-align: middle;
}
</style>
