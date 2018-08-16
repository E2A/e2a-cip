<!--
  Result Input component
  -> use to add an recommendation to an activity
  -> part of Activity List
-->

<template>
  <li :class="base.wrapper">
    <BaseDetails>
      <template slot="summaryLeft">
        <BaseHeading
          :centered="false"
          scale="zeta"
          sub
        >
          {{activityInstance.text}}
        </BaseHeading>
      </template>
      <template slot="summaryRight">
        <BaseGutterWrapper
          gutterX="narrow"
          gutterY="narrow"
          :class="type.right"
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
              <!-- <BestPracticeIcon
                :icon="bestPractice.icon"
                :name="bestPractice.title"
                :id="bestPractice.id"
                :activityID="activityInstance.id"
              /> -->
              <div :class="[base.dot, base[assessment.value.toLowerCase()]]">
                <!-- <div>{{$t('results.value')}} {{assessment.value}}</div>
                <div>{{$t('results.text')}} {{assessment.text}}</div> -->
              </div>
            </li>
          </BaseGutterWrapper>
          <div style="display: inline-block; vertical-align: middle;">
            <BaseButton :label="$t('suggestImprovements')" size="small" />
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
            <div :class="[base.dot, base[getBestPracticePresence(bestPractice.title)]]"></div>
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
        >
          {{$t('suggestedImprovements')}}
        </BaseHeading>
        <BaseButton
          @click="addRecommendation"
          :label="$t('addRecommendation')"
          size="small"
        />
        <ol v-for="recommendation of activityRecommendations = getActivityRecommendations()" :key="recommendation.id" class='all-recommendations'>
          <ActivityRecommendationInput :activityInstance="activityInstance" :recommendationId="recommendation.id" :existingRecommendationText="recommendation.text" />
          <BaseButton @click="deleteRecommendation(recommendation.id)">{{$t('delete')}}</BaseButton>
        </ol>
        <BaseButton
          @click="addRecommendation"
          :label="$t('addAnotherRecommendation')"
          size="small"
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
      activeAssessments: this.activityInstance.assessments,
      recommendationText: '',
      expandedData: {
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
    deleteRecommendation: function (recommendationId) {
      // Remove recommendation
      this.$store.dispatch('entities/recommendations/delete', recommendationId)
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

.maybe {
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
</style>
