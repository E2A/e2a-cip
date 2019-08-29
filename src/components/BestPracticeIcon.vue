<template>
  <div :class="base.wrapper">
    <a
      :class="[base.iconLink]"
      :href="`#${flyoutID}`"
      @click.prevent.stop="toggleFlyout()"
    >
      <!-- error source -->
      <BaseIcon
        :name="icon"
        :class="color[selectedAssessmentClass]"
        :alt="title"
        role="img"
        size="2.25rem"
      />
    </a>

    <!-- flyout for best practice choices -->
    <BaseFlyout
      v-show="flyoutOpen"
      :class="base.flyout"
      :id="flyoutID"
      :align="align"
      :size="0"
    >
      <div v-if="editable" :class="[base.container, space.paddingNarrow, space.marginHorizontalBetweenXnarrow]">

        <!-- icon options -->
        <div
          v-for="(option, index) of bestPracticeOptions"
          :key="index"
          @click="updateAssessment(title, option.value, id)"
          :class="[
            dot.option,
            dot[option.class],
            {[dot.selected]: selectedAssessment.value.toLowerCase() === option.value}
          ]"
        >
          <BaseIcon
            :name="icon"
            :class="[color[option.class]]"
            :alt="title"
            role="img"
            size="2rem"
            :noMargin="true"
          />
          <span :class="dot.text">
            {{option.value}}
          </span>
        </div>

      </div>
    </BaseFlyout>
  </div>
</template>

<script>
import { bestPracticeData } from './mixins/bestPracticeData'
import BaseHeading from './BaseHeading.vue'
import BaseIcon from './BaseIcon.vue'
import BaseFlyout from './BaseFlyout.vue'

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
    // can you edit the status, e.g. yes, partially, etc.?
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
    BaseFlyout,
    BaseIcon
  },
  data: function () {
    return {
      bestPracticeOptions: {
        no: {
          class: 'no',
          text: this.$t('bestPracticeOptions.noText'),
          value: this.$t('bestPracticeOptions.noKey')
        },
        partially: {
          class: 'partially',
          text: this.$t('bestPracticeOptions.partiallyText'),
          value: this.$t('bestPracticeOptions.partiallyKey')
        },
        yes: {
          class: 'yes',
          text: this.$t('bestPracticeOptions.yesText'),
          value: this.$t('bestPracticeOptions.yesKey')
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
      // ERROR SOURCE
      const assessmentPresent = this.$store.getters['entities/activities/query']()
        .with('assessments', (query) => {
          query.where('best_practice_id', this.id)
        }).whereId(this.activityID).get()[0].assessments

      if (assessmentPresent && assessmentPresent.length > 0) {
        return assessmentPresent[0]
      }
      return false
    },
    updateAssessment: function (bestPracticeText, bestPracticeValue, bestPracticeID) {
      // Check if assessment for current activity is store
      const assessmentPresent = this.$store.getters['entities/activities/query']().with('assessments', (query) => {
        query.where('best_practice_id', bestPracticeID)
      }).with('recommendations').whereId(this.activityID).get()[0].assessments[0]

      if (assessmentPresent) {
        // Update assessment value if it already exists
        this.$store.dispatch('entities/assessments/update', {
          id: assessmentPresent.id,
          activity_id: this.activityID,
          text: bestPracticeText,
          value: bestPracticeValue,
          best_practice_id: bestPracticeID
        })
      } else {
        // Add a new assessment
        this.$store.dispatch('entities/assessments/insert', {
          data: {
            activity_id: this.activityID,
            text: bestPracticeText,
            value: bestPracticeValue,
            best_practice_id: bestPracticeID
          }
        })
      }

      this.toggleFlyout()
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
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
@import '~styleConfig/color';
$icon-size: 2.25rem;

.wrapper {
  display: block;
  position: relative;
}

.container {
  display: flex;
  justify-content: center;
}

.iconLink {
  display: inline-block;
  width: $icon-size;
  height: $icon-size;

  &:hover,
  &:active {
    border: none;
  }
}

.flyout {
  composes: scaleZeta from 'styles/type.scss';
  text-align: center;
  top: ($icon-size + 1rem);
}

.addComment {
  display: inline-block;
  border: none;
  background: none;
  margin-left: none;

  &:hover {
    cursor: pointer;
    margin-bottom: -1px;
  }

  &Inactive {
    color: color('midtone');

    &:hover {
      cursor: default;
    }
  }
}

.resourceLink {
  composes: paddingXxnarrow from 'styles/spacing.scss';
  composes: top from 'styles/borders.scss';
}
</style>

<style lang="scss" module="dot">
@import '~styleConfig/color';
@import '~styleConfig/borders';

$size: 2rem;
$margin: 0.4rem;

.option {
  composes: midtone from 'styles/color.scss';
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: $size;
  position: relative;
  z-index: 100;
  text-align: center;

  &::before,
  &::after {
    border-radius: 50%;
    content: '';
    display: inline-flex;
    height: $size;
    position: absolute;
    z-index: 200;
    top: 0;
    width: $size;
  }

  .text {
    margin-top: $margin;
  }

  &:hover,
  &:active {
    &::before {
      @include border($w: 'thick');
      border-color: color('white');
    }

    &::after {
      @include border($w: 'medium');
      border-color: border('light');
    }
  }
}

.selected {
  &::before {
    border-color: color('white') !important;
  }

  &::after {
    @include border($w: 'medium');
    border-color: border('dark') !important;
  }
}

@each $color in ['yes', 'partially', 'no'] {
  .#{$color}{
    &::before {
      @include border($w: 'thick', $color: $color);
    }
  }
}
</style>
