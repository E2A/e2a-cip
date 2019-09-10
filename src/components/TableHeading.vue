<template>
  <div :class="[base.tableHeading]">
    <div :class="[base.fieldName]">
      <slot>Add a heading!</slot>
    </div>
  </div>
</template>

<script>
import { styleHelpers } from './mixins/helpers.js'

export default {
  name: 'TableHeading',
  mixins: [styleHelpers],
  props: {
  },
}
</script>

<style src="styles/type.scss" lang="scss" module="type"></style>
<style src="styles/color.scss" lang="scss" module="colorPalette"></style>

<style lang="scss" module="base">
@import '~styleConfig/type';
@import '~styleConfig/color';
  .tableHeading {
    color: color('midtone');
    font-size: 0.65rem;
    max-width: 55px;
    margin: 0 10px;
  }

  .fieldName {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
