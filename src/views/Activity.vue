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
      console.log('next', this.nextActivity())
      console.log('initial', 1)
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
  methods: {
    trackValidation: function (value, activityId) {
      this.isFormFilled = value
      // Go to completed activity on save
      if (value && activityId) {
        this.travelToActivity(activityId)
      }
    },
    travelToActivity: function (activityId) {
      const yOffset = window.pageYOffset
      // If first activity
      if (!this.$router.history.current.params.activityId) {
        activityId = activityId - 1;
      } 

      if (this.$router.history.current.params.activityId !== activityId) {
        this.$router.push({ name: 'activity', params: { activityId: activityId } })
      }
      
      window.scroll(0, yOffset) // keep scroll position
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

      if (this.getItemCount('activities') > 0) {
        navButtons.right.push(
          {
            to: { name: 'activity' },
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
