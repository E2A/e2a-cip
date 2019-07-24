<!--
  Activity Input component
  -> use to enter / edit activities
-->

<template>
  <section>
    <NavTimeline
      :class="border.bottom"
      :items="navItems"
      :current="activityId"
    />
    <BaseSectionWrapper>
      <!--
       Activity Edit / Input Heading
      -->
      <header :class="space.paddingBottomWide">
        <BaseHeading
          :level="1"
          :class="space.paddingBottomXnarrow">
          {{getActivityTitle()}}
        </BaseHeading>
        <BaseHeading
          :level="5"
          sub
        >
          {{`${capitalize($t('for'))}: ${setupTitle}`}}
        </BaseHeading>
      </header>

      <BaseWidthWrapper>
        <!--
         Input fields
        -->
        <form :class="space.paddingVerticalBetween">
          <!-- Activity Number -->
          <BaseFormInput
            v-validate="`required|uniqueness:activityNumber,activities,${this.activityId}`"
            v-model='activityNumber'
            :label="`${$t('enterActivity')} ${$t('number')}`"
            :data-vv-as="`${$t('activityNumber')}`"
            :error="errors.first('activityNumber')"
            name="activityNumber"
            :helpText="$t('supportText.activityNumber')"
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
          />
          <!-- Activity Budget -->
          <BaseFormInput
            v-model="activityBudget"
            v-validate="'numeric'"
            :label="`${$t('enterActivity')} ${$t('budget')}`"
            :data-vv-as="`${$t('activityBudget')}`"
            :error="errors.first('activityBudget')"
            name="activityBudget"
            :helpText="$t('supportText.activityBudget')"
          />

          <!-- Youth Centric -->
          <BaseFormSwitch
            v-model="activityYouthCentric"
            :label="$t('activityYouthCentric')"
            :helpText="$t('supportText.activityYouthCentric')"
            name="activityYouthCentric"
            type="checkbox"
          />
          <!-- Activity Type -->
          <div :class="base.activityTypeWrapper">
            <div :class="base.infoBox">
              <BaseCalloutBox
                @click="$router.push({
                  name: 'activity-type-info',
                  params: { backToActivityId: activityId }
                })"
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
              noClear
            />
          </div>
        </form>

        <!-- Save/delete buttons -->
        <div :class="[space.paddingTop, space.marginTop, border.top]">
          <BaseGutterWrapper
            gutterX="narrow"
            gutterY="narrow"
          >
            <li :class="base.buttonWrapper">
              <BaseButton
                @click="addActivity"
                :label="$t('save')"
                size="small"
                role="primary"
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
import { customValidation } from './mixins/customValidation'
import { dataMethods } from './mixins/dataMethods'
import { stringHelpers } from './mixins/helpers'

export default {
  name: 'ActivityInput',
  mixins: [activityTypes, customValidation, dataMethods, stringHelpers],
  components: {
    NavTimeline,
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
      type: [String, Number],
      required: true
    }
  },
  computed: {
    activityTypeOptions: function () {
      return this.getActvityData().map(activityType => {
        return {
          label: activityType.title,
          value: activityType.key
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
      activityNumber: this.activityId,
      existingActivity: {},
      activityBudget: 0,
      activityYouthCentric: false,
      setupTitle: this.getItemValue('setup', 'title'),
      activityType: '',
      activityText: ''
    }
  },
  methods: {
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
    updateData: function () {
      // Update component data
      const activityInstance = this.getActivity()
      if (activityInstance) {
        this.existingActivity = activityInstance
        this.activityBudget = activityInstance.budget
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
        return
      }
      this.currentActivityID = this.activityId
      this.existingActivity = {}
      this.activityBudget = 0
      this.activityYouthCentric = false
      this.activityType = ''
      this.activityText = ''
      this.activityNumber = ''
    },
    getActivity: function (field = '') {
      const activityInstance = this.$store.getters['entities/activities/find'](this.activityId)
      if (activityInstance && field) {
        return activityInstance[`${field}`]
      } else if (activityInstance) {
        return activityInstance
      } else {
        return null
      }
    },
    addActivity: function () {
      // Add or update activity
      const activityInstance = this.getActivity()

      this.$validator.validate().then(result => {
        // If valid, add or update activity, else show errors.
        if (result) {
          if (activityInstance) {
            this.$store.dispatch('entities/activities/update', {
              id: Number(this.activityId),
              text: this.activityText,
              budget: this.activityBudget,
              youthCentric: this.activityYouthCentric,
              type: this.activityType.value,
              activityNumber: this.activityNumber
            })
          } else {
            this.$store.dispatch('entities/activities/insert', {
              data: {
                text: this.activityText,
                budget: this.activityBudget,
                youthCentric: this.activityYouthCentric,
                type: this.activityType.value,
                activityNumber: this.activityNumber
              }
            })
          }
          this.notify(this.$t('saveSuccess'), 'success')
          this.updateData()
        }
      })
    },
    deleteActivity: function () {
      this.$store.dispatch('entities/activities/delete', Number(this.activityId))
      this.notify(this.$t('deleteSuccess'), 'success')
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
@import '~bourbon/core/bourbon';
@import '~styleConfig/breakpoints';
@import '~styleConfig/spacing';

.buttonWrapper {
  display: inline-block;
}

.activityTypeWrapper {
  @include clearfix;
}

.infoBox {
  display: block;
  padding-bottom: space('narrow');

  @include media('>small') {
    float: right;
    max-width: 25rem;
    padding-bottom: 0;
  }
}
</style>
