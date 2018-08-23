<!--
  Callout box component
  -> a message box for errors, notifications, etc.
-->

<template>
  <aside :class="[base.box, base[role], shadow && color.shadow]">
    <div :class="base.status">
      <BaseIcon
        :name="icons[role].icon"
        :alt="icons[role].alt"
        :class="base.icon"
      />
    </div>
    <BaseBodyText
      :content="message"
      :class="[base.message, dismissable && base.iconRight]"
      font="display"
    />
    <button
      v-if="dismissable"
      @click="$emit('dismiss')"
      :class="base.dismiss"
      :title="$t('dismissNotification')"
    >
      <BaseIcon
        :class="base.icon"
        name="close"
        alt="X"
      />
    </button>
  </aside>
</template>

<script>
import BaseIcon from './BaseIcon.vue'
import BaseBodyText from './BaseBodyText'

export default {
  name: 'BaseCalloutBox',
  props: {
    message: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'info',
      validator: function (value) {
        return ['success', 'warning', 'info'].indexOf(value) !== -1
      }
    },
    dismissable: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
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
          icon: 'info',
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
    BaseIcon,
    BaseBodyText
  }
}
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
@import '~bourbon/core/bourbon';
@import '~styleConfig/scale';
@import '~styleConfig/spacing';

$size-icons: scale-type('epsilon');
$gutter: space('xnarrow');

.box {
  composes: marginTopXnarrow noMarginBottom from 'styles/spacing.scss';
  composes: default round from 'styles/borders.scss';
  position: relative;
}

.status {
  width: ($size-icons + ($gutter * 2));
  line-height: 1;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  padding: ($gutter + 0.15rem) $gutter; // add a little extra vertical padding to compensate for line height of message
}

.dismiss {
  composes: status;
  composes: midtone from 'styles/color.scss';
  left: auto;
  right: 0;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
}

.icon {
  font-size: $size-icons;
}

.message {
  composes: display scaleZeta from 'styles/type.scss';
  composes: paddingVerticalXnarrow from 'styles/spacing.scss';
  display: block;
  width: 100%;
  padding-left: ($size-icons + ($gutter * 2));
  padding-right: $gutter;
}

.iconRight {
  padding-right: ($size-icons + ($gutter * 2));
}

// role styles
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
