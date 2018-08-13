<!--
  Result Input component
  -> use to add an recommendation to an activity
  -> part of Activity List
-->

<template>
  <div class="ActivitiesItemResult">
      <p>{{activityInstance.text}}</p>
      <div v-for="(assessment,index) of activeAssessments" :key="`ass-${index}`" class='assessments-present'>
        <div class='dot' :class="assessment.value.toLowerCase()">
          <div>{{$t('results.value')}} {{assessment.value}}</div>
          <div>{{$t('results.text')}} {{assessment.text}}</div>
        </div>
      </div>
      <div class="detailedView">
        <p>{{$t('results.budget')}} {{activityInstance.budget}} {{getItemValue('setup', 'currencyCode')}}</p>
        <p>{{$t('results.youthCentric')}} <span v-if="activityInstance.youthCentric">{{$t('yesRaw')}}</span>
        <span v-else>{{$t('noRaw')}}</span></p>
        <p>{{$t('results.allBestPractice')}}</p>
        <div v-for="(bestPractice, index) of bestPractices" :key="`bp-${index}`" class='all-assessments'>
          <div class='dot' :class="getBestPracticePresence(bestPractice.title)">
          </div>
        </div>
        <button @click="addRecommendation">{{$t('addRecommendation')}}</button>
        <BaseHeading>{{$t('suggestedImprovements')}}</BaseHeading>
          <ol v-for="recommendation of activityRecommendations = getActivityRecommendations()" :key="recommendation.id" class='all-recommendations'>
           <ActivityRecommendationInput :activityInstance="activityInstance" :recommendationId="recommendation.id" :existingRecommendationText="recommendation.text" />
           <button @click="deleteRecommendation(recommendation.id)">{{$t('delete')}}</button>
          </ol>
        <button @click="addRecommendation">{{$t('addAnotherRecommendation')}}</button>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseHeading from '@/components/BaseHeading.vue'
import { bestPracticeData } from './mixins/bestPracticeData'
import { dataMethods } from './mixins/dataMethods'
import ActivityRecommendationInput from '@/components/ActivityRecommendationInput.vue'

export default {
  name: 'ActivitiesItemResult',
  mixins: [bestPracticeData, dataMethods],
  components: {
    BaseHeading,
    ActivityRecommendationInput
  },
  props: {
    'activityInstance': {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      activeAssessments: this.activityInstance.assessments,
      recommendationText: ''
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

<style scoped>
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
</style>
