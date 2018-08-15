<template>
  <div :class="base.wrapper">
    <a
      :class="[base.iconLink, base[getSelectedAssessment().class]]"
      :href="`#${flyoutID}`"
      @click.prevent="toggleFlyout"
    >
      <img
        :class="base.icon"
        :src="icon"
        :alt="name"
      />
    </a>

    <!-- flyout for best practice choices -->
    <template v-if="editable">
      <aside
        v-show="flyoutOpen"
        :class="base.flyout"
        :id="flyoutID"
      >
        <p>{{name}}</p>
        <div :class="base.dots">
          <button v-for="(bestPracticeOption, index) of bestPracticeOptions"
            :key="index"
            @click="updateAssessment(name, bestPracticeOption.text)"
            :class="[
              base.dot,
              base[bestPracticeOption.class],
              {[base.selected]: bestPracticeOption.selected}
            ]"
          >
            {{bestPracticeOption.text}}
          </button>
        </div>
        <div :class="base.resourceLink">
          <router-link :to="{name: 'evidence-informed-practice', params: {id: id}}">
            Read more about this EIP &rsaquo;
          </router-link>
        </div>
      </aside>
    </template>
  </div>
</template>

<script>
import { bestPracticeData } from './mixins/bestPracticeData'
import BaseHeading from './BaseHeading'

export default {
  name: 'bestPracticeIcon',
  mixins: [bestPracticeData],
  props: {
    icon: String,
    name: String,
    url: [String, Object],
    id: [String, Number],
    editable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    flyoutID: function () {
      return `${this.id}-flyout`
    }
  },
  components: {
    BaseHeading
  },
  data: function () {
    return {
      flyoutOpen: false,
      bestPracticeOptions: [
        // Yes
        {
          class: 'yes',
          selected: false,
          text: this.$t('bestPracticeOptions.yesText'),
          value: this.$t('bestPracticeOptions.yesKey')
        },
        // Maybe
        {
          class: 'maybe',
          selected: false,
          text: this.$t('bestPracticeOptions.maybeText'),
          value: this.$t('bestPracticeOptions.maybeKey')
        },
        // No
        // -> selected by default
        {
          class: 'no',
          selected: true,
          text: this.$t('bestPracticeOptions.noText'),
          value: this.$t('bestPracticeOptions.noKey')
        }
      ]
    }
  },
  methods: {
    getSelectedAssessment: function () {
      // Find the best practice option that is selected
      return this.bestPracticeOptions.find(bp => bp.selected === true)
    },
    setSelectedAssessment: function (bestPracticeValue) {
      // unselect the previously selected assessment
      this.getSelectedAssessment().selected = false
      // select the new one
      this.bestPracticeOptions.find(bp => bp.text === bestPracticeValue).selected = true
    },
    updateAssessment: function (bestPracticeText, bestPracticeValue) {
      console.log('updated')
      // Check if assessment for current activity is store
      const assessmentPresent = this.$store.getters['entities/activities/query']().with('assessments', (query) => {
        query.where('text', bestPracticeText)
      }).with('recommendations').find(this.id).assessments[0]

      // update selected assessment in local state
      this.setSelectedAssessment(bestPracticeValue)

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
    toggleFlyout: function (event) {
      this.flyoutOpen ? this.flyoutOpen = false : this.flyoutOpen = true
    }
  }
}
</script>

<style lang="scss" module="base">
@import '~styleConfig/zindex';
@import '~styleConfig/color';

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

.flyout {
  $size: 12rem;
  composes: lightBg from 'styles/color.scss';
  composes: default round from 'styles/borders.scss';
  box-shadow: 0 1px 0.3rem shadow('light');
  display: block;
  left: 50%;
  margin-left: -($size / 2);
  max-height: $size;
  overflow-y: scroll;
  position: absolute;
  text-align: center;
  top: $icon-size + 1rem;
  width: $size;
  z-index: z('high');
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

.resourceLink {
  composes: paddingXxnarrow from 'styles/spacing.scss';
  composes: top from 'styles/borders.scss';
  composes: scaleEta from 'styles/type.scss';
}
</style>
