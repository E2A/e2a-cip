<template>
  <BaseFormLabel
    :id="name"
    :label="label"
    :helpText="helpText"
  >
    <input
      :id="name"
      :name="name"
      :class="base.input"
      :placeholder="placeholder"
      :value="value"
      :type="type"
      @input="updateValue"
      @change="updateValue"
    />
    <p v-if="error" class="form__error">{{ error }}</p>
  </BaseFormLabel>
</template>

<script>
import BaseFormLabel from './BaseFormLabel.vue'

export default {
  name: 'BaseFormInput',
  props: {
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
    }
  },
  components: {
    BaseFormLabel
  },
  methods: {
    updateValue: function (e) {
      this.$emit('input', e.target.value)
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

<style scoped>
/* Styles o' Shame */
  .form__error {
    background: #bf2441;
    color: #fff;
    padding: 10px;
    margin-top: 0;
    font-weight: 600;
    font-size: 18px;
    width: 80%;
    border: 2px solid #bf2441;
  }
</style>

<style lang="scss" module="base">
@import '~styleConfig/color';

.input {
  composes: transition from 'styles/animation.scss';
  composes: scaleEpsilon from 'styles/type.scss';
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
</style>
