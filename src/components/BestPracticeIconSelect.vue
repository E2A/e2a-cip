<template>
  <vSelect
    @input="updateAssessment"
    :value="selectedAssessment"
    :name="title"
    :options="bestPracticeOptionsArray"
    :searchable="false"
    :clearable="false"
    label="value"
    class="best-practice-select-wrapper"
  >
    <!-- dropdown options -->
    <template slot="option" slot-scope="option">
      <span v-if="option.value !== 'empty'">
        <BaseIcon
          :name="icon"
          :class="color[option.class]"
          :alt="title"
          role="img"
          size="1rem"
          :backdrop="true"
        />
        <span :class="base.selectTitle">{{option.text}}</span>
      </span>
      <span v-else class="empty">--</span>
    </template>
    <!-- selected option -->
    <template slot="selected-option">
        <BaseIcon
          :name="icon"
          :class="[color[selectedAssessmentClass], base.iconPadding]"
          :alt="title"
          role="img"
          size="1.3rem"
        />
        {{title}}
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
      return (
        this.getSelectedAssessment(this.title) || this.bestPracticeOptions.empty
      )
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
        .with('assessments', query => {
          query.where('best_practice_id', this.id)
        })
        .whereId(this.activityID)
        .first().assessments

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

<style lang="scss" module="base">
.selectTitle {
  font-size: 0.5rem;
  margin-left: 5px;
}

.iconPadding {
  padding-right: 5px;
}
</style>

<!-- global: override the classes used on vue-select with our own styles -->
<!-- using !important everywhere to make sure we override vendor styles -->
<style lang="scss">
@import "~bourbon/core/bourbon";
@import "~vue-select/dist/vue-select.css";
@import "~styleConfig/type";
@import "~styleConfig/spacing";
@import "~styleConfig/color";
@import "~styleConfig/borders";

.best-practice-select-wrapper {
  @include font();
  color: color("dark") !important;
  display: inline-flex;

  a {
    border: none !important;
  }

  .vs__dropdown-toggle {
    @include border();
    padding: 5px !important;
    background-color: color("white") !important;
    border-color: color("white");
    // max-width: 55px;
    transition: all 0.25s 0.17s ease-out;

    height: 40px;
    overflow: hidden;
  }

  .vs__selected {
    padding: 0;
    font-size: 0.6rem;
    text-align: left;
    @include font('display', $weight: light, $style: normal);
  }

  .vs__actions {
    opacity: 0;
    transition: all 0.25s 0.17s ease-out;
  }

  // When dropdown is open and/or when whole component is hovered
  &.vs--open {
    .vs__dropdown-menu {
      border-top-style: inherit;
    }
  }
  // &:hover {
  //   .vs__dropdown-toggle {
  //     padding: 5px !important;
  //     background-color: color("light") !important;
  //     border-color: rgba(60, 60, 60, 0.26);
  //     max-width: 88px; // >88px causes bug
  //   }

  //   .vs__actions {
  //     opacity: 1;
  //   }
  // }

  .vs__dropdown-menu {
    .highlight > a {
      background: color("accent");
      color: color("white");
    }
    min-width: 0px !important; // default is 120px
    right: 0;
    left: auto;
  }

  .vs__dropdown-option {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px 5px;

    // text
    .empty {
      color: color("midtone");
    }
    &--highlight {
      .empty {
        color: color("white");
      }
    }
  }

  .vs__search {
    height: 0;
    width: 0;
    padding: 0;
    margin: 0;
  }
}
</style>
