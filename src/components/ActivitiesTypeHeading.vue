<template>
  <div :class="base.wrapper">
    <BaseGutterWrapper
      :class="base.flexWrapper"
      gutterY="xnarrow"
      gutterX="xnarrow"
    >
      <BaseHeading
        :level="3"
        :centered="false"
        :class="base.heading"
        scale="zeta"
        color="dark"
        weight="bold"
      >
        <slot>Add a heading</slot>
      </BaseHeading>
      <div
        v-if="$slots.stats"
        :class="base.stats"
      >
        <slot name="stats"></slot>
      </div>
    </BaseGutterWrapper>
  </div>
</template>

<script>
import BaseHeading from './BaseHeading.vue'
import BaseGutterWrapper from './BaseGutterWrapper.vue'

export default {
  name: 'ActivitiesTypeHeading',
  props: {

  },
  components: {
    BaseHeading,
    BaseGutterWrapper
  }
}
</script>

<style lang="scss" module="base">
// to add outside borders, colors, etc.
.wrapper {
  composes: paddingXnarrow from 'styles/spacing.scss';
  composes: lightBg from 'styles/color.scss';
  composes: top from 'styles/borders.scss';
}

// to apply flexbox to children
.flexWrapper {
  @supports (display: flex) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
}

.heading {
  composes: uppercase from 'styles/type.scss';
  display: inline-block;
  vertical-align: middle;
}

.stats {
  display: inline-block;
  vertical-align: middle;
}
</style>
