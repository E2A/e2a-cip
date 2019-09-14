<!--
  Activity Input component
  -> use to enter / edit activities
-->

<template>
  <section>
    <NavTimeline :class="border.bottom" :items="navItems" :current="activityId" />
    <NavBreadcrumbs />
    <BaseSectionWrapper>
      <!--
       Activity Edit / Input Heading
      -->
      <header :class="space.paddingBottomWide">
        <BaseHeading :level="1" :class="space.paddingBottomXnarrow">{{getActivityTitle()}}</BaseHeading>
        <BaseHeading :level="5" sub>{{`${capitalize($t('for'))}: ${setupTitle}`}}</BaseHeading>
      </header>

      <BaseWidthWrapper>
        <!--
         Input fields
        -->
        <form :class="space.paddingVerticalBetween">
          <!-- Activity Number -->
          <BaseFormInput
            v-validate="`uniqueness:activityNumber,activities,${this.activityId}`"
            v-model="activityNumber"
            :label="`${$t('enterActivity')} ${$t('number')}`"
            :data-vv-as="`${$t('activityNumber')}`"
            :error="errors.first('activityNumber')"
            name="activityNumber"
            :helpText="$t('supportText.activityNumber')"
            @change="saveOnChange"
          />
          <!-- Activity Text -->
          <BaseFormInput
            v-validate="`required|uniqueness:text,activities,${this.activityId}|max:5000`"
            v-model="activityText"
            :label="$t('enterActivity')"
            :data-vv-as="`${$t('activityText')}`"
            :error="errors.first('activityText')"
            el="textarea"
            name="activityText"
            :helpText="$t('supportText.activityText')"
            @change="saveOnChange"
          />
          <!-- Activity Budget -->
          <BaseFormInput
            v-model="activityBudgetBase"
            v-validate="'decimal'"
            :label="`${$t('enterActivity')} ${$t('budget')}`"
            :data-vv-as="`${$t('activityBudget')}`"
            :error="errors.first('activityBudget')"
            name="activityBudget"
            :helpText="$t('supportText.activityBudget')"
            @change="saveOnChange"
            :classItems="base.budgetInput"
            :prepend="`${this.getItemValue('setup', 'currencyCode')}`"
          >
            <div :class="base.budgetSelectWrapper">
              <BaseFormSelect
                v-model="activityBudgetScale"
                v-validate="'required'"
                :options="budgetScaleOptions"
                :value="activityType.label"
                name="activityBudgetScale"
                :class="base.budgetSelect"
                @input="saveOnChange"
                noClear
              />
            </div>
          </BaseFormInput>

          <!-- Youth Centric -->
          <BaseFormSwitch
            v-model="activityYouthCentric"
            :label="$t('activityYouthCentric')"
            :helpText="$t('supportText.activityYouthCentric')"
            :tooltipText="$t('tooltipText.activityYouthCentric')"
            name="activityYouthCentric"
            type="checkbox"
            @input="saveOnChange"
          />
          <!-- Activity Type -->
          <div :class="base.activityTypeWrapper">
            <div :class="base.infoBox">
              <BaseCalloutBox
                @click="clickLearnMore(activityId)"
                :message="$t('activityTypeLink')"
                clickable
              />
            </div>
            <BaseFormSelect
              v-model="activityType"
              v-validate="'required'"
              :label="$t('selectActivityType')"
              :helpText="$t('supportText.selectActivityType')"
              :data-vv-as="`${$t('activityType')}`"
              :options="activityTypeOptions"
              :value="activityType.label"
              :searchable="false"
              :error="errors.first('activityType')"
              name="activityType"
              @input="saveOnChange"
              noClear
            />
          </div>
        </form>

        <!-- Save/delete buttons -->
        <div :class="[space.paddingTop, space.marginTop, border.top, base.buttonContainer]">
          <BaseGutterWrapper gutterX="narrow" gutterY="narrow">
            <li :class="base.buttonWrapper" v-if="getActivity()">
              <BaseButton
                @click="addActivity"
                :label="$t('save')"
                size="small"
                :role="'primary'"
              />
            </li>
            <li :class="base.buttonWrapper" v-if="!getActivity()">
              <BaseButton
                @click="addActivity"
                :label="$t('save')"
                size="small"
                :role="'primary'"
              />
            </li>
            <li :class="base.buttonWrapper">
              <BaseButton
                v-if="getActivity()"
                @click="deleteActivity"
                :label="$t('deleteActivity')"
                size="small"
              />
            </li>
          </BaseGutterWrapper>
        </div>
      </BaseWidthWrapper>
    </BaseSectionWrapper>
  </section>
</template>

<script>
import NavTimeline from './NavTimeline.vue'
import NavBreadcrumbs from './NavBreadcrumbs.vue'
import BaseHeading from './BaseHeading.vue'
import BaseButton from './BaseButton.vue'
import BaseCalloutBox from './BaseCalloutBox.vue'
import BaseGutterWrapper from './BaseGutterWrapper.vue'
import BaseSectionWrapper from './BaseSectionWrapper.vue'
import BaseWidthWrapper from './BaseWidthWrapper.vue'
import BaseFormLabel from './BaseFormLabel.vue'
import BaseFormInput from './BaseFormInput.vue'
import BaseFormSwitch from './BaseFormSwitch.vue'
import BaseFormSelect from './BaseFormSelect.vue'
import { activityTypes } from './mixins/activityTypes'
import { activityBudget } from './mixins/activityBudget'
import { customValidation } from './mixins/customValidation'
import { dataMethods } from './mixins/dataMethods'
import { stringHelpers } from './mixins/helpers'

