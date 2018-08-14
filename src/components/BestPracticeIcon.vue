<template>
  <div>
    <img
      :src="icon"
      :class="base.icon"
    />

    <!-- flyout for best practice choices -->
    <div :class="base.flyout">
      <p>{{name}}</p>
      <div :class="base.dots">
        <button v-for="(bestPracticeOption, index) of bestPracticeOptions"
          :key="index"
          @click="addAssessment(name, bestPracticeOption.text)"
          :class="[
            base.dot,
            base[bestPracticeOption.value],
            {[base.selected]: bestPracticeOption.selected}
          ]"
        >
          {{bestPracticeOption.text}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { bestPracticeData } from './mixins/bestPracticeData'

export default {
  name: 'bestPracticeIcon',
  mixins: [bestPracticeData],
  props: {
    icon: String,
    name: String,
    url: [String, Object],
    flyout: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      bestPracticeOptions: [
        {
          value: this.$t('bestPracticeOptions.yesKey'),
          text: this.$t('bestPracticeOptions.yesText'),
          selected: false
        },
        {
          value: this.$t('bestPracticeOptions.maybeKey'),
          text: this.$t('bestPracticeOptions.maybeText'),
          selected: false
        },
        {
          value: this.$t('bestPracticeOptions.noKey'),
          text: this.$t('bestPracticeOptions.noText'),
          selected: false
        }
      ]
    }
  },
  methods: {
    addAssessment: function (bestPracticeText, bestPracticeValue) {
      // Check if assessment for current activity is store
      const assessmentPresent = this.$store.getters['entities/activities/query']().with('assessments', (query) => {
        query.where('text', bestPracticeText)
      }).with('recomemndations').find(this.id).assessments[0]

      this.bestPracticeOptions.find(bp => bp.text === bestPracticeText).selected = true

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
    },
    getSelectedAssessment: function (bestPracticeText, bestPracticeValue) {
      // Check if assessment is present, if so add 'selected' class to selection

      return this.$store.getters['entities/activities/query']()
        .with('assessments', (query) => {
          query
            .where('text', bestPracticeText)
            .where('value', bestPracticeValue)
        }).find(this.id).assessments !== null

      // const assessmentPresent = this.$store.getters['entities/activities/query']()
      //   .with('assessments', (query) => {
      //     query
      //       .where('text', bestPracticeText)
      //       .where('value', bestPracticeValue)
      //   }).find(this.id).assessments

      // if (assessmentPresent && assessmentPresent.length > 0) {
      //   return 'selected'
      // } else {
      //   return null
      // }
    }
  }
}
</script>

<style lang="scss" module="base">
.icon {
  border-radius: 50%;
  max-width: 2.25rem;
}

.flyout {
  display: none;
}

.dots {
  display: block;
}

.dot {
  height: 1rem;
  width: 1rem;
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

.selected {
  padding: 20px;
  border-width: 6px;
  border-color: red;
}
</style>
