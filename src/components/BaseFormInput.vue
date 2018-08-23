<template>
  <BaseFormLabel
    :id="name"
    :label="label"
    :helpText="helpText"
    :textSize="labelTextSize"
  >
    <component
      :is="el"
      :id="name"
      :name="name"
      :class="[base.input, type[typeScaleClass(textSize)]]"
      :placeholder="placeholder"
      :value="value"
      :type="type"
      @input="emitInput"
      @change="emitChange"
      @focus="emitFocus"
    >{{contentValue}}</component>
    <BaseCalloutBox
      :class="space.marginTopNarrow"
      role="warning"
    >
      {{ error }}
    </BaseCalloutBox>
  </BaseFormLabel>
</template>

<script>
import { styleHelpers } from './mixins/helpers.js'
import BaseFormLabel from './BaseFormLabel.vue'
import BaseCalloutBox from './BaseCalloutBox.vue'

export default {
  name: 'BaseFormInput',
  mixins: [styleHelpers],
  props: {
    el: {
      type: String,
      default: 'input'
    },
    label: String,
    helpText: String,
    value: [String, Number],
    name: String,
    placeholder: String,
    validate: String,
    dataAs: String,
    type: {
      type: String,
      default: 'text'
    },
    error: {
      type: String,
      required: false
    },
    textSize: {
      type: String,
      default: 'epsilon'
    },
    labelTextSize: {
      type: String,
      default: 'zeta'
    }
  },
  components: {
    BaseFormLabel,
    BaseCalloutBox
  },
  methods: {
    emitInput: function (e) {
      this.$emit('input', e.target.value)
    },
    emitChange: function (e) {
      this.$emit('change', e.target.value)
    },
    emitFocus: function (e) {
      this.$emit('focus', e.target.value)
    }
  },
  computed: {
    contentValue: function () {
      if (this.el === 'textarea') { return this.value }
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
  box-shadow: none !important;
  display: block;
  width: 100%;
  background-color: well('light');
  outline: 0;
  outline: thin dotted \9;

  &:focus,
  &:active {
    border-color: color('highlight');
    background-color: color('light');
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
