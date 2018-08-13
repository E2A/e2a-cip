<!--
  Activity Input component
  -> use to enter / edit activities
-->

<template>
  <section>
    <!-- Dot nav of activities -->
    <!-- This should really be in its own component -->
    <nav :class="[border.bottom, space.paddingNarrow]">
      <ul v-for="(activity, index) in activities = getAllActivities()" :key="index">
        <li><router-link :to="{name: 'activity', params: { activityId: activity.id }}">{{activity.shortText}}</router-link></li>
      </ul>
      <p><strong>{{getItemCount('activities')}}</strong> {{$t('activities')}}</p>
      <FileUpload :exportType="['Export']" />
    </nav>

    <BaseSectionWrapper>
      <!--
       Activity Edit / Input Heading
      -->
      <header :class="space.paddingBottomWide">
        <BaseHeading :level="1" :class="space.paddingBottomXnarrow">{{getActivityTitle()}}</BaseHeading>
        <BaseHeading :level="5" :sub="true">{{`${capitalize($t('for'))}: ${getItemValue('setup', 'title')}`}}</BaseHeading>
      </header>

      <BaseWidthWrapper>
        <!--
         Errors
        -->
        <div v-if="errors" class="errors">
          <span>{{ errors.first('activityNumber') }}</span>
          <span>{{ errors.first('activityText') }}</span>
          <span>{{ errors.first('activityBudget') }}</span>
          <span>{{ errors.first('activityYouthCentric') }}</span>
          <span>{{ errors.first('activityType') }}</span>
        </div>
        <!--
         Input fields
        -->
        <form :class="space.paddingVerticalBetween">
          <BaseFormInput
            :label="`${$t('enterActivity')} ${$t('number')}`"
            name="activityNumber"
            v-validate="`uniqueness:activityNumber,activities,${this.activityId}`"
            :data-vv-as="`${$t('activityNumber')}`"
            v-model='activityNumber'
            :error="errors.first('activityNumber')"
          />
          <BaseFormInput
            :label="$t('enterActivity')"
            name="activityText"
            v-validate="`required|uniqueness:text,activities,${this.activityId}`"
            v-model="activityText"
            :data-vv-as="`${$t('activityText')}`"
            :error="errors.first('activityText')"
          />
          <BaseFormInput
            :label="`${$t('enterActivity')} ${$t('budget')}`"
            name="activityBudget"
            v-model="activityBudget"
            v-validate="'required|numeric'"
            :data-vv-as="`${$t('activityBudget')}`"
            :error="errors.first('activityBudget')"
          />

          <BaseFormLabel
            id="checkbox"
            :label="$t('activityYouthCentric')"
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
          >
            <select
              v-validate="'required'"
              :data-vv-as="`${$t('activityType')}`"
              name='activityType'
              v-model="activityType"
            >
              <option v-for="(type, index) in activityTypeDataset" v-bind:value="type.title" :key="index">
                {{ type.title }}
              </option>
            </select>
            <router-link :to="{name: 'activity-type-info', params: { backToActivityId: activityId }}">{{$t('activityTypeLink')}}</router-link>
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
                label="Save Activity"
                size="small"
              />
            </li>
            <li :class="base.buttonWrapper">
              <BaseButton
                v-if="this.getActivity()"
                @click="deleteActivity"
                label="Delete"
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
// @ is an alias to /src
import BaseHeading from '@/components/BaseHeading.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseGutterWrapper from '@/components/BaseGutterWrapper.vue'
import BaseSectionWrapper from '@/components/BaseSectionWrapper.vue'
import BaseWidthWrapper from '@/components/BaseWidthWrapper.vue'
import BaseFormLabel from '@/components/BaseFormLabel.vue'
import BaseFormInput from '@/components/BaseFormInput.vue'
import FileUpload from '@/components/FileUpload.vue'
import { activityTypes } from './mixins/activityTypes'
import { customValidation } from './mixins/customValidation'
import { dataMethods } from './mixins/dataMethods'
import { stringHelpers } from './mixins/helpers'

export default {
  name: 'ActivityInput',
  mixins: [activityTypes, customValidation, dataMethods, stringHelpers],
  components: {
    BaseHeading,
    BaseButton,
    BaseFormLabel,
    BaseFormInput,
    FileUpload,
    BaseGutterWrapper,
    BaseWidthWrapper,
    BaseSectionWrapper
  },
  props: {
    'activityId': {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      currentActivityID: this.activityId,
      activityNumber: this.activityId,
      existingActivity: {},
      activityBudget: null,
      activityYouthCentric: false,
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
        this.activityType = activityInstance.type
        this.currentActivityID = this.activityId
        this.activityText = activityInstance.text
        this.activityNumber = activityInstance.activityNumber
      } else {
        this.currentActivityID = this.activityId
        this.existingActivity = {}
        this.activityBudget = null
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
