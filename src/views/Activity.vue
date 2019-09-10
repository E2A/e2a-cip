<template>
  <NavFooter
    :leftButtons="this.getNavButtons().left"
    :rightButtons="this.getNavButtons().right"
  >
    <ActivityInput
      :activityId="currentActivity"
      ref="activityInput"
      :key="this.getLastItem()"
      @changed="trackValidation"
    />
  </NavFooter>
</template>

<script>
import ActivityInput from '@/components/ActivityInput.vue'
import NavFooter from '@/components/NavFooter.vue'
import { dataMethods } from '@/components/mixins/dataMethods'

export default {
  name: 'Activity',
  mixins: [dataMethods],
  components: {
    ActivityInput,
    NavFooter
  },
  props: {
    'activityId': [String, Number]
  },
  computed: {
    nextActivity: function () {
      return this.getNextActivity
    },
    currentActivity: function () {
      return this.$props.activityId || this.nextActivity()
    }
  },
  data: function () {
    return {
      isFormFilled: false
    }
  },
  methods: {
    trackValidation: function (value) {
      this.isFormFilled = value

      // When on "/plan/activity" with no param, and form is filled out, go to the new activity
      if (value && (typeof this.$router.history.current.params.activityId !== 'string')) {
        this.travelToActivity()
      }
    },
    travelToActivity: function () {
      const yOffset = window.pageYOffset
      this.$router.push({ name: 'activity', params: { activityId: this.getNextActivity() - 1 } })
      window.scrollTo = yOffset // keep scroll position
    },
    getNavButtons: function () {
      var navButtons = {
        left: [
          {
            to: { name: 'setup' },
            label: this.$t('goBack')
          }
        ],
        right: []
      }

      if (this.getItemCount('activities') > 0) {
        navButtons.right.push(
          {
            to: { name: 'activity', params: { activityId: this.getNextActivity() } },
            label: this.$t('inputNextActivity'),
            iconLeft: 'add',
            iconRight: 'none'
          },
          {
            to: { name: 'summary' },
            label: this.$t('activitiesDone'),
            role: this.isFormFilled ? 'primary' : 'default'
          }
        )
      }

      return navButtons
    }
  }
}
</script>
