<!--
  Result Input component
  -> use to add an recommendation to an activity
  -> part of Activity List
-->

<template>
  <li class="ActivityRecommendationInput">
      <input @change="updateRecommendation()" v-model="recommendationText" :placeholder="$t('enterSuggestion')">
  </li>
</template>

<script>
// @ is an alias to /src
import BaseHeading from '@/components/BaseHeading.vue'

export default {
  name: 'ActivityRecommendationInput',
  components: {
    BaseHeading
  },
  props: {
    'activityInstance': {
      type: Object,
      required: true
    },
    'recommendationId': {
      type: Number,
      required: true
    },
    'existingRecommendationText': {
      type: String,
      required: true
    }
  },
  data () {
    return {
      activityRecommendations: this.activityInstance.recommendations,
      recommendationText: this.existingRecommendationText
    }
  },
  methods: {
    updateRecommendation: function () {
      // Update recommendation
      this.$store.dispatch('entities/recommendations/update', {
        id: this.recommendationId,
        activity_id: this.activityInstance.id,
        text: this.recommendationText
      })
    }
  }
}
</script>
