<template>
  <BaseGutterWrapper
    :class="[base.wrapper, condensed && base.condensed]"
    el="dl"
    gutter-x="narrow"
    gutter-y="narrow"
  >
    <div
      v-for="(value, key, index) in data"
      :key="`data-grid-${index}`"
      :class="[base.item, `dataItem`]"
    >
      <dt :class="base.dataTerm" v-html="key" />
      <dd :class="base.dataValue" v-html="value" />
    </div>
  </BaseGutterWrapper>
</template>

<script>
import BaseGutterWrapper from "./BaseGutterWrapper";

export default {
  name: "BaseDataGrid",
  components: {
    BaseGutterWrapper,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    gutter: {
      type: [String, Object],
      default: "narrow",
    },
    condensed: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" module="base">
@import "~styleConfig/color";
@import "~styleConfig/type";

.wrapper {
  font-size: 0;
}

.data {
  composes: scaleZeta from "styles/type.scss";
}

.dataList {
  composes: scaleZeta from "styles/type.scss";
}

.dataTerm {
  composes: data;
  composes: bold from "styles/type.scss";
}

.dataValue {
  composes: data;
  margin-left: 0;
}

.item {
  display: inline-block;
}

.condensed {
  .dataTerm {
    @include font();
    color: color("midtone");
  }
}
</style>
