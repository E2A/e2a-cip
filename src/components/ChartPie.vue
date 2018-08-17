<template>
  <div>
    <BaseHeading
      scale="delta"
      sub
    >
      {{title}}
    </BaseHeading>
    <div v-if="this.getItemCount('activities') > 0" id="activityTypeCount"></div>

    <!-- Chart Labels -->
    <ul :class="base.legend">
      <li
        v-for="(label, index) of legend"
        :key="`aCount-${index}`"
      >
        <span :class="label.class">{{label.countPercent*100}}%</span>{{label.type}}
      </li>
    </ul>
  </div>
</template>

<script>
import BaseHeading from './BaseHeading.vue'

export default {
  name: 'ChartPie',
  props: {
    title: {
      type: String,
      required: true
    },
    legend: {
      type: Array,
      required: true
    }
  },
  components: {
    BaseHeading
  }
}
</script>

<style lang="scss" module="base">
.legend {}
</style>
