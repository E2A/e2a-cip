<template>
  <BaseGutterWrapper
    el="dl"
    gutterX="narrow"
    gutterY="narrow"
    :class="wrapper"
  >
    <div
      v-for="(value, key, index) in data"
      :key="`data-grid-${index}`"
      :class="base.item"
    >
      <dt :class="base.dataTerm" v-html="key"></dt>
      <dd :class="base.dataValue" v-html="value"></dd>
    </div>
  </BaseGutterWrapper>
</template>

<script>
import BaseGutterWrapper from './BaseGutterWrapper'

export default {
  name: 'BaseDataGrid',
  props: {
    data: {
      type: Object,
      required: true
    },
    gutter: {
      type: [String, Object],
      default: 'narrow'
    }
  },
  components: {
    BaseGutterWrapper
  }
}
</script>

<style lang="scss" module="base">
.wrapper {
  font-size: 0;
}

.data {
  composes: scaleZeta from 'styles/type.scss';
}

.dataTerm {
  composes: data;
  composes: bold from 'styles/type.scss';
}

.dataValue {
  composes: data;
  margin-left: 0;
}

.item {
  display: inline-block;
}
</style>
