<template>
  <BaseFormLabel
    v-if="label"
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
      :class="[classItems, noClear && base.noClear]"
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
  <vSelect
    v-else
    @input="emitInput"
    :options="options"
    :searchable="searchable"
    :value="value"
    :class="[classItems, noClear && base.noClear]"
    :placeholder="placeholder"
  />
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
    name: {
      type: String,
      required: true
    },
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
    classItems: String,
    noClear: {
      type: Boolean,
      default: false
    }
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
<!-- using !important everywhere to make sure we override vendor styles -->
<style lang="scss">
@import '~bourbon/core/bourbon';
@import '~styleConfig/type';
@import '~styleConfig/spacing';
@import '~styleConfig/color';
@import '~styleConfig/borders';

.v-select {
  @include font();
  color: color('dark') !important;

  a {
    border: none !important;
  }

  .open-indicator {
    $size: 0.7em; // matched roughly to original size but in ems
    background-image: url('../assets/images/icons/_external/arrow-down-midtone.svg') !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: contain !important;
    bottom: 50% !important;
    height: $size !important;
    margin-bottom: -($size / 2) !important;
    right: 0.7em !important;
    width: $size !important;

    &::before {
      content: none !important; // kill css triangle in pseudo-element
    }
  }

  &.single .selected-tag {
    position: absolute !important;
  }

  &.open .open-indicator {
    transform: rotate(180deg) !important;
    bottom: 50% !important; // override different bottom value in .open state
  }

  .dropdown-toggle {
    @include border();
    padding: space('xxnarrow') !important;
    background-color: color('light') !important;

    // clear button
    .clear {
      $size: 0.6em;
      background-image: url('../assets/images/icons/_external/close-midtone.svg') !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
      background-size: contain !important;
      bottom: 50% !important;
      height: $size !important;
      margin-bottom: -($size / 2) !important;
      right: 1.6em !important;
      width: $size !important;

      > * {
        @include hide-visually(); // hide child span with &times; text but keep it accessible to screen readers
      }
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

<style lang="scss" module="base">
// turn off the 'clear' button if the noClear prop is true
.noClear {
  :global {
    .clear {
      display: none !important;
    }
  }
}
</style>
