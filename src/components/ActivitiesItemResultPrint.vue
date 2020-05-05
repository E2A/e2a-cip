<!--
  Result Input component (styled for the print page)
  -> part of Activity List on Pring Page
-->

<template>
  <li :class="base.wrapper">
    <div>
      <BaseHeading
        :centered="false"
        :class="type.leadingDefault"
        weight="regular"
        color="dark"
        scale="zeta"
        sub
      >
        {{ activityInstance.text }}
      </BaseHeading>

      <!-- data -->
      <div :class="base.expandedWrapper">
        <BaseDataGrid :data="expandedData" :class="base.data" />
        <BaseGutterWrapper
          v-if="activityInstance.youthCentric"
          :class="base.icons"
          el="ul"
          gutter-x="xnarrow"
          gutter-y="xnarrow"
        >
          <li
            v-for="(bestPractice, index) of bestPractices"
            :key="`bp-${index}`"
            :class="base.icon"
          >
            <BestPracticeIconSelect
              :id="bestPractice.id"
              :activity-id="activityInstance.id"
              :align="index > 4 ? 'right' : 'center'"
            />
          </li>
        </BaseGutterWrapper>
      </div>

      <!-- recommendations -->
      <div
        v-if="activityRecommendations.length > 0"
        :class="space.paddingTopNarrow"
      >
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
        <ol :class="[base.recommendations]">
          <template v-for="recommendation of activityRecommendations">
            <li v-if="recommendation.text.length > 0" :key="recommendation.id">
              <BaseBodyText
                :class="color.highlight"
                :content="recommendation.text"
                size="zeta"
                font="display"
              />
            </li>
          </template>
        </ol>
      </div>
    </div>
  </li>
</template>

<script>
import BaseHeading from "@/components/BaseHeading.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseBodyText from "@/components/BaseBodyText.vue";
import BestPracticeIconSelect from "@/components/BestPracticeIconSelect.vue";
import BaseGutterWrapper from "@/components/BaseGutterWrapper.vue";
import BaseDataGrid from "@/components/BaseDataGrid.vue";
import { bestPracticeData } from "./mixins/bestPracticeData";
import { dataMethods } from "./mixins/dataMethods";
import ActivitiesItemInput from "@/components/ActivitiesItemInput.vue";

export default {
  name: "ActivitiesItemResultPrint",
  components: {
    BaseHeading,
    BaseButton,
    BestPracticeIconSelect,
    BaseGutterWrapper,
    BaseDataGrid,
    BaseBodyText,
    ActivitiesItemInput,
  },
  mixins: [bestPracticeData, dataMethods],
  props: {
    activityInstance: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeAssessments: this.activityInstance.assessments,
      recommendationText: "",
    };
  },
  computed: {
    expandedData: function () {
      return {
        [this.$t("activityTable.defaultID")]: this.activityInstance.id,
        [this.$t("activityTable.defaultBudget")]: `${
          this.activityInstance.budget
        } <small>${this.getItemValue("setup", "currencyCode")}</small>`,
        [this.$t("activityTable.defaultYouthCentered")]: this.activityInstance
          .youthCentric
          ? this.$t("yesRaw")
          : this.$t("noRaw"),
      };
    },
    recommendationsNotPresent: function () {
      return this.activityRecommendations.length === 0;
    },
    activityRecommendations: function () {
      // Get current recommendations on a given activity
      return this.$store.getters["entities/activities/query"]()
        .with("recommendations")
        .find(this.activityInstance.id).recommendations;
    },
  },
  methods: {
    getActivityRecommendations: function () {
      // Get current recommendations on a given activity
      return this.$store.getters["entities/activities/query"]()
        .with("recommendations")
        .find(this.activityInstance.id).recommendations;
    },
    getBestPracticePresence: function (bestPracticeText) {
      // Checks for the value of a best practice and shows the result, it defaults to no.
      const bestPracticeValue = this.$store.getters[
        "entities/activities/query"
      ]()
        .with("assessments", (query) => {
          query.where("text", bestPracticeText);
        })
        .find(this.activityInstance.id).assessments[0];

      if (bestPracticeValue) {
        return bestPracticeValue.value.toLowerCase();
      } else {
        return "no";
      }
    },
    addRecommendation: function () {
      // Add a new recommendation
      this.$store.dispatch("entities/recommendations/insert", {
        data: {
          activity_id: this.activityInstance.id,
          text: "",
        },
      });
    },
  },
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
@import "~styleConfig/spacing";

.wrapper {
  composes: top from "styles/borders.scss";
  composes: paddingVerticalNarrow from "styles/spacing.scss";
  display: block;
  position: relative;

  @media print {
    page-break-inside: avoid;
  }
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
  composes: midtone from "styles/color.scss";
  composes: scaleEta from "styles/type.scss";
  counter-reset: recommendations;
  padding-left: 1.2em;

  > li + li {
    padding-top: space("xnarrow");
  }
}
</style>
