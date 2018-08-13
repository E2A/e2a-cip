<!--
  Assessment Input component
  -> use to add an assessment to an activity
  -> part of Activity List
-->

<template>
  <li class="ActivityItemAssessment, sad-style">
    <BaseHeading :level="6" :sub="true">{{text}}</BaseHeading>

    <!-- edit button -->
    <router-link :to="{
      name: 'activity',
      params: {
        activityId: String(id)
      }
    }">{{$t('edit')}}</router-link>

    <!-- list of best practice icons -->
    <ul>
      <li v-for="(bestPractice, index) of bestPractices" :key="index">
        <img :src="bestPractice.icon" />

        <!-- flyout for best practice choices -->
        <div class='modal-select'>
          <p> {{bestPractice.title}}</p>
          <div class='button-group'>
            <button v-for="(bestPracticeOption,index) of bestPracticeOptions" :key="index" @click="addAssessment(bestPractice.title,bestPracticeOption.text)" class="dot" :class="[bestPracticeOption.value,getSelectedAssessment(bestPractice.title,bestPracticeOption.text)]">
              {{bestPracticeOption.text}}
            </button>
          </div>
        </div>
      </li>
    </ul>
  </li>
</template>

<script>
import BaseHeading from './BaseHeading'
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
  data () {
    return {
      bestPracticeOptions: [
        {value: this.$t('bestPracticeOptions.yesKey'), text: this.$t('bestPracticeOptions.yesText')},
        {value: this.$t('bestPracticeOptions.maybeKey'), text: this.$t('bestPracticeOptions.maybeText')},
        {value: this.$t('bestPracticeOptions.noKey'), text: this.$t('bestPracticeOptions.noText')}
      ]
    }
  },
  components: {
    BaseHeading
  },
  methods: {
    getSelectedAssessment: function (bestPracticeText, bestPracticeValue) {
      // Check if assessment is present, if so add 'assessment-selected' class to selection

      const assessmentPresent = this.$store.getters['entities/activities/query']()
        .with('assessments', (query) => {
          query
            .where('text', bestPracticeText)
            .where('value', bestPracticeValue)
        }).find(this.id).assessments

      if (assessmentPresent && assessmentPresent.length > 0) {
        return 'assessment-selected'
      } else {
        return null
      }
    },
    addAssessment: function (bestPracticeText, bestPracticeValue) {
      // Check if assessment for current activity is store
      const assessmentPresent = this.$store.getters['entities/activities/query']().with('assessments', (query) => {
        query.where('text', bestPracticeText)
      }).with('recomemndations').find(this.id).assessments[0]

      if (assessmentPresent) {
        // Update assessment value if it already exists
        this.$store.dispatch('entities/assessments/update', {
          id: assessmentPresent.id,
          activity_id: this.id,
          text: bestPracticeText,
          value: bestPracticeValue
        })
        return
      }
      // Add a new assessment
      this.$store.dispatch('entities/assessments/insert', {
        data: {
          activity_id: this.id,
          text: bestPracticeText,
          value: bestPracticeValue
        }
      })
    }
  }
}
</script>

<style scoped>

.sad-style {
  background: #ccc;
  border: 1;
  padding: 15px;
  margin: 15px;
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
.assessment-selected {
  padding: 20px;
  border-width: 6px;
  border-color: red;
}
</style>
