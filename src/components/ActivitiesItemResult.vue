<!--
  Result Input component
  -> use to add an recommendation to an activity
  -> part of Activity List
-->

<template>
  <li :class="base.wrapper">
    <BaseDetails
      @open="handleOpen"
      @close="handleClose"
      :open="isOpen"
    >
      <!-- summary -->
      <template slot="summaryLeft">
        <BaseHeading
          :centered="false"
          :class="type.leadingDefault"
          scale="zeta"
          weight="regular"
          :color="youth ? 'dark' : 'midtone'"
          sub
        >
          {{displayText}}
        </BaseHeading>
      </template>
      <template slot="summaryRight">
        <BaseGutterWrapper
          gutterX="narrow"
          gutterY="narrow"
          :class="type.right"
        >
          <div
            v-show="!isOpen"
            :class="base.gutter"
          >
            <BaseGutterWrapper
              :class="base.icons"
              el="ul"
              gutterX="xnarrow"
              gutterY="xnarrow"
            >
              <li
                v-for="(assessment,index) of activeAssessments"
                :key="`assess-${index}`"
                :class="base.icon"
              >
                <BestPracticeIcon
                  :id="assessment.best_practice_id"
                  :activityID="assessment.activity_id"
                />
              </li>
            </BaseGutterWrapper>
          </div>
          <div :class="base.gutter">
            <BaseButton
              v-show="!isOpen"
              @click="handleOpen"
              :label="$t('suggestImprovements')"
              size="small"
            />
            <BaseButton
              v-show="isOpen"
              @click="handleClose"
              :label="$t('done')"
              size="small"
              role="primary"
            />
          </div>
        </BaseGutterWrapper>
      </template>

      <!-- data -->
      <div :class="base.expandedWrapper">
        <BaseDataGrid
          :data="expandedData"
          :class="base.data"
        />
        <BaseGutterWrapper
          :class="base.icons"
          el="ul"
          gutterX="xnarrow"
          gutterY="xnarrow"
        >
          <li
            v-for="(bestPractice, index) of bestPractices"
            :key="`bp-${index}`"
            :class="base.icon"
          >
            <BestPracticeIcon
              :id="bestPractice.id"
              :activityID="activityInstance.id"
              :align="index > 4 ? 'right' : 'center'"
            />
          </li>
        </BaseGutterWrapper>
      </div>

      <!-- recommendations -->
      <div :class="space.paddingTopNarrow">
        <BaseHeading
          :level="5"
          :centered="false"
          :class="space.paddingBottomXnarrow"
          scale="zeta"
          weight="bold"
          color="dark"
        >
          {{$t('suggestedImprovements')}}
        </BaseHeading>
        <ol :class="[base.recommendations, space.paddingVerticalNarrow]">
          <!-- By default start showing a recommendation -->
          <ActivityRecommendationInput
            v-if="recommendationsNotPresent"
            :activityInstance="activityInstance"
            recommendationType='insertRecommendation'
          />
          <!-- Then show all once its been added -->
          <ActivityRecommendationInput
            v-else
            v-for="recommendation of activityRecommendations"
            :key="recommendation.id"
            :activityInstance="activityInstance"
            :recommendationId="recommendation.id"
            recommendationType='updateRecommendation'
            :existingRecommendationText="recommendation.text"
          />
        </ol>
        <BaseButton
          @click="addRecommendation"
          :class="space.marginLeft"
          :label="$t('addAnotherRecommendation')"
          size="small"
          role="primary"
        />
      </div>
    </BaseDetails>
  </li>
</template>

<script>
import BaseHeading from '@/components/BaseHeading.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseDetails from '@/components/BaseDetails.vue'
import BestPracticeIcon from '@/components/BestPracticeIcon.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import BaseDataGrid from '@/components/BaseDataGrid.vue'
import { bestPracticeData } from './mixins/bestPracticeData'
import { dataMethods } from './mixins/dataMethods'
import ActivityRecommendationInput from '@/components/ActivityRecommendationInput.vue'

export default {
  name: 'ActivitiesItemResult',
  mixins: [bestPracticeData, dataMethods],
  components: {
    BaseHeading,
    BaseButton,
    BaseDetails,
    BestPracticeIcon,
    BaseGutterWrapper,
    BaseDataGrid,
    ActivityRecommendationInput
  },
  props: {
    activityInstance: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isOpen: false,
      activeAssessments: this.activityInstance.assessments,
      recommendationText: '',
      displayText: this.activityInstance.shortText || this.activityInstance.text
    }
  },
  computed: {
    youth: function () {
      return this.activityInstance.youthCentric
    },
    recommendationsNotPresent: function () {
      return this.activityRecommendations.length === 0
    },
    activityRecommendations: function () {
      // Get current recommendations on a given activity.
      return this.$store.getters['entities/activities/query']().with('recommendations').whereId(this.activityInstance.id).get()[0].recommendations
    },
    expandedData: function () {
      return {
        [this.$t('activityTable.defaultID')]: this.activityInstance.id,
        [this.$t('activityTable.defaultBudget')]: `${this.activityInstance.budget} <small>${this.getItemValue('setup', 'currencyCode')}</small>`,
        [this.$t('activityTable.defaultYouthCentered')]: this.activityInstance.youthCentric ? this.$t('yesRaw') : this.$t('noRaw')
      }
    }
  },
  methods: {
    getActivityRecommendations: function () {
      // Get current recommendations on a given activity.
      return this.$store.getters['entities/activities/query']().with('recommendations').find(this.activityInstance.id).recommendations
    },
    getBestPracticePresence: function (bestPracticeText) {
      // Checks for the value of a best practice and shows the result, it defaults to no.
      const bestPracticeValue = this.$store.getters['entities/activities/query']().with('assessments', (query) => {
        query.where('text', bestPracticeText)
      }).find(this.activityInstance.id).assessments[0]

      if (bestPracticeValue) {
        return bestPracticeValue.value.toLowerCase()
      } else {
        return 'no'
      }
    },
    addRecommendation: function () {
      // Add a new recommendation
      this.$store.dispatch('entities/recommendations/insert', {
        data: {
          activity_id: this.activityInstance.id,
          text: ''
        }
      })
    },
    expandText: function () {
      this.displayText = this.activityInstance.text
    },
    truncateText: function () {
      this.displayText = this.activityInstance.shortText
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

<style src="styles/spacing.scss" lang="scss" module="space"></style>
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

.gutter {
  display: inline-block;
  vertical-align: middle;
}

.data {
  display: inline-block;

  @supports (flex: 1) {
    flex: 1;
  }
}

.dot {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
}

.yes {
  background-color: green;
}

.partially {
  background-color: yellow;
}

.no {
  background-color: gray;
}

.icons {
  display: inline-block;
  list-style: none;
  text-align: right;
}

.icon {
  display: inline-block;
}

.recommendations {
  counter-reset: recommendations;
  padding-left: 0;
}
</style>
