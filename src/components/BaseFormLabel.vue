<template>
  <div>
    <label
      :for="id"
      :class="[base.label, !helpText && space.paddingBottomXxnarrow]"
    >
      {{label}}
    </label>
    <BaseBodyText
      v-if="helpText"
      :content="helpText"
      size="eta"
      :class="[color.midtone, space.paddingBottomXxnarrow]"
    />
    <slot>Add a form component here</slot>
  </div>
</template>

<script>
import BaseBodyText from './BaseBodyText.vue'

export default {
  name: 'BaseFormLabel',
  props: {
    label: String,
    id: String,
    helpText: String
  },
  components: {
    BaseBodyText
  }
}
</script>

<style src="styles/color.scss" lang="scss" module="color"></style>
<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
.label {
  composes: scaleZeta bold from 'styles/type.scss';
  display: block;
}
</style>
