<!--
  Callout box component
  -> a message box for errors, notifications, etc.
-->

<template>
  <aside
    :class="[
      base.box,
      base[role],
      { [base.pointer]: clickable },
      { [color.shadow]: shadow },
      { [color.shadowHover]: clickable }
    ]"
    @click="clickable && $emit('click')"
  >
    <div :class="base.status">
      <BaseIcon
        :name="icons[role].icon"
        :alt="icons[role].alt"
        :class="base.icon"
      />
    </div>
    <BaseBodyText
      :content="message"
      :class="[base.message, { [base.iconRight]: dismissable || clickable }]"
      font="display"
    />
    <button
      v-if="dismissable"
      :class="base.action"
      :title="$t('dismissNotification')"
      @click="dismissNotification"
    >
      <BaseIcon :class="base.icon" name="close" alt="X" />
    </button>
    <div v-if="clickable" :class="base.action">
      <BaseIcon :class="base.icon" name="arrow-right" alt=">" />
    </div>
  </aside>
</template>

<script>
import BaseIcon from "./BaseIcon.vue";
import BaseBodyText from "./BaseBodyText";

export default {
  name: "BaseCalloutBox",
  components: {
    BaseIcon,
    BaseBodyText
  },
  props: {
    message: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "info",
      validator: function(value) {
        return ["success", "warning", "info"].indexOf(value) !== -1;
      }
    },
    dismissable: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    },
    timeout: Number
  },
  data: function() {
    return {
      icons: {
        success: {
          icon: "success",
          alt: "👍"
        },
        info: {
          icon: "info",
          alt: "( i )"
        },
        warning: {
          icon: "warning",
          alt: "( ! )"
        }
      }
    };
  },
  mounted() {
    if (this.timeout) {
      setTimeout(() => {
        this.dismissNotification();
      }, this.timeout);
    }
  },
  methods: {
    dismissNotification: function() {
      this.$store.dispatch("entities/globalnotifications/deleteAll");
      this.$emit("dismiss");
    }
  }
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/color.scss" lang="scss" module="color"></style>

<style lang="scss" module="base">
@import "~bourbon/core/bourbon";
@import "~styleConfig/scale";
@import "~styleConfig/spacing";

$size-icons: scale-type("epsilon");
$gutter: space("xnarrow");

.box {
  composes: default round from "styles/borders.scss";
  composes: whiteBg from "styles/color.scss";
  position: relative;
}

.pointer {
  cursor: pointer;
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

.action {
  composes: status;
  composes: midtone from "styles/color.scss";
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
  composes: display scaleZeta from "styles/type.scss";
  composes: paddingVerticalXnarrow from "styles/spacing.scss";
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
  composes: midtone from "styles/color.scss";
}

.warning {
  composes: warningBorder warning from "styles/color.scss";
}

.success {
  composes: successBorder success from "styles/color.scss";
}
</style>
