<template>
  <div v-if="!table">
    <div :class="base.header">
      <BaseHeading
        v-for="(heading, index) in headings"
        :key="index"
        :centered="false"
        :class="base.heading"
        scale="zeta"
        color="dark"
        sub
      >
        {{ $t(heading.title) }}
      </BaseHeading>
    </div>
    <ul :class="base.list">
      <slot>Add activity items here</slot>
    </ul>
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
            title: 'activityTable.defaultTitle'
          },
          {
            title: 'activityTable.defaultEIP',
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
    composes: bottom thick from 'styles/borders.scss';
    composes: darkBorder from 'styles/color.scss';
    composes: paddingVerticalXxnarrow from 'styles/spacing.scss';

    @supports (display: flex) {
      display: flex;
      justify-content: space-between;
    }
  }

  .heading {
    composes: bold from 'styles/type.scss';
    vertical-align: bottom;
  }

  .list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
