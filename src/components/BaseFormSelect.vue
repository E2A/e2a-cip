<template>
  <BaseFormLabel
    :id="name"
    :label="label"
    :helpText="helpText"
    :textSize="labelTextSize"
  >
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
  </BaseFormLabel>
</template>

<script>
import { styleHelpers } from './mixins/helpers.js'
import BaseFormLabel from './BaseFormLabel.vue'
import BaseCalloutBox from './BaseCalloutBox.vue'
import vSelect from 'vue-select'

export default {
  name: 'BaseFormSelect',
  mixins: [styleHelpers],
  props: {
    label: String,
    labelTextSize: String,
    helpText: String,
    value: [String, Number, Object],
    name: String,
    placeholder: String,
    validate: String,
    dataAs: String,
    error: {
      type: String,
      required: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    options: {
      type: [Array, Object],
      required: true
    },
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

<!-- global: override the classes used on vue-select with our own styles -->
<style lang="scss">
@import '~styleConfig/type';
@import '~styleConfig/spacing';
@import '~styleConfig/color';
@import '~styleConfig/borders';

.v-select {
  @include font();
  color: color('dark');

  .open-indicator {
    $size: 0.7em; // matched roughly to original size but in ems
    width: $size;
    height: $size;
    bottom: 50%;
    margin-bottom: -($size / 2);
  }

  .dropdown-toggle {
    @include border();
    padding: space('xxnarrow');
    background-color: color('light');

    // clear button
    .clear {
      $size: 1em;
      width: $size;
      height: $size;
      bottom: 50%;
      margin-bottom: -($size / 2);
    }
  }

  .dropdown-menu {
    .highlight > a {
      background: color('accent');
      color: color('white');
    }
  }
}
</style>
