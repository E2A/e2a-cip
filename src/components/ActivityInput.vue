<!--
  Activity Input component
  -> use to enter / edit activities
-->

<template>
  <section>
    <NavTimeline :class="border.bottom" :items="navItems" />
    <NavBreadcrumbs />
    <BaseSectionWrapper>
      <!--
       Activity Edit / Input Heading
      -->
      <header :class="space.paddingBottomWide">
        <BaseHeading :level="1" :class="space.paddingBottomXnarrow">
          {{ getActivityTitle() }}
        </BaseHeading>
        <BaseHeading :level="5" sub>
          {{ `${capitalize($t("for"))}: ${setupTitle}` }}
        </BaseHeading>
      </header>

      <BaseWidthWrapper>
        <!--
         Input fields
        -->
        <form :class="space.paddingVerticalBetween">
          <!-- Activity Number -->
          <BaseFormInput
            v-validate="
              `uniqueness:activityNumber,activities,${this.activityId}`
            "
            v-model="activityNumber"
            :label="`${$t('enterActivity')} ${$t('number')}`"
            :data-vv-as="`${$t('activityNumber')}`"
            :error="errors.first('activityNumber')"
            :help-text="$t('supportText.activityNumber')"
            name="activityNumber"
            @change="maybeSaveOnChange"
          />
          <!-- Activity Text -->
          <BaseFormInput
            v-validate="
              `required|uniqueness:text,activities,${this.activityId}|max:5000`
            "
            v-model="activityText"
            :label="$t('enterActivity')"
            :data-vv-as="`${$t('activityText')}`"
            :error="errors.first('activityText')"
            :help-text="$t('supportText.activityText')"
            el="textarea"
            name="activityText"
            @change="maybeSaveOnChange"
          />
          <!-- Activity Budget -->
          <BaseFormInput
            v-validate="{ regex: this.currencyRegex }"
            v-model="activityBudgetBase"
            :label="`${$t('enterActivity')} ${$t('budget')}`"
            :data-vv-as="`${$t('activityBudget')}`"
            :error="errors.first('activityBudget')"
            :help-text="$t('supportText.activityBudget')"
            :class-items="base.budgetInput"
            :prepend="`${this.getItemValue('setup', 'currencyCode')}`"
            name="activityBudget"
            @change="maybeSaveOnChange"
          />

          <!-- Youth Centric -->
          <BaseFormSwitch
            v-model="activityYouthCentric"
            :label="$t('activityYouthCentric')"
            :help-text="$t('supportText.activityYouthCentric')"
            :tooltip-text="$t('tooltipText.activityYouthCentric')"
            name="activityYouthCentric"
            type="checkbox"
            @input="maybeSaveOnChange"
          />
          <!-- Activity Type -->
          <div :class="base.activityTypeWrapper">
            <div :class="base.infoBox">
              <BaseCalloutBox
                :message="$t('activityTypeLink')"
                clickable
                @click="clickLearnMore(activityId)"
              />
            </div>
            <BaseFormSelect
              v-validate="'required'"
              v-model="activityType"
              :label="$t('selectActivityType')"
              :help-text="$t('supportText.selectActivityType')"
              :data-vv-as="`${$t('activityType')}`"
              :options="activityTypeOptions"
              :value="activityType.label"
              :searchable="false"
              :error="errors.first('activityType')"
              name="activityType"
              no-clear
              @input="maybeSaveOnChange"
            />
          </div>
        </form>

        <!-- Save/delete buttons -->
        <div
          :class="[
            space.paddingTop,
            space.marginTop,
            border.top,
            base.buttonContainer
          ]"
        >
          <BaseGutterWrapper gutterX="narrow" gutterY="narrow">
            <li :class="base.buttonWrapper">
              <BaseButton
                v-if="getActivity()"
                :label="$t('deleteActivity')"
                size="small"
                @click="deleteActivity"
              />
            </li>
          </BaseGutterWrapper>
        </div>
      </BaseWidthWrapper>
    </BaseSectionWrapper>
  </section>
