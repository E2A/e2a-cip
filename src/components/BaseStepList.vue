<template>
  <BaseGutterWrapper el="ol" :class="base.wrapper">
    <li
      v-for="(step, index) in steps"
      :key="index"
    >
      <div :class="base.step">
        <slot :step="step">
          <BaseHeading
            :class="space.paddingBottomXxnarrow"
            :level="3"
            :centered="false"
            scale="delta"
          >
            {{step.title}}
          </BaseHeading>
          <BaseBodyText
            size="zeta"
            :content="step.blurb"
          />
        </slot>
      </div>
    </li>
  </BaseGutterWrapper>
</template>

<script>
import BaseGutterWrapper from './BaseGutterWrapper.vue'
import BaseHeading from './BaseHeading.vue'
import BaseBodyText from './BaseBodyText.vue'

export default {
  name: 'BaseStepList',
  props: {
    steps: {
      type: Array,
      required: true
    }
  },
  components: {
    BaseGutterWrapper,
    BaseHeading,
    BaseBodyText
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
@import '~styleConfig/scale';
@import '~styleConfig/type';
@import '~styleConfig/color';

.wrapper {
  composes: centered from 'styles/type.scss';
  counter-reset: steps;
  font-size: 0;

  > li {
    display: inline-block;
    vertical-align: top;
    width: 100%;

    @include media('>small') {
      width: 50%;
    }

    @include media('>medium') {
      width: (100%/3);
    }
  }
}

.step {
  composes: left from 'styles/type.scss';
  composes: paddingLeftWide from 'styles/spacing.scss';
  counter-increment: steps;
  position: relative;

  &::before {
    @include font();
    color: color('midtone');
    content: counter(steps);
    display: block;
    font-size: scale-type('beta');
    left: -0.06em;
    line-height: 1;
    position: absolute;
    top: -0.05em;
  }
}
</style>
