<template>
  <div :class="base.wrapper">
    <a
      :class="[base.iconLink]"
      :href="`#${flyoutID}`"
      @click.prevent.stop="toggleFlyout()"
    >
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
    >
      <div :class="space.paddingXnarrow" @click.stop>
        <BaseHeading
          :level="4"
          scale="zeta"
          color="dark"
          weight="regular"
        >
          {{title}}
        </BaseHeading>

        <!-- dots -->
        <div
          v-if="editable"
          :class="[space.paddingTopNarrow, space.marginHorizontalBetweenXnarrow]"
        >
          <button v-for="(option, index) of bestPracticeOptions"
            :key="index"
            @click="updateAssessment(title, option.value, id)"
            :class="[
              dot.option,
              dot[option.class],
              {[dot.selected]: selectedAssessment.value.toLowerCase() === option.value}
            ]"
          >
            {{option.text}}
          </button>
        </div>
      </div>

      <!-- read more link -->
      <div :class="base.resourceLink" @click.stop>

        <router-link :to="{name: 'evidence-informed-practice', params: {id: id}}">
          {{$t('bestPracticeIconData')}} &rsaquo;
        </router-link>
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
    BaseFlyout,
    BaseIcon
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
          query.where('best_practice_id', this.id)
        }).find(this.activityID).assessments

      if (assessmentPresent && assessmentPresent.length > 0) {
        return assessmentPresent[0]
      }
      return false
    },
    updateAssessment: function (bestPracticeText, bestPracticeValue, bestPracticeID) {
      // Check if assessment for current activity is store
      const assessmentPresent = this.$store.getters['entities/activities/query']().with('assessments', (query) => {
        query.where('best_practice_id', bestPracticeID)
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
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
$icon-size: 2.25rem;

.wrapper {
  display: block;
  position: relative;
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

.resourceLink {
  composes: paddingXxnarrow from 'styles/spacing.scss';
  composes: top from 'styles/borders.scss';
}
</style>

<style lang="scss" module="dot">
@import '~styleConfig/color';
@import '~styleConfig/borders';

.option {
  $size: 1.8rem;
  $margin: 0.4rem;
  composes: default from 'styles/animation.scss';
  composes: midtone from 'styles/color.scss';
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-block;
  min-width: $size;
  outline: none;
  overflow: visible;
  padding: ($size + $margin) 0 0 0;
  position: relative;
  text-align: center;

  &::before,
  &::after {
    border-radius: 50%;
    content: ' ';
    display: inline-block;
    height: $size;
    left: 50%;
    margin-left: -($size / 2);
    position: absolute;
    top: 0;
    width: $size;
  }

  &::before {
    background-color: color('no');
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

@each $color in ['yes', 'maybe', 'no'] {
  .#{$color}{
    &::before {
      @include border($w: 'thick', $color: $color);
      background-color: color($color);
    }
  }
}
</style>
