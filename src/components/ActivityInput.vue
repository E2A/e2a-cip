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
          <BaseFormInput
            v-validate="`uniqueness:activityNumber,activities,${this.activityId}`"
            v-model='activityNumber'
            :label="`${$t('enterActivity')} ${$t('number')}`"
            :data-vv-as="`${$t('activityNumber')}`"
            :error="errors.first('activityNumber')"
            name="activityNumber"
            :helpText="$t('supportText.activityNumber')"
          />
          <BaseFormInput
            v-validate="`required|uniqueness:text,activities,${this.activityId}`"
            v-model="activityText"
            :label="$t('enterActivity')"
            :data-vv-as="`${$t('activityText')}`"
            :error="errors.first('activityText')"
            el="textarea"
            name="activityText"
            :helpText="$t('supportText.activityText')"
          />
          <BaseFormInput
            v-model="activityBudget"
            v-validate="'numeric'"
            :label="`${$t('enterActivity')} ${$t('budget')}`"
            :data-vv-as="`${$t('activityBudget')}`"
            :error="errors.first('activityBudget')"
            name="activityBudget"
            :helpText="$t('supportText.activityBudget')"
          />

          <BaseFormLabel
            id="checkbox"
            :label="$t('activityYouthCentric')"
            :helpText="$t('supportText.activityYouthCentric')"
          >
            <input
              name='activityYouthCentric'
              type='checkbox'
              id="checkbox"
              v-model="activityYouthCentric"
            >
          </BaseFormLabel>

          <BaseFormLabel
            :label="$t('selectActivityType')"
            id="activityType"
            :helpText="$t('supportText.selectActivityType')"
          >
            <BaseSelectValidation
              v-model="activityType"
              :value="activityType"
              v-validate="'required'"
              :data-vv-as="`${$t('activityType')}`"
              name="activityType"
              :options="activityTypeOptions"
              :searchable="false"
              classItems="no-clear"
              :error="errors.first('activityType')"
            />
            <div :class="space.paddingTopXxnarrow">
              <router-link :to="{name: 'activity-type-info', params: { backToActivityId: activityId }}">( i ) {{$t('activityTypeLink')}}</router-link>
            </div>
          </BaseFormLabel>
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
                v-if="this.getActivity()"
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
import BaseGutterWrapper from './BaseGutterWrapper.vue'
import BaseSectionWrapper from './BaseSectionWrapper.vue'
import BaseWidthWrapper from './BaseWidthWrapper.vue'
import BaseFormLabel from './BaseFormLabel.vue'
import BaseFormInput from './BaseFormInput.vue'
import BaseSelectValidation from './BaseSelectValidation.vue'
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
    BaseFormLabel,
    BaseFormInput,
    BaseGutterWrapper,
    BaseWidthWrapper,
    BaseSectionWrapper,
    BaseSelectValidation
  },
  props: {
    activityId: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    navItems: function () {
      return this.getAllActivities().map(activity => {
        return {
          id: activity.id,
          label: activity.shortText,
          url: {name: 'activity', params: {activityId: activity.id}}
        }
      })
    },
    // FPO for styling
    fakeNavItems: function () {
      let items = []

      for (let i = 0; i < 25; i++) {
        items.push({
          id: i,
          label: 'Lorem ipsum dolor sit amet',
          url: '/test'
        })
      }

      return items
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
      activityText: '',
      activityTypeOptions: this.getActvityData().map(item => item.title)
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
        this.activityType = activityInstance.type
        this.currentActivityID = this.activityId
        this.activityText = activityInstance.text
        this.activityNumber = activityInstance.activityNumber
      } else {
        this.currentActivityID = this.activityId
        this.existingActivity = {}
        this.activityBudget = 0
        this.activityYouthCentric = false
        this.activityType = ''
        this.activityText = ''
        this.activityNumber = this.activityId
      }
    },
    getActivity: function (field = '') {
      const activityInstance = this.$store.getters['entities/activities/find'](this.activityId)
      if (activityInstance && field) {
        return activityInstance[`${field}`]
      } else if (activityInstance) {
        return activityInstance
      } else {
        return false
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
              type: this.activityType,
              activityNumber: this.activityNumber
            })
          } else {
            this.$store.dispatch('entities/activities/insert', {
              data: {
                text: this.activityText,
                budget: this.activityBudget,
                youthCentric: this.activityYouthCentric,
                type: this.activityType,
                activityNumber: this.activityNumber
              }
            })
          }
          this.updateData()
        }
      })
    },
    deleteActivity: function () {
      this.$store.dispatch('entities/activities/delete', Number(this.activityId))
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
.buttonWrapper {
  display: inline-block;
}
</style>
