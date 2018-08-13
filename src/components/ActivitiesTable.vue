<template>
  <table :class="base.table">
    <thead>
      <tr :class="space.paddingHorizontalBetweenXnarrow">
        <th
          v-for="(heading, index) in headings"
          :key="index"
          :class="[base.heading, type[heading.align || 'left']]"
        >
          {{ heading.title }}
        </th>
        <th
          v-if="actionColumn"
          :class="base.heading"
        ><!-- extra cell for edit button --></th>
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
            title: 'Activity text'
          }, {
            title: 'Budget',
            align: 'right'
          }, {
            title: 'Youth-centered?',
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
<style src="../stylesheets/utilities/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
.table {
  cellspacing: 0;
  cellpadding: 0;
  border-collapse: collapse;
}

.heading {
  composes: bottom thick from 'styles/borders.scss';
  composes: darkBorder from 'styles/color.scss';
  composes: scaleEta bold from 'styles/type.scss';
  composes: paddingVerticalXxnarrow from 'styles/spacing.scss';
  vertical-align: bottom;
}
</style>
