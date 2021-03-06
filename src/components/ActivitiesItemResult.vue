<!--
  Result Input component
  -> use to add an recommendation to an activity
  -> part of Activity List
-->

<template>
  <li :class="base.wrapper">
    <BaseDetails @open="handleOpen" @close="handleClose" :open="isOpen">
      <!-- summary -->
      <template slot="summaryLeft">
        <BaseHeading
          :centered="false"
          :class="type.leadingDefault"
          :color="youth ? 'dark' : 'midtone'"
          scale="zeta"
          weight="regular"
          sub
        >
          {{ displayText }}
        </BaseHeading>
      </template>
      <template slot="summaryRight">
        <BaseGutterWrapper
          :class="type.right"
          gutterX="narrow"
          gutterY="narrow"
        >
          <div v-show="!isOpen" :class="base.gutter">
            <BaseGutterWrapper
              :class="base.icons"
              el="ul"
              gutterX="xnarrow"
              gutterY="xnarrow"
            >
              <li
                v-for="(assessment, index) of activeAssessments"
                :key="`assess-${index}`"
                :class="base.icon"
              >
                <BestPracticeIconSelect
                  :id="assessment.best_practice_id"
                  :activityID="assessment.activity_id"
                />
              </li>
            </BaseGutterWrapper>
          </div>
          <div :class="base.gutter">
            <BaseButton
              v-show="!isOpen"
              :label="$t('suggestImprovements')"
              size="small"
              @click="handleOpen"
            />
            <BaseButton
              v-show="isOpen"
              :label="$t('done')"
              size="small"
              role="primary"
              @click="handleClose"
            />
          </div>
        </BaseGutterWrapper>
      </template>

      <!-- data -->
      <div :class="base.expandedWrapper">
        <BaseDataGrid :data="expandedData" :class="base.data" />
        <BaseGutterWrapper
          :class="base.icons"
          el="ul"
          gutterX="xnarrow"
          gutterY="xnarrow"
        >
          <li
            v-for="(bestPractice, index) of bestPractices"
            :key="`bp-${index}`"
            :class="base.icon"
          >
            <BestPracticeIconSelect
              :id="bestPractice.id"
              :activityID="activityInstance.id"
              :align="index > 4 ? 'right' : 'center'"
            />
          </li>
        </BaseGutterWrapper>
      </div>

      <!-- recommendations -->
      <div :class="space.paddingTopNarrow">
        <BaseHeading
          :level="5"
          :centered="false"
          :class="space.paddingBottomXnarrow"
          scale="zeta"
          weight="bold"
          color="dark"
        >
          {{ $t("suggestedImprovements") }}
        </BaseHeading>
        <ol :class="[base.recommendations, space.paddingVerticalNarrow]">
          <!-- error source -->
          <!-- By default start showing a recommendation -->
          <ActivitiesItemInput
            v-if="recommendationsNotPresent"
            :activity-instance="activityInstance"
            recommendation-type="insertRecommendation"
          />
          <!-- Then show all once its been added -->
          <ActivitiesItemInput
            v-for="recommendation of activityRecommendations"
            v-else
            :key="recommendation.id"
            :activity-instance="activityInstance"
            :recommendation-id="recommendation.id"
            :existing-recommendation-text="recommendation.text"
            recommendation-type="updateRecommendation"
          />
        </ol>
        <BaseButton
          :class="space.marginLeft"
          :label="$t('addAnotherRecommendation')"
          size="small"
          role="primary"
          @click="addRecommendation"
        />
      </div>
    </BaseDetails>
  </li>
</template>

<script>
import BaseHeading from "@/components/BaseHeading.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseDetails from "@/components/BaseDetails.vue";
import BestPracticeIconSelect from "@/components/BestPracticeIconSelect.vue";
import BaseGutterWrapper from "@/components/BaseGutterWrapper.vue";
import BaseDataGrid from "@/components/BaseDataGrid.vue";
import { bestPracticeData } from "./mixins/bestPracticeData";
import { dataMethods } from "./mixins/dataMethods";
import ActivitiesItemInput from "@/components/ActivitiesItemInput.vue";

export default {
  name: "ActivitiesItemResult",
  components: {
    BaseHeading,
    BaseButton,
    BaseDetails,
    BestPracticeIconSelect,
    BaseGutterWrapper,
    BaseDataGrid,
    ActivitiesItemInput
  },
  mixins: [bestPracticeData, dataMethods],
  props: {
    activityInstance: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      activeAssessments: this.activityInstance.assessments,
      recommendationText: "",
      displayText: this.activityInstance.shortText || this.activityInstance.text
    };
  },
  computed: {
    youth: function() {
      return this.activityInstance.youthCentric;
    },
    recommendationsNotPresent: function() {
      return this.activityRecommendations.length === 0;
    },
    activityRecommendations: function() {
      // Get current recommendations on a given activity.
      return this.$store.getters["entities/activities/query"]()
        .with("recommendations")
        .whereId(this.activityInstance.id)
        .get()[0].recommendations;
    },
    expandedData: function() {
      return {
        [this.$t("activityTable.defaultID")]: this.activityInstance.id,
        [this.$t("activityTable.defaultBudget")]: `${
          this.activityInstance.budget
        } <small>${this.getItemValue("setup", "currencyCode")}</small>`,
        [this.$t("activityTable.defaultYouthCentered")]: this.activityInstance
          .youthCentric
          ? this.$t("yesRaw")
          : this.$t("noRaw")
      };
    }
  },
  methods: {
    getActivityRecommendations: function() {
      // Get current recommendations on a given activity.
      return this.$store.getters["entities/activities/query"]()
        .with("recommendations")
        .find(this.activityInstance.id).recommendations;
    },
    getBestPracticePresence: function(bestPracticeText) {
      // Checks for the value of a best practice and shows the result, it defaults to no.
      const bestPracticeValue = this.$store.getters[
        "entities/activities/query"
      ]()
        .with("assessments", query => {
          query.where("text", bestPracticeText);
        })
        .find(this.activityInstance.id).assessments[0];

      if (bestPracticeValue) {
        return bestPracticeValue.value.toLowerCase();
      } else {
        return "no";
      }
    },
    addRecommendation: function() {
      // Add a new recommendation
      this.$store.dispatch("entities/recommendations/insert", {
        data: {
          activity_id: this.activityInstance.id,
          text: ""
        }
      });
    },
    expandText: function() {
      this.displayText = this.activityInstance.text;
    },
    truncateText: function() {
      this.displayText = this.activityInstance.shortText;
    },
    handleOpen: function() {
      this.expandText();
      this.isOpen = true;
    },
    handleClose: function() {
      this.truncateText();
      this.isOpen = false;
    }
  }
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
.wrapper {
  composes: top from "styles/borders.scss";
  composes: paddingVerticalNarrow from "styles/spacing.scss";
  display: block;
  position: relative;
}

.expandedWrapper {
  composes: paddingTopNarrow from "styles/spacing.scss";
  display: block;

  @supports (display: flex) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.gutter {
  display: inline-block;
  vertical-align: middle;
}

.data {
  display: inline-block;

  @supports (flex: 1) {
    flex: 1;
  }
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

.partially {
  background-color: yellow;
}

.no {
  background-color: gray;
}

.icons {
  display: inline-block;
  list-style: none;
  text-align: right;
}

.icon {
  display: inline-block;
}

.recommendations {
  counter-reset: recommendations;
  padding-left: 0;
}
</style>
