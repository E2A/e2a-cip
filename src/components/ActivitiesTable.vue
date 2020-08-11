<template>
  <table :class="base.table">
    <thead>
      <tr :class="space.paddingHorizontalBetweenXnarrow">
        <th
          v-for="(heading, index) in headings"
          :key="index"
          :class="[base.heading, type[heading.align || 'left']]"
        >
          {{ translateHeadings ? $t(heading.title) : heading.title }}
        </th>
        <th v-if="actionColumn" :class="base.heading">
          <!-- extra cell for edit button -->
        </th>
      </tr>
    </thead>
    <slot>Add activity items here</slot>
  </table>
</template>

<script>
export default {
  name: "ActivitiesList",
  props: {
    headings: {
      type: Array,
      default: function() {
        return [
          {
            title: "activityTable.defaultTitle"
          },
          {
            title: "activityTable.defaultBudget",
            align: "right"
          },
          {
            title: "activityTable.defaultYouthCentered",
            align: "center"
          }
        ];
      }
    },
    actionColumn: {
      type: Boolean,
      default: true
    },
    translateHeadings: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
.table {
  cellspacing: 0;
  cellpadding: 0;
  border-collapse: collapse;
  width: 100%;
}

.heading {
  composes: bottom thick from "styles/borders.scss";
  composes: darkBorder from "styles/color.scss";
  composes: scaleZeta bold from "styles/type.scss";
  composes: paddingVerticalXxnarrow from "styles/spacing.scss";
  vertical-align: bottom;
}
</style>
