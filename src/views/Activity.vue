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
      :canSubmit="isFormFilled"
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
      isFormFilled: false,
      previousRoute: null,
    }
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      vm.previousRoute = from
    })
  },
  created: function() {
    this.$store.commit('SET_PROGRESS', {activities: true})
  },
  methods: {
    trackValidation: function (value, activityId) {
      // Go to completed activity on save
      if (value && activityId) {
        // this.isFormFilled = value
        this.travelToActivity(activityId)
      }
    },
    travelToActivity: function (activityId) {
      const yOffset = window.pageYOffset
      window.scroll(0, 0) // move to top of form
    },
    goBack: function() {
      if (this.previousRoute) {
        return this.previousRoute
      }

      return { 'name': 'setup' }
    },
    getNavButtons: function () {
      var navButtons = {
        left: [
          {
            // to: { name: 'setup' },
            to: this.goBack(),
            label: this.$t('goBack')
          }
        ],
        right: []
      }

      if (this.$props.activityId) {
        navButtons.right.push(
          {
            to: { name: 'activity' },
            label: this.$t('inputNextActivity'),
            iconLeft: 'add',
            iconRight: 'none'
          },
        )
      }

      navButtons.right.push(
        {
            to: { name: 'summary' },
            label: this.$t('saveAndContinue'),
            role: this.isFormFilled ? 'primary' : 'default'
          }
      )

      return navButtons
    }
  }
}
</script>
