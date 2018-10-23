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
    // arrow-down-midtone.svg, base64 encoded so the native app can find it
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTggMTAuMjQ5bDUuNjk0LTUuODQ0YTEuMzcgMS4zNyAwIDAgMSAxLjg4NS0uMDU4Yy41MzcuNDg1LjU2NCAxLjI5Ni4wNiAxLjgxM0w4IDE0IC4zNiA2LjE2YTEuMjQ5IDEuMjQ5IDAgMCAxIC4wNjEtMS44MTMgMS4zNyAxLjM3IDAgMCAxIDEuODg1LjA1OEw4IDEwLjI1eiIgZmlsbD0iIzhEQTNDMCIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+) !important;
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
      // arrow-down-midtone.svg, base64 encoded so the native app can find it
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTggNi4xNDRsNC43Ni00Ljc2YTEuMzEzIDEuMzEzIDAgMCAxIDEuODU2IDEuODU3TDkuODU2IDhsNC43NiA0Ljc2YTEuMzEzIDEuMzEzIDAgMCAxLTEuODU3IDEuODU2TDggOS44NTZsLTQuNzYgNC43NmExLjMxMyAxLjMxMyAwIDAgMS0xLjg1Ni0xLjg1N0w2LjE0NCA4bC00Ljc2LTQuNzZhMS4zMTIgMS4zMTIgMCAxIDEgMS44NTctMS44NTZMOCA2LjE0NHoiIGZpbGw9IiM4REEzQzAiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==) !important;
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
