<template>
  <BaseFormLabel
    :id="name"
    :label="$t('activityYouthCentric')"
    :help-text="$t('supportText.activityYouthCentric')"
    :tooltip-text="tooltipText"
  >
    <input
      :class="[base.switch, { [base.enhanced]: supportStyledCheckbox }]"
      :name="name"
      :id="name"
      :value="value"
      :data-label-on="labelOn || $t('yesRaw')"
      :data-label-off="labelOff || $t('noRaw')"
      type="checkbox"
      @input="emitInput($event)"
    />
    <BaseCalloutBox
      v-if="error"
      :key="error"
      :message="error"
      :class="space.marginTopNarrow"
      role="warning"
    />
  </BaseFormLabel>
</template>

<script>
import BaseFormLabel from "./BaseFormLabel";
import BaseCalloutBox from "./BaseCalloutBox";

export default {
  name: "BaseFormSwitch",
  components: {
    BaseFormLabel,
    BaseCalloutBox,
  },
  props: {
    label: String,
    helpText: String,
    value: Boolean,
    name: {
      type: String,
      required: true,
    },
    // 'yes' and 'no' labels on the switch
    // -> default translations are above in the template
    labelOn: String,
    labelOff: String,
    error: String,
    tooltipText: String,
  },
  data() {
    return {
      supportStyledCheckbox: false,
    };
  },
  created() {
    this.checked = this.value;

    // detect Edge
    if (navigator.userAgent.indexOf("Edge") === -1) {
      this.supportStyledCheckbox = true;
    }
  },
  methods: {
    emitInput: function (event) {
      // use event.target.checked instead of value for checkboxes
      // https://medium.com/@relt24/dedicated-vue-js-checkbox-component-360a330a3eb
      this.$emit("input", event.target.checked);
    },
  },
};
</script>

<style lang="scss" module="base">
// https://danklammer.com/articles/simple-css-toggle-switch/
// https://codersblock.com/blog/checkbox-trickery-with-css/
// https://thestizmedia.com/radio-buttons-as-toggle-buttons-with-css/
// https://stackoverflow.com/questions/18449299/css-turn-2-radio-buttons-into-1-switch

@import "~styleConfig/color";
@import "~styleConfig/borders";

.switch {
  composes: default from "styles/animation.scss";
  composes: scaleZeta display uppercase bold from "styles/type.scss";
  composes: default round from "styles/borders.scss";
  display: inline-block;
  height: 2em;
  width: 2em;
}

.enhanced {
  $gutter: 0.2rem;
  $height: 2.6rem;
  $width: 8rem;

  // wrap all of this in a feature query to prevent IE and Opera from rendering it
  @supports (width: calc(50% - #{$gutter})) {
    border-radius: 6px;
    cursor: pointer;
    color: color("midtone");
    appearance: none;
    background-color: color("light");
    width: $width;
    height: $height;

    &:focus {
      outline: none;
    }

    &::before,
    &::after {
      border-radius: $border-radius;
      display: inline-block;
      line-height: calc(#{$height - ($gutter * 2)} - #{border-w("thin") * 2});
      text-align: center;
      text-transform: uppercase;
      width: calc(50% - #{$gutter});
    }

    &::before {
      content: attr(data-label-on);
      margin: $gutter 0 $gutter $gutter;
    }

    &::after {
      background-color: color("warning");
      color: color("white");
      content: attr(data-label-off);
      margin: $gutter $gutter $gutter 0;
    }

    &[value="true"]::before {
      background-color: color("success");
      color: color("white");
    }

    &[value="true"]::after {
      background-color: transparent;
      color: color("midtone");
    }
  }
}
</style>
