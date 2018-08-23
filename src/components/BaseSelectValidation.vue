<template>
  <span>
    <vSelect
      @input="emitInput"
      :options="options"
      :searchable="searchable"
      :value="value"
      :class="classItems"
      :placeholder="placeholder"
    />
    <BaseCalloutBox
      :key="error"
      v-if="error"
      :message="error"
      :class="space.marginTopNarrow"
      role="warning"
    />
  </span>
</template>

<script>
import { styleHelpers } from './mixins/helpers.js'
import BaseFormLabel from './BaseFormLabel.vue'
import BaseCalloutBox from './BaseCalloutBox.vue'
import vSelect from 'vue-select'

export default {
  name: 'BaseSelectValidation',
  mixins: [styleHelpers],
  props: {
    value: [String, Number],
    name: String,
    placeholder: String,
    validate: String,
    dataAs: String,
    error: {
      type: String,
      required: false
    },
    searchable: Boolean,
    options: [Array, Object],
    classItems: String
  },
  components: {
    BaseFormLabel,
    BaseCalloutBox,
    vSelect
  },
  methods: {
    emitInput: function (e) {
      this.$emit('input', e)
    }
  },
  $_veeValidate: {
    name () {
      return this.name
    },
    value () {
      return this.value
    }
  }
}
</script>
<style src="styles/spacing.scss" lang="scss" module="space"></style>

<style lang="scss" module="base">
@import '~styleConfig/color';

.input {
  composes: default from 'styles/animation.scss';
  composes: paddingXnarrow from 'styles/spacing.scss';
  composes: round default from 'styles/borders.scss';
  composes: lightBg from 'styles/color.scss';
  box-shadow: none !important;
  display: block;
  width: 100%;
  outline: 0;
  outline: thin dotted \9;

  &:focus,
  &:active {
    border-color: color('highlight');
    background-color: color('white');
  }
}

.textarea {
  composes: input;
  height: auto;
  min-height: 4em;
  resize: vertical;
}

.error {
  composes: marginTopXnarrow noMarginBottom paddingXnarrow from 'styles/spacing.scss';
  composes: default round from 'styles/borders.scss';
  composes: scaleZeta from 'styles/type.scss';
  composes: warningBorder warning from 'styles/color.scss';
}
</style>
