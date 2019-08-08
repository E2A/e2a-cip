<template>
  <NavFooter
    :leftButtons="this.getNavButtons().left"
    :rightButtons="this.getNavButtons().right"
  >
    <ActivityInput
      :activityId="activityId"
      ref="activityInput"
      :key="this.getLastItem()"
      @changed="setFill"
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
      nextActivity: this.getNextActivity(),
      formFilled: false
    }
  },
  methods: {
    setFill: function (value) {
      this.formFilled = value
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
            role: this.formFilled ? 'primary' : 'default'
          }
        )
      }

      return navButtons
    }
  }
}
</script>
