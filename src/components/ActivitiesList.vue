<template>
  <div v-if="!table" :class="base.activitiesTableWrapper">
    <div :class="base.activitiesTable">
      <div :class="base.header">
        <div :class="base.headerRightPane">
          <TableHeading
            v-for="(heading, index) in headings"
            :key="index"
            :class="base.heading"
          >
            {{ translateHeadings ? $t(heading.title) : heading.title }}
          </TableHeading>
        </div>
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
import TableHeading from '@/components/TableHeading.vue'
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
            title: 'bestPractices.bestPractice1.title',
          },
          {
            title: 'bestPractices.bestPractice2.title',
          },
          {
            title: 'bestPractices.bestPractice3.title',
          },
          {
            title: 'bestPractices.bestPractice4.title',
          },
          {
            title: 'bestPractices.bestPractice5.title',
          },
          {
            title: 'bestPractices.bestPractice6.title',
          },
          {
            title: 'bestPractices.bestPractice7.title',
          },
        ]
      }
    },
    translateHeadings: {
      type: Boolean,
      default: true
    }
  },
  components: {
    TableHeading,
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
      justify-content: flex-end;
    }
  }

  .headerRightPane {
    max-width: 58.3333%;

    @supports (display: flex) {
      display: flex;
      justify-content: flex-end;
    }
  }

  .heading {
    vertical-align: bottom;
    padding: 0.5rem 0;
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
