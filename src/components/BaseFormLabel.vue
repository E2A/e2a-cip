<template>
  <div>
    <div v-if="tooltipText">
      <label
        :for="id"
        :class="[
          base.label,
          type[typeScaleClass(textSize)],
          !helpText && space.marginBottomNarrow
        ]"
      >
        {{ label }}
      </label>
      <BaseTooltip :body="tooltipText" />
    </div>
    <label
      v-else
      :for="id"
      :class="[
        base.label,
        type[typeScaleClass(textSize)],
        !helpText && space.marginBottomNarrow
      ]"
    >
      {{ label }}
    </label>
    <BaseBodyText
      v-if="helpText"
      :content="helpText"
      :size="helpTextSize"
      :class="base.help"
      font="display"
    />
    <slot>Add a form component here</slot>
  </div>
</template>

<script>
import { styleHelpers } from "./mixins/helpers.js";
import BaseBodyText from "./BaseBodyText.vue";
import BaseTooltip from "./BaseTooltip.vue";

export default {
  name: "BaseFormLabel",
  components: {
    BaseBodyText,
    BaseTooltip
  },
  mixins: [styleHelpers],
  props: {
    label: String,
    id: String,
    helpText: String,
    textSize: {
      type: String,
      default: "epsilon"
    },
    helpTextSize: {
      type: String,
      default: "zeta"
    },
    tooltipText: String
  }
};
</script>

<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
.label {
  composes: bold leadingTight from "styles/type.scss";
}

.help {
  composes: midtone from "styles/color.scss";
  composes: paddingBottomNarrow from "styles/spacing.scss";
  padding-top: 0.2rem;
}
</style>
