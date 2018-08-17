<template>
  <NavFooter
    :leftButtons="this.getNavButtons().left"
    :rightButtons="this.getNavButtons().right"
  >
    <ActivityInput
      :activityId="activityId"
      ref="activityInput"
      :key="this.getLastItem()"
    />
  </NavFooter>
</template>

<script>
import ActivityInput from '@/components/ActivityInput.vue'
import ClearItems from '@/components/ClearItems.vue'
import NavFooter from '@/components/NavFooter.vue'
import { dataMethods } from '@/components/mixins/dataMethods'

export default {
  name: 'Activity',
  mixins: [dataMethods],
  components: {
    ActivityInput,
    ClearItems,
    NavFooter
  },
  props: {
    'activityId': [String, Number]
  },
  data: function () {
    return {
      nextActivity: this.getNextActivity()
    }
  },
  methods: {
    getNavButtons: function () {
      var navButtons = {
        left: [
          {
            to: {name: 'home'},
            label: this.$t('goBack')
          }
        ],
        right: [

        ]
      }

      if (this.getItemCount('activities') > 0) {
        navButtons.right.push(
          {
            to: {name: 'activity', params: {activityId: this.getNextActivity()}},
            label: this.$t('inputNextActivity')
          },
          {
            to: {name: 'summary'},
            label: this.$t('activitiesDone'),
            role: 'primary'
          }
        )
      }

      return navButtons
    }
  }
}
</script>