export default {
  name: 'ActivityInput',
  mixins: [
    activityBudget,
    activityTypes,
    customValidation,
    dataMethods,
    stringHelpers
  ],
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
  props: {
    activityId: {
      type: [String, Number]
    }
  },
  computed: {
    canSubmit: function() {
      const activityInstance = this.getActivity();

      return !! activityInstance;
    },
    activityTypeOptions: function () {
      return this.getActvityData().map(activityType => {
        return {
          label: activityType.title,
          value: activityType.key
        }
      })
    },
    budgetScaleOptions: function () {
      return this.getBudgetScales().map(budgetScale => {
        return {
          label: budgetScale.title,
          value: budgetScale.key
        }
      })
    },
    navItems: function () {
      return this.getAllActivities().map(activity => {
        return {
          id: activity.id,
          label: activity.shortText,
          url: { name: 'activity', params: { activityId: activity.id } }
        }
      })
    }
  },
  data () {
    return {
      currentActivityID: this.activityId,
      activityNumber: this.activityNumber,
      existingActivity: {},
      activityBudgetBase: 0,
      activityBudgetScale: '',
      activityYouthCentric: false,
      setupTitle: this.getItemValue('setup', 'title'),
      activityType: '',
      activityText: ''
    }
  },
  methods: {
    clickLearnMore: function(activityId) {
      let routeData = this.$router.resolve({
        name: 'activity-type-info',
        params: { backToActivityId: activityId }
      });
      window.open(routeData.href, '_blank');
    },
    saveOnChange: function () {
      if (this.canSubmit) {
        this.addActivity(false)
      } else {
        this.informParent(false)
      }
    },
    informParent: function (bool) {
      // Tells parent whether the form is complete or not.
      this.$emit('changed', bool, this.activityId)
    },
    getAllActivities: function () {
      return this.$store.getters['entities/activities/all']()
    },
    getActivityTitle: function () {
      const activityInstance = this.getActivity()
      if (activityInstance) {
        return this.$t('editActivity')
      } else {
        return this.$t('addActivity')
      }
    },
    getBudgetScale: function (budget) {
      const magnitude =
        budget >= 1e9
          ? 1e9 // billion
          : budget >= 1e6
            ? 1e6 // million
            : 1e3 // thousand

      return {
        label: this.budgetScaleOptions.find(scale => {
          return scale.value === magnitude
        }).label,
        value: magnitude
      }
    },
    updateData: function () {
      // Update component data
      const activityInstance = this.getActivity()
      if (activityInstance) {
        this.existingActivity = activityInstance
        this.activityBudgetScale =
          this.activityBudgetScale ||
          this.getBudgetScale(activityInstance.budget)
        this.activityBudgetBase =
          activityInstance.budget / this.activityBudgetScale.value
        this.activityYouthCentric = activityInstance.youthCentric
        this.activityType = {
          label: this.activityTypeOptions.find(option => {
            return option.value === activityInstance.type
          }).label,
          value: activityInstance.type
        }
        this.currentActivityID = this.activityId
        this.activityText = activityInstance.text
        this.activityNumber = activityInstance.activityNumber
        this.informParent(false)
        return
      }
      this.currentActivityID = this.activityId
      this.existingActivity = {}
      this.activityBudgetBase = null
      this.activityBudgetScale = this.budgetScaleOptions[0]
      this.activityYouthCentric = false
      this.activityType = ''
      this.activityText = ''
      this.activityNumber = ''
      this.informParent(false)
    },
    clearForm: function() {
      this.currentActivityID = this.activityId
      this.existingActivity = {}
      this.activityBudgetBase = null
      this.activityBudgetScale = this.budgetScaleOptions[0]
      this.activityYouthCentric = false
      this.activityType = ''
      this.activityText = ''
      this.activityNumber = ''
    },
    getActivity: function (field = '') {
      const activityInstance = this.$store.getters['entities/activities/find'](
        this.activityId
      )
      if (activityInstance && field) {
        return activityInstance[`${field}`]
      } else if (activityInstance) {
        return activityInstance
      } else {
        return null
      }
    },
    addActivity: function (informParent = true) {
      // Add or update activity
      const activityInstance = this.getActivity()
      
      this.$validator.validate().then(result => {
        // If valid, add or update activity, else show errors.
        if (result) {
          if (activityInstance) {
            this.$store.dispatch('entities/activities/update', {
              id: Number(this.activityId),
              text: this.activityText,
              budget: this.activityBudgetBase * this.activityBudgetScale.value,
              youthCentric: this.activityYouthCentric,
              type: this.activityType.value,
              activityNumber: this.activityNumber
            })
          } else {
            this.$store.dispatch('entities/activities/insert', {
              data: {
                text: this.activityText,
                budget: this.activityBudgetBase * this.activityBudgetScale.value,
                youthCentric: this.activityYouthCentric,
                type: this.activityType.value,
                activityNumber: this.activityNumber
              }
            })
          }
          this.informParent(informParent);
          this.notify(this.$t('saveSuccess'), 'success')
          this.updateData()
        }
      })
    },
    deleteActivity: function () {
      this.$store.dispatch(
        'entities/activities/delete',
        Number(this.activityId)
      )
      this.notify(this.$t('deleteSuccess'), 'success')
      // todo go to new activity page
    }
  },
  created () {
    this.updateData()
  }
}
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
      border-bottom: none;
    }
  }
}
</style>
