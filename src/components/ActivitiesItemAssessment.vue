<!--
  Assessment Input component
  -> use to add an assessment to an activity
  -> part of Activity List
-->

<template>
  <li :class="`${base.wrapper} ${disabled}`">
    <BaseDetails>
      <template slot="summaryLeft">
        <BaseHeading
          :level="6"
          :centered="false"
          :class="type.leadingDefault"
          weight="regular"
          color="dark"
          sub
        >
          {{text}}
        </BaseHeading>
      </template>
      <template slot="summaryRight">
        <!-- list of best practice icons -->
        <BaseGutterWrapper
          :class="base.icons"
          el="ul"
          gutterX="xnarrow"
          gutterY="xnarrow"
        >
          <li
            v-for="(bestPractice, index) of bestPractices"
            :key="index"
            :class="base.icon"
          >
            <BestPracticeIcon
              :id="bestPractice.id"
              :activityID="id"
              :align="index > 5 ? 'right' : 'center'"
              editable
            />
          </li>
        </BaseGutterWrapper>
      </template>
      <template>
        <div :class="base.expandedWrapper">
          <BaseDataGrid
            :data="expandedData"
            :class="base.data"
          />
          <BaseGutterWrapper
            gutterX="narrow"
            gutterY="narrow"
          >
            <div :class="base.gutter">
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
          </BaseGutterWrapper>
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
import BaseDataGrid from './BaseDataGrid'
import { bestPracticeData } from './mixins/bestPracticeData'
import { dataMethods } from './mixins/dataMethods'

export default {
  name: 'ActivityItemAssessment',
  mixins: [bestPracticeData, dataMethods],
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
    BaseButtonLink,
    BaseDataGrid
  },
  data: function () {
    return {
      expandedData: {
        [this.$t('activityTable.defaultID')]: this.id,
        [this.$t('activityTable.defaultBudget')]: `${this.budget} <small>${this.getItemValue('setup', 'currencyCode')}</small>`,
        [this.$t('activityTable.defaultYouthCentered')]: this.youth ? this.$t('yesRaw') : this.$t('noRaw')
      }
    }
  },
  computed: {
    disabled: function () {
      return this.youth ? null : 'disabled'
    }
  }
}
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
.wrapper {
  composes: top from 'styles/borders.scss';
  composes: paddingVerticalNarrow from 'styles/spacing.scss';
  display: block;
  position: relative;
}

.expandedWrapper {
  composes: paddingTopNarrow from 'styles/spacing.scss';
  display: block;

  @supports (display: flex) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.data {
  display: inline-block;

  @supports (flex: 1) {
    flex: 1;
  }
}

.icons {
  list-style: none;
  text-align: right;
}

.icon {
  display: inline-block;
}
</style>
