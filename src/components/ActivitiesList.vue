<template>
  <div>
    <div v-if="!table">
      <div :class="base.header">
        <BaseHeading
          v-for="(heading, index) in headings"
          :level="5"
          :align="heading.align || 'left'"
          :key="index"
          :sub="true"
        >
          {{ heading.title }}
        </BaseHeading>
      </div>
      <ul>
        <slot>Add activity items here</slot>
      </ul>
    </div>
  </div>
</template>

<script>
import BaseHeading from '@/components/BaseHeading.vue'

export default {
  name: 'ActivitiesList',
  props: {
    table: {
      type: Boolean,
      default: false
    },
    headings: {
      type: Array,
      default: function () {
        return [
          {
            title: 'Activity name'
          },
          {
            title: 'Evidence-based practices',
            align: 'right'
          }
        ]
      }
    }
  },
  components: {
    BaseHeading
  }
}
</script>

<style lang="scss" module="base">
  .header {
    display: flex;
    justify-content: space-between;
  }
</style>