</template>

<script>
import NavTimeline from "./NavTimeline.vue";
import NavBreadcrumbs from "./NavBreadcrumbs.vue";
import BaseHeading from "./BaseHeading.vue";
import BaseButton from "./BaseButton.vue";
import BaseCalloutBox from "./BaseCalloutBox.vue";
import BaseGutterWrapper from "./BaseGutterWrapper.vue";
import BaseSectionWrapper from "./BaseSectionWrapper.vue";
import BaseWidthWrapper from "./BaseWidthWrapper.vue";
import BaseFormLabel from "./BaseFormLabel.vue";
import BaseFormInput from "./BaseFormInput.vue";
import BaseFormSwitch from "./BaseFormSwitch.vue";
import BaseFormSelect from "./BaseFormSelect.vue";
import { activityTypes } from "./mixins/activityTypes";
import { activityBudget } from "./mixins/activityBudget";
import { customValidation } from "./mixins/customValidation";
import { dataMethods } from "./mixins/dataMethods";
import { stringHelpers } from "./mixins/helpers";

export default {
  name: "ActivityInput",
  components: {
    NavTimeline,
    NavBreadcrumbs,
    BaseHeading,
    BaseButton,
    BaseCalloutBox,
    BaseFormLabel,
    BaseFormInput,
    BaseFormSwitch,
    BaseGutterWrapper,
    BaseWidthWrapper,
    BaseSectionWrapper,
    BaseFormSelect
  },
  mixins: [
    activityBudget,
    activityTypes,
    customValidation,
    dataMethods,
    stringHelpers
  ],
  props: {
    activityId: {
      type: [String, Number]
    }
  },
  data() {
    return {
      currentActivityID: this.activityId,
      activityNumber: this.activityNumber,
      existingActivity: {},
      activityBudgetBase: "0",
      activityYouthCentric: false,
      setupTitle: this.getItemValue("setup", "title"),
      activityType: "",
      activityText: "",
      currentLocale: this.$i18n.locale
    };
  },
  computed: {
    currencyRegex: function() {
      const locale = this.$root.$i18n.locale;
      return locale === "en"
        ? /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/
        : /(?=.*?\d)^\$?(([1-9]\d{0,2}(\.\d{3})*)|\d+)?(,\d{1,2})?$/;
    },
    canSubmit: function() {
      const activityInstance = this.getActivity();

      return !!activityInstance;
    },
    activityTypeOptions: function() {
      return this.getActvityData().map(activityType => {
        return {
          label: activityType.title,
          value: activityType.key
        };
      });
    },
    navItems: function() {
      return this.getAllActivities().map(activity => {
        return {
          id: activity.id,
          label: activity.shortText,
          url: { name: "activity", params: { activityId: activity.id } }
        };
      });
    }
  },
  created() {
    this.$eventHub.$on("addActivity", this.addActivity);
    this.updateData();
  },
  updated() {
    if (this.currentLocale !== this.$i18n.locale) {
      this.currentLocale = this.$i18n.locale;

      // update budget and change BaseFormInput's value
      this.activityBudgetBase = this.getLocalizedBudget(
        this.activityBudgetBase
      );
      document.getElementById("activityBudget").value = this.activityBudgetBase;
    }
  },
  methods: {
    clickLearnMore: function(activityId) {
      let routeData = this.$router.resolve({
        name: "activity-type-info",
        params: { backToActivityId: activityId }
      });

      if (this.checkElectron()) {
        this.$router.push({
          name: "activity-type-info",
          params: { backToActivityId: activityId }
        });
      } else {
        window.open(routeData.href, "_blank");
      }
    },
    maybeSaveOnChange: function() {
      // only submit if an activity is already present
      if (this.canSubmit) {
        this.addActivity();
      }

      if (this.activityType.value && this.activityNumber) {
        this.informParent(true);
      }
    },
    informParent: function(bool) {
      // Tells parent whether the form is complete or not.
      this.$emit("changed", bool);
    },
    getAllActivities: function() {
      return this.$store.getters["entities/activities/all"]();
    },
    getActivityTitle: function() {
      const activityInstance = this.getActivity();
      if (activityInstance) {
        return this.$t("editActivity");
      } else {
        return this.$t("addActivity");
      }
    },
    updateData: function() {
      // Update component data
      const activityInstance = this.getActivity();
      if (activityInstance && activityInstance.type) {
        this.existingActivity = activityInstance;
        this.activityBudgetBase = this.getLocalizedBudget(
          activityInstance.budget
        );
        this.activityYouthCentric = activityInstance.youthCentric;
        this.activityType = {
          label: this.activityTypeOptions.find(option => {
            return option.value === activityInstance.type;
          }).label,
          value: activityInstance.type
        };
        this.currentActivityID = this.activityId;
        this.activityText = activityInstance.text;
        this.activityNumber = activityInstance.activityNumber;
        this.informParent(true);
        return;
      }
      this.currentActivityID = this.activityId;
      this.existingActivity = {};
      this.activityBudgetBase = null;
      this.activityYouthCentric = false;
      this.activityType = "";
      this.activityText = "";
      this.activityNumber = "";
      this.informParent(false);
    },
    clearForm: function() {
      this.currentActivityID = this.activityId;
      this.existingActivity = {};
      this.activityBudgetBase = null;
      this.activityYouthCentric = false;
      this.activityType = "";
      this.activityText = "";
      this.activityNumber = "";
    },
    isFilled: function() {
      if (this.activityType.value && this.activityNumber && this.activityText) {
        return true;
      }
    },
    getActivity: function(field = "") {
      const activityInstance = this.$store.getters["entities/activities/find"](
        this.activityId
      );
      if (activityInstance && field) {
        return activityInstance[`${field}`];
      } else if (activityInstance) {
        return activityInstance;
      } else {
        return null;
      }
    },
    addActivity: function() {
      // Add or update activity
      const activityInstance = this.getActivity();
      this.$validator.validate().then(result => {
        // If valid, add or update activity, else show errors.
        if (result) {
          if (activityInstance) {
            this.$store.dispatch("entities/activities/update", {
              id: Number(this.activityId),
              text: this.activityText,
              budget: +this.getLocalizedBudget(this.activityBudgetBase),
              youthCentric: this.activityYouthCentric,
              type: this.activityType.value,
              activityNumber: this.activityNumber
            });
          } else if (this.isFilled()) {
            this.$store.dispatch("entities/activities/insert", {
              data: {
                text: this.activityText,
                budget: +this.getLocalizedBudget(this.activityBudgetBase),
                youthCentric: this.activityYouthCentric,
                type: this.activityType.value,
                activityNumber: this.activityNumber
              }
            });
          }
          this.notify(this.$root.$t("saveSuccess"), "success");
          this.updateData();
        }
      });
    },
    deleteActivity: function() {
      this.$store.dispatch(
        "entities/activities/delete",
        Number(this.activityId)
      );
      this.notify(this.$t("deleteSuccess"), "success");
      // todo go to new activity page
    }
  }
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/borders.scss" lang="scss" module="border"></style>

<style lang="scss" module="base">
@import "~bourbon/core/bourbon";
@import "~styleConfig/breakpoints";
@import "~styleConfig/spacing";
@import "~styleConfig/color";

$budgetSelectWidth: 160px;

.buttonWrapper {
  display: inline-block;
}

.activityTypeWrapper {
  @include clearfix;
}

.buttonContainer {
  text-align: right;
}

.infoBox {
  display: block;
  padding-bottom: space("narrow");

  @include media(">small") {
    float: right;
    max-width: 25rem;
    padding-bottom: 0;
  }
}

.budgetSelectWrapper {
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
}

.budgetSelect {
  height: 2.9rem;

  :global {
    .vs__dropdown-toggle {
      height: 2.9rem;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
