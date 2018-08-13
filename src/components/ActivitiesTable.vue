<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(heading, index) in headings"
          :key="index"
          :class="type[heading.align || 'left']"
        >
          {{ heading.title }}
        </th>
        <th v-if="actionColumn"><!-- extra cell for edit button --></th>
      </tr>
    </thead>
    <slot>Add activity items here</slot>
  </table>
</template>

<script>
export default {
  name: 'ActivitiesList',
  props: {
    headings: {
      type: Array,
      default: function () {
        return [
          {
            title: this.$t('activityTable.defaultTitle')
          }, {
            title: this.$t('activityTable.defaultBudget'),
            align: 'right'
          }, {
            title: this.$t('activityTable.defaultYouthCentered'),
            align: 'center'
          }
        ]
      }
    },
    actionColumn: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style src="../stylesheets/utilities/type.scss" lang="scss" module="type"></style>
