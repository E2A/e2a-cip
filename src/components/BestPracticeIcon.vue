<template>
  <div :class="base.wrapper">
    <a
      :class="[base.iconLink, base[selectedAssessmentClass]]"
      :href="`#${flyoutID}`"
      @click.prevent="toggleFlyout"
    >
      <img
        :class="base.icon"
        :src="icon"
        :alt="title"
      />
    </a>

    <!-- flyout for best practice choices -->
    <BaseFlyout
      v-show="flyoutOpen"
      :class="base.flyout"
      :id="flyoutID"
      :align="align"
    >
      <div :class="space.paddingXxnarrow">
        <p>{{title}}</p>

        <!-- dots -->
        <div
          v-if="editable"
          :class="base.dots"
        >
          <button v-for="(option, index) of bestPracticeOptions"
            :key="index"
            @click="updateAssessment(title, option.text, id)"
            :class="[
              base.dot,
              base[option.class],
              {[base.selected]: selectedAssessment.value.toLowerCase() === option.value}
            ]"
          >
            {{option.text}}
          </button>
        </div>
      </div>

      <!-- read more link -->
      <div :class="base.resourceLink">
        <router-link :to="{name: 'evidence-informed-practice', params: {id: id}}">
          {{$t('bestPracticeIconData')}} &rsaquo;
        </router-link>
      </div>
    </BaseFlyout>
  </div>
</template>

<script>
import { bestPracticeData } from './mixins/bestPracticeData'
import BaseHeading from './BaseHeading'
import BaseFlyout from './BaseFlyout'

export default {
  name: 'bestPracticeIcon',
  mixins: [bestPracticeData],
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    activityID: {
      type: [String, Number],
      required: true
    },
    // can you edit the status, e.g. yes, maybe, etc.?
    // -> if so, we'll show the buttons on the flyout
    editable: {
      type: Boolean,
      default: false
    },
    // align the flyout to center or right
    align: {
      type: String,
      default: 'center'
    }
  },
  computed: {
    icon: function () {
      return this.findBestPracticeByID().icon
    },
    title: function () {
      return this.findBestPracticeByID().title
    },
    // html id for flyout, for anchor to target
    flyoutID: function () {
      return `${this.activityID}-${this.id}-flyout`
    },
    flyoutOpen: function () {
      const flyoutPresent = this.$store.getters['entities/bestpracticeicons/query']()
        .where('activity_id', this.activityID)
        .where('best_practice_id', this.id).first()

      return flyoutPresent && flyoutPresent.flyout
    },
    selectedAssessment: function () {
      return this.getSelectedAssessment(this.title) || this.bestPracticeOptions.no
    },
    selectedAssessmentClass: function () {
      const option = this.getSelectedAssessment(this.title)
        ? this.getSelectedAssessment(this.title).value.toLowerCase()
        : this.bestPracticeOptions.no.class
      return this.bestPracticeOptions[option].class
    }
  },
  components: {
    BaseHeading,
    BaseFlyout
  },
  data: function () {
    return {
      bestPracticeOptions: {
        yes: {
          class: 'yes',
          text: this.$t('bestPracticeOptions.yesText'),
          value: this.$t('bestPracticeOptions.yesKey')
        },
        maybe: {
          class: 'maybe',
          text: this.$t('bestPracticeOptions.maybeText'),
          value: this.$t('bestPracticeOptions.maybeKey')
        },
        no: {
          class: 'no',
          text: this.$t('bestPracticeOptions.noText'),
          value: this.$t('bestPracticeOptions.noKey')
        }
      }
    }
  },
  methods: {
    findBestPracticeByID: function () {
      return this.bestPractices.find(bp => bp.id === this.id)
    },
    getSelectedAssessment: function (bestPracticeText) {
      // Check if assessment is present, if so add 'assessment-selected' class to selection
      const assessmentPresent = this.$store.getters['entities/activities/query']()
        .with('assessments', (query) => {
          query
            .where('text', bestPracticeText)
        }).find(this.activityID).assessments

      if (assessmentPresent && assessmentPresent.length > 0) {
        return assessmentPresent[0]
      }
      return false
    },
    updateAssessment: function (bestPracticeText, bestPracticeValue, bestPracticeID) {
      // Check if assessment for current activity is store
      const assessmentPresent = this.$store.getters['entities/activities/query']().with('assessments', (query) => {
        query.where('text', bestPracticeText)
      }).with('recommendations').find(this.activityID).assessments[0]

      if (assessmentPresent) {
        // Update assessment value if it already exists
        this.$store.dispatch('entities/assessments/update', {
          id: assessmentPresent.id,
          activity_id: this.activityID,
          text: bestPracticeText,
          value: bestPracticeValue,
          best_practice_id: bestPracticeID
        })
        return
      }
      // Add a new assessment
      this.$store.dispatch('entities/assessments/insert', {
        data: {
          activity_id: this.activityID,
          text: bestPracticeText,
          value: bestPracticeValue,
          best_practice_id: bestPracticeID
        }
      })
    },
    toggleFlyout: function () {
      if (this.flyoutOpen) {
        // Tell the store this flyout is closed
        this.$store.dispatch('entities/bestpracticeicons/create', {
          data: {
            activity_id: this.activityID,
            best_practice_id: this.id,
            flyout: false
          }
        })
      } else {
        // Tell the store this flyout is open
        this.$store.dispatch('entities/bestpracticeicons/create', {
          data: {
            activity_id: this.activityID,
            best_practice_id: this.id,
            flyout: true
          }
        })
      }
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
$icon-size: 2.25rem;

.wrapper {
  display: block;
  position: relative;
}

.iconLink {
  border-radius: 50%;
  display: inline-block;
  overflow: hidden;
  padding: 0.25rem;
  width: $icon-size;
  height: $icon-size;
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

.flyout {
  composes: scaleEta from 'styles/type.scss';
  top: ($icon-size + 1rem);
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

.resourceLink {
  composes: paddingXxnarrow from 'styles/spacing.scss';
  composes: top from 'styles/borders.scss';
}
</style>
