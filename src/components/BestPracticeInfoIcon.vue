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
        size="1.5rem"
      />
    </a>

    <!-- flyout for best practice choices -->
    <BaseFlyout
      v-show="flyoutOpen"
      :class="base.flyout"
      :id="flyoutID"
      :align="align"
    >
      <div :class="space.paddingXnarrow">
        <BaseHeading :level="4" scale="zeta" color="dark" weight="bold">{{
          title
        }}</BaseHeading>

        <BaseHeading
          :level="4"
          :class="space.paddingVerticalXnarrow"
          scale="zeta"
          color="dark"
          weight="light"
          >{{ teaser }}</BaseHeading
        >

        <!-- dots -->
      </div>

      <!-- read more link -->
      <div :class="base.resourceLink">
        <router-link
          :to="{ name: 'evidence-informed-practice', params: { id: id } }"
          >{{ $t("bestPracticeIconData") }} &rsaquo;</router-link
        >
      </div>
    </BaseFlyout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { bestPracticeData } from "./mixins/bestPracticeData";
import BaseHeading from "./BaseHeading.vue";
import BaseIcon from "./BaseIcon.vue";
import BaseFlyout from "./BaseFlyout.vue";

export default {
  name: "BestPracticeInfoIcon",
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
    // align the flyout to center or right
    align: {
      type: String,
      default: "center"
    }
  },
  computed: {
    ...mapState({
      flyout: state => state.infoFlyout
    }),
    icon: function() {
      return this.findBestPracticeByID().icon;
    },
    title: function() {
      return this.findBestPracticeByID().title;
    },
    teaser: function() {
      return this.findBestPracticeByID().teaser;
    },
    // html id for flyout, for anchor to target
    flyoutID: function() {
      return `${this.activityID}-${this.id}-flyout`;
    },
    flyoutOpen: function() {
      const flyoutPresent = this.flyout;
      // check that a flyout exists, its an object, and it has the correct id
      const isOpen =
        flyoutPresent &&
        Object.keys(flyoutPresent).length !== 0 &&
        flyoutPresent.flyout_id === this.flyoutID;
      return isOpen;
    },
    selectedAssessment: function() {
      return (
        this.getSelectedAssessment(this.title) || this.bestPracticeOptions.empty
      );
    },
    selectedAssessmentClass: function() {
      const option = this.getSelectedAssessment(this.title)
        ? this.getSelectedAssessment(this.title).value.toLowerCase()
        : this.bestPracticeOptions.empty.class;
      return this.bestPracticeOptions[option].class;
    }
  },
  components: {
    BaseHeading,
    BaseFlyout,
    BaseIcon
  },
  data: function() {
    return {
      bestPracticeOptions: {
        empty: {
          class: "empty",
          value: this.$t("bestPracticeOptions.emptyKey")
        },
        no: {
          class: "no",
          value: this.$t("bestPracticeOptions.noKey")
        },
        partially: {
          class: "partially",
          value: this.$t("bestPracticeOptions.partiallyKey")
        },
        yes: {
          class: "yes",
          value: this.$t("bestPracticeOptions.yesKey")
        }
      }
    };
  },
  methods: {
    findBestPracticeByID: function() {
      return this.bestPractices.find(bp => bp.id === this.id);
    },
    getSelectedAssessment: function(bestPracticeText) {
      const query = this.$store.getters["entities/activities/query"]().get();

      // Check if assessment is present, if so add 'assessment-selected' class to selection
      const assessmentPresent = this.$store.getters[
        "entities/activities/query"
      ]()
        .with("assessments", query => {
          query.where("best_practice_id", this.id);
        })
        .whereId(this.activityID)
        .get()[0].assessments;

      if (assessmentPresent && assessmentPresent.length > 0) {
        return assessmentPresent[0];
      }
      return false;
    },
    updateAssessment: function(
      bestPracticeText,
      bestPracticeValue,
      bestPracticeID
    ) {
      // Check if assessment for current activity is store
      const assessmentPresent = this.$store.getters[
        "entities/activities/query"
      ]()
        .with("assessments", query => {
          query.where("best_practice_id", bestPracticeID);
        })
        .with("recommendations")
        .whereId(this.activityID)
        .get()[0].assessments[0];

      if (assessmentPresent) {
        // Update assessment value if it already exists
        this.$store.dispatch("entities/assessments/update", {
          id: assessmentPresent.id,
          activity_id: this.activityID,
          text: bestPracticeText,
          value: bestPracticeValue,
          best_practice_id: bestPracticeID
        });
        return;
      }
      // Add a new assessment
      this.$store.dispatch("entities/assessments/insert", {
        data: {
          activity_id: this.activityID,
          text: bestPracticeText,
          value: bestPracticeValue,
          best_practice_id: bestPracticeID
        }
      });
    },
    toggleFlyout: function() {
      if (this.flyoutOpen) {
        // Tell the store this flyout is closed
        this.$store.commit("SET_INFO_FLYOUT", {});
        // this.$store.dispatch('entities/bestpracticeicons/create', {
        //   data: {
        //     activity_id: this.activityID,
        //     best_practice_id: this.id,
        //     flyout: false
        //   }
        // })
      } else {
        // Tell the store this flyout is open
        this.$store.commit("SET_INFO_FLYOUT", {
          activity_id: this.activityID,
          best_practice_id: this.id,
          flyout_id: this.flyoutID
        });
        // this.$store.dispatch('entities/bestpracticeicons/create', {
        //   data: {
        //     activity_id: this.activityID,
        //     best_practice_id: this.id,
        //     flyout: true
        //   }
        // })
      }
    }
  }
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
@import "~styleConfig/color";
$icon-size: 1.5rem;

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
  composes: scaleZeta from "styles/type.scss";
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
    color: color("midtone");

    &:hover {
      cursor: default;
    }
  }
}

.resourceLink {
  composes: paddingXxnarrow from "styles/spacing.scss";
  composes: top from "styles/borders.scss";
}
</style>

<style lang="scss" module="dot">
@import "~styleConfig/color";
@import "~styleConfig/borders";

.option {
  $size: 1.8rem;
  $margin: 0.4rem;
  composes: default from "styles/animation.scss";
  composes: midtone from "styles/color.scss";
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
    content: " ";
    display: inline-block;
    height: $size;
    left: 50%;
    margin-left: -($size / 2);
    position: absolute;
    top: 0;
    width: $size;
  }

  &::before {
    background-color: color("no");
  }

  &:hover,
  &:active {
    &::before {
      @include border($w: "thick");
      border-color: color("white");
    }

    &::after {
      @include border($w: "medium");
      border-color: border("light");
    }
  }
}

.selected {
  &::before {
    border-color: color("white") !important;
  }

  &::after {
    @include border($w: "medium");
    border-color: border("dark") !important;
  }
}

@each $color in [ "yes", "partially", "no" ] {
  .#{$color} {
    &::before {
      @include border($w: "thick", $color: $color);
      background-color: color($color);
    }
  }
}
</style>
