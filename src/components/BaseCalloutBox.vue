<template>
  <p :class="[base.box, base[role]]">
      <BaseIcon
        :class="space.marginRightXxnarrow"
        :name="icons[role].icon"
        :alt="icons[role].alt"
        size="1.3em"
      />
    <slot>Add a message</slot>
  </p>
</template>

<script>
import BaseIcon from './BaseIcon.vue'

export default {
  name: 'BaseCalloutBox',
  props: {
    role: {
      type: String,
      default: 'info',
      validator: function (value) {
        return ['success', 'warning', 'info'].indexOf(value) !== -1
      }
    }
  },
  data: function () {
    return {
      icons: {
        success: {
          icon: 'success',
          alt: '👍'
        },
        info: {
          icon: 'warning',
          alt: '( i )'
        },
        warning: {
          icon: 'warning',
          alt: '( ! )'
        }
      }
    }
  },
  components: {
    BaseIcon
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
.box {
  composes: marginTopXnarrow noMarginBottom paddingXnarrow from 'styles/spacing.scss';
  composes: default round from 'styles/borders.scss';
  composes: scaleZeta from 'styles/type.scss';
}

.info {
  composes: midtone from 'styles/color.scss';
}

.warning {
  composes: warningBorder warning from 'styles/color.scss';
}

.success {
  composes: successBorder success from 'styles/color.scss';
}
</style>
