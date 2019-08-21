<template>
  <div v-if="!table" :class="base.activitiesTableWrapper">
    <div :class="base.activitiesTable">
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
          {{ translateHeadings ? $t(heading.title) : heading.title }}
        </BaseHeading>
      </div>
      <ul :class="base.list">
        <li v-for="(activities, index) in groupedActivities" :key="`gA-${index}`">
          <slot name="activities" :activities="activities" :setActivityId="setActivityId"></slot>
        </li>
      </ul>
    </div>
    <ActivityTray />
  </div>
</template>

<script>
import BaseHeading from '@/components/BaseHeading.vue'
import ActivityTray from '@/components/ActivityTray.vue'

export default {
  name: 'ActivitiesList',
  props: {
    table: {
      type: Boolean,
      default: false
    },
    groupedActivities: {
      type: Array,
    },
    currentActivityId: {
      type: String,
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
    },
    translateHeadings: {
      type: Boolean,
      default: true
    }
  },
  components: {
    BaseHeading,
    ActivityTray
  },
  methods: {
    setActivityId: function(event, value) {
      if (value > 0) {
        this.$store.commit('SET_MOUNTED_ACTIVITY', value)
      }
    }
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

  .activitiesTableWrapper {
    display: flex;
  }

  .activitiesTable {
    flex: 0 0 66%;
    composes: default round from "styles/borders.scss";
    composes: whiteBg shadow from "styles/color.scss";
    padding: 1rem;
  }
</style>
