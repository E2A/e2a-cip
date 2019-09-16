<template>
  <BaseGutterWrapper
    el="ul"
    :class="[
      base.wrapper,
      size !== 'default' ? base[size] : ''
    ]"
  >
    <li
      v-for="(step, index) in steps"
      :key="index"
      :class="[base.iconBox, base.iconBoxSequence, base.iconBoxFlex]"
    >
      <slot :step="step">
        <div :class="[base.iconBoxIcon]">
          <span :class="[base.iconBoxCircle]">{{index + 1}}</span>
        </div>
        <div :class="[base.iconBoxContent]">
          <BaseHeading
            :class="space.paddingBottomXxnarrow"
            :level="3"
            :centered="false"
            scale="epsilon"
            weight="bold"
            color="dark"
          >{{step.title}}</BaseHeading>
          <BaseBodyText size="zeta" :content="step.blurb" />
        </div>
      </slot>
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
    },
    size: {
      type: String,
      default: 'default',
      validator (value) {
        return ['small', 'default'].indexOf(value) !== -1
      }
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
@import "~styleConfig/scale";
@import "~styleConfig/type";
@import "~styleConfig/color";
@import "~styleConfig/spacing";

.wrapper {
  list-style: none;
  align-content: center;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.iconBox {
  padding-left: space("narrow");
  padding-right: space("narrow");
  margin-bottom: space("xnarrow");
  margin-top: space("xnarrow");

  &:hover {
    .iconBoxIcon {
      &:after {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
}

.iconBoxCircle {
  color: color("white");
  display: table-cell;
  font-size: 0.85rem;
  font-weight: 400;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  width: 50px;
}

.iconBoxFlex {
  flex-basis: 100%;
  flex-grow: 1;
  max-width: 100%;
}

.iconBoxContent {
  margin-top: - space("narrow") * 1.5;
  padding: space('wide') * 1.2 space("narrow");
  padding-bottom: space("wide");
  border-top: 2px dashed color("midtone");
}

.iconBoxIcon {
  background-color: color("primary");
  border-radius: 50%;
  box-shadow: 0 0 0 12px color("white");
  height: 50px;
  margin: 0;
  position: relative;
  transition: background-color 0.2s;
  width: 50px;

}
</style>
