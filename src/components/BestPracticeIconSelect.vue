<template>
  <vSelect
    @input="updateAssessment"
    :value="selectedAssessment"
    :name="title"
    :options="bestPracticeOptionsArray"
    :searchable="false"
    :clearable="false"
    label="value"
  >
    <!-- dropdown options -->
    <template slot="option" slot-scope="option" >
      <BaseIcon
        v-if="option.value !== 'empty'"
        :name="icon"
        :class="color[option.class]"
        :alt="title"
        role="img"
        size="1.85rem"
        :backdrop="true"
      />
      <span v-else class="empty">
        --
      </span>
    </template>
    <!-- selected option -->
    <template slot="selected-option">
      <BaseIcon
        :name="icon"
        :class="color[selectedAssessmentClass]"
        :alt="title"
        role="img"
        size="2rem"
      />
    </template>
  </vSelect>
</template>

<script>
import { bestPracticeData } from './mixins/bestPracticeData'
import BaseHeading from './BaseHeading.vue'
import BaseIcon from './BaseIcon.vue'
import vSelect from 'vue-select'

export default {
  name: 'BestPracticeIconSelect',
  mixins: [bestPracticeData],
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    activityID: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    icon: function () {
      return this.findBestPracticeByID().icon
    },
    title: function () {
      return this.findBestPracticeByID().title
    },
    selectedAssessment: function () {
      return this.getSelectedAssessment(this.title) || this.bestPracticeOptions.empty
    },
    selectedAssessmentClass: function () {
      const option = this.getSelectedAssessment(this.title)
        ? this.getSelectedAssessment(this.title).value.toLowerCase()
        : this.bestPracticeOptions.empty.class
      return this.bestPracticeOptions[option].class
    },
    bestPracticeOptionsArray: function () {
      const options = Object.values(this.bestPracticeOptions)
      return options
    }
  },
  components: {
    BaseHeading,
    BaseIcon,
    vSelect
  },
  data: function () {
    return {
      bestPracticeOptions: {
        empty: {
          class: 'empty',
          text: this.$t('bestPracticeOptions.emptyText'),
          value: this.$t('bestPracticeOptions.emptyKey')
        },
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
    getSelectedAssessment: function () {
      // Check if assessment is present, if so add 'assessment-selected' class to selection
      const assessmentPresent = this.$store.getters['entities/activities/query']()
        .with('assessments', (query) => {
          query.where('best_practice_id', this.id)
        }).whereId(this.activityID).first().assessments

      if (assessmentPresent && assessmentPresent.length > 0) {
        return assessmentPresent[0]
      }
      return false
    },
    updateAssessment: function (selectedObject) {
      // Check if assessment for current activity is store
      const assessmentPresent = this.getSelectedAssessment()

      const data = {
        activity_id: this.activityID,
        text: this.title,
        value: selectedObject.value,
        best_practice_id: this.id
      }

      if (assessmentPresent) {
        // Update assessment value if it already exists
        this.$store.dispatch('entities/assessments/update', {
          ...data,
          id: assessmentPresent.id
        })
      } else {
        // Add a new assessment
        this.$store.dispatch('entities/assessments/insert', { data })
      }
    }
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<!-- global: override the classes used on vue-select with our own styles -->
<!-- using !important everywhere to make sure we override vendor styles -->
<style lang="scss">
@import '~bourbon/core/bourbon';
@import '~vue-select/dist/vue-select.css';
@import '~styleConfig/type';
@import '~styleConfig/spacing';
@import '~styleConfig/color';
@import '~styleConfig/borders';

.v-select {
  @include font();
  color: color('dark') !important;

  a {
    border: none !important;
  }

  // When dropdown is open and/or when whole component is hovered
  &.vs--open, &:hover {
    .vs__dropdown-toggle {
      transition: all .35s ease-in-out;
      background-color: color('light') !important;
      border-color: rgba(60, 60, 60, .26);
    }

    .vs__actions {
      opacity: 1;
    }
  }

  .vs__dropdown-toggle {
    @include border();
    padding: space('xxnarrow') !important;
    background-color: color('white') !important;
    border-color: color('white');
    transition: all .25s ease-in-out;
  }

  .vs__actions {
    opacity: 0.4;
    transition: all .25s ease-in-out;
  }

  .vs__dropdown-menu {
    .highlight > a {
      background: color('accent');
      color: color('white');
    }
    min-width: 80px;
  }

  .vs__dropdown-option {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;

    // text
    .empty {
      color: color('midtone');
    }
    &--highlight {
      .empty {
        color: color('white');
      }
    }
  }

    // Shrinks buggy input element
  .vs__search {
    margin: 0;
    padding: 0;
  }

  // Prevents bug when opening dropdown
  // Position normally changes to absolute and collapses component
  .vs__selected {
    position: static !important;
  }
}
</style>
