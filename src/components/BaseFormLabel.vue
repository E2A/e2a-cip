<template>
  <div>
    <label
      :for="id"
      :class="[
        base.label,
        type[typeScaleClass(textSize)],
        !helpText && space.paddingBottomXxnarrow
      ]"
    >
      {{label}}
    </label>
    <BaseBodyText
      v-if="helpText"
      :content="helpText"
      size="helpTextSize"
      :class="[color.midtone, space.paddingBottomXxnarrow]"
    />
    <slot>Add a form component here</slot>
  </div>
</template>

<script>
import { styleHelpers } from './mixins/helpers.js'
import BaseBodyText from './BaseBodyText.vue'

export default {
  name: 'BaseFormLabel',
  mixins: [styleHelpers],
  props: {
    label: String,
    id: String,
    helpText: String,
    textSize: {
      type: String,
      default: 'zeta'
    },
    helpTextSize: {
      type: String,
      default: 'eta'
    }
  },
  components: {
    BaseBodyText
  }
}
</script>

<style src="styles/color.scss" lang="scss" module="color"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>
<style src="styles/type.scss" lang="scss" module="type"></style>

<style lang="scss" module="base">
.label {
  composes: bold from 'styles/type.scss';
  display: block;
}
</style>
